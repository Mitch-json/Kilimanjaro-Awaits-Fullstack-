import React, { useState, useEffect } from 'react'
import './BookNow.css'
import StripeCheckout from "react-stripe-checkout";
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

function BookNow() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [selected, setSelected] = useState("")
    const [kilimanjaroRoute, setKilimanjaroRoute] = useState("")
    const [price, setPrice] = useState("100")
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [tripDate, setTripDate] = useState("initialState")

    const [confirmBookingLoading, setConfirmBookingLoading] = useState(false)
    
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        setKilimanjaroRoute(searchParams.get('route'))
        setTripDate(searchParams.get('selected_date'))

    },[phone])


    const handleConfirmBooking = (e) => {
        e.preventDefault()

        if(isValidPhoneNumber(phone)){
            setConfirmBookingLoading(true)
            fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/add-client`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ route: kilimanjaroRoute, phone: phone, fullName: fullName, email: email, tripDate: tripDate }),
            })
            .then(res => res.json())
            .then((data)=> {
                if (data.msg) {
                    setSuccessMessage(data.msg)
                    setConfirmBookingLoading(false)
                    console.log(data)
                    
                } else {
                    setErrorMessage("Something went wrong, Please try again later!")
                    setConfirmBookingLoading(false)
                    
                }
            }).catch(error => {
                setConfirmBookingLoading(false)
                toast.error("Network connection error. PLEASE TRY AGAIN!")
            })
        
        }else{
            document.querySelector(".invalid-phone-2").classList.add("invalid-phone-error")
            document.querySelector(".PhoneInputInput").classList.add("PhoneInputInput-error")
            document.querySelector(".PhoneInputInput").focus()
        }


    }

    return (
        <div>
            <ToastContainer 
                theme="dark"
            />
            <Helmet>
                <title>Book Trip</title>
            </Helmet>
            <article className="card">
                <div className="container">
                    <div className="card-body">
                        <div className="payment-info flex justify-space-between">
                            <div className="title" style={{marginBottom: "20px"}}>
                                <div className="num">1</div>
                                <h4>Booking info</h4>
                            </div>
                            {
                                errorMessage?
                                    <div role="alert" className="css-1tmhw5y leafygreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                                        <svg className="leafygreen-ui-1tk0odm" height="16" width="16" role="img" aria-label="Warning Icon" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8639 2.51357C8.49039 1.82881 7.50961 1.82881 7.1361 2.51357L1.12218 13.5388C0.763263 14.1968 1.23814 15 1.98608 15H14.0139C14.7619 15 15.2367 14.1968 14.8778 13.5388L8.8639 2.51357ZM7 6C7 5.44772 7.44772 5 8 5C8.55228 5 9 5.44772 9 6V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V6ZM9 13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12C8.55228 12 9 12.4477 9 13Z" fill="currentColor"></path>
                                        </svg>
                                        <div className="leafygreen-ui-5klvzg">
                                            <span className="css-41c0n2 e165spmc0">
                                                {errorMessage}.
                                            </span>
                                        </div>
                                    </div>
                                :
                                    <></>
                            }
                            {
                                successMessage?
                                    <div role="alert" className="css-1tmhw5y successgreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                                            <i className="fa fa-check-circle" aria-hidden="true"></i>
                                        <div className="leafygreen-ui-5klvzg">
                                            <span className="css-41c0n2 e165spmc0">
                                                {successMessage} 
                                            </span>
                                        </div>
                                    </div>
                                :
                                    <form onSubmit={handleConfirmBooking} className="column billing">
                                        
                                        <div className="field full">
                                            <label htmlFor="address">Kilimanjaro Route</label>
                                            <input id="route" type="text" className="fixed-input" value={`${kilimanjaroRoute} route`} disabled placeholder="Kilimanjaro Route" required />
                                        </div>
                                        <div className="field full">
                                            <label htmlFor="address">Selected Trip Date</label>
                                            <input id="route" type="text" className="fixed-input" value={tripDate} disabled placeholder="Selected Trip Date" required />
                                        </div>
                                        <div className="field full">
                                            <label htmlFor="name">Full Name</label>
                                            <input id="name" type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Full Name" required/>
                                        </div>
                                        <div className="field full">
                                            <label htmlFor="zip">Phone Number</label>
                                            <div className="font-weight-normal fs-16 invalid-phone-2" style={{marginTop: '10px', color: 'red', fontSize: '12px', display: 'none'}}>
                                                Invalid Phone Number
                                            </div>
                                            <PhoneInput
                                                international={false}
                                                
                                                placeholder="Enter phone number"
                                                value={phone}
                                                onChange={setPhone}
                                            />
                                            
                                        </div>
                                        <div className="field full">
                                            <label htmlFor="zip">Email</label>
                                            <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email Address" required/>
                                        </div>

                                        
                                        
                                        <div className="field full">
                                            {
                                                confirmBookingLoading?
                                                    <label  style={{width: '100%',padding: '8.7px 25px'}} className="button button-success">
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
                                                    <button type="submit" style={{width: '100%'}} className="button button-success">Confirm Booking</button>
                                            }
                                        </div>
                                        
                                        
                                    </form>
                                
                            }
                        </div>
                    </div>
                    
                </div>
            </article>
        </div>
    )
}

export default BookNow
