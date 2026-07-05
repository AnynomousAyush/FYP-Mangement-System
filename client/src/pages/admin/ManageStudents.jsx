import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddStudent from "../../components/modal/AddStudent";

const ManageStudents = () => {
  const { users, projects } = useSelector((state) => state.admin);
  const { isCreateStudentModalOpen } = useSelector( state.popup );
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);


  const {formData, setFormData} = useState({
    name: "",
    email: "",
    department: "",
  });

   const dispatch = useDispatch();

   const students = useMemo(() => {
   const  studentsUsers = ( users || []).filter(
    (u) => u.role?.toLowerCase() === "students"
   );

   return studentsUsers.map(student => {
    const studentProject = (projects || []).find(
      p=> p.students?._id === student._id
    );
    return{
      ...students,
      projectTitle: studentPriject?.title || null,
    }
   })
   }, [users, projects])


  return <></>;
};

export default ManageStudents;
