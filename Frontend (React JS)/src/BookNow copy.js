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

    const [mpesaProgress, setMpesaProgress] = useState(0)
    const [cardProgress, setCardProgress] = useState(0)

    const [checkoutRequestID, setCheckoutRequestID] = useState("")
    const [receiptURL, setReceiptURL] = useState("")

    const [cardErrorMessage, setCardErrorMessage] = useState("")
    const [cardSuccessMessage, setCardSuccessMessage] = useState("")

    const [mpesaErrorMessage, setMpesaErrorMessage] = useState("")
    const [mpesaSuccessMessage, setMpesaSuccessMessage] = useState("")
    
    const [mpesaConfirmLoading, setMpesaConfirmLoading] = useState(false)
    const [stripeCheckoutLoading, setStripeCheckoutLoading] = useState(false)
    const [mpesaNextLoading, setMpesaNextLoading] = useState(false)
    

    useEffect(() => {
        if (selected === 'credit-card') {
            if (document.querySelector(".invalid-phone").classList.length === 4) {
                document.querySelector(".invalid-phone").classList.remove("invalid-phone-error")
                document.querySelector(".PhoneInputInput").classList.remove("PhoneInputInput-error")
            }
        }
        if (selected === 'mpesa') {
            if (document.querySelector(".invalid-phone-2").classList.length === 4) {
                document.querySelector(".invalid-phone-2").classList.remove("invalid-phone-error")
                document.querySelector(".PhoneInputInput").classList.remove("PhoneInputInput-error")
            }
        }
        setKilimanjaroRoute(searchParams.get('route'))
        setTripDate(searchParams.get('selected_date'))

    },[phone])

    const selectPayment = (method)=>{
        setSelected(method)
    }
    const handleToken = (token) => {
        setStripeCheckoutLoading(true)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/payment/stripe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token, route: kilimanjaroRoute, amount: price, phone: phone, fullName: fullName, email: email }),
        })
        .then(res => res.json())
        .then(data=> {
            if (data.success) {
                setReceiptURL(data.receipt)
                setCardSuccessMessage("Payment confirmed, we will contact you shortly. Thank you for choosing Kilimanj-hiking, we are looking foward to our adventure together")
                setStripeCheckoutLoading(false)
                fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/add-client`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ route: kilimanjaroRoute, phone: phone, fullName: fullName, email: token.email, tripDate: tripDate }),
                })
                .then(res => res.json())
                .then((data)=> {
                    console.log(data)
                }).catch(error => console.log('error'))
            } else {
                setStripeCheckoutLoading(false)
                setCardErrorMessage("Unable to complete payment, please ensure your card has sufficient funds")
            }
        }).catch(error => {
            setStripeCheckoutLoading(false)
            setCardErrorMessage("Connection Error, Please try again!")
        })
    }

    const handleMpesa = () => {
        setMpesaNextLoading(true)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/STK-PUSH`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ route: kilimanjaroRoute, amount: price, phone: phone, fullName: fullName, email: email }),
        })
        .then(res => res.json())
        .then((data)=> {
            if (data.errorMessage) {
                setMpesaNextLoading(false)
                toast.error(data.errorMessage)
            } else {
                setCheckoutRequestID(data.CheckoutRequestID)
                setMpesaProgress(mpesaProgress+100)
                setMpesaNextLoading(false)
            }
        }).catch(error => {
            setMpesaNextLoading(false)
            toast.error("Network connection error. PLEASE TRY AGAIN!")
        })
    }

    const handleSubmitMpesa1 = (e)=>{
        e.preventDefault()
        if(isValidPhoneNumber(phone)){
            handleMpesa()
        }else{
            document.querySelector(".invalid-phone-2").classList.add("invalid-phone-error")
            document.querySelector(".PhoneInputInput").classList.add("PhoneInputInput-error")
            document.querySelector(".PhoneInputInput").focus()
        }
        
    }

    const handleSubmitCard = (e) =>{
        e.preventDefault()
        if(isValidPhoneNumber(phone)){
            setCardProgress(cardProgress+100)
        }else{
            document.querySelector(".invalid-phone").classList.add("invalid-phone-error")
            document.querySelector(".PhoneInputInput").classList.add("PhoneInputInput-error")
            document.querySelector(".PhoneInputInput").focus()
        }
    }

    const manualQuery = () =>{
        const requestOptions2 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({phone: phone, price: price})
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/query-manual-payment`, requestOptions2)
            .then(response => response.json())
            .then(data => {
                if (data.confirmed) {
                    setMpesaConfirmLoading(false)
                    setMpesaSuccessMessage("Payment confirmed, we will contact you shortly. Thank you for choosing Kilimanj-hiking, we are looking foward to our adventure together")
                    fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/add-client`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ route: kilimanjaroRoute, phone: phone, fullName: fullName, email: email, tripDate: tripDate }),
                    })
                    .then(res => res.json())
                    .then((data)=> {
                        console.log(data)
                    }).catch(error => console.log("error"))
                } else if(data.none) {
                    setMpesaConfirmLoading(false)
                    setMpesaErrorMessage("No Payment has been made by this phone number")
                }
            })
            .catch(error => {
                setMpesaConfirmLoading(false)
                toast.error("Network connection error. PLEASE TRY AGAIN!")
            })
    }

    const handleConfirmMpesa = () => {
        setMpesaErrorMessage("")
        if (checkoutRequestID) {
            setMpesaConfirmLoading(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({CheckoutRequestID: checkoutRequestID})
            }

            fetch(`${process.env.REACT_APP_BACKEND_URL}/query-payment`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    if (data.QueryResponse) {
						if (data.QueryResponse.ResultCode === '0') {
                            setMpesaSuccessMessage("Payment confirmed, we will contact you shortly. Thank you for choosing Kilimanj-hiking, we are looking foward to our adventure together")
                            fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/add-client`, {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ route: kilimanjaroRoute, phone: phone, fullName: fullName, email: email, tripDate: tripDate }),
                            })
                            .then(res => res.json())
                            .then((data)=> {
                                setMpesaConfirmLoading(false)
                                console.log(data)
                            }).catch(error => {
                                setMpesaConfirmLoading(false)
                                toast.error("Network connection error. PLEASE TRY AGAIN!")
                            })
                        }else {
                            manualQuery()

                        }
                    }else if(data.errorMessage){
                        manualQuery()
                    }else if(data.errorMessageOAUTH){
                        manualQuery()
                        
                    }
                })
                .catch(error => {
                    setMpesaConfirmLoading(false)
                    toast.error("Network connection error. PLEASE TRY AGAIN!")
                })
        } else {
            manualQuery()
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
                        <div className="payment-type">
                            <h4>Choose payment method below</h4>
                            <div className="types flex justify-space-between">
                                <div onClick={(e)=>{
                                    if (selected === 'mpesa') {
                                        window.location.reload()
                                    } else {
                                        selectPayment("credit-card")
                                    }
                                }} className={`type ${selected==="credit-card"? 'selected': ''}`}>
                                    <div className="logo">
                                        <i className="far fa-credit-card"></i>
                                    </div>
                                    <div className="text">
                                        <p>Pay with Credit Card</p>
                                    </div>
                                </div>
                                
                                <div onClick={(e)=>{
                                    if (selected === 'credit-card') {
                                        window.location.reload()
                                    }else{
                                        selectPayment("mpesa")
                                    }
                                }} className={`type ${selected==="mpesa"? 'selected': ''}`}>
                                    <div className="logo">
                                    <img style={{maxWidth: '75px'}} alt="M-PESA LOGO-01" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" />
                                    </div>
                                    <div className="text">
                                        <p>Pay with M-Pesa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            selected === 'credit-card'?
                                <div className="body-prog">
                                    <div className="container-prog">
                                        
                                        <div className="progress-container">
                                            <div className="progress" id="progress" style={{width: `${cardProgress}%`}}></div>
                                            <div className="circle active">1</div>
                                            <div className="circle active">2</div>
                                        </div>
                                    </div>
                                </div>
                            :
                                selected === 'mpesa'?
                                    <div className="body-prog">
                                        <div className="container-prog">
                                            
                                            <div className="progress-container">
                                                <div className="progress" id="progress" style={{width: `${mpesaProgress}%`}}></div>
                                                <div className="circle active">1</div>
                                                <div className="circle active">2</div>
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <></>
                        }
                        <div className="payment-info flex justify-space-between">
                            {
                                selected === 'credit-card'?
                                    cardProgress === 0?
                                        <form onSubmit={handleSubmitCard} className="column billing">
                                            <div className="title" style={{marginBottom: "20px"}}>
                                                <div className="num">1</div>
                                                <h4>Booking Info</h4>
                                            </div>
                                            <div className="field full">
                                                <label htmlFor="address">Kilimanjaro Route</label>
                                                <input id="route" type="text" className="fixed-input" value={`${kilimanjaroRoute} route`} disabled placeholder="Kilimanjaro Route" required />
                                            </div>
                                            <div className="field full">
                                                <label htmlFor="address">Selected Trip Date</label>
                                                <input id="route" type="text" className="fixed-input" value={tripDate} disabled placeholder="Selected Trip Date" required />
                                            </div>
                                            <div className="field full">
                                                <label htmlFor="address">Price</label>
                                                <input id="route" type="text" className="fixed-input" disabled value={price} placeholder="Price" required/>
                                            </div>
                                            <div className="field full">
                                                <label htmlFor="name">Full Name</label>
                                                <input id="name" type="text" value={fullName} onChange={(e)=>setFullName(e.target.value)} placeholder="Full Name" required />
                                            </div>
                                            <div className="field full">
                                                <label htmlFor="zip">Phone Number</label>
                                                <div className="font-weight-normal fs-16 invalid-phone" style={{marginTop: '10px', color: 'red', fontSize: '12px', display: 'none'}}>
                                                    Invalid Phone Number
                                                </div>
                                                <PhoneInput
                                                    
                                                    placeholder="Enter phone number"
                                                    value={phone}
                                                    onChange={setPhone}
                                                     />
                                            </div>
                                            <div className="card-actions flex justify-space-between">
                                                <div className="flex-start">
                                                    <button className="button button-secondary" disabled>Prev</button>
                                                </div>
                                                <div className="flex-end">
                                                    <button type="submit" className="button button-primary">Next</button>
                                                </div>
                                            </div>
                                            
                                        </form>
                                    :
                                        cardProgress === 100?
                                            <div className="column billing">
                                                <div className="title">
                                                    <div className="num">2</div>
                                                    <h4>Pay with Credit/Debit Card</h4>
                                                </div>
                                                {
                                                    cardErrorMessage?
                                                        <div role="alert" className="css-1tmhw5y leafygreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                                                            <svg className="leafygreen-ui-1tk0odm" height="16" width="16" role="img" aria-label="Warning Icon" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8639 2.51357C8.49039 1.82881 7.50961 1.82881 7.1361 2.51357L1.12218 13.5388C0.763263 14.1968 1.23814 15 1.98608 15H14.0139C14.7619 15 15.2367 14.1968 14.8778 13.5388L8.8639 2.51357ZM7 6C7 5.44772 7.44772 5 8 5C8.55228 5 9 5.44772 9 6V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V6ZM9 13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12C8.55228 12 9 12.4477 9 13Z" fill="currentColor"></path>
                                                            </svg>
                                                            <div className="leafygreen-ui-5klvzg">
                                                                <span className="css-41c0n2 e165spmc0">
                                                                    {cardErrorMessage}. If you continue to have issues logging into your account, contact our 
                                                                    <Link to="/support" className="css-hvbs6i"> Support team.</Link>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    :
                                                        cardSuccessMessage?
                                                            <div role="alert" className="css-1tmhw5y successgreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                                                                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                                                                <div className="leafygreen-ui-5klvzg">
                                                                    <span className="css-41c0n2 e165spmc0">
                                                                        {cardSuccessMessage} 
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        :
                                                            <div className="font-weight-normal fs-16 text-unmuted" style={{marginTop: '20px',marginBottom: '20px', color: 'black'}}>
                                                                click the button below to pay using credit/debit card
                                                            </div>
                                                }
                                                

                                                
                                                <div className="field full">
                                                    {
                                                        receiptURL?
                                                            <a href={receiptURL} style={{width: '100%', display: 'block', textAlign: 'center'}} className="button button-success" target="_blank">View Receipt</a>
                                                        :
                                                            stripeCheckoutLoading?
                                                                <label  style={{width: '100%', padding: '8.7px 25px'}} className="button button-primary">
                                                                    <div style={{margin: 'auto', width: "30px"}}>
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
                                                                <StripeCheckout
                                                                    stripeKey={process.env.REACT_APP_STRIPE_KEY || ""}
                                                                    token={handleToken}
                                                                    name=""
                                                                    panelLabel={`Pay`}
                                                                    currency="USD"
                                                                    amount={price*100}
                                                                    opened={()=>{setStripeCheckoutLoading(false)}}
                                                                >
                                                                    <button style={{width: '100%'}} onClick={(e)=> setStripeCheckoutLoading(true)} className="button button-primary">Pay with card</button>
                                                                </StripeCheckout>
                                                    }
                                                </div>
                                                    
                                                <div className="card-actions flex justify-space-between">
                                                    <div className="flex-start">
                                                        <button onClick={(e)=>setCardProgress(cardProgress-100)} className="button button-primary">Prev</button>
                                                    </div>
                                                    <div className="flex-end">
                                                        <button className="button button-secondary" disabled>Next</button>
                                                    </div>
                                                </div>
                                                    
                                            </div>
                                            
                                        :
                                            <></>
                                : 
                                    selected === 'mpesa'?
                                        mpesaProgress === 0?
                                            <form onSubmit={handleSubmitMpesa1} className="column billing">
                                                <div className="title" style={{marginBottom: "20px"}}>
                                                    <div className="num">1</div>
                                                    <h4>Booking info</h4>
                                                </div>
                                                <div className="field full">
                                                    <label htmlFor="address">Kilimanjaro Route</label>
                                                    <input id="route" type="text" className="fixed-input" value={`${kilimanjaroRoute} route`} disabled placeholder="Kilimanjaro Route" required />
                                                </div>
                                                <div className="field full">
                                                    <label htmlFor="address">Selected Trip Date</label>
                                                    <input id="route" type="text" className="fixed-input" value={tripDate} disabled placeholder="Selected Trip Date" required />
                                                </div>
                                                <div className="field full">
                                                    <label htmlFor="address">Price</label>
                                                    <input id="route" type="text" className="fixed-input" disabled value={price} placeholder="Price" required/>
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
                                                        defaultCountry={"KE"}
                                                        countries={["KE"]}
                                                        placeholder="Enter phone number"
                                                        value={phone}
                                                        onChange={setPhone}
                                                    />
                                                    
                                                </div>
                                                <div className="field full">
                                                    <label htmlFor="zip">Email</label>
                                                    <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email Address" required/>
                                                </div>

                                                <div className="card-actions flex justify-space-between">
                                                    <div className="flex-start">
                                                        <button className="button button-secondary" disabled>Prev</button>
                                                    </div>
                                                    <div className="flex-end">
                                                    {
                                                            mpesaNextLoading?
                                                                <button style={{padding: '8.7px 25px'}} className="button button-primary no-drop" disabled>
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

                                                                </button>
                                                            :
                                                                <button type="submit" className="button button-primary">Next</button>
                                                        }
                                                    </div>
                                                </div>
                                                
                                            </form>
                                        :
                                            mpesaProgress === 100?
                                                <div className="column billing">
                                                    <div className="title">
                                                        <div className="num">2</div>
                                                        <h4>Pay with Mpesa</h4>
                                                    </div>
                                                    <div className="font-weight-normal fs-16 text-unmuted" style={{marginTop: '20px', marginBottom: '20px', color: 'black'}}>
                                                        If Mpesa pop up does not appear on your phone, pay using the till number 
                                                    </div>
                                                    {
                                                        mpesaErrorMessage?
                                                            <div role="alert" className="css-1tmhw5y leafygreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                                                                <svg className="leafygreen-ui-1tk0odm" height="16" width="16" role="img" aria-label="Warning Icon" viewBox="0 0 16 16">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8639 2.51357C8.49039 1.82881 7.50961 1.82881 7.1361 2.51357L1.12218 13.5388C0.763263 14.1968 1.23814 15 1.98608 15H14.0139C14.7619 15 15.2367 14.1968 14.8778 13.5388L8.8639 2.51357ZM7 6C7 5.44772 7.44772 5 8 5C8.55228 5 9 5.44772 9 6V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V6ZM9 13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12C8.55228 12 9 12.4477 9 13Z" fill="currentColor"></path>
                                                                </svg>
                                                                <div className="leafygreen-ui-5klvzg">
                                                                    <span className="css-41c0n2 e165spmc0">
                                                                        {mpesaErrorMessage}. If you have completed the payment, click here to input the 
                                                                        <Link to="/confirm-mpesa-code" style={{textDecoration: 'underline'}} className="css-hvbs6i"> Mpesa Code.</Link>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        :
                                                            <></>
                                                    }
                                                    <div className="field full">
                                                        <label htmlFor="zip">Phone Number</label>
                                                        <input id="phone" type="text" className="fixed-input" disabled value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Phone Number" />
                                                    </div>
                                                    <div className="field full">
                                                        <label htmlFor="address">Price</label>
                                                        <input id="route" type="text" className="fixed-input" disabled value={price} placeholder="Price" />
                                                    </div>
                                                    {
                                                        mpesaSuccessMessage?
                                                            <></>
                                                        :
                                                            <div className="mt-15">
                                                                <div className="font-weight-normal fs-16 text-muted">
                                                                    When you have received the M-pesa Transaction message. Click "Confirm Payment"
                                                                </div>	
                                                            </div>
                                                    }
                                                    {
                                                        mpesaSuccessMessage?
                                                            <div role="alert" className="css-1tmhw5y successgreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                                                                    <i className="fa fa-check-circle" aria-hidden="true"></i>
                                                                <div className="leafygreen-ui-5klvzg">
                                                                    <span className="css-41c0n2 e165spmc0">
                                                                        {mpesaSuccessMessage} 
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        :
                                                            <div className="field full">
                                                                {
                                                                    mpesaConfirmLoading?
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
                                                                        <button onClick={handleConfirmMpesa} style={{width: '100%'}} className="button button-success">Confirm Payment</button>
                                                                }
                                                            </div>
                                                            
                                                    }
                                                    <div className="form-checkbox">
                                                        <label className="container the-link">
                                                            <p className="pay-title">Or Use Our Buy Goods Till Number for Manual Activation <br></br> (AspireEarn)</p>
                                                            <br></br>
                                                            <ul className="pay-ul">
                                                                <li>Till Number: 9515811</li>
                                                                <li>Amount: KSH {price}</li>
                                                                <li>Enter Mpesa Pin</li>
                                                                <li>Click "Confirm Payment"</li>
                                                            </ul>
                                                            
                                                        </label>
                                                    </div>
                                                    <div className="card-actions flex justify-space-between">
                                                    <div className="flex-start">
                                                        {
                                                            mpesaSuccessMessage?
                                                                <button className="button button-secondary" disabled>Prev</button>
                                                            :
                                                                <button onClick={(e)=>{setMpesaErrorMessage("") ;setMpesaProgress(mpesaProgress-100)}} className="button button-primary">Prev</button>
                                                        }
                                                    </div>
                                                    <div className="flex-end">
                                                        <button className="button button-secondary" disabled>Next</button>
                                                    </div>
                                                </div>
                                                    
                                                </div>
                                            
                                            :
                                                <></>
                                        
                                    :
                                        <></>
                            }
                        </div>
                    </div>
                    
                </div>
            </article>
        </div>
    )
}

export default BookNow
