import React, { useEffect, useState } from 'react'
import './AdminHome.css'
import { Helmet } from 'react-helmet'
import { useCookies } from 'react-cookie';
import * as jose from 'jose'
import { Link, useNavigate } from 'react-router-dom';

import AdminSidebar from './admin-components/AdminSidebar'
import { Oval } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminHome() {
    const [loading, setLoading] = useState(false)

    const [username, setUsername] = useState("")

    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);
    const navigate = useNavigate()

    const sectionImages = {
        "Home": "https://res.cloudinary.com/dwxzlruyd/image/upload/v1687987722/animation-designer-artist-creating-digital-illustrations-web-sites-advertising-animation-creative-profession-modern-computer-technologies-flat-vector-illustration_613284-1640_yxretc.jpg",
        "About": "https://res.cloudinary.com/dwxzlruyd/image/upload/v1687987777/laptop-computer-with-academic-icon-white-background_1308-70256_pjazq4.jpg",
        "Contact": "https://res.cloudinary.com/dwxzlruyd/image/upload/v1687987828/4affd89a9f1bef68eaddc24a749fa532_ubsdtg.jpg",
        "Gallery": "https://res.cloudinary.com/dwxzlruyd/image/upload/v1687987864/WhatsApp-Image-2022-05-20-at-5.38.21-AM_fyzvxd.jpg"
    }

    useEffect(() => {
        if (cookies.userToken) {
            const secret = new TextEncoder().encode(process.env.REACT_APP_JWT_SECRET,)
            async function verifyJWT(){
                try {
                    const { payload, protectedHeader } = await jose.jwtVerify(cookies.userToken.token,secret)
                    setUsername(payload.user.username) 
                } catch (error) {
                    console.log(error)
                    navigate('/admin/login')
                }
            }
            verifyJWT()
            
        } else {
            navigate('/admin/login')
        }
    }, [])

    return (
        <div className="app-container">
            <Helmet>
                <title>Admin - Home</title>
            </Helmet>
            <ToastContainer 
                theme="dark"
            />
            <AdminSidebar username={username} active={"home"} />
            <div className="app-content">
                <div className="app-content-header">
                    <h1 className="app-content-headerText">Home Section</h1>
                
                </div>
                {
                    loading ?
                        <div className="row d-flex justify-content-center" style={{height: '100vh', width: '100%'}}>
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
                        <div className="products-area-wrapper gridView"> 
                            <Link className="products-row" to={`/admin/home/trip-dates`}>
                                <button className="cell-more-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                </button>
                                <div className="product-cell image">
                                    <img src={sectionImages.Home} alt="product"></img>
                                    
                                    <span>Trip Dates</span>
                                </div>
                                <div className="product-cell status-cell">
                                    <span>Add the dates of the upcoming trips</span>
                                </div>
                                <div className="product-cell status-cell">
                                    <span className="cell-label">Status:</span>
                                    <span className="status active">Active</span>
                                </div>
                                
                            </Link>   
                            <Link className="products-row" to={`/admin/home/crew`}>
                                <button className="cell-more-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                </button>
                                <div className="product-cell image">
                                    <img src={sectionImages.About} alt="product"></img>
                                    
                                    <span>Crew Members</span>
                                </div>
                                <div className="product-cell status-cell">
                                    <span>Add or remove crew members in the company</span>
                                </div>
                                <div className="product-cell status-cell">
                                    <span className="cell-label">Status:</span>
                                    <span className="status active">Active</span>
                                </div>
                                
                            </Link>   
                        </div>  
                    
                    }
            </div>
        </div>
    )
}

export default AdminHome
