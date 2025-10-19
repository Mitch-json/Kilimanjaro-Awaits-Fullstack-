import { Carousel } from 'react-responsive-carousel';
import React from 'react'

function ChogoriaExperience() {
    return (
        <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                
                <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} showArrows={false} interval={4000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                    
                    <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1715464851/kilimaj-hiking/experience/Experience-chogoria_zj54ox.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                        
                    </div>
                    {/* <div className="feature-img-wrap carousel-slide-caption-experience">
                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690674013/kilimaj-hiking/lemosho/cover/lemosho-map_ulof3b.jpg" alt="" className="img-responsive center-block routes-images experience-images"></img>
                        
                    </div> */}
                </Carousel>
                <h2 className="trips_heading">About the Experience</h2>
                <div>
                    <p><span style={{fontWeight: "400"}}>The Chogoria route approaches from the East and there is a National Forest Reserve gate near the village of Chogoria and a National Park gate further up. The route is often described as the most attractive route on Mount Kenya. However, there is no hut for its high camp and it is quite a bit longer unless you use 4x4's to cut out the lower part. It is normal to drive 4x4's through the forest until close to or as far as the Meru Bandas (3000m). </span></p>
                    <p><span style={{fontWeight: "400"}}>The next stage is following a 4x4 track a bit further up to the "Roadhead" where you can either branch left for a more direct route, or right to pass Mugi Hill and Lake Ellis. Both tracks re-converge near the head of a spectacular amphitheatre of cliffs know as The Temple, in the bottom of which is Lake Michaelson and at the West end, a large notch where the Nithi River enters. </span></p>
                    <p><span style={{fontWeight: "400"}}>Just above the junction (4300m), is an old rickety hut that porters often sleep in, but clients have to camp. From here the path continues to rise, up to Simba Tarn, here it splits to head either North or South for Shipton's or Austrian huts respectively.</span></p>
                    <p><span style={{fontWeight: "400"}}>The physical landscape on this route is its biggest attraction. Whereas the other routes above generally follow a U-Shaped glacial valley for much of the way, the Chogoria traverses around the head of the spectacular 'Temple' with the Hall Tarns perched on the rock ledge above it and Lake Michaelson in the base of the amphitheatre.</span></p>
                    <p><span style={{fontWeight: "400"}}>The additional features of Lake Ellis, the Giant's Billiard Table and the Nithi Falls further add to its interest. The Chogoria is very often used as a descent route after ascending one of the other routes.</span></p>
                </div>
                 
                
            </div>

        </div>
    )
}

export default ChogoriaExperience