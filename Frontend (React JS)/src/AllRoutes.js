import React from 'react'
import { useEffect, useState } from 'react';
import NavbarRest from './components/NavbarRest'
import KilimanjaroRoutes from './RoutesGrid/KilimanjaroRoutes'
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import styles from './NewHomePage/Home.module.css';
import KenyaRoutes from './RoutesGrid/KenyaRoutes';

function AllRoutes() {
    const [filter, setFilter] = useState('all')
    const [routesMenuActive, setRoutesMenuActive] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    const changeMenuRoutes = (target)=>{
        setFilter(target)
        if (document.body.querySelector(`.active`)) {
            document.body.querySelector(`.active`).classList.remove('active')
        }

        document.body.querySelector(`#${target}`).classList.add('active')
    }
    const showRoutesMenu = (status)=>{
        setRoutesMenuActive(status)
        if (status === true) {
            document.body.querySelector(`.menu-inner`).classList.add('active1')
        }else{
            document.body.querySelector(`.menu-inner`).classList.remove('active1')
        }
    }

    useEffect(() => {
        changeMenuRoutes(searchParams.get('loc'))
    }, [])
    

    return (
        <body>
            <Helmet>
                <title>Kilimanjaro Routes</title>
                <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i" />
            </Helmet>
            <NavbarRest headerProps={{AllRoutes: true,parallaxCaption: 'It feels good to be lost in the right direction',parallaxTitle: 'Treks',parallaxImg: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714327586/kilimaj-hiking/AllroutesParallax.jpg"}} />
            <main>
                <section className="section-base section-color">
                    <div className={styles.container}>
                        <div className="maso-list gap-30" data-columns="3" data-columns-lg="2" data-columns-sm="1">
                            <div className="menu-inner">
                                <div>
                                    <i className="menu-btn" onClick={()=> showRoutesMenu(!routesMenuActive)}></i>
                                    <span style={{textTransform: 'uppercase', fontSize: '16px', fontWeight: '900'}}>Menu</span>
                                </div>
                                <ul>
                                    <li id="all">
                                        <a onClick={()=> changeMenuRoutes('all')} >All</a>
                                    </li>
                                    <li id="kilimanjaro">
                                        <a onClick={()=> changeMenuRoutes('kilimanjaro')} >Mt. Kilimanjaro</a>
                                    </li>
                                    <li id="kenya">
                                        <a onClick={()=> changeMenuRoutes('kenya')} >Mt. Kenya</a>
                                    </li>
                                    {/* <li id="longonot">
                                        <a onClick={()=> changeMenuRoutes('longonot')} >Mt. Longonot</a>
                                    </li> */}
                                    
                                </ul>
                            </div>
                            <div className="grid-box">
                                {
                                    filter === 'all'?
                                        <>
                                            <KilimanjaroRoutes />
                                            <KenyaRoutes />
                                        </>
                                    :
                                        filter === 'kilimanjaro'?
                                            <KilimanjaroRoutes />
                                        :
                                            filter === 'kenya'?
                                                <KenyaRoutes />
                                            :
                                                <></>
                                }
                            </div>
                        </div>
                        <hr className="space" />
                    </div>
                </section>
                <section className="section-base section-call">
                    <div className="container">
                        <div className="cnt-box cnt-call">
                            <i className="im-paper-plane"></i>
                            <div className="caption">
                                <h2>Booking and contacts</h2>
                                <p>
                                    Would you like more info about other trips or you want to book a special excursion?
                                </p>
                                <Link to="/contact-us" className="btn btn-xs">Contact us</Link>
                            </div>
                        </div>
                        <div className="row" style={{marginTop: "40px"}}>
                            <div className="col-lg-4">
                                <div className="icon-box icon-box-left">
                                    <i className="im-thumb"></i>
                                    <div className="caption">
                                        <h3>Experienced team</h3>
                                        <p>Our Crew consists of very experienced mountaineers</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="icon-box icon-box-left">
                                    <i className="im-icq"></i>
                                    <div className="caption">
                                        <h3>Easy joining</h3>
                                        <p>Contact us and in 2 minutes you're booked</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="icon-box icon-box-left">
                                    <i className="im-forest"></i>
                                    <div className="caption">
                                        <h3>Secret locations</h3>
                                        <p>Discover hidden natural places with our tours</p>
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

export default AllRoutes
