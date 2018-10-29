import React from 'react'
import Swiper from 'react-id-swiper';
import 'react-id-swiper/src/styles/scss/swiper.scss'

const Slider = props => {
  const slider1 = '/image/slider-1.jpg';
  const slider2 = '/image/slider-2.jpg';
  const slider3 = '/image/slider-3.jpg';
  const slider4 = '/image/slider-4.jpg';
  const slider5 = '/image/slider-5.jpg';
  const params = {
    effect: 'flip',
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: (index, className) => {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
      }
    },

    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };
  return (
    <Swiper {...params}>
      <div style={{backgroundImage: `url(${slider1})`}}></div>
      <div style={{backgroundImage: `url(${slider2})`}}></div>
      <div style={{backgroundImage: `url(${slider3})`}}></div>
      <div style={{backgroundImage: `url(${slider4})`}}></div>
      <div style={{backgroundImage: `url(${slider5})`}}></div>
    </Swiper>
  )
}

export default Slider
