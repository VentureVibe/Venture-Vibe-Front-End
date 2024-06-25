import React, { useEffect, useState } from 'react'
import './DestinationDiv.scss'
import Hotel from './Hotel'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

const DestinationDiv = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch data from JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=11')
      .then(response => response.json())
      .then(data => {
        const hotelData = data.map((item, index) => ({
          id: item.id,
          image: /*item.url*/'/src/assets/homepage/imagehome1.jpg',
          title: /*item.title*/'Hikkaduwa Beach',
          name: `Hotel ${index + 1}`,
          price: (Math.random() * 100 + 50).toFixed(2) // Random price between $50 and $150
        }));
        setHotels(hotelData);
      });
  }, []);

  return (
    <div className='destination-div'>
            <h1>Popular Destinations</h1>
            <div className='swiper-div'>
              <Swiper
              slidesPerView={3}
              spaceBetween={20}
              loop={true}
              /*pagination={{
                clickable: true,
                dynamicBullets: true,
              }}*/
              //navigation={true}
              navigation= {{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
              >
                {hotels.map((hotel, index) => (
                <SwiperSlide key={hotel.id}>
                  <Hotel
                    image={hotel.image}
                    title={hotel.title}
                    name={hotel.name}
                    price={hotel.price}
                  />
                </SwiperSlide>
                ))}
              </Swiper>
              <div className='btn'>
                <button className="swiper-button-prev swiper-navBtn"><i className="fa-solid fa-angle-left"></i></button>
                <button className="swiper-button-next swiper-navBtn"><i className="fa-solid fa-angle-right"></i></button>
              </div>
            </div>
    </div>
  )
}

export default DestinationDiv
