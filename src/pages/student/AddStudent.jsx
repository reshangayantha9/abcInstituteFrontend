import React, { useState } from 'react'
import {useNavigate}from 'react-router-dom'
import axios from 'axios';
function AddStudent() {
    const navigate = useNavigate();

    const Student = () => {
        navigate("/")
    }
    const [inputData, setInputData] = useState({
        StudentId: "",
        StudentName: "",
        StudentAddress: "",
        StudentContact: ""
    });
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })

    }
    const formhandler = async (e) => {
        e.preventDefault();
        const { StudentId, StudentName, StudentAddress, StudentContact } = inputData;

        if (StudentId === "") {
            console.log("Student Id is Required !")
        } else if (StudentName === "") {
            console.log("Student Name is Required !")
        } else if (StudentAddress === "") {
            console.log("Student Address is Required !")
        } else if (StudentContact === "") {
            console.log("Student Contact is Required !")
        } else {
            const newStudent = {
                StudentId: StudentId,
                StudentName: StudentName,
                StudentAddress: StudentAddress,
                StudentContact: StudentContact
            }
            console.log(newStudent);
            await axios.post("http://localhost:8070/student/add", newStudent)
                .then(() => {
                    alert("New Student added...")
                    Student();
                })
                .catch((err) => {
                    console.log(err.response.data);
                    alert(err)
                    setInputData({
                        ...inputData,
                        StudentId: "",
                        StudentName: "",
                        StudentAddress: "",
                        StudentContact: "",
                    });
                })
        }

    }
    return (
        <div className="container">
            <h2 className="text-center mt-1">Add new Student</h2>
            <div className="card shadow mt-3 ml-10 p-3 ">
                <div></div>
                <div className="row">
                    <form onSubmit={(e) => formhandler(e)}>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Student Id</label>
                            <input type="text" className="form-control " value={inputData.StudentId} onChange={setInputValue} name="StudentId" />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Student Name</label>
                            <input type="text" className="form-control" value={inputData.StudentName} onChange={setInputValue} name="StudentName" />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Student Address</label>
                            <input type="text" className="form-control" value={inputData.StudentAddress} onChange={setInputValue} name="StudentAddress" />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Student Contact</label>
                            <input type="text" className="form-control" value={inputData.StudentContact} onChange={setInputValue} name="StudentContact" />
                        </div>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default AddStudent