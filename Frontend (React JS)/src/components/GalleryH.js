import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Gallery.css'
import { Link } from 'react-router-dom';

const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 556 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 556, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const sliderImageUrl = [
    //First image url
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/1-BW.jpg",
      trip: 'Mt. Kenya',
      key: 1,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/2-BW.jpg",
      trip: 'Mt. Kilimanjaro',
      key: 2,
    },
    //Second image url
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/3-BW.jpg",
      trip: 'Mt. Longonot',
      key: 3,
    },
    //Third image url
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/4-BW.jpg",
      trip: 'Mt. Kilimanjaro',
      key: 4,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/5-BW.jpg",
      trip: 'Mt. Longonot',
      key: 5,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/6-BW.jpg",
      trip: 'Mt. Kenya',
      key: 6,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/7-BW.jpg",
      trip: 'Mt. Kilimanjaro',
      key: 7,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/8-BW.jpg",
      trip: 'Mt. Kenya',
      key: 8,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/9-BW.jpg",
      trip: 'Mt. Kenya',
      key: 9,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/10-BW.jpg",
      trip: 'Mt. Longonot',
      key: 10,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/11-BW.jpg",
      trip: 'Mt. Kenya',
      key: 11,
    },
    {
      url: "https://res.cloudinary.com/dwxzlruyd/image/upload/v1714774477/kilimaj-hiking/Home-Treks-Gallery-Slider/12-BW.jpg",
      trip: 'Mt. Kenya',
      key: 12,
    },
  ];

  

function GalleryH() {
    return (
        <div style={{borderTop: "1px solid"}} className="parent">
            <Carousel
                responsive={responsive}
                autoPlay={true}
                swipeable={true}
                draggable={true}
                showDots={true}
                infinite={true}
                partialVisible={false}
                dotListClass="custom-dot-list-style"
            >
                {sliderImageUrl.map((imageUrl, index) => {
                return (
                    <div className="slider" key={index}>
                      <Link className={`img-box home-parallax-${imageUrl.key} home-para-slider lightbox home-slider img-box-caption`} style={{boxShadow: "0 20px 40px -12px rgb(0 0 0 / 51%)",content: " ", width: "100%", height: "100%",background: `linear-gradient(90deg, rgb(24 24 24) 0px, rgb(24 24 24 / 40%) 0px, rgba(24, 24, 24, 0) 100%), url(${imageUrl.url})`}} to={imageUrl.url} data-lightbox-anima="fade-left">
                          <img style={{zIndex: "-233"}} src={imageUrl.url} alt="movie" />
                          <span>{imageUrl.trip}</span>
                      </Link>
                    </div>
                );
                })}
            </Carousel>
        </div>
    )
}

export default GalleryH
