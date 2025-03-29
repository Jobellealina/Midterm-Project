import { Link, useNavigate } from "react-router-dom";
import "./Create.css";
import { useState } from "react";
import Swal from "sweetalert2";
import "./App.css";

export default function CreateStudent() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [place, setPlace] = useState("");
    const [phone, setPhone] = useState("");
    const [nationality, setNationality] = useState("");
    const [religion, setReligion] = useState("");
    const [validation, setValidation] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const studentData = { id, name, birthdate, place, phone, nationality, religion };
        console.log(studentData);

        fetch("http://localhost:8000/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentData),
            mode: "cors"
        })
        .then((res) => {
            if (!res.ok) {
                return res.json().then(errData => { throw new Error(errData.message || "Failed to save student data"); });
            }
            return res.json();
        })
        .then(() => {
            Swal.fire({
                title: "Success!",
                text: "Student data saved successfully!",
                icon: "success",
                confirmButtonColor: "#674188",
            }).then(() => navigate("/"));
        })
        .catch((err) => {
            console.error("Fetch error:", err);
            Swal.fire({
                title: "Error!",
                text: err.message || "Something went wrong",
                icon: "error",
                confirmButtonColor: "#d33",
            });
        });
    };  

    return (
       <div className="create-student-container">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit} className="create-student-form"> 
            <label htmlFor="id">ID:</label>
            <input type="text" id="id" name="id" placeholder="Enter Your ID" required value={id} onChange={(e) => setId(e.target.value)} onMouseDown={()=>setValidation(true)} />

            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter Your Name" required value={name} onChange={(e) => setName(e.target.value)} onMouseDown={()=>setValidation(true)} />

            <label htmlFor="birthdate">Birthdate:</label>
            <input type="date" id="birthdate" name="birthdate" required value={birthdate} onChange={(e) => setBirthdate(e.target.value)} onMouseDown={()=>setValidation(true)} />

            <label htmlFor="place">Place:</label>
            <input type="text" id="place" name="place" placeholder="Enter Your Place" required value={place} onChange={(e) => setPlace(e.target.value)} onMouseDown={()=>setValidation(true)} />

            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" name="phone" placeholder="Enter Your Phone Number" required value={phone} onChange={(e) => setPhone(e.target.value)} onMouseDown={()=>setValidation(true)} />

            <label htmlFor="nationality">Nationality:</label>
            <input type="text" id="nationality" name="nationality" placeholder="Enter Your Nationality" required value={nationality} onChange={(e) => setNationality(e.target.value)} onMouseDown={()=>setValidation(true)} />

            <label htmlFor="religion">Religion:</label>
            <input type="text" id="religion" name="religion" placeholder="Enter Your Religion" required value={religion} onChange={(e) => setReligion(e.target.value)} onMouseDown={()=>setValidation(true)} />

            <div className="create-student-buttons">
                <button type="submit" className="btn-save">Save</button> 
                <Link to="/" className="btn-back">Back</Link>
            </div>
        </form>
       </div>
    );
}
