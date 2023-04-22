import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import _ from 'lodash'
function AllStudent() {

    //Navigate to the component
    const navigate = useNavigate();
    const addStudent = () => {
        navigate("/addstudent/")
    }
    const editStudent=(student_id)=>{
        navigate(`/editstudent/${student_id}`)
    }
    const reload = () => {
        window.location.reload()
    }

    // Fetch all student details
    const [data, setData] = useState([])
    const [paginated,setPaginated]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://localhost:8070/student/');
                setData(response);
                setPaginated(_(response).slice(0).take(pageSize).value())
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    //fetch student details using student Id
    const [inputId, setInputId] = useState("");
    const searchRecords = async (e) => {
        e.preventDefault()
        try {
            const { data: response } = await axios.get(`http://localhost:8070/student/details/${inputId}`);
            setPaginated([response]);

            console.log(Object.values(response))
        } catch (error) {
            console.error(error.message);
        }
    }

    //Delete student
    function deleteData(e, id) {
        e.preventDefault();
        axios.delete(`http://localhost:8070/student/delete/${id}`)
            .then((res) => {
                alert(`Student Id : ${id} is a Deleted`)
                window.location.reload();

            })
            .catch((err) => {
                alert(err)
                console.log(err)
            });
    }

    //pagination
    const pageSize=4;
    const pageCount=data ?Math.ceil(data.length / pageSize) :0;
    const [currentPage,setCurrentPage]=useState(1)
    const pages=_.range(1,pageCount+1)
    const pagination=(pageNo)=>{
        setCurrentPage(pageNo);
        const startIndex=(pageNo-1)*pageSize
        const paginatedData=_(data).slice(startIndex).take(pageSize).value()
        setPaginated(paginatedData)
    }


    return (
        <div className="container">
            <div className="main_div">
                <div className="fun_btn mt-4 d-flex justify-content-between">
                    <div className="search col-lg-4">
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={inputId} onChange={(event) => setInputId(event.target.value)} />
                            <button className="btn btn-outline-success" type="submit" onClick={(e) => searchRecords(e)}>Search</button>
                        </form>
                    </div>
                    <div className="add_btn">
                        <button className="btn btn-primary" onClick={addStudent} type="submit"><i class="bi bi-plus"></i>&nbsp; Add Student </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div class="card shadow mt-3">
                        <table className="table align-align-items-center " responsive='sm'>
                            <thead className='thead-dark'>
                                <tr className='table-dark'>
                                    <th>Student Id</th>
                                    <th>Student Name</th>
                                    <th>Student Address</th>
                                    <th>Student Contact</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paginated.map(element =>
                                        <tr>
                                            <td>{element.StudentId}</td>
                                            <td>{element.StudentName}</td>
                                            <td>{element.StudentAddress}</td>
                                            <td>{element.StudentContact}</td>
                                            <td>
                                                <button className='btn' onClick={() => editStudent(element.StudentId)}><i class="bi bi-pencil-square"></i></button>
                                                <button className='btn' onClick={(e) => deleteData(e, element.StudentId)}><i class="bi bi-bucket"></i></button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                {
                                    pages.map((page)=>{
                                        return (
                                        <li 
                                            className={ 
                                                page===currentPage ?"page-item active":"page-item" 
                                        }
                                        
                                        >
                                            <button className='btn page-link' onClick={()=>pagination(page)}>{page}</button>
                                            
                                        </li>
                                     ) })
                                }
                                                        
                            </ul>
                           
                        </nav>
                        
                    </div>
                </div>
                
            </div>
            <button className='btn btn-secondary mt-2' onClick={reload}>Refresh</button>
            <div>
            </div>
        </div>
    )
}

export default AllStudent