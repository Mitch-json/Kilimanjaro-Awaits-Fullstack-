import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import NavbarRest from '../../components/NavbarRest'

function FAQ() {
    const displayDetail = (detailID) => {
        console.log(document.body.querySelector(`#${detailID}`).classList[1])
        if(document.body.querySelector(`#${detailID}`).classList[1]){
            document.body.querySelector(`#${detailID}`).classList.remove('ac-text-visible')
        }else{

            document.body.querySelector(`#${detailID}`).classList.add('ac-text-visible')
        }
    }
    return (
        <body>
            <Helmet>
                <title>FAQs</title>
            </Helmet>
            <NavbarRest headerProps={{parallaxCaption: 'Common questions',parallaxTitle: 'Frequently Asked Questions',parallaxImg: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1712345800/kilimaj-hiking/assets/FAQs/cover_fdefjn.jpg"}} />
            <main>
                <section className="section-base section-color">
                    <div className="container">
                        <div className="template-wrapper template-wrapper-single-trip single-trips">
                            <div className="section main-content f-pages">
                                <div className="container">
                                    <div className="section-inner">
                                        <div>
                                            <h2>Frequently Asked Questions</h2>

                                            <p>At Afya Athletic, we're here to address all your queries and ensure your climb up Kilimanjaro is a safe, memorable, and transformative adventure.</p>
                                            
                                            <div className="tab-content">
                                                <div role="tabpanel" className="tab-pane fade in active" id="the-experience">
                                                    
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-3')} > Is prior mountaineering experience required?</label>
                                                        <article id="ac-3" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                    No, prior mountaineering experience is not necessary. Our experienced guides will provide the necessary training and support throughout the journey.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-4')} > What's the best time to climb Kilimanjaro?</label>
                                                        <article id="ac-4" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                The best times are typically from January to February and June to October when the weather is more stable. However, Kilimanjaro can be climbed year-round.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-5')} > What's the level of physical fitness required?</label>
                                                        <article id="ac-5" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                A good level of fitness is recommended. Regular exercise, such as hiking and cardio, will help you better enjoy the trek and acclimate to the altitude.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-6')} >How many routes are there to the summit? </label>
                                                        <article id="ac-6" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                There are several routes, each offering unique experiences. The Marangu, Machame, Lemosho, and Rongai routes are popular choices.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-7')} > What's the altitude sickness risk? </label>
                                                        <article id="ac-7" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                Altitude sickness can affect anyone, regardless of fitness. Our gradual ascent and experienced guides minimize this risk. Adequate hydration and rest are crucial.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-8')} >What about accommodations during the climb? </label>
                                                        <article id="ac-8" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                We provide a range of accommodation options, from tents to huts, depending on the route chosen. Our team ensures your comfort and safety.

                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-9')} >Are there age restrictions for climbing? </label>
                                                        <article id="ac-9" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                There's no strict age limit, but climbers should be in good health. Our guides assess your readiness before the trek.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-10')} >What's the success rate for reaching the summit? </label>
                                                        <article id="ac-10" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                Our success rates are among the highest due to our experienced guides, well-planned itineraries, and focus on acclimatization.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-11')} >Can I customize my expedition or join a group? </label>
                                                        <article id="ac-11" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                Both options are available. Private expeditions offer personalized experiences, while group climbs allow you to connect with fellow adventurers.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                    <div className="ac">
                                                        <label className="ac-label" onClick={(e)=>displayDetail('ac-12')} >How do I prepare for the trek? </label>
                                                        <article id="ac-12" className="ac-text">
                                                            <ul>
                                                                <li>
                                                                Regular exercise, proper gear, and mental preparation are key. Our pre-trip guidance and briefing sessions ensure you're fully prepared.
                                                                </li>
                                                            </ul>
                                                        </article>
                                                    </div>
                                                </div>

                                            </div>
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

export default FAQ