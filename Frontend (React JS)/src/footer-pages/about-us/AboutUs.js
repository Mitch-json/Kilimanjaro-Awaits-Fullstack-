import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../../components/Footer'
import NavbarRest from '../../components/NavbarRest'
import Gallery1 from './components/Gallery1'
import './AboutUs.css'

function AboutUs() {
    return (
        <body>
            <Helmet>
                <title>About Us</title>
            </Helmet>
            <NavbarRest headerProps={{parallaxCaption: 'Who are we ?',parallaxTitle: 'About Us...',parallaxImg: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1712343547/kilimaj-hiking/assets/about-us/cover.jpg"}} />
            <main>
                <section className="section-base section-color">
                    <div className="container">
                        <div className="template-wrapper template-wrapper-single-trip single-trips">
                            <div className="section main-content f-pages">
                                <div className="container">
                                    <div className="section-inner">
                                        <div>
                                            <h2>About Us</h2>
                                            <p>Welcome to Afya Athletic, your trusted companion on the journey to conquer the majestic Mount Kilimanjaro in Tanzania. As seasoned local guides, we're more than just a mountaineering company; we're the embodiment of a rich history passed down through generations of our ancestors and kinsmen.</p>
                                            <Gallery1 />
                                            <p>Our story is interwoven with the tales of those who've lived in the shadow of this iconic mountain for centuries. Afya Athletic was born from a desire to honor and preserve these narratives, infusing them into every step we take with our clients. With a profound respect for the land, culture, and people, we've crafted an experience that embraces the soul of Kilimanjaro.</p>
                                            <p>But our mission isn't just about history; it's about the present and the future. Our dedicated team of local guides and co-founders share a deep connection to the mountain and its surroundings. We're not only your guides; we're your companions, sharing the knowledge, traditions, and local insights that make your journey unforgettable.</p>
                                            <p>Our achievements stand tall, much like Kilimanjaro itself. We've led countless adventurers to the summit, prioritizing safety without compromising on the awe-inspiring experience. Our commitment to responsible and sustainable tourism ensures that the mountain's beauty remains preserved for generations to come.</p>
                                            <p>At Afya Athletic, we're not just leading treks; we're leading a movement to connect people from all walks of life with the extraordinary power of Kilimanjaro. Join us to embrace the spirit of adventure, immerse yourself in ancient stories, and stand at the pinnacle of Africa, knowing that you're in the capable hands of those who've walked these paths for ages. Your journey is our legacy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </body>
    )
}

export default AboutUs
