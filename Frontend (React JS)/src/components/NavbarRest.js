import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Navbar from './Navbar';
import styles from './Navbar.module.css';

function NavbarRest(props) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [parallaxHeight, setParallaxHeight] = useState(500);
    useEffect(() => {
        
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if(window.innerWidth > 974){
                setParallaxHeight(600)
            }else{
                setParallaxHeight(500)

            }
        };
        
    
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        
    }, [])
    return (
        <>
            {/* <div className={[styles["parallax-mirror"], styles["ken-burn-center"]].join(' ')} style={{visibility: 'visible', zIndex: '-100', position: 'fixed', left: '0px', overflow: 'hidden', transform: 'translate3d(0px, 0px, 0px)', height: `${parallaxHeight}px`, width: `${screenWidth}px`,}}>
                <img className={[styles['parallax-slider'], styles['ken-burn-center-img']].join(' ')} src={props.headerProps.parallaxImg} style={{transform: 'translate3d(0px, 0px, 0px)', position: 'absolute', height: 'auto', width: `${screenWidth}px`, maxWidth: 'none'}}/>        
            </div> */}
            <Navbar navbarDark={{height: 100, transparent: false, light: false}} />
            <header style={{backgroundImage: `url(${props.headerProps.parallaxImg})`}} className={`${props.headerProps.AllRoutes ? "header-all-routes": " "} header-image ken-burn-center light`} data-parallax="true" data-natural-height="1080" data-natural-width="1920" data-bleed="0" data-image-src="http://via.placeholder.com/1920x1080" data-offset="0">
                <div className={styles.container}>
                    <h1 style={{marginBottom: '0px', marginTop: '0px'}}>{props.headerProps.parallaxTitle}</h1>
                    <h2 style={{marginBottom: '0px', lineHeight: '2.0', fontFamily: "'Montserrat', sans-serif"}}>{props.headerProps.parallaxCaption}</h2>
                    <ol className="breadcrumb">
                        <li>
                            <Link to='/'>Home</Link>
                        </li>
                        <li>
                            <Link to='/routes'>Treks</Link>
                        </li>
                        <li><a href="#">{props.headerProps.parallaxTitle}</a></li>
                    </ol>
                </div>
            </header>
        </>
    )
}

export default NavbarRest