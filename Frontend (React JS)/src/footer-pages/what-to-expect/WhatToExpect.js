import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../../components/Footer'
import NavbarRest from '../../components/NavbarRest'

function WhatToExpect() {
    return (
        <body>
            <Helmet>
                <title>What to expect</title>
            </Helmet>
            <NavbarRest headerProps={{parallaxCaption: 'What should you expect from us ?',parallaxTitle: 'What to expect...',parallaxImg: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1712347484/kilimaj-hiking/assets/what-to-expect/cover_nqbha7.jpg"}} />
            <main>
                <section className="section-base section-color">
                    <div className="container">
                        <div className="template-wrapper template-wrapper-single-trip single-trips">
                            <div className="section main-content f-pages">
                                <div className="container">
                                    <div className="section-inner">
                                        <div className="col-sm-12">
                                            <h2>What to Expect from Afya Athletic:</h2>
                                            <p>By choosing Afya Athletic, you're not just embarking on a trek; you're embarking on a journey that encompasses history, culture, adventure, and personal growth. We're dedicated to making your Kilimanjaro expedition exceptional in every way.</p>
                                            
                                            <h2>1. Experienced Guides:</h2>
                                            <p>Our knowledgeable guides are certified and well-versed in Kilimanjaro's terrain and safety protocols.</p>
                                        
                                            <h2>2. Safety First:</h2>
                                            <p>Your safety is paramount. Our guides prioritize your well-being and are trained to handle emergencies.</p>

                                            <h2>3. Acclimatization Focus:</h2>
                                            <p>Our itineraries include gradual altitude gain to reduce the risk of altitude sickness and increase summit success.</p>

                                            <h2>4. Quality Equipment:</h2>
                                            <p>We provide quality gear and equipment, ensuring your comfort and safety throughout the trek.</p>

                                            <h2>5. Responsible Tourism:</h2>
                                            <p>We're committed to sustainable tourism, respecting the environment and supporting local communities.</p>
                                        
                                            <h2>6. Personalized Support:</h2>
                                            <p>Pre-trip guidance and post-trek debriefings ensure you're well-prepared and have a seamless experience.</p>
                                        
                                            <h2>7. Memories to Cherish:</h2>
                                            <p>Beyond reaching the summit, our goal is to create lifelong memories and a sense of accomplishment. At your request we can also include a professional photographer to your crew. </p>
                                        
                                            <h2>8. Transparent Communication:</h2>
                                            <p>We're here to address your questions, provide assistance, and keep you informed throughout your journey.</p>
                                        
                                            <h2>9. Local Insights:</h2>
                                            <p>An experiential experience where you Immerse yourself in the culture and history of the region as shared by our guides, adding depth to your experience.</p>
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

export default WhatToExpect