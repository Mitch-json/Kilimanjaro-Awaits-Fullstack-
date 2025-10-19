import React, { useState } from 'react'
import './BookConsultation.css'
import { Oval } from 'react-loader-spinner'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

function BookConsultation() {
    const [fullName, setFullName] = useState("")
    const [whatsApp, setWhatsApp] = useState("")
    const [email, setEmail] = useState("")

    const [submitLoading, setSubmitLoading] = useState(false)

    const [consErrorMessage, setConsErrorMessage] = useState("")
    const [consSuccessMessage, setConsSuccessMessage] = useState("")

    const submitConsultation = (e) => {
        e.preventDefault()

        if(document.querySelector(".PhoneInputInput-error")){
            document.querySelector(".invalid-phone").classList.remove("invalid-phone-error")
            document.querySelector(".PhoneInputInput").classList.remove("PhoneInputInput-error")
            document.querySelector(".whatsapp-label").classList.remove("dont-display-label")
        }
        
        if(isValidPhoneNumber(whatsApp)){
            setSubmitLoading(true)
    
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({fullName: fullName, whatsApp: whatsApp, email: email})
            };
            fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/book-consultation`, requestOptions)
                .then(response => response.json())
                .then((data) => {
                    if(data.msg){
                        setConsSuccessMessage(data.msg)
                        setSubmitLoading(false)
                    }else if(data.errorBut){
                        setConsSuccessMessage("Online Consultation successfully booked")
                        setSubmitLoading(false)
                    }else if(data.err){
                        setConsErrorMessage(data.err)
                        setSubmitLoading(false)
                    }
                })
                .catch(error =>{
                    console.log(error)
                    setSubmitLoading(false)
                })
            
        }else{
            document.querySelector(".invalid-phone").classList.add("invalid-phone-error")
            document.querySelector(".PhoneInputInput").classList.add("PhoneInputInput-error")
            document.querySelector(".whatsapp-label").classList.add("dont-display-label")
            document.querySelector(".PhoneInputInput").focus()
        }
    }

    return (
        <div id="consultation-form" style={{height: '650px', paddingTop: '70px'}}>
            <h3 id="h3-title" style={{fontSize: '30px', marginBottom: '10px', letterSpacing: '3px', textTransform: 'uppercase'}}>Book Free Zoom Meeting</h3>
            <h3 id="h3-subtitle" style={{fontSize: '20px', marginTop: '5px', letterSpacing: '3px'}}>Online consultation and Q&A with a Guide</h3>

            <div style={{maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto'}}>
                {
                    consErrorMessage?
                        <div role="alert" className="css-1tmhw5y leafygreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                            <svg className="leafygreen-ui-1tk0odm" height="16" width="16" role="img" aria-label="Warning Icon" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.8639 2.51357C8.49039 1.82881 7.50961 1.82881 7.1361 2.51357L1.12218 13.5388C0.763263 14.1968 1.23814 15 1.98608 15H14.0139C14.7619 15 15.2367 14.1968 14.8778 13.5388L8.8639 2.51357ZM7 6C7 5.44772 7.44772 5 8 5C8.55228 5 9 5.44772 9 6V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V6ZM9 13C9 13.5523 8.55228 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12C8.55228 12 9 12.4477 9 13Z" fill="currentColor"></path>
                            </svg>
                            <div className="leafygreen-ui-5klvzg">
                                <span className="css-41c0n2 e165spmc0">
                                    {consErrorMessage}.
                                </span>
                            </div>
                        </div>
                    :
                        <></>
                }
                {
                    consSuccessMessage?
                        <div role="alert" className="css-1tmhw5y successgreen-ui-cnwxd3" data-testid="bannerAuthCodeError">
                                <i className="fa fa-check-circle" aria-hidden="true"></i>
                            <div className="leafygreen-ui-5klvzg">
                                <span className="css-41c0n2 e165spmc0">
                                    {consSuccessMessage} 
                                </span>
                            </div>
                        </div>
                    :
                        <form onSubmit={submitConsultation} className="hs-custom-style" style={{width: '100%'}}>
                            <fieldset className="form-columns-3">
                                <div className="hs_firstname hs-firstname hs-fieldtype-text field-2 hs-form-field">
                                    <label className="" placeholder="Enter your First Name" >
                                        <span>Full Name</span>
                                    </label>
                                    <div className="input">
                                        <input value={fullName} onChange={(e)=>{setFullName(e.target.value)}} placeholder="" type="text" className="hs-input" required />
                                    </div>
                                </div>
                                <div className="hs_lastname hs-whatsapp hs-fieldtype-text field-2 hs-form-field">
                                    <label className="whatsapp-label" placeholder="Enter your Last name" >
                                        <span>WhatsApp No</span>
                                    </label>
                                    <div className="font-weight-normal fs-16 invalid-phone" style={{marginTop: '10px', color: 'red', fontSize: '12px', display: 'none'}}>
                                        Invalid Phone Number
                                    </div>
                                    <div className="input whatsapp-input">
                                        <PhoneInput     
                                            placeholder=""
                                            value={whatsApp}
                                            onChange={setWhatsApp}
                                        />
                                        
                                    </div>
                                </div>
                                <div className="hs_email hs-email hs-fieldtype-text field-2 hs-form-field">
                                    <label className="" placeholder="Enter your Email">
                                        <span>Email</span>
                                    </label>
                                    <div className="input">
                                        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email" placeholder="" type="email" className="hs-input" required />
                                    </div>
                                </div>
                            </fieldset>
                            <div className="hs_submit hs-submit">
                                <div className="actions">
                                    {
                                        submitLoading ?
                                            <label  className="hs-button-2 primary large">
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
                                            <button type="submit" className="hs-button primary large" >
                                                Book Consultation
                                            </button>
                                    }
                                </div>
                            </div>
                        </form>
                    }   
            </div>
        </div>
    )
}

export default BookConsultation
