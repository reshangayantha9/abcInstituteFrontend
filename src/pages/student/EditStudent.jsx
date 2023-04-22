import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
function EditStudent() {
    const navigate = useNavigate();
    const Student = () => {
        navigate("/")
    }
    const {id} = useParams();
    const [inputData,setInputData]=useState({
        StudentId:"",
        StudentName:"",
        StudentAddress:"",
        StudentContact:""
    });
    useEffect(() => {
        const fetchData = async() => {
            try {
                const { data: response } =await axios.get(`http://localhost:8070/student/details/${id}`);
               setInputData({
                ...inputData,
                StudentId:response.StudentId,
                StudentName:response.StudentName,
                StudentAddress:response.StudentAddress,
                StudentContact:response.StudentContact,
                });
               
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);
    const setInputValue = (e)=>{
        const {name,value}=e.target;
        setInputData({...inputData,[name]:value})
    }
    const newData = {
        StudentName:inputData.StudentName,
        StudentAddress:inputData.StudentAddress,
        StudentContact:inputData.StudentContact
    }
    
   async function editData(e) {
        e.preventDefault();
     await   axios.put(`http://localhost:8070/student/update/${id}`, newData)
          .then((res) => {
            alert("Student updated")
            Student()
            setInputData({
                ...inputData,
                StudentId:"",
                StudentName:"",
                StudentAddress:"",
                StudentContact:"",
                });
          })
          .catch((err) => {
                  alert(err);      
          });
      }
     
  return (
    <div className="container">
            <h2 className="text-center mt-1">Edit Student Details</h2>
            <div className="card shadow mt-3 ml-10 p-3 ">
                <div></div>
                <row>
                    <form onSubmit={(e) => editData(e)}>
                        <div className="mb-3 col-lg-6">
                            <label htmlFor="TextInput" className="form-label">Student Id</label>
                            <input type="text" className="form-control "value={inputData.StudentId} onChange={setInputValue} name="StudentId"disabled />
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
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </row>
            </div>
        </div>


  )
}

export default EditStudent