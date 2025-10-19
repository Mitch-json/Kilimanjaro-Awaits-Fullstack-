import React from 'react'
import { Carousel } from 'react-responsive-carousel';

function MaranguExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690572007/kilimaj-hiking/experience/experience-marangu_sptzzw.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690674885/kilimaj-hiking/marangu/cover/marangu-map_kd7iw6.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>The Marangu Route also known as the “Coca-Cola Route” is the oldest and most well established trekking route on Mount  Kilimanjaro, and it remains extremely popular mainly because it is the only route on the mountain that has hut accommodation for trekkers.</span></p>
                    <p><span style={{fontWeight: "400"}}>This path provides trekkers with the classic Kilimanjaro climbing experience, offering sweeping views and a wonderful hiking adventure all the way to the summit of Uhuru Peak. That said, it also has some unique aspects that set it apart from any of the other routes as well, giving Marangu route a character and feeling that is entirely its own.</span></p>
                    <p><span style={{fontWeight: "400"}}>One of the more interesting aspects of Marangu Route is that it is the only route up Mount Kilimanjaro that doesn’t allow camping, so instead of sleeping in tents, trekkers stay in permanent huts instead.</span></p>
                    <p><span style={{fontWeight: "400"}}>These dormitory-style shelters provide extra protection from the wind and rain, which makes this route a popular one for travelers climbing during the rainy season, which comes in April and May. There are 60 bunk beds each at Mandara and Kibo Huts, and 120 bunk beds at Horombo Hut</span></p>
                    <p><span style={{fontWeight: "400"}}>While staying at those huts, trekkers will sleep in bunk beds equipped with a simple mattress and pillow. They’ll also be able to purchase an array of candy bars, bottled water, and soft drinks, which is why Marangu route is often referred to as the “Coca-Cola Route.”</span></p>
                    <p><span style={{fontWeight: "400"}}>Marangu Route offers a slow, steady climb to each of the daily camps, which has given it the reputation for being an easy trek. Don’t underestimate this trail however, as the approach to the final camp can be physically demanding with roughly 1000 meters of vertical gain on that day alone.</span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default MaranguExperience
