import React from 'react'
import { Carousel } from 'react-responsive-carousel';

function NorthernCircuitExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690572384/kilimaj-hiking/experience/experience-northern-circuit_ywptbu.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690675543/kilimaj-hiking/northern-circuit/cover/northern-circuit-map_qvdybx.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>The Northern Circuit route is the newest route up Mount Kilimanjaro and arguably the best. That’s because the a combination of all of the best elements of the other routes, rolled into one fantastic hike. If you’re looking for beautiful scenery, plenty of solitude, a healthy challenge, and the potential to spot wildlife, this is definitely the route for you.</span></p>
                    <p><span style={{fontWeight: "400"}}>Because the Northern Circuit route is longer than the other trails, it gives trekkers a chance to take in more of the mountain. Not only do they get a chance to hike across the awe-inspiring Shira Plateau, they’ll also catch glimpses of Kibo Peak and Uhuru Summit along the way.</span></p>
                    <p><span style={{fontWeight: "400"}}>Northern Circuit Route has the highest Kilimanjaro Success Rate which is 98% and approaches from south of Kilimanjaro. It is the newest and longest route which offers the most spectacular view of overall 360 degree scenery of Mount Kilimanjaro. Climbing Mount Kilimanjaro on this route takes 8 to 9 days for the summit.</span></p>
                    <p><span style={{fontWeight: "400"}}>Due to its extended length, much of which hovers around the same altitude for improved acclimatization, the Northern Circuit route has the highest success rate of any of the routes on Mount Kilimanjaro.</span></p>
                    <p><span style={{fontWeight: "400"}}>The trek begins at the Londorossi Gate and makes its way up the western flanks of the mountain, passing through the rainforest and climbing onto the the Shira Ridge.</span></p>
                    <p><span style={{fontWeight: "400"}}>From there, it is up to the Shira Plateau itself, before heading north to circle in a clockwise direction starting at the Moir Hut, then moving on to Buffalo Camp, and finally School Hut. Along the way, trekkers make an almost 360 degree hike around Kilimanjaro, before summiting from the east.</span></p>
                    <p><span style={{fontWeight: "400"}}>So with everything that the Northern Circuit route has going for it, what’s the downside? The only issue with hiking this route is that it requires a bit of extra time, something that few travelers have. While most of the other routes can be done in as few as six or seven days, the Northern Circuit route often requires as many as nine or more. That often limits the number of people who can work this trail into their schedule, although those that do will find that it is completely worth it.</span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default NorthernCircuitExperience
