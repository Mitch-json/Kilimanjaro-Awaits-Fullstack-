import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import axios from 'axios'
import * as jose from 'jose'

import AdminSidebar from '../admin-components/AdminSidebar'
import { Oval } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminEditCrew() {
    const [username, setUsername] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false) 
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const [crewID, setCrewID] = useState("")

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [role, setRole] = useState("")
    const [description, setDescription] = useState("")
    const [imageURL, setImageURL] = useState("")

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const [image, setImage] = useState("")
    const [imageName, setImageName] = useState("")
    

    const [searchParams, setSearchParams] = useSearchParams()

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

            setCrewID(searchParams.get('crew_id'))
            setLoading(true)

            fetch(`${process.env.REACT_APP_BACKEND_URL}/users/crew`)
            .then(response => response.json())
            .then(data => {
                if(data.crew){
                    data.crew.map(crew => {
                        if (crew._id == searchParams.get('crew_id')) {
                            setFullName(crew.fullName)
                            setEmail(crew.email)
                            setRole(crew.role)
                            setImageURL(crew.image)
                            setDescription(crew.description)
                            setPhone(crew.phone)
                        } else {
                            
                        }
                    })
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

    const saveCrewMember = (url) =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({crewID: crewID,imageURL: url,fullName: fullName ,email: email ,phone: phone ,role: role ,description: description})
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/edit-crew`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.msg) {
                    toast.info(data.msg)
                    setButtonLoading(false)
                    
                    navigate(-1)
                }else if(data.err){
                    toast.error(data.err)
                    setButtonLoading(false)
                }
        }).catch(error =>{
            toast.error("Network connection error")
            setButtonLoading(false)
        })
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(image){
            setButtonLoading(true)
           const fd = new FormData()
           fd.append('file', image)
           fd.append("upload_preset", "ki9rv42j")
            axios.post('https://api.cloudinary.com/v1_1/dwxzlruyd/image/upload',fd).then(res => {
                if (res.status == 200) {
                    const Url = res.data.secure_url 
                    saveCrewMember(Url)
                } else {
                    toast.error("Error saving image, please try again")
                    setButtonLoading(false)
                }
            }).catch(error =>{
                toast.error("Network connection error")
                setButtonLoading(false)
            })
        }else{
            setButtonLoading(true)
            saveCrewMember(imageURL)
        }
    }

    const addCrewImage = ()=>{
        const photo = document.getElementById("home-section-photo");
        document.getElementById("home-section-photo").click()
        photo.addEventListener('change', (e) => {
            if (e.target.files[0]) {
                
                const reader = new FileReader();
                    reader.onload = ()=>{
                        const img = document.querySelector('.upload-icon')
                        img.src = reader.result;
                    }
        
                reader.readAsDataURL(e.target.files[0])
        
                setImage(e.target.files[0])
                setImageName(e.target.files[0].name)
            }
            
        });
    }

    const goBack = ()=>{
        navigate(-1)
    }

    return (
        <div className="app-container">
            <AdminSidebar username={username} active={"home"}/>
            <ToastContainer 
                theme="dark"
            />
            <div className="app-content">
                <div className="app-content-header">
                <h1 className="app-content-headerText">Edit Crew Member</h1>
                
                <button onClick={goBack} className="app-content-headerButton">Go Back</button>
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
                        <div className="products-area-wrapper gridView" style={{justifyContent: 'center'}}>
                                <div className="products-row no-pointer no-hover" style={{width: "calc(50% - 16px)"}}>
                                    
                                    <form onSubmit={handleSubmit}>
                                        <div className="center-t">
                                            <div className="title">
                                                <span>click below to change picture</span>
                                            </div>
                                            <div className="dropzone" onClick={addCrewImage}>
                                                <img src={imageURL} className="upload-icon" />
                                                <input type="file" id="home-section-photo" style={{display: "none"}} className="upload-input"/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label .fgs">Full Name</label>
                                            <input type="text" value={fullName} onChange={e=>setFullName(e.target.value)} className="form-control" placeholder="Full Name" required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label .fgs">Email Address</label>
                                            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="form-control" placeholder="Email Address" required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label .fgs">Role</label>
                                            <input type="text" value={role} onChange={e=>setRole(e.target.value)} className="form-control" placeholder="Role" required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label .fgs">Phone Number</label>
                                            <input type="text" value={phone} onChange={e=>setPhone(e.target.value)} className="form-control" placeholder="Phone Number" required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label .fgs">Description</label>
                                            <input type="text" value={description} onChange={e=>setDescription(e.target.value)} className="form-control" placeholder="Description" required />
                                        </div>
                                        {
                                            buttonLoading ?
                                                <label style={{width: '100%'}} className="upload-btn">
                                                    <div className="center-btn">
                                                        <Oval
                                                            color="white"
                                                            height={20}
                                                            width={20}
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
                                                <button type="submit" className="upload-btn" style={{width: '100%'}} name="uploadbutton">Save Changes</button>
                                        }
        
                                        
                                    </form>
        
                                </div> 
                        </div>
                    
                
                }
            </div>
        </div>
    
    )
}

export default AdminEditCrew