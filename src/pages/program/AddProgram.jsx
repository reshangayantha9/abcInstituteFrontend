import React, { useState } from 'react'
import {useNavigate}from 'react-router-dom'
import axios from 'axios';
function AddProgram() {
    const navigate = useNavigate();

    const Program = () => {
        navigate("/program")
    }
    const [inputData, setInputData] = useState({
        ProgramId: "",
        ProgramName: "",
        ProgramDuration: "",
        ProgramCost: ""
    });
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })

    }
    const formhandler = async (e) => {
        e.preventDefault();
        const { ProgramId,ProgramName,ProgramDuration,ProgramCost } = inputData;

        if (ProgramId === "") {
            console.log("Program Id is Required !")
        } else if (ProgramName === "") {
            console.log("Program Name is Required !")
        } else if (ProgramDuration === "") {
            console.log("Program Duration is Required !")
        } else if (ProgramCost === "") {
            console.log("Program cost is Required !")
        } else {
            const newProgram = {
                ProgramId:ProgramId,
                ProgramName: ProgramName,
                ProgramDuration: ProgramDuration,
                ProgramCost: ProgramCost
            }
            
            await axios.post("http://localhost:8070/program/add", newProgram)
                .then(() => {
                    alert("New Program added...")
                    Program();
                })
                .catch((err) => {
                    console.log(err.response.data);
                    alert(err)
                    setInputData({
                        ...inputData,
                        ProgramId: "",
                        ProgramName: "",
                        ProgramDuration: "",
                        ProgramCost: "",
                    });
                })
        }

    }
    return (
        <div className="container">
            <h2 className="text-center mt-1">Add new Program</h2>
            <div className="card shadow mt-3 ml-10 p-3 ">
                <div></div>
                <div className="row">
                    <form onSubmit={(e) => formhandler(e)}>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Program Id</label>
                            <input type="text" className="form-control " value={inputData.ProgramId} onChange={setInputValue} name="ProgramId" />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Program Name</label>
                            <input type="text" className="form-control" value={inputData.ProgramName} onChange={setInputValue} name="ProgramName" />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Program Duration</label>
                            <input type="text" className="form-control" value={inputData.ProgramDuration} onChange={setInputValue} name="ProgramDuration" />
                        </div>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Program Cost</label>
                            <input type="text" className="form-control" value={inputData.ProgramCost} onChange={setInputValue} name="ProgramCost" />
                        </div>
                        <button type="submit" className="btn btn-primary" >Submit</button>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default AddProgram