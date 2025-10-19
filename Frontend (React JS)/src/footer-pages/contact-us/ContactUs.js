import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../../components/Footer'
import NavbarRest from '../../components/NavbarRest'

function ContactUs() {
    return (
        <body>
            <Helmet>
                <title>Contact Us</title>
            </Helmet>
            <NavbarRest headerProps={{parallaxCaption: 'Reach out to us for any queries and/or complaints',parallaxTitle: 'Contact Us ...',parallaxImg: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1712345339/kilimaj-hiking/assets/contact-us/cover_ijimdc.jpg"}} />
            <main>
                <section className="section-base section-color">
                    <div className="container">
                        <div className="template-wrapper template-wrapper-single-trip single-trips">
                            
                            <div className="section main-content f-pages">
                                <div className="container">
                                    <div className="section-inner">
                                        <div className="col-sm-12">
                                            <h2>Have a question or need help?</h2>
                                            <p>You might be able to find the answer to your question on our ‘Frequently Asked Questions’ page:</p>
                                            <p>Link</p>


                                            <h2>Contact Details</h2>
                                            <p>We can be reached by phone at: +254 792 789 618.  Give us a call! We’re always happy to chat</p>
                                            <p>
                                                Office hours:
                                                <br></br>
                                                Monday – Friday  |  7am – 7pm EST
                                            </p>


                                            <h2>Email Us Instead</h2>
                                            <p>Would like to email us instead of calling?</p>
                                            <p>
                                                If you have any general enquiries or would like to book, you can email us at
                                                <br></br>
                                                info@kilimanjaroawaits.com
                                            </p>
                                            <p>
                                                If you have questions about your upcoming trip, you can email us at
                                                <br></br>
                                                info@kilimanjaroawaits.com
                                            </p>
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

export default ContactUs