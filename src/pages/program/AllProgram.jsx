import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import _ from 'lodash'
function AllProgram() {
  
    //Navigate to the component
    const navigate = useNavigate();
    const addProgram = () => {
        navigate("/addprogram/")
    }
    const editProgram=(student_id)=>{
        navigate(`/editprogram/${student_id}`)
    }
    const reload = () => {
        window.location.reload()
    }

    // Fetch all Program details
    const [data, setData] = useState([])
    const [paginated,setPaginated]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://localhost:8070/program/');
                setData(response);
                setPaginated(_(response).slice(0).take(pageSize).value())
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    //fetch Program details using Program Id
    const [inputId, setInputId] = useState("");
    const searchRecords = async (e) => {
        e.preventDefault()
        try {
            const { data: response } = await axios.get(`http://localhost:8070/program/details/${inputId}`);
            setPaginated([response]);

            console.log(Object.values(response))
        } catch (error) {
            console.error(error.message);
        }
    }

    //Delete Progrma
    function deleteData(e, id) {
        e.preventDefault();
        axios.delete(`http://localhost:8070/program/delete/${id}`)
            .then((res) => {
                alert(`program Id : ${id} is a Deleted`)
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
                        <button className="btn btn-primary" onClick={addProgram} type="submit"><i class="bi bi-plus"></i>&nbsp; Add Program </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div class="card shadow mt-3">
                        <table className="table align-align-items-center " responsive='sm'>
                            <thead className='thead-dark'>
                                <tr className='table-dark'>
                                    <th>Program Id</th>
                                    <th>Program Name</th>
                                    <th>Program Duration</th>
                                    <th>Program Cost</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paginated.map(element =>
                                        <tr>
                                            <td>{element.ProgramId}</td>
                                            <td>{element.ProgramName}</td>
                                            <td>{element.ProgramDuration}</td>
                                            <td>{element.ProgramCost}</td>
                                            <td>
                                                <button className='btn' onClick={() => editProgram(element.ProgramId)}><i class="bi bi-pencil-square"></i></button>
                                                <button className='btn' onClick={(e) => deleteData(e, element.ProgramId)}><i class="bi bi-bucket"></i></button>
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

export default AllProgram