import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../../components/Footer'
import NavbarRest from '../../components/NavbarRest'
function Tipping() {
    return (
        <body>
            <Helmet>
                <title>Tips for the crew</title>
            </Helmet>
            <NavbarRest headerProps={{parallaxCaption: 'How much do you tip your crew members?',parallaxTitle: 'Tips for the crew',parallaxImg: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1712347171/kilimaj-hiking/assets/tipping/cover_rfwvdb.jpg"}} />
            <main>
                <section className="section-base section-color">
                    <div className="container">
                        <div className="template-wrapper template-wrapper-single-trip single-trips">
                            <div className="section main-content f-pages">
                                <div className="container">
                                    <div className="section-inner">
                                        <div className="col-sm-12">
                                            <h2>INFORMATION ON TIPS</h2>
                                            
                                            <p>We follow Kilimanjaro Porters Assistance Program (KPAP) recommended guidelines on all aspects of guide and porter payments and welfare. KPAP publish recommended tipping amounts for all operators which we adopt.</p>
                                            <p>Recommending tipping amounts for Climbing Kilimanjaro are the same no matter which route you end up choosing.</p>
                                        
                                            <h2>You should tip:</h2>
                                            <p>1. Lead guide: $20/day</p>
                                            <p>2. Assistant guide: $15/day</p>
                                            <p>3. Porters: $8/day (for each porter)</p>
                                            <p>4. Cook: $15/day</p>

                                            <p>These amounts are per group of climbers NOT per climber. You will be advised of the total size of your crew in your final briefing pack.</p>

                                            <p>As a general guide for a climb for two people over 7 days, a normal crew would comprise 1 lead guide, 1 assistant guide, 1 cook and 6 to 7 porters. If your climb is longer then the number of porters will increase as more food will need to be carried for everyone. Also, if you have booked a private toilet there will an additional toilet porter who carries the equipment and makes sure it’s kept clean.</p>

                                            <p>Tips should be paid to the lead guide on the morning of the last day of the climb. The lead guide will then distribute tips according to our strict policy.</p>
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

export default Tipping
