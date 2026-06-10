import { User } from '../models/user.js';
import { generateForgotPasswordEmailTemplate } from '../utils/emailTemplate.js';
import { generateToken } from '../utils/generateToken.js';
import { asyncHandler } from './../middlewares/asyncHandler.js';
import ErrorHandler from "./../middlewares/error.js";
import crypto from 'crypto';
import { sendEmail } from './../services/emailService.js';

// REGISTER USER
export const registerUser = asyncHandler(async (req, res, next) => {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return next(
            new ErrorHandler(
                'Please provide all required fields',
                400
            )
        );
    }

    let user = await User.findOne({ email });

    if (user) {
        return next(
            new ErrorHandler(
                'User already exists',
                400
            )
        );
    }

    user = new User({
        name,
        email,
        password,
        role
    });

    await user.save();

    generateToken(
        user,
        201,
        'User registered successfully',
        res
    );
});

// LOGIN USER
export const login = asyncHandler(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(
            new ErrorHandler(
                'Please provide all required fields',
                400
            )
        );
    }

    const user = await User.findOne({
        email,
        role
    }).select('+password');
    if (!user) {
        return next(
            new ErrorHandler(
                'Invalid email,password or role',
                401
            )
        );
    }

    const isPasswordMatch =
    await user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(
            new ErrorHandler(
                'Invalid email,password or role',
                401
            )
        );
    }

    generateToken(
        user,
        200,
        'User logged in successfully',
        res
    );
});

// GET USER
export const getUser = asyncHandler(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

// LOGOUT USER
export const logout = asyncHandler(async (req, res, next) => {

    res
    .status(200)
    .cookie('token', "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    .json({
        success: true,
        message: 'User logged out successfully',
    });
});

// FORGOT PASSWORD
export const forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email});

    if (!user) {
        return next( new ErrorHandler('User not found with this email', 404));
    }

    const resetToken =
    user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl =
    `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`

    const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

    try {
        await sendEmail({
            to: user.email,
            subject: "Final Project Management - Password Reset Request",
            message,
        });

        res.status(200).json({
            success: true,
            message:
            `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message || 'Email could not be sent', 500));
    }
});

// RESET PASSWORD
export const resetPassword = asyncHandler(async (req, res, next) => {
   const {token} = req.params;
   const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
   
   const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler('Invalid or expired password reset token', 400));
    }
    if (!req.body.password || !req.body.confirmPassword) {
        return next(new ErrorHandler('Please provide all required fields', 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password and confirm password do not match', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    generateToken(user,200,'Password reset successful',res);
});