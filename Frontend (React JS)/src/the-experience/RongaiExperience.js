import React from 'react'
import { Carousel } from 'react-responsive-carousel';

function RongaiExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690572601/kilimaj-hiking/experience/experience-rongai_jluuj5.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690675998/kilimaj-hiking/rongai/cover/rongai-map_k2khni.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>Rongai route ascends Mount Kilimanjaro from the north-eastern side of the mountain, along the border between Tanzania and Kenya. The rongai route retains a sense of unspoiled wilderness.</span></p>
                    <p><span style={{fontWeight: "400"}}>The Rongai route is the only route that approaches Kilimanjaro from the north. Rongai route is truly one of the more remote and wild trails on the entire mountain. Despite that however, this route offers trekkers plenty of advantages, making it a very appealing option for those looking for a unique experience on Africa’s tallest peak.</span></p>
                    <p><span style={{fontWeight: "400"}}>Due to its remote nature, the Rongai Route is among the least visited of all of the trails on Mount Kilimanjaro. Those who choose this path will experience peace and quiet for much of the trek, encountering few other climbers prior to reaching the Kibo Camp, at which point the trail merges with the Marangu Route for the final push to the summit.</span></p>
                    <p><span style={{fontWeight: "400"}}>Before that happens however, travelers will often have the path completely to themselves for hours or even days at a time, making this a good choice for those looking for solitude in a unique wilderness setting.</span></p>
                    <p><span style={{fontWeight: "400"}}>Rongai route approaches Mount Kilimanjaro with a slow, steady climb, giving hikers a chance to acclimatize at a steady rate. This not only makes it one of the easier routes up the mountain, it also increases the success rate substantially.</span></p>
                    <p><span style={{fontWeight: "400"}}>There are few major obstacles to overcome along this trail and the final day before summit day is a short one, giving trekkers a chance to rest, recuperate, and prepare for their climb to the top of Uhuru Peak.</span></p>
                    <p><span style={{fontWeight: "400"}}>Because the Rongai Route starts on the north side of the mountain, not far from the border with Kenya, it is also the driest route on Kilimanjaro as well.</span></p>
                    <p><span style={{fontWeight: "400"}}>This makes it a good choice for a trek all year round, but especially during the rainy season in April and May. Most of the rain storms tend to stay on the southern side of the mountain, allowing Rongai hikers to stay drier and warmer than those on some of the other, more popular, trails.</span></p>
                    <p><span style={{fontWeight: "400"}}>Other advantages of choosing the Rongai Route include the potential to spot wildlife, including Colobus Monkeys, in the first few days of the climb. The campsites are also nicely staggered out across the route, ensuring that hikers spend a similar amount of time on the trail each day. And since the trail goes up the north side and down the south side, travelers get a sense of what Kilimanjaro looks like from different perspectives.</span></p>
                    <p><span style={{fontWeight: "400"}}>If there is one criticism of the Rongai Route it is that it may not be as scenic as some of the other routes up Mt. Kilimanjaro. While it is true that the scenery isn’t as varied and dramatic as some of the other trails, there is still plenty to see and enjoy on this path too. And because you’ll encounter so few people, you’ll have an easier time soaking it all in.</span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default RongaiExperience
