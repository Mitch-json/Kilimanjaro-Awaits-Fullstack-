import React, { useEffect, useState } from 'react'
import './Crew.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Oval } from 'react-loader-spinner';

function Crew() {
    const [crewLoading, setCrewLoading] = useState(false)
    const [crewMembers, setCrewMembers] = useState([])

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
    return (
        <div id="drip-ef-crew" className="crew-back">
            <h3 id="" style={{fontSize: '60px', marginBottom: '10px'}}>CREW</h3>
            <h3 id="h3-subtitle" style={{fontSize: '20px', marginTop: '5px'}}>Know the crew members</h3>
            {
                crewLoading ?
                    <div className="row d-flex justify-content-center" style={{height: '40vh', width: '100%'}}>
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
                    <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} interval={3000} showStatus={false} showIndicators={false} transitionTime={500}>
                        {
                            crewMembers.map(crew => 
                                <div key={crew._id} className="carousel-slide-crew">
                                    <div className="crew-image">
                                        <img className="circular--square" src={crew.image}></img>
                                        <div className="border-div no-pad">
                                            <img src={require('../assets/wbr.png')} alt="..." ></img>
                                        </div>
                                    </div>
                                    <div className="crew-name">
                                        <h3><strong>{crew.fullName}</strong></h3>
                                    </div>
                                    <div className="crew-details">
                                        <h3><strong>{crew.role}</strong></h3>
                                        <p>{crew.description}</p>
                                    </div>
                                </div>
                            )
                        }
                        
                    </Carousel>
            }
            
        </div>
    )
}

export default Crew
