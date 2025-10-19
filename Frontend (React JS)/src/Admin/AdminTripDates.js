import { useCookies } from 'react-cookie';
import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import { Helmet } from 'react-helmet'
import AdminSidebar from './admin-components/AdminSidebar'
import * as jose from 'jose'
import { Link, useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminTripDates() {
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const [dates, setDates] = useState([])
    const [deleteLoading, setDeleteLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.userToken) {
            const secret = new TextEncoder().encode(process.env.REACT_APP_JWT_SECRET,)
            async function verifyJWT(){
                try {
                    const { payload, protectedHeader } = await jose.jwtVerify(cookies.userToken.token,secret) 
                    setUsername(payload.user.username)
                } catch (error) {
                    navigate('/admin/login')
                }
            }
            verifyJWT()
            setLoading(true)
            fetchTripDates()
        } else {
            navigate('/admin/login')
        }
    }, [])

    const fetchTripDates = () =>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/trips`)
            .then(response => response.json())
            .then(data => {
                if(data.dates){
                    setDates(data.dates)
                    setLoading(false)
                }else if(data.err){
                    console.log(data.err)
                    setLoading(false)
                }
        }).catch(error =>{
            toast.error("Network connection error")
            setLoading(false)
        })
    }

    const deleteTripDate = (date_id) => {
        setDeleteLoading(true)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/trips/delete-trip-date/${date_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.msg) {
                    toast.info(data.msg)
                    setDeleteLoading(false)
                    fetchTripDates()
                }else if(data.err){
                    toast.error(data.err)
                    setDeleteLoading(false)
                }
        }).catch(error =>{
            toast.error("Network connection error")
            setDeleteLoading(false)
        })
    }

    return (
        <div className="app-container">
            <Helmet>
                <title>Admin - Trip Dates</title>
            </Helmet>
            <ToastContainer 
                theme="dark"
            />
            <AdminSidebar username={username} active={"card"} />
            <div className="app-content">
                <div className="app-content-header">
                    <h1 className="app-content-headerText">Trip Dates</h1>

                    <Link className="mode-switch add-image-btn" to={`/admin/home/trip-dates/add-date`}>Add Date</Link>
                </div>
                <div className="products-area-wrapper tableView">
                    <div className="products-header">
                        <div className="product-cell image">
                            Route
                        </div>
                        <div className="product-cell category">
                            Start Date
                        </div>
                        <div className="product-cell category">
                            Edit
                        </div>
                        <div className="product-cell category">
                            Delete
                        </div>
                    </div>
                    {
                        loading ?
                            <div className="row d-flex justify-content-center" style={{height: '80vh', width: '100%'}}>
                                <div className="col-md-18 flex-container4">
                                    <Oval
                                        color="#106eea"
                                        height={50}
                                        width={50}
                                        wrapperStyle={{}}
                                        wrapperclassName=""
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="black"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2}
                                        backgroundColor="#fcf9f9"
                                    />

                                </div>
                            </div> 
                        :
                        
                            dates.map(date => 
                                <div key={date._id} className="products-row">
                                    <div className="product-cell image">
                                        <span>{date.route}</span>
                                    </div>
                                    <div className="product-cell category">
                                        {date.date}
                                    </div>
                                    <div className="product-cell card-cell status-cell">
                                        <Link to={`/admin/home/trip-dates/edit-date?trip_date_id=${date._id}`} className="app-content-headerButton card-receipt">
                                            Edit
                                        </Link>
                                    </div>
                                    <div className="product-cell card-cell status-cell">
                                        {
                                            deleteLoading?
                                                <label style={{backgroundColor: "#ff2828"}}  className="app-content-headerButton card-receipt">
                                                    <div className="center-btn">
                                                        <Oval
                                                            color="white"
                                                            height={12}
                                                            width={12}
                                                            wrapperStyle={{}}
                                                            wrapperclassName=""
                                                            visible={true}
                                                            ariaLabel='oval-loading'
                                                            secondaryColor="white"
                                                            strokeWidth={2}
                                                            strokeWidthSecondary={2}
                                                            
                                                        />
                                                    </div>
                                                </label>
                                            :
                                                <button onClick={(e)=>{deleteTripDate(date._id)}} style={{backgroundColor: "#ff2828"}} className="app-content-headerButton card-receipt">
                                                    Delete
                                                </button>
                                        }
                                    </div>
                                    
                                </div>
                            )
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminTripDates