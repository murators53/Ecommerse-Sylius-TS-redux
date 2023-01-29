import { Splide, SplideSlide } from '@splidejs/react-splide';
import React from 'react'

const HomePage = () => {
  return (
    <div>
      <Splide aria-label="My Favorite Images"
        options={{
          type: 'loop',
          rewind: true,
          speed: 0,
          rewindSpeed: 0.1,
          start: 0,
          perPage: 1,//sayfada goruntulenecek slayt sayisi,
          perMove: 1,//hangi sirala atlayarak ilerlesin 2 serli mi atlasin
          drag: 'free',
          gap: '5rem',
          arrows: true,//oklari=arrows
          pagination: true,//determines whether to create pagination or not, at the bottom of picture
          height: '500px',
        }}
      >
        <SplideSlide>
          <img src="assets/images/slider_1.jpg" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="assets/images/slider_2.jpg" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="assets/images/slider_3.jpg" alt="Image 1" />
        </SplideSlide>
      </Splide>
        
    </div>
  )
}

export default HomePage