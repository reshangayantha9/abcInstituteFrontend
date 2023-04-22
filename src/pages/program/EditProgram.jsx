import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
function EditProgram() {
  const navigate = useNavigate();
  const Program = () => {
    navigate("/program")
  }
  const { id } = useParams();
  const [inputData, setInputData] = useState({
    ProgramId: "",
    ProgramName: "",
    ProgramDuration: "",
    ProgramCost: ""
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(`http://localhost:8070/program/details/${id}`);
        setInputData({
          ...inputData,
          ProgramId: response.ProgramId,
          ProgramName: response.ProgramName,
          ProgramDuration: response.ProgramDuration,
          ProgramCost: response.ProgramCost,
        });

      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
  }, []);
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value })
  }
  const newData = {
    ProgramName: inputData.ProgramName,
    ProgramDuration: inputData.ProgramDuration,
    ProgramCost: inputData.ProgramCost
  }

  async function editData(e) {
    e.preventDefault();
    await axios.put(`http://localhost:8070/program/update/${id}`, newData)
      .then((res) => {
        alert("Program updated")
       Program()
        setInputData({
          ...inputData,
          ProgramId: "",
          ProgramName: "",
          ProgramDuration: "",
          ProgramCost: ""
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center mt-1">Edit Program Details</h2>
      <div className="card shadow mt-3 ml-10 p-3 ">
        <div></div>
        <row>
          <form onSubmit={(e) => editData(e)}>
            <div className="mb-3 col-lg-6">
              <label htmlFor="TextInput" className="form-label">Program Id</label>
              <input type="text" className="form-control " value={inputData.ProgramId} onChange={setInputValue} name="ProgramId" disabled />
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
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </row>
      </div>
    </div>


  )
}

export default EditProgram