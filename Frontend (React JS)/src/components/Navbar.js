import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';
import { useState } from 'react';

function Navbar(props) {
    const [dropdownActive, setDropdownActive] = useState(false);
    useEffect(() => {
      if (props.navbarDark) {
          window.addEventListener("scroll", makeNavbarDark);
      }
      return function cleanup() {
          if (props.navbarDark) {
            window.removeEventListener("scroll", makeNavbarDark);
          }
      };
    }, [])

    const makeNavbarDark = () => {
        const { navbarDark } = props;
        const windowsScrollTop = window.pageYOffset;
        if (windowsScrollTop > navbarDark.height) {
            // document.body.getElementsByTagName("nav")[0].classList.remove(classes[color]);
            document.body.querySelector(`.menu-classic`).classList.add('scroll-menu')
        } else {
            document.body.querySelector(`.menu-classic`).classList.remove('scroll-menu')
            
        }
    };

    const displayMenuDropdown = () => {
        if (dropdownActive) {
            document.body.querySelector(`.menu-classic`).classList.remove('active')
            document.body.querySelector(`.menu-cnt`).classList.remove('activeDrop')
        } else {
            document.body.querySelector(`.menu-classic`).classList.add('active')
            document.body.querySelector(`.menu-cnt`).classList.add('activeDrop')
            
        }
        setDropdownActive(!dropdownActive)
    }
    return (
      <nav className={`${props.navbarDark.light? 'light': ''} menu-classic align-right ${props.navbarDark.transparent? 'menu-transparent': ''}  menu-fixed`} data-menu-anima="fade-in">
          <div className={styles.container} style={{height: '100%'}}>
              <div className='menu-brand'>
                    <Link className='menu-brand-a' to="/">
                        <img className={[styles['logo-default'], styles['scroll-hide']].join(' ')} src={require('../NewHomePage/media/afr.png')} alt="logo" />
                        <img className={[styles['logo-retina'], styles['scroll-hide']].join(' ')} src={require('../NewHomePage/media/afr.png')} alt="logo" />
                        <img className={[styles['logo-default'], styles['scroll-show']].join(' ')} src={require('../NewHomePage/media/afr.png')} alt="logo" />
                        <img className={[styles['logo-retina'], styles['scroll-show']].join(' ')} src={require('../NewHomePage/media/afr.png')} alt="logo" />
                    </Link>
              </div>
              <i onClick={displayMenuDropdown} className='menu-btn'></i>
              
              <div className='menu-cnt' >
                  <ul id="main-menu">
                      <li className={styles.dropdown}>
                        <Link to="/">
                            Home
                        </Link>
                          
                      </li>
                      <li className={styles.dropdown}>
                        <Link to="/routes?loc=all">
                            Treks
                        </Link>
                        <ul>
                            <li>
                                <Link to="/routes?loc=all">
                                    All Treks
                                </Link>
                            </li>
                            <li>
                                <Link to="/routes?loc=kenya">
                                    Mt. Kenya
                                </Link>
                            </li>
                            {/* <li>
                                <a href="treks-single.html">
                                    Mt. Longonot
                                </a>
                            </li> */}
                            <li>
                                <Link to="/routes?loc=kilimanjaro">
                                    Mt. Kilimanjaro
                                </Link>
                            </li>
                        </ul>
                      </li>
                      {/* <li>
                          <a href="blog.html">Blog</a>
                      </li> */}
                      <li>
                        <Link to="/contact-us">
                            Contact Us
                        </Link>
                      </li>
                  </ul>
                  <div className={ styles['menu-right']}>
                      
                  </div>
              </div>
          </div>
      </nav>
    )
}

export default Navbar
