import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css';
function Footer() {
    return (
        <footer className="light">
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className="col-lg-4">
                        <h3 className={styles.footerH3}>Afya Athletic</h3>
                        <p>Somewhere between the bottom of the climb and the summit is the answer to the mystery why we climb.</p>
                    </div>
                    <div className="col-lg-4">
                        <h3 className={styles.footerH3}>Contacts</h3>
                        <ul className="icon-list icon-line">
                            <li>Nairobi, Kenya</li>
                            <li> <i className="fas fa-envelope"></i> info@kilimanjaroawaits.com</li>
                            <li><i className="fas fa-phone"></i> +254 792 789 618</li>
                        </ul>
                    </div>
                    <div className="col-lg-4">
                        <div className="icon-links icon-social icon-links-grid social-colors">
                            <a className="facebook"><i className="fab fa-facebook-f"></i></a>
                            <a className="twitter"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.instagram.com/kilimanjaro.awaits/" className="instagram"><i className="fab fa-instagram"></i></a>
                            <a className="google"><i className="icon-google"></i></a>
                        </div>
                        <hr className="space-sm" />
                        <p>follow us on the social channels to stay tuned.</p>
                    </div>
                </div>
            </div>
            <div className="footer-bar">
                <div className={styles.container}>
                    <span>
                        <Link to="/contact-us">Contact Us</Link> | 
                        <Link to="/terms-and-conditions">Booking Terms </Link> | 
                        <Link to="/frequently-asked-questions">FAQs </Link>|
                        <Link to="/about-us">About Us</Link> | 
                        <Link to="/our-crew">Our Crew</Link> | 
                        <Link to="/what-to-expect">What to Expect</Link> | 
                        <Link to="/tipping">Tips for the Crew</Link>
                    </span>
                </div>
            </div>
            
        </footer>
            
    )
}

export default Footer
