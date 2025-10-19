import React, { useState } from 'react'
import { Oval } from 'react-loader-spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ConfirmMpesaCode() {
    const [mpesaCode, setMpesaCode] = useState("")
    const [mpesaErrorMessage, setMpesaErrorMessage] = useState("")
    const [mpesaSuccessMessage, setMpesaSuccessMessage] = useState("")
    
    const [mpesaConfirmLoading, setMpesaConfirmLoading] = useState(false)

    const handleConfirmMpesaCode = ()=>{
        setMpesaConfirmLoading(true)
        setMpesaErrorMessage("")
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({TransID: mpesaCode})
        }

        fetch(`${process.env.REACT_APP_BACKEND_URL}/confirm-mpesa-code`, requestOptions)
            .then(response => response.json())
            .then(data=>{
                if (data.confirmed) {
                    setMpesaSuccessMessage("Payment confirmed, we will contact you shortly. Thank you for choosing Kilimanj-hiking, we are looking foward to our adventure together")
                    setMpesaConfirmLoading(false)
                } else if(data.none) {
                    setMpesaErrorMessage(`No Mpesa payment with the code: ${data.code} has been made within the last 5 hours`)
                    setMpesaConfirmLoading(false)
                } else {
                    toast.error("Database connection error. PLEASE TRY AGAIN!")
                    setMpesaConfirmLoading(false)
                }

            }).catch(error => {
                toast.error("Network connection error. PLEASE TRY AGAIN!")
                setMpesaConfirmLoading(false)
            })

    }
    return (
        <div>
            <ToastContainer 
                theme="dark"
            />
            <article className="card">
                <div className="container">
                    <div className="card-body">
                        <div className="payment-type">
                            <h4>Confirm Mpesa payment using the Mpesa code</h4>
                            <div className="types flex justify-space-between" style={{justifyContent: 'center'}}>
                                <div  class={`type selected`}>
                                    <div className="logo">
                                    <img style={{maxWidth: '75px'}} alt="M-PESA LOGO-01" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" />
                                    </div>
                                    <div className="text">
                                        <p>Pay with M-Pesa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="payment-info flex justify-space-between">
                            <div className="column billing">
                                <div className="title">
                                    <div className="num">X</div>
                                    <h4>Mpesa Code Confirmation</h4>
                                </div>
                                <div className="font-weight-normal fs-16 text-unmuted" style={{marginBottom: '20px', color: 'black'}}>
                                    The Mpesa Code you will input must be within the last 5 hours for the payment to be confirmed
                                </div>
                                {
                                    mpesaErrorMessage?
                                        <div role="alert" className="css-1tmhw5y leafygreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                                            <svg className="leafygreen-ui-1tk0odm" height="16" width="16" role="img" aria-label="Warning Icon" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8639 2.51357C8.49039 1.82881 7.50961 1.82881 7.1361 2.51357L1.12218 13.5388C0.763263 14.1968 1.23814 15 1.98608 15H14.0139C14.7619 15 15.2367 14.1968 14.8778 13.5388L8.8639 2.51357ZM7 6C7 5.44772 7.44772 5 8 5C8.55228 5 9 5.44772 9 6V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V6ZM9 13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12C8.55228 12 9 12.4477 9 13Z" fill="currentColor"></path>
                                            </svg>
                                            <div className="leafygreen-ui-5klvzg">
                                                <span className="css-41c0n2 e165spmc0">
                                                    {mpesaErrorMessage}.
                                                    <br></br>
                                                    If you have completed the payment but this error keeps occuring, contact us at 
                                                    <p  className="css-hvbs6i">
                                                        <span style={{textDecoration: 'underline', marginRight: '5px'}}> +254 792 789 618 </span> OR 
                                                        <span style={{textDecoration: 'underline', marginLeft: '5px'}}> kilimanjhiking@gmail.com </span> 
                                                    
                                                    </p> 
                                                </span>
                                            </div>
                                        </div>
                                    :
                                        <></>
                                }
                                <div className="field full">
                                    <label htmlFor="zip">Mpesa Code</label>
                                    <input id="phone" type="text" value={mpesaCode} onChange={(e)=>setMpesaCode(e.target.value)} placeholder="Mpesa Code" />
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
                                                    <button onClick={handleConfirmMpesaCode} style={{width: '100%'}} className="button button-success">Confirm Mpesa Code</button>
                                            }
                                        </div>
                                        
                                }
                                
                                
                            </div>
                        
                        </div>
                    </div>
                    
                </div>
            </article>
        </div>
    )
}

export default ConfirmMpesaCode
