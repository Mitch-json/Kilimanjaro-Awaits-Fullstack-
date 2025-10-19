import { Carousel } from 'react-responsive-carousel';
import React from 'react'

function LemoshoExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690571822/kilimaj-hiking/experience/experience-lemosho_lwgfme.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                        
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690674013/kilimaj-hiking/lemosho/cover/lemosho-map_ulof3b.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                        
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>The Lemosho Route is often considered the most beautiful of all the trekking trails up Mount Kilimanjaro. It crosses the entire Shira Plateau from west to east in a pleasant, relatively flat hike. Crowds are low until the route joins the Machame route near Lava Tower. </span></p>
                    <p><span style={{fontWeight: "400"}}>It is one of the newer routes on the mountain and shares a portion of the same path as Machame route, although it holds a few advantages over that route that definitely make worth considering, particularly for travelers who have some extra time.</span></p>
                    <p><span style={{fontWeight: "400"}}>Starting the western flanks of Mount Kilimanjaro at the Londorossi Gate, the Lemosho Route wanders its way up one of the more remote sections of the mountain.&nbsp;</span></p>
                    <p><span style={{fontWeight: "400"}}>The trail takes hikers through a beautiful rain forest where they might have the chance to spot wildlife along the way. Black and white colobus monkeys are routinely seen in the forests, as are blue monkeys, small lizard and a wide assortment of birds. From there, the path wanders out onto the Shira Plateau, crossing it from west to east on relatively flat and easy to walk terrain.</span></p>
                    <p><span style={{fontWeight: "400"}}>The early days on the Lemosho Route provides plenty of solitude, as this trail sees far less traffic than Machame route and Marangu route. This makes an already-great trekking adventure even more spectacular as at times it will feel like you have the entire mountain to yourself.</span></p>
                    <p><span style={{fontWeight: "400"}}>Eventually however, Lemosho route merges with Machame route, and the amount of traffic begins to increase. But if you’re looking for a little peace and quiet in the early going of the climb, this is a great option.</span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default LemoshoExperience
