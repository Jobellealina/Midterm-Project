import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./Create.css";

export default function EditStudent() {
    const { studentid } = useParams();
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [place, setPlace] = useState("");
    const [phone, setPhone] = useState("");
    const [nationality, setNationality] = useState("");
    const [religion, setReligion] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/students/${studentid}`)
            .then((res) => res.json())
            .then((data) => {
                setId(data.id);
                setName(data.name);
                setBirthdate(data.birthdate);
                setPlace(data.place);
                setPhone(data.phone);
                setNationality(data.nationality);
                setReligion(data.religion);
            })
            .catch((err) => console.log(err.message));
    }, [studentid]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedStudent = { id, name, birthdate, place, phone, nationality, religion };
    
        fetch(`http://localhost:8000/students/${studentid}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedStudent),
        })
        .then((res) => {
            if (res.ok) {
                Swal.fire({
                    title: "Updated!",
                    text: "Student information updated successfully!",
                    icon: "success",
                    confirmButtonColor: "#674188",
                }).then(() => {
                    navigate("/"); 
                });
            } else {
                throw new Error("Failed to update student data");
            }
        })
        .catch((err) => {
            Swal.fire({
                title: "Error!",
                text: err.message,
                icon: "error",
                confirmButtonColor: "#d33",
            });
        });
    };

    return (
        <div className="create-student-container">
            <h2>Edit Student Details</h2>
            <form onSubmit={handleSubmit} className="create-student-form"> 
                <label htmlFor="id">ID:</label>
                <input type="text" id="id" name="id" required value={id} onChange={(e) => setId(e.target.value)} />

                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="birthdate">Birthdate:</label>
                <input type="date" id="birthdate" name="birthdate" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />

                <label htmlFor="place">Place:</label>
                <input type="text" id="place" name="place" required value={place} onChange={(e) => setPlace(e.target.value)} />

                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} />

                <label htmlFor="nationality">Nationality:</label>
                <input type="text" id="nationality" name="nationality" required value={nationality} onChange={(e) => setNationality(e.target.value)} />

                <label htmlFor="religion">Religion:</label>
                <input type="text" id="religion" name="religion" required value={religion} onChange={(e) => setReligion(e.target.value)} />

                <div className="create-student-buttons">
                    <button type="submit" className="btn-save">Update</button> 
                    <Link to="/" className="btn-back">Back</Link>
                </div>
            </form>
        </div>
    );
}
