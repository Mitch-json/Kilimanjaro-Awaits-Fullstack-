import React, { useState } from 'react'
import './AdminLogin.css'

import { useCookies } from 'react-cookie';
import { Link,useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { Oval } from 'react-loader-spinner'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminLogin() {
    const [buttonLoading, setButtonLoading] = useState(false)
    const [usernameOrEmail, setUsernameOrEmail] = useState("")
	const [password, setPassword] = useState("")
    
    const [cookies, setCookie] = useCookies(['userToken', 'passToken']);
    const navigate = useNavigate();


    const handleSubmit = (e)=>{
		e.preventDefault()
        setButtonLoading(true)

		const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({usernameOrEmail: usernameOrEmail, password: password})
        };
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/admin-login`, requestOptions)
            .then(response => response.json())
                .then(async (data) => {
                    if(data.token){
                        setCookie("userToken", {token: data.token}, {maxAge: 3600})
                        navigate("/admin/home");
                    }else if(data.err){
                        toast.error(data.err)
                        setButtonLoading(false)
                    } 
            }).catch(error =>{
                toast.error("Network connection error")
                setButtonLoading(false)
            })

		
	}
    return (
        <div className="backg">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <ToastContainer 
                theme="dark"
            />
            <section className="ftco-section">
                <div className="container-login">
                    <div className="row-2 justify-content-center">
                        <div className="col-md-12 col-lg-10">
                            <div className="wrap d-md-flex">
                                <div className="img" style={{"backgroundImage": `url(${require("./assets2/img/bg-4.jpg")})`}}>
                            </div>
                                <div className="login-wrap p-4 p-md-5">
                            <div className="d-flex">
                                <div className="w-100">
                                    <h3 className="mb-4 fgs">Sign In</h3>
                                </div>
                            </div>
                        <form onSubmit={handleSubmit} className="signin-form">
                            <div className="form-group mb-3">
                                <label className="label .fgs">Username or Email</label>
                                <input type="text" value={usernameOrEmail} onChange={e=>setUsernameOrEmail(e.target.value)} className="form-control" placeholder="Username or Email" required />
                            </div>
                            <div className="form-group mb-3">
                                <label className="label fgs">Password</label>
                                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control" placeholder="Password" required />
                            </div>
                            <div className="form-group butto">
                                {
                                    buttonLoading ?
                                        <label  className="loader">
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
                                        <button type="submit" className=" btn-2 rounded submit px-3 sbmt fgs">Sign In</button>

                                }
                            </div>
                            <div className="form-group d-md-flex">
                                            <div className="w-50 text-md-right">
                                                <Link className='fgs' to="/forgot-password">Forgot Password</Link>
                                            </div>
                            </div>
                        </form>
                        <p className="text-left fgs nt-mber">Not a member? <Link to="/register">Sign Up</Link></p>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminLogin
