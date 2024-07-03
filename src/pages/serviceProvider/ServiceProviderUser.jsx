import React, { useEffect, useState } from 'react'
import './ServiceProviderUser.scss'
import Navbar from '../../components/navbar/Navbar'
import Hotel from '../../components/serviceProvider/Hotel'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

const ServiceProviderUser = () => {
  const [hotels, setHotels] = useState([]);
  let arr=["Slide 1","Slide 2","Slide 3","Slide 4","Slide 5","Slide 6","Slide 7","Slide 8","Slide 9","Slide 10","Slide 11"]

  useEffect(() => {
    // Fetch data from JSONPlaceholder
    fetch('https://jsonplaceholder.typicode.com/photos?_limit=11')
      .then(response => response.json())
      .then(data => {
        const hotelData = data.map((item, index) => ({
          id: item.id,
          image: item.url,
          title: item.title,
          name: `Hotel ${index + 1}`,
          price: (Math.random() * 100 + 50).toFixed(2) // Random price between $50 and $150
        }));
        setHotels(hotelData);
      });
  }, []);

  return (
    <div>
        <Navbar />
      <div className='page'>
        <div className='left'></div>
        <div className='right'>
          <div className='hotels'>
            <h1>Hotels</h1>
          <Swiper
        slidesPerView={4}
        spaceBetween={50}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceProviderUser
