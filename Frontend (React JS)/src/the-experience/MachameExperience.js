import React from 'react'
import { Carousel } from 'react-responsive-carousel';

function MachameExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690571940/kilimaj-hiking/experience/experience-machame_sqxgqm.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690674668/kilimaj-hiking/machame/cover/machame-map_dr7fbg.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>The Machame route, also known as the “Whiskey” route, is a six or seven day camping route and is most popular route on Kilimanjaro. This trail offers stunning views, a reasonable challenge, and plenty of time to acclimate, making it a good choice for those who have a bit of extra time in their schedule. </span></p>
                    <p><span style={{fontWeight: "400"}}>Machame route has been nicknamed the “Whiskey Route” because it is often perceived as being tougher than Marangu route, which is often referred to as the “Coca-Cola” route. Unlike that trail however, camping is allowed on Machame, which means trekkers will be sleeping in tents all the way to the summit.</span></p>
                    <p><span style={{fontWeight: "400"}}>Trekkers who take the Machame Route pass several well known Mount Kilimanjaro landmarks while en route, including the famed Lava Tower and Shira Plateau. The route wanders up and down a series of valleys and ridges, which make the walk a bit more strenuous, but rewards hikers with some of the best views on the mountain.</span></p>
                    <p><span style={{fontWeight: "400"}}>It is for that reason that Machame route is widely considered to be the most scenic of all of the routes up Mount Kilimanjaro, providing unique and varied landscapes to pass through on each and every day. The trail starts on the south side of the mountain, passes underneath the Southern Ice Field and makes its summit approach from the Barafu Camp.</span></p>
                    <p><span style={{fontWeight: "400"}}>For travelers who have a few extra days in their schedule, Machame route is an excellent option. One or two additional days of acclimatization can make a big difference in the success rate, so trekkers who choose this route reach the summit more often, despite the fact that this is a more challenging hike than Marangu route.</span></p>
                    <p><span style={{fontWeight: "400"}}>One of the biggest and most intimidating of those challenges is the Barranco Wall, a steep cliff face that can look quite scary upon first approach. In reality, Barranco isn’t nearly as frightening or difficult as it first appears, although you will have to watch your step, and possibly use your hands for extra leverage while scrambling over certain sections. The climb usually takes about an hour to an hour and a half to complete, and the view from the top makes it worth the effort.</span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default MachameExperience
