import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import _ from 'lodash'
function AllRegister() {
 
    //Navigate to the component
    const navigate = useNavigate();
    const Enroll = () => {
        navigate("/enroll/")
    }
   

    // Fetch all Registration details
    const [data, setData] = useState([])
    const [paginated,setPaginated]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('http://localhost:8070/enroll/');
                setData(response);
                setPaginated(_(response).slice(0).take(pageSize).value())
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

   

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
                    
                    <div className="add_btn">
                        <button className="btn btn-primary" onClick={Enroll} type="submit"><i class="bi bi-plus"></i>&nbsp; Enroll </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div class="card shadow mt-3">
                        <table className="table align-align-items-center " responsive='sm'>
                            <thead className='thead-dark'>
                                <tr className='table-dark'>
                                    <th>Student Name</th>
                                    <th>Program Name</th>
                                    <th>Register Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paginated.map(element =>
                                        <tr>
                                            <td>{element.s_ID.StudentName}</td>
                                            <td>{element.p_ID.ProgramName}</td>
                                            <td>{element.RegisterDate}</td>
                                            
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
            
            <div>
            </div>
        </div>
    )
}

export default AllRegister