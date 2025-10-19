import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import '../AboutUs.css'

const images = [
    {
        key: '1',
        link: `https://res.cloudinary.com/dwxzlruyd/image/upload/v1712344644/kilimaj-hiking/assets/about-us/gallery-1/1_fslh5n.jpg`
    },
    {
        key: '2',
        link: `https://res.cloudinary.com/dwxzlruyd/image/upload/v1712344639/kilimaj-hiking/assets/about-us/gallery-1/2_v3xz2y.jpg`
    },
    {
        key: '3',
        link: `https://res.cloudinary.com/dwxzlruyd/image/upload/v1712344640/kilimaj-hiking/assets/about-us/gallery-1/3_hapjjk.jpg`
    },
    
]

function Gallery1() {
    return (
        <div id="drip-ef-221589843" className="about-gallery" style={{backgroundColor: 'white'}}>
            <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} interval={3000} showStatus={false} showThumbs={false} showIndicators={false} transitionTime={1000}>
                {
                    images.map(image => 
                        <div key={image.key} className="feature-img-wrap carousel-slide-caption-experience">
                            <img src={image.link} alt="" className="img-responsive center-block routes-images experience-images"></img>
                        </div>
                    
                    )
                }
                
            </Carousel>
        </div>
    )
}

export default Gallery1
