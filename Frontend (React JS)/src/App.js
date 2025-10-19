import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import styles from './NewHomePage/Home.module.css';
import './NewHomePage/test.css';
import './NewHomePage/themekit/css/glide.css';
import './NewHomePage/themekit/css/content-box.css';
import BookConsultation from './components/BookConsultation';
import Crew from './components/Crew';
import Footer from './components/Footer';
import GalleryH from './components/GalleryH';
import Navbar from './components/Navbar';
import Testimonials from './components/Testimonials';
import { useEffect, useState } from 'react';
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { TypeAnimation } from 'react-type-animation';



const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const sliderImageUrl = [
    //First image url
    
    {
        url: `${require('./assets/HomePaths/naro-moru-path.png')}`,
        trip: 'Mt Kenya',
        price: '1,000'
    },
    {
        url: `${require('./assets/HomePaths/machame-path.png')}`,
        trip: 'Mt Kilimanjaro',
        price: '2,500'
    },
    {
        url: `${require('./NewHomePage/media/path.png')}`,
        trip: 'Mt Kenya',
        price: '1000'
    },
  ];

function inView(element, elementHeight) {
    
    var windowHeight = window.innerHeight;
    var scrollY = window.scrollY || window.pageYOffset;
    
    var scrollPosition = scrollY + windowHeight;
    var elementPosition = element.getBoundingClientRect().top + scrollY + elementHeight;
    if (scrollPosition > elementPosition) {
      return true;
    }
    
    return false;
}
function animateCounting(element, targetValue, duration) {
    targetValue = parseFloat(targetValue);

    var currentValue = 0;

    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }

    var startTime = null;

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;

        var elapsedTime = timestamp - startTime;

        var progress = Math.min(elapsedTime / duration, 1);

        var easedProgress = easeOutQuart(progress);

        currentValue = easedProgress * targetValue;

        element.textContent = Math.ceil(currentValue);

        if (progress < 1) {
            requestAnimationFrame(animationStep);
        }
        
    }

    requestAnimationFrame(animationStep);
}
function App() {
    
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // const [imgsLoaded, setImgsLoaded] = useState(false)
    let progressLoaded = false;
    useEffect(() => {
        // const loadImage = image => {
        //     return new Promise((resolve, reject) => {
        //       const loadImg = new Image()
        //       loadImg.src = image.url
        //       // wait 2 seconds to simulate loading time
        //       loadImg.onload = () =>
        //         setTimeout(() => {
        //           resolve(image.url)
        //         }, 2000)
      
        //       loadImg.onerror = err => reject(err)
        //     })
        //   }
      
        //   Promise.all(IMAGES.map(image => loadImage(image)))
        //     .then(() => setImgsLoaded(true))
        //     .catch(err => console.log("Failed to load images", err))
        
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };
        const handleScroll = () => {
            var progressSection = document.querySelector('.progress-section')
            var progressHeight = progressSection.clientHeight;
            if (inView(progressSection, progressHeight)) {
                if (progressLoaded == false) {
                    var progressBars = document.querySelectorAll('.data-progress')
                    progressBars.forEach((element)=>{
                        var spanElement = element.querySelector(".counter");
                        var elementHeight = element.clientHeight;
            
                        if (inView(element, elementHeight)) {
                            // element is in view, add class to element
                            element.style.width = "0";
                            element.style.transition = "width 2s";
                            element.style.width = element.getAttribute("data-progress") + "%";
                            spanElement.style.opacity = '1';
                            animateCounting(spanElement, spanElement.getAttribute("data-to"), 2000);
                            
                        }
                    })
                    progressLoaded=true
                }
                
            }
        };
    
        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
        
    }, [])
  return (
    <body>
      <Helmet>
        <title>Home</title>
        <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i" />
      </Helmet>
      
      {/* {imgsLoaded ? (
          IMAGES.map(image => (
            <img key={image.id} src={image.url} alt="Human" />
          ))
        ) : (
          <h1>Loading images...</h1>
        )} */}
      <Navbar navbarDark={{height: 100, transparent: true, light: true}} />
    <main>
        <section style={{background: "linear-gradient(90deg, rgb(24 24 24) 0px, rgb(24 24 24 / 40%) 0px, rgba(24, 24, 24, 0) 100%), url(https://res.cloudinary.com/dwxzlruyd/image/upload/v1714242412/kilimaj-hiking/HomeParallax.jpg"}} className={[styles.light, styles['ken-burn-center'], styles['section-image'], styles['home-parallax']].join(' ')} data-parallax="scroll" >
            <div className={ styles.container}>
                <hr className={ styles['space-lg']} />
                <hr className={ styles['space-sm']} />
                <div className={[styles.row, styles['justify-content-around']].join(' ')}>
                    <div className={ styles['col-lg-6']}>
                        {/* <h1 data-anima="fade-left" data-time="2000" className={[styles['text-black'], styles['text-lg'], styles['text-uppercase']].join(' ')}>Stunning high treks</h1> */}
                        <TypeAnimation
                            sequence={[
                                // Same substring at the start will only be typed out once, initially
                                'Stunning treks',
                                1000, // wait 1s before replacing "Mice" with "Hamsters"
                                'Stunning Scenes',
                                1000,
                                'Amazing fun',
                                1000,
                            ]}
                            wrapper="h1"
                            className={[styles['text-black'], styles['text-lg'], styles['text-uppercase']].join(' ')}
                            speed={50}
                            repeat={Infinity}
                        />
                        <hr className={ styles['space-sm']} />
                        <hr className={ styles['space-xs']} />
                        <table data-anima="fade-left" data-time="3000" className={[styles.table, styles['table-grid'], styles['table-border'], styles['align-left'], styles['table-10']].join(' ')}>
                            <tbody>
                                <tr>
                                    <td> 
                                        <div className={[styles.counter, styles['counter-horizontal'], styles['counter-icon']].join(' ')}>
                                            <i className={[styles['im-cloud-sun'], styles['text-md']].join(' ')}></i>
                                            <div>
                                                <h3>Mt Kilimanjaro</h3>
                                                <div className={styles.value}>
                                                    <span className={styles['text-md']} data-to="15" data-speed="2000">-5</span>
                                                    <span>° C - 5895 m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={[styles.counter, styles['counter-horizontal'], styles['counter-icon']].join(' ')}>
                                            <i className={[styles['im-clouds'], styles['text-md']].join(' ')}></i>
                                            <div>
                                                <h3>Mt Kenya</h3>
                                                <div className={styles.value}>
                                                    <span className={styles['text-md']} data-to="11" data-speed="2000">-6</span>
                                                    <span>° C - 5199 m</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <hr className={styles['space-sm']} />
                        <hr className={styles['space-xs']} />
                        <Link to="/routes?loc=all" className={[styles.btn, styles['btn-sm'], styles['btn-circle']].join(' ')}>View Treks</Link>
                        <Link to="/our-crew" className={[styles.btn, styles['btn-sm'], styles['btn-circle'], styles['btn-border']].join(' ')} data-anima="fade-left" data-time="3000">View team</Link>
                    </div>
                    <div className={[ styles['align-left-md'], styles['align-right'], styles['col-lg-5']].join(' ')}>
                        <hr className={[styles.space, styles['visible-md']].join(' ')} />
                        <Carousel
                            responsive={responsive}
                            autoPlay={true}
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            infinite={true}
                            removeArrowOnDeviceType={['tablet', 'mobile', 'desktop']}
                            partialVisible={false}
                            dotListclassName="custom-dot-list-style"
                        >
                            {sliderImageUrl.map((imageUrl, index) => {
                            return (
                                <div className="glide__slide-1" key={index}>
                                    <img className="width-415" src={imageUrl.url} alt="slide" />
                                    <hr className="space" />
                                    <h3 className="text-black text-uppercase">{imageUrl.trip}</h3>
                                    <p className="no-margin">Price from $ {imageUrl.price}</p>
                                </div>
                            );
                            })}
                        </Carousel>
                        
                    </div>
                </div>
                {/* <hr className={styles['space-lg']} /> */}
                {/* <hr className={[styles.space, styles['hidden-sm']].join(' ')} /> */}
                <GalleryH />
            </div>
        </section>
        <section className="section-color consultation-section section-call">
            <div style={{ position: 'relative'}} className={[styles.consultationDiv,styles.container].join(' ')}>
                <div style={{zIndex: '17'}} className="cnt-box cnt-changed cnt-call-floating cnt-call">
                        <h2>Book a free online consultation</h2>
                    <div className="caption">
                        <p>
                            Consult with us through Zoom for a detailed breakdown of your desired trek.
                        </p>
                        <a href="#book-consultation" className={[styles.btn, styles.btnFloat, styles['btn-xs']].join(' ')} data-anima="fade-left" data-time="3000">Book Consultation</a>
                    </div>
                </div>
                {/* <GalleryH /> */}
                
            </div>
        </section>
        <section className="section-base section-color">
            <div className={styles.container}>
                <div className={styles.title}>
                    <h2>Upcoming Events</h2>
                    <p>Secret wild locations</p>
                </div>
                <hr className="space-sm" />
                <div className='row'>
                    <div className='col-lg-8'>
                        <div className="grid-list pagination-top-right" data-columns="1">
                            <div className="grid-box">
                                <div className="grid-item event" style={{display: "block"}}>
                                    <div className="cnt-box cnt-box-blog-side boxed" data-href="post.html">
                                        <Link to="/routes/selected/lemosho-route" href="#" style={{backgroundImage: `url(${"https://res.cloudinary.com/dwxzlruyd/image/upload/v1713559168/kilimaj-hiking/Mt-Kenya-Routes/Kamweti-Route.jpg"})`}} className="img-box">
                                            <div className="blog-date">
                                                <span>01</span>
                                                <span>SEPT 2024</span>
                                            </div>
                                            {/* <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1713559168/kilimaj-hiking/Mt-Kenya-Routes/Kamweti-Route.jpg" alt="" style={{maxWidth: "387px", width: "387px", marginLeft: "-88px"}} /> */}
                                        </Link>
                                        <div className="caption">
                                            <h2>Lemosho route</h2>
                                            <ul className="icon-list icon-list-horizontal">
                                                <li><i className="icon-calendar"></i><a href="#">25th Sept to 2nd Oct</a></li>
                                                <li><i className="icon-bookmark"></i><a href="#">Treks</a></li>
                                                <li><i className="icon-user"></i><a href="#">Admin</a></li>
                                            </ul>
                                            <p>
                                                Join us on our adventure to the most beautiful of all the trekking trails up Mount Kilimanjaro.
                                                 <a href="#book-consultation" style={{fontSize: "15px", textDecoration: "underline"}}> click here</a> to book an online consultation with us and we wil brief you on our upcoming adventure to Mt. Kilimanjaro 
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="list-pagination">
                                <ul className="pagination align-center" data-page-items="3" data-page-items-md="2" data-pagination-anima="fade-right">
                                    <li className="first disabled">
                                        <a href="#">First</a>
                                    </li>
                                    <li className="prev disabled">
                                        <a href="#">Previous</a>
                                    </li>
                                    <li className="page active">
                                        <a href="#">1</a>
                                    </li>
                                    
                                    <li className="next disabled">
                                        <a href="#">Next</a>
                                    </li>
                                    <li className="last disabled">
                                        <a href="#">Last</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className='col-lg-4 events'>
                        <form className="form-box">
                            <div className="input-text-btn">
                                <input className="input-text" type="text" placeholder="Search ..." />
                                <input type="submit" disabled value="Search" className="btn" />
                            </div>
                        </form>
                        <h3>Popular Adventures</h3>

                        <div className="menu-inner menu-inner-vertical menu-inner-image">
                            <ul>
                                <li>
                                    <Link to="/routes/selected/lemosho-route">
                                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1690664099/kilimaj-hiking/lemosho/cover/20220531_095828_rezemk.jpg" alt="" />
                                        <span>Mt. Kilimanjaro</span>
                                        Lemosho Route
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/routes/selected/mt-kenya/chogoria-route">
                                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1713559173/kilimaj-hiking/Mt-Kenya-Routes/Chogoria-Route.jpg" alt="" />
                                        <span>Mt. Kenya</span>
                                        Chogoria
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/routes/selected/machame-route">
                                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1713559165/kilimaj-hiking/Mt-Kenya-Routes/Burguret-Route.jpg" alt="" />
                                        <span>Mt. Kilimanjaro</span>
                                        Machame Route
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/routes/selected/mt-kenya/sirimon-route">
                                        <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1713559162/kilimaj-hiking/Mt-Kenya-Routes/Sirimon-Route.jpg" alt="" />
                                        <span>Mt. Kenya</span>
                                        Sirimon
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="u-body u-xl-mode">
            <section className="u-clearfix u-section-1" id="carousel_eaec">
                <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                  <div className="u-container-style u-expanded-width-lg u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-group u-shape-rectangle u-group-1">
                    <div className="u-container-layout u-container-layout-1">
                      <div className="u-expanded-width-xs u-palette-1-base u-shape u-shape-rectangle u-shape-1"></div>
                      <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1711661128/kilimaj-hiking/Home-About-plus-3-image-gallery/1.jpg" alt="" className="u-image u-image-default u-image-1" data-image-width="500" data-image-height="750" />
                      <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1711661519/kilimaj-hiking/Home-About-plus-3-image-gallery/2.jpg" alt="" className="u-image u-image-default u-image-2" data-image-width="150" data-image-height="94" />
                      <img src="https://res.cloudinary.com/dwxzlruyd/image/upload/v1711661602/kilimaj-hiking/Home-About-plus-3-image-gallery/3.jpg" alt="" className="u-image u-image-default u-image-3" data-image-width="858" data-image-height="973" />
                    </div>
                  </div>
                  <div className="u-container-style u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-group u-white u-group-2">
                    <div className="u-container-layout u-valign-middle u-container-layout-2">
                      <h2 className="u-text u-text-1"> Afya Athletic is a Trekking &amp; Tour company&nbsp;</h2>
                      <p className="u-text u-text-2">
                      Welcome to Afya Athletic, your trusted companion on the journey to conquer the majestic Mount Kilimanjaro in Tanzania. As seasoned local guides, we're more than just a mountaineering company; we're the embodiment of a rich history passed down through generations of our ancestors and kinsmen.
                      </p>
                      <Link to="/about-us" className="u-border-2 u-border-hover-palette-1-base u-border-palette-1-base u-btn u-btn-round u-button-style u-hover-palette-1-base u-none u-radius-50 u-btn-1">Learn more</Link>
                    </div>
                  </div>
                </div>
            </section>
        </div>
        <section style={{content: " ", width: "100%", height: "100%",background: `linear-gradient(45deg, rgb(0 0 0 / 47%), rgb(0 0 0 / 71%)), url(https://res.cloudinary.com/dwxzlruyd/image/upload/v1714237315/kilimaj-hiking/Home-Treks-Gallery-Slider/10_xvyvyr.jpg)`}} className="section-image top-exp light" data-parallax="true" data-natural-height="1080" data-natural-width="1920" data-bleed="100" data-image-src="http://via.placeholder.com/1920x1080">
            <div className={[styles.container, 'progress-section'].join(' ')}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="progress-bar">
                            <h4>Experts only treks</h4>
                            <div>
                                <div className="data-progress" data-progress="30">
                                    <span className="counter" data-to="30" data-speed="2000" data-unit="%">30%</span>
                                </div>
                            </div>
                        </div>
                        <hr className="space-sm" />
                        <div className="progress-bar">
                            <h4>Emotions and fun</h4>
                            <div>
                                <div className="data-progress" data-progress="100">
                                    <span className="counter" data-to="100" data-speed="2000" data-unit="%">100%</span>
                                </div>
                            </div>
                        </div>
                        <hr className="space-sm" />
                        <div className="progress-bar">
                            <h4>Treks avarage difficulty</h4>
                            <div>
                                <div className="data-progress" data-progress="70">
                                    <span className="counter" data-to="70" data-speed="2000" data-unit="%">70%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.title}>
                            <h2>Don't Worry</h2>
                            <p>We know how to do it</p>
                        </div>
                        <p>Our number one concern is your safety. We are very experienced in dealing with how different people react to high altitude climbs. Whether you are a first time climber or an expert mountain climber, we will be there with you as you discover your limits.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* <section className="section-base">
            <div className={styles.container}>
                <table className="table table-grid table-border table-6-md">
                    <tbody>
                        <tr>
                            <td>
                                <div className="icon-box icon-box-top align-center">
                                    <i className="im-foot-2"></i>
                                    <div className="caption">
                                        <h3>Experienced team</h3>
                                        <p>We always lived inside our amazing nature</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="icon-box icon-box-top align-center">
                                    <i className="im-icq"></i>
                                    <div className="caption">
                                        <h3>Easy joining</h3>
                                        <p>Contact us and in 2 minutes you're booked</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="icon-box icon-box-top align-center">
                                    <i className="im-landscape"></i>
                                    <div className="caption">
                                        <h3>Expert hikers</h3>
                                        <p>Our mountans teached us everything we know</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="icon-box icon-box-top align-center">
                                    <i className="im-forest"></i>
                                    <div className="caption">
                                        <h3>Secret locations</h3>
                                        <p>Discover hidden natural places with our tours</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section> */}
        
    </main>
      <div id="book-consultation" style={{height: '650px'}}>
        <BookConsultation />
      </div>
      <Footer />
    </body>
    
    
  );
}

export default App;