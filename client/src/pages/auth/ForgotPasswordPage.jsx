import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyRound, Loader } from "lucide-react";
import { forgotPassword } from "../../store/slices/authSlice";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const {isRequestingForToken} = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return;
    }

    setError("");

    try {
      await dispatch(forgotPassword({ email })).unwrap();
      setIsSubmitted(true);
    } catch (error) {
      setError(error || "Failed to send reset link.please try again.");
    }
  };
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Check your email</h1>
            <p className="text-slate-600 mt-2">We've sent a password reset link to your email address.</p>
          </div>

          <div className="card">
            <div className="text-center">
              <p className="text-slate-700 mb-4">
                If an acoount with <strong>{email}</strong> exists, you will receive a password reset link.
              </p>
              <div className="space-y-3">
                <Link to="/login" className="w-full btn-primary inline-block tecxt-center">Back to Login</Link>
                <button onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                  className="w-full btn-outline">
                  Send Another Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return <>
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Forgot Password?</h1>
          <p className="text-slate-600 mt-2">Enter your email to reset your password</p>
        </div>

        {/* Forgot Password Form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {
              error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-500 text-sm">{error}</p>
                </div>
              )}

            {/* Email Address */}
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                className={`input ${error ? "input-error" : ""}`}
                placeholder="Enter your email"
                disabled={isRequestingForToken}
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRequestingForToken} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"> 
              { isRequestingForToken ? (
                <div className="flex justify-center items-center ">
                  <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Sending...
                </div>
                ) : (
                  "Send Reset Link"
                )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Remember your password? <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  </>;
};

export default ForgotPasswordPage;
