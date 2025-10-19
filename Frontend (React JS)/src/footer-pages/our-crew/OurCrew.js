import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../../components/Footer'
import NavbarRest from '../../components/NavbarRest'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Oval } from 'react-loader-spinner';

function OurCrew() {
    const [crewLoading, setCrewLoading] = useState(false)
    const [crewMembers, setCrewMembers] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [singleCrew, setSingleCrew] = useState({})

    useEffect(() => {
        setCrewLoading(true)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/users/crew`)
                .then(response => response.json())
                .then(data => {
                    if(data.crew){
                        setCrewMembers(data.crew)
                        setCrewLoading(false)
                    }else if(data.alert){
                        setCrewLoading(false)
                        
                    }else if(data.err){
                        setCrewLoading(false)

                    }
            }).catch(error =>{
                
                setCrewLoading(false)
            })
    }, [])

    const handlePopup = (crew)=>{
        setSingleCrew(crew)
        setShowPopup(!showPopup)
    }
    return (
        <body>
            <Helmet>
                <title>Our Crew</title>
            </Helmet>
            {showPopup && (
                <div className="mfp-wrap mfp-auto-cursor box-inline mfp-ready" tabindex="-1" style={{overflow: 'hidden auto'}}>
                    <div class="mfp-bg box-inline mfp-ready"></div>
                    <div className="mfp-container mfp-s-ready mfp-inline-holder active">
                        <div className="mfp-content fade-in" style={{animationDuration: '500ms', transitionTimingFunction: 'ease', transitionDelay: '0ms'}} >
                            <div id="user-2" className="box-lightbox-md light" style={{display: 'block'}}>
                                <h2 style={{textTransform: 'uppercase'}}>{singleCrew.fullName}</h2>
                                <h4>{singleCrew.role}</h4>
                                <hr className="space-sm"></hr>
                                <p>
                                    {singleCrew.description}
                                </p>
                                <hr className="space-sm"></hr>
                                <span className="icon-links icon-links-grid icon-social social-colors">
                                    <a href="#" target="_blank" className="facebook"><i className="icon-facebook"></i></a>
                                    <a href="#" target="_blank" className="twitter"><i className="icon-twitter"></i></a>
                                    <a href="#" target="_blank" className="instagram"><i className="icon-instagram"></i></a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button onClick={()=>{setShowPopup(false)}} title="Close (Esc)" type="button" className="mfp-close">×</button>
                </div>
            )}
            <NavbarRest headerProps={{parallaxCaption: 'Get to know our crew members',parallaxTitle: 'Crew Members',parallaxImg: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1712346791/kilimaj-hiking/assets/our-crew/cover_tzlcsy.jpg"}} />
            <main>
                <section className="section-base ">
                    <div className="container">
                        <div className="grid-list gap-60" data-columns="4" data-columns-md="2" data-columns-sm="1" data-gap="60">
                            {
                                crewLoading ?
                                    <div className="row d-flex justify-content-center" style={{height: '60vh', width: '100%'}}>
                                        <div className="col-md-18 flex-container-crew">
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
                                    <div className="grid-box"> 
                                        {crewMembers.map(crew => 
                                            
                                            <div className="grid-item" key={crew._id}>
                                                <div onClick={()=>{handlePopup(crew)}} className="cnt-box cnt-box-team lightbox" data-href="#user-1" data-lightbox-anima="fade-in" href="#user-1">
                                                    <img src={crew.image} alt="" />
                                                    <div className="caption">
                                                        <h2>{crew.fullName}</h2>
                                                        <span>{crew.role}</span>
                                                        <span className="icon-links">
                                                            <a href="#" target="_blank"><i className="icon-facebook"></i></a>
                                                            <a href="#" target="_blank"><i className="icon-twitter"></i></a>
                                                            <a href="#" target="_blank"><i className="icon-instagram"></i></a>
                                                        </span>
                                                        <p style={{textAlign: 'left'}}>
                                                            email: {crew.email}, contact: {crew.phone}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        
                                    </div>  
                            }
                        </div>
                        <hr className="space"></hr>
                    </div>
                </section>
                
            </main>
            <Footer />
        </body>
    )
}

export default OurCrew