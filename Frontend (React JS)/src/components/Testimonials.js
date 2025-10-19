import React from 'react'
import './Testimonials.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Testimonials() {
    return (
        <div id="drip-ef-221589843" className="reviews-back">
            <h2 style={{marginTop: '0px', letterSpacing: '3px'}}>Client Testimonials</h2>
            
            <Carousel autoPlay={true} swipeable={false} infiniteLoop={true} interval={3000} showStatus={false} showIndicators={false} transitionTime={500}>
                <div className="carousel-slide-caption">
                    <h3>What an AMAZING experience. It still feels a bit surreal, but I have pictures so I know it happened. Physically and Mentally Challenging but what a reward! I felt so cared for from the entire team (Guides, Porters, Chef, etc.) Our safety and comfort was their main concern. The food was delicious (don't take too many snacks, you won't eat them), the soups we had every night I'm hoping I can get the recipe for, that's how good they were. Again, just an Amazing experience</h3>
                    <div className="testimonial-source">
                        <h3><strong>Malik, India</strong></h3>
                    </div>
                </div>
                <div className="carousel-slide-caption">
                    <h3>Kilimanjaro is a great first peak to experience high altitude. The huts and toilets are very clean and well maintained. Having guides and Porter assistance makes it a great first mountain to climb to experience high altitude. Apart from reaching the highest point in Africa, it was great to meet new people and share this journey and make everlasting friendships.</h3>
                    <div className="testimonial-source">
                        <h3><strong>Marj, USA</strong></h3>
                    </div>
                </div>
                <div className="carousel-slide-caption">
                    <h3>Climbing Mount Kilimanjaro in 5 days was an awesome experience! The chefs prepared great food, even vegetarian options! The guides were super strong and made the climb easier. The awesome views and the good feeling of finishing made every step fun. Nature's beauty and the friends I made during the journey are memories I'll always keep. It was a great experience, and I'd totally do it again with the same people!</h3>
                    <div className="testimonial-source">
                        <h3><strong>Henry</strong></h3>
                    </div>
                </div>
                
            </Carousel>
        </div>
    )
}

export default Testimonials
