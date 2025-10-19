import { Carousel } from 'react-responsive-carousel';
import React from 'react'

function NaroMoruExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1715464851/kilimaj-hiking/experience/Experience-Naro-Moru_baxso3.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                        
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690674013/kilimaj-hiking/lemosho/cover/lemosho-map_ulof3b.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                        
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>The Naro Moru Route approaches from the West and KWS have a National Park Gate there and also their main headquarters for the mountain. There is accommodation available here also. This route used to be by far the most popular route as it is relatively short and has huts at Met Station (3050m) and MacKinders (4200m). </span></p>
                    <p><span style={{fontWeight: "400"}}>However, it has been overtaken by the Sirimon route as the most popular. The huts are good at both locations and they also have camping space. The first day up to Met Station is on a vehicle track through the forest and bamboo. </span></p>
                    <p><span style={{fontWeight: "400"}}>The second day goes through more bamboo and forest before emerging onto the alpine heath and following the Teleki Valley to MacKinders. You would usually then use the South approach to Point Lenana, passing another hut (Austrian Hut) at 4790m.</span></p>
                    <p><span style={{fontWeight: "400"}}>The forest is still dense on this route, as is the bamboo zone. You are quite likely to see bushbuck, Colobus monkey and Sykes Monkey and also evidence of Buffalo and Elephant. The hygenia forest is also in good condition with a lot of flowers and other plants. </span></p>
                    <p><span style={{fontWeight: "400"}}> The giant heathers above the forest were heavily damaged by a fire in 2013 but the alpine moorland has a lot of Giant Lobelia as well as MacKinders Gladiolus higher up. The Teleki Valley has a lot of the classic Tree and Cabbage Groundsels as well as Lobelia Telekii and Deckenii. Some of the cabbage groundsels in particular absolutely massive. On the approach to or at MacKinders you are almost guaranteed to see Rock Hyrax.</span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default NaroMoruExperience