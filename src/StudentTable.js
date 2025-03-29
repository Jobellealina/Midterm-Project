import { useEffect, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import Swal from "sweetalert2";

export default function StudentTable() {
    const [students, setStudents] = useState([]); 
    const navigate = useNavigate();

    const DisplayDetails = (id) => {
        navigate(`/student/view/${id}`);
    };

    const EditStudent = (id) => {
        navigate(`/student/edit/${id}`);
    };

    const RemoveStudent = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8000/students/${id}`, {
                    method: "DELETE",
                })
                .then(() => {
                    setStudents(students.filter(student => student.id !== id));

                    Swal.fire({
                        title: "Deleted!",
                        text: "Student has been deleted.",
                        icon: "success",
                        confirmButtonColor: "#674188"
                    });
                })
                .catch((err) => console.log(err.message));
            }
        });
    };

    useEffect(() => {
        fetch("http://localhost:8000/students")
            .then((res) => res.json())
            .then((data) => setStudents(data)) 
            .catch((err) => console.log(err.message));
    }, []); 

    return (
        <div className="container"> 
            <h2>STUDENT RECORDS</h2>
            <div className="table-container">
                <Link to="/student/create" className="btn btn-add">Add New Student</Link>
                <br />
                <br />
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Birthdate</th>
                            <th>Place</th>
                            <th>Phone</th>
                            <th>Nationality</th>
                            <th>Religion</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((item) => ( 
                                <tr key={item.id}> 
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.birthdate}</td>
                                    <td>{item.place}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.nationality}</td>
                                    <td>{item.religion}</td>
                                    <td>
                                        <button onClick={() => DisplayDetails(item.id)} className="btn btn-info">View</button>
                                        <button onClick={() => EditStudent(item.id)} className="btn btn-success">Edit</button>
                                        <button onClick={() => RemoveStudent(item.id)} className="btn btn-danger">Delete</button>
                                    </td>  
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" style={{ textAlign: "center" }}>No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
