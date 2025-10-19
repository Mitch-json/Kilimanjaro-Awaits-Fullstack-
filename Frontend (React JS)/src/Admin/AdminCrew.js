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

function AdminCrew() {
    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)

    const [username, setUsername] = useState("")
    const [crewMembers, setCrewMembers] = useState([])

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
            setLoading(true)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/users/crew`)
                .then(response => response.json())
                .then(data => {
                    if(data.crew){
                        setCrewMembers(data.crew)
                        setLoading(false)
                    }else if(data.alert){
                        setLoading(false)
                        
                    }else if(data.err){
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

    const fetchCrew = () =>{
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/crew`)
                .then(response => response.json())
                .then(data => {
                    if(data.crew){
                        setCrewMembers(data.crew)
                        setLoading(false)
                    }else if(data.alert){
                        setLoading(false)
                        
                    }else if(data.err){
                        setLoading(false)

                    }
            }).catch(error =>{
                toast.error("Network connection error")
                setLoading(false)
            })
    }

    const deleteCrew = (crew_id) => {
        setDeleteLoading(true)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/delete-crew/${crew_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.msg) {
                    toast.info(data.msg)
                    setDeleteLoading(false)
                    fetchCrew()
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
                <title>Admin - Crew</title>
            </Helmet>
            <ToastContainer 
                theme="dark"
            />
            <AdminSidebar username={username} active={"home"} />
            <div className="app-content">
                <div className="app-content-header">
                    <h1 className="app-content-headerText">Crew Section</h1>

                    <Link className="mode-switch add-image-btn" to={`/admin/home/crew/add-crew`}>Add Crew Member</Link>
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
                            {
                                crewMembers.map(crew => 
                                    <div key={crew._id} className="products-row no-hover" to={`/admin/home/crew/edit-crew?crew_id=${crew._id}`}>
                                        <button className="cell-more-button">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                                        </button>
                                        <div className="product-cell image">
                                            <img src={crew.image} alt="product"></img>
                                            
                                            <span>{crew.fullName}</span>
                                        </div>
                                        <div className="product-cell status-cell">
                                            <span className="cell-label">Role:</span>
                                            <span className="status active">{crew.role}</span>
                                        </div>
                                        <div className="product-cell status-cell">
                                            <span className="cell-label">Edit:</span>
                                            <span className="status ">
                                                <Link to={`/admin/home/crew/edit-crew?crew_id=${crew._id}`} className="app-content-headerButton card-receipt">
                                                    Edit
                                                </Link>
                                            </span>
                                        </div>
                                        <div className="product-cell status-cell">
                                            <span className="cell-label">Delete:</span>
                                            <span className="status">
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
                                                        <button onClick={(e)=>{deleteCrew(crew._id)}} style={{backgroundColor: "#ff2828"}} className="app-content-headerButton card-receipt">
                                                            Delete
                                                        </button>
                                                }
                                            </span>
                                        </div>
                                        
                                        
                                        
                                    </div>   
                                )
                            }
                              
                        </div>  
                    }
            </div>
        </div>
    )
}

export default AdminCrew
