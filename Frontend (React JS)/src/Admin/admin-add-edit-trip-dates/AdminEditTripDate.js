import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import * as jose from 'jose'
import { Helmet } from 'react-helmet'
import AdminSidebar from '../admin-components/AdminSidebar'
import { Oval } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminEditTripDate() {
    const [username, setUsername] = useState("")
    const [buttonLoading, setButtonLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [cookies, setCookie, removeCookie] = useCookies(['userToken']);

    const [tripDate, setTripDate] = useState("")
    const [route, setRoute] = useState("")

    const [tripDateID, setTripDateID] = useState("")

    const navigate = useNavigate()

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
            setTripDateID(searchParams.get('trip_date_id'))
            setLoading(true)

            fetch(`${process.env.REACT_APP_BACKEND_URL}/trips`)
            .then(response => response.json())
            .then(data => {
                if(data.dates){
                    data.dates.map(date => {
                        if (date._id == searchParams.get('trip_date_id')) {
                            setTripDate(date.date)
                            setRoute(date.route)
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

    const handleSubmit = (e)=>{
        e.preventDefault();
        setButtonLoading(true)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({dateID: tripDateID, route: route, date: tripDate})
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/trips/edit-trip-date`, requestOptions)
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

    const goBack = ()=>{
        navigate(-1)
    }
    return (
        <div className="app-container">
            <Helmet>
                <title>Admin - Edit Trip Date</title>
            </Helmet>
            <AdminSidebar username={username} active={"home"}/>
            <ToastContainer 
                theme="dark"
            />
            <div className="app-content">
                <div className="app-content-header">
                <h1 className="app-content-headerText">Edit Trip Date</h1>
                
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
                            <div className="products-row no-pointer no-hover" style={{width: "calc(70% - 16px)"}}>
                                <div className="center" style={{height: 'auto', paddingTop: '40px', paddingBottom: '40px'}}>
                                    <div className="title" style={{marginBottom: '15px'}}>
                                        <span>Edit Trip Date</span>
                                    </div>
                                    <form onSubmit={handleSubmit} className="signin-form">
                                        <div className="form-group mb-3">
                                            <label className="label .fgs">Trip Date</label>
                                            <input type="text" value={tripDate} onChange={e=>setTripDate(e.target.value)} className="form-control" placeholder="Trip Date" required />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="label .fgs">Kilimanjaro Route</label>
                                            <select name="menu" id="menu" value={route} onChange={(e)=>{setRoute(e.target.value)}}  className="form-control" >
                                                <option selected="selected">
                                                    Select Route 
                                                </option>
                                                <option value="lemosho">  
                                                    Lemosho Route
                                                </option>
                                                <option value="machame">  
                                                    Machame Route
                                                </option>
                                                <option value="marangu">  
                                                    Marangu Route
                                                </option>
                                                <option value="northern-circuit">  
                                                    Northern Circuit Route
                                                </option>
                                                <option value="rongai">  
                                                    Rongai Route
                                                </option>
                                                <option value="umbwe">  
                                                    Umbwe Route
                                                </option>
                                            </select>
                                        </div>
                                        
                                        {
                                            buttonLoading ?
                                                <label  className="upload-btn" style={{width: '100%'}}>
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
                                                <button type="submit" style={{width: '100%'}}  className="upload-btn" name="uploadbutton">Edit Trip Date</button>
                                        }
                                    </form>

                                    

                                </div>
                            </div> 
                        </div>
                    }
            </div>
        </div>
    
    )
}

export default AdminEditTripDate
