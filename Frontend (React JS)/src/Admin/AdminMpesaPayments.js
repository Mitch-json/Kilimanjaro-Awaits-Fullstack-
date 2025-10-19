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

function AdminMpesaPayments() {
    const [username, setUsername] = useState("")
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const [payments, setPayments] = useState([])

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
            fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/mpesa-payments`)
                .then(response => response.json())
                .then(data => {
                    if(data.payments){
                        setPayments(data.payments)
                        setLoading(false)
                    }else if(data.err){
                        console.log(data.err)
                        setLoading(false)
                    }
            }).catch(error =>{
                toast.error("Network connection error")
                setLoading(false)
            })
        } else {
            navigate('/admin/login')
        }
    }, [])

    const getDate = (createdAt)=>{
        var date = new Date(createdAt)
        return date.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})
    }

    return (
        <div className="app-container">
            <Helmet>
                <title>Admin - Mpesa Payments</title>
            </Helmet>
            <ToastContainer 
                theme="dark"
            />
            <AdminSidebar username={username} active={"mpesa"} />
            <div className="app-content">
                <div className="app-content-header">
                    <h1 className="app-content-headerText">Mpesa Payments</h1>
                
                </div>
                <div className="products-area-wrapper tableView">
                    <div className="products-header">
                        <div className="product-cell image">
                            Code
                        </div>
                        <div className="product-cell category">
                            Time
                        </div>
                        <div className="product-cell status-cell">
                            Amount
                        </div>
                        <div className="product-cell sales">
                            Phone
                        </div>
                        <div className="product-cell stock">
                            Date
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
                        
                            payments.map(payment => 
                                <div key={payment._id} className="products-row">
                                    <div className="product-cell mpesa-cell image">
                                        <span>{payment.TransID}</span>
                                    </div>
                                    <div className="product-cell mpesa-cell category">
                                        {payment.TransTime}
                                    </div>
                                    <div className="product-cell mpesa-cell status-cell">
                                        <span className="status active">{payment.TransAmount}</span>
                                    </div>
                                    <div className="product-cell mpesa-cell sales">
                                        {payment.MSISDN}
                                    </div>
                                    <div className="product-cell mpesa-cell stock">
                                        {getDate(payment.createdAt)}
                                    </div>
                                </div>
                            )
                        
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminMpesaPayments
