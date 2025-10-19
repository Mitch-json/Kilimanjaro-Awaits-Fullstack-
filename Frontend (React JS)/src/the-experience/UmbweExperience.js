import React from 'react'
import { Carousel } from 'react-responsive-carousel';

function UmbweExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690572728/kilimaj-hiking/experience/experience-umbwe_wixrm3.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690676128/kilimaj-hiking/umbwe/cover/umbwe-map_bgntlz.png" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>Umbwe route is one of the shortest routes to the Southern Glaciers and the Western Breach and it’s the most hardest and challenging route on Mount Kilimanjaro.</span></p>
                    <p><span style={{fontWeight: "400"}}>The Umbwe Route is the trail for trekkers looking for a true climbing challenge. It is a quiet, seldom used path that can be very difficult, yet very rewarding at the same time. This is the route to choose if you want to test yourself on the slopes of Mount Kilimanjaro, far from the crowds that are found on the more common trails.</span></p>
                    <p><span style={{fontWeight: "400"}}>While Umbwe route is a non-technical climb, it does offer steep ascents and requires trekkers to scramble over rocks and tree roots at certain points. It is the hardest and most direct route up the mountain and even features several exposed ridges that are not for the faint of heart. The fitness and stamina of hikers may be tested along the way and it is best for experienced mountain trekkers who are looking for a challenge.</span></p>
                    <p><span style={{fontWeight: "400"}}>Because of it’s steep, direct approach, the success rate on Umbwe route is lower than some of the other routes. To get the most out of this climb, trekkers are encouraged to be as fit and ready as possible, as this is a steady march uphill for the first few days, which is contrast to some of the other routes that make slow, steady ascents or wander up and down to aid in acclimatization.</span></p>
                    <p><span style={{fontWeight: "400"}}>That said, the intense challenge of trekking the Umbwe Route is made up for by the spectacular views. At times, there are stunning vistas to be seen to both the left and the right as trekkers as they make their way up the trail.</span></p>
                    <p><span style={{fontWeight: "400"}}>In fact, the early days of this path have arguably the best views of any part of the mountain, save perhaps the summit itself. Umbwe also happens to be one of the quietest routes up Mount Kilimanjaro too. Because of its reputation as a difficult climb, very few people actually walk this trail, leaving it open and relatively untouched.</span></p>
                    <p><span style={{fontWeight: "400"}}>This helps to give trekkers the feeling that they are the only ones on the mountain until the route merges with Machame route near the Barranco Camp a few days into the hike. From there, it follows the familiar Southern Circuit below the Southern Ice Field before turning up towards the summit from Barafu Camp. As with most Kilimanjaro climbs, the descent is made along the Mweka Route.</span></p>
                    <p><span style={{fontWeight: "400"}}>If you’re looking for the absolutely best views on the way up Mount Kilimanjaro, and you enjoy testing yourself in the wilderness, Umbwe route will provide you with everything you seek, and then some. It is the closest thing you’ll find to a true mountaineering expedition on Kilimanjaro. </span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default UmbweExperience
