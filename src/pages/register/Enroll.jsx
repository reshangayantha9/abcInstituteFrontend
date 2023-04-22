import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
function Enroll() {
    const navigate = useNavigate();

    const register = () => {
        navigate("/allregister")
    }
    const [inputData, setInputData] = useState({
        StudentId: "",
        ProgramId: "",
        RegisterDate: ""
    });
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })

    }
    const formhandler = async (e) => {
        e.preventDefault();
        const { StudentId, ProgramId, RegisterDate } = inputData;

        if (StudentId === "") {
            console.log("Student Id is Required !")
        } else if (ProgramId === "") {
            console.log("Program Id is Required !")
        } else if (RegisterDate === "") {
            console.log("Register Date is Required !")
        } else {
            const newEnroll = {
                StudentId: StudentId,
                ProgramId: ProgramId,
                RegisterDate: RegisterDate
            }

            await axios.post("http://localhost:8070/enroll/add", newEnroll)
                .then(() => {
                    alert("Enrolled...")
                    register();
                })
                .catch((err) => {
                    console.log(err.response.data);
                    alert(err)
                    setInputData({
                        ...inputData,
                        StudentId: "",
                        ProgramId: "",
                        RegisterDate: ""
                    });
                })
        }

    }
    return (
        <div className="container">
            <h2 className="text-center mt-1">Enroll new Program</h2>
            <div className="card shadow mt-3 ml-10 p-3 ">
                <div></div>
                <div className="row">
                    <form onSubmit={(e) => formhandler(e)}>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Student Id</label>
                            <input type="text" className="form-control " value={inputData.StudentId} onChange={setInputValue} name="StudentId" />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Program Id</label>
                            <input type="text" className="form-control" value={inputData.ProgramId} onChange={setInputValue} name="ProgramId" />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Register Date</label>
                            <input type="date" className="form-control" value={inputData.RegisterDate} onChange={setInputValue} name="RegisterDate" />
                        </div>
                        
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default Enroll