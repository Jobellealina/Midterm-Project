import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.css"; 

export default function ViewDetails() {
    const { studentid } = useParams();
    const [studentData, setStudentData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/students/${studentid}`)
            .then((res) => res.json())
            .then((data) => setStudentData(data))
            .catch((err) => console.log(err.message));
    }, [studentid]);

    return (
        <div className="container1">
            <h1>Student Details</h1>
            {studentData ? (
                <div className="details">
                    <p><strong>ID:</strong> {studentData.id}</p>
                    <p><strong>Name:</strong> {studentData.name}</p>
                    <p><strong>Birthdate:</strong> {studentData.birthdate}</p>
                    <p><strong>Place:</strong> {studentData.place}</p>
                    <p><strong>Phone:</strong> {studentData.phone}</p>
                    <p><strong>Nationality:</strong> {studentData.nationality}</p>
                    <p><strong>Religion:</strong> {studentData.religion}</p>
                </div>
            ) : (
                <p>Loading student details...</p>
            )}
            <Link to="/" className="btn btn-back">Back</Link>
        </div>
    );
}
