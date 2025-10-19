import { Carousel } from 'react-responsive-carousel';
import React from 'react'

function SirimonExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1715464850/kilimaj-hiking/experience/Experience-Sirimon_vjq08v.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                        
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690674013/kilimaj-hiking/lemosho/cover/lemosho-map_ulof3b.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                        
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>The Sirimon Route is accessed via the North West corner of the mountain and the Kenya Wildlife Service have the Sirimon National Park Gate at the road head where you can pay your fees, there is also accommodation available here. </span></p>
                    <p><span style={{fontWeight: "400"}}>The route is usually considered one of the easier routes as it climbs relatively gradually with only a couple of steeper sections to reach the top camp. It is also currently the most popular route, though it is by no means busy.</span></p>
                    <p><span style={{fontWeight: "400"}}>There are two Huts with dormitory rooms as well as toilets and camping sites; Old Moses (3400m) and Shiptons (4200m). The route follows a vehicle track for the first day, open moorland and the MacKinder Valley for the second day and then the North approach to Point Lenana on summit day. </span></p>
                    <p><span style={{fontWeight: "400"}}>The forest is relatively sparse on this route and the bamboo zone is not really evident. Most of the second day is spent in the alpine heath and moorland. </span></p>
                    <p><span style={{fontWeight: "400"}}> Crossing the ridge into the MacKinder Valley is a good viewpoint if it is clear and the approach to the peaks along the classic U-shaped MacKinder Valley can be spectacular in clear conditions. The MacKinder Valley shows quite a lot of the giant Lobelia and Groundsel which are the classic Mt Kenya Flora. You are also quite likely to see Rock Hyrax at Shipton's cave or hut.</span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default SirimonExperience