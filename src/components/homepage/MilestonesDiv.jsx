import './milestonesDiv.scss'
import React, { useEffect, useState } from 'react'
import Hotel from './Hotel'
import Milestone from './Milestone';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

const MilestonesDiv = () => {
const [hotels, setHotels] = useState([]);

  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/photos?_limit=11')
  //     .then(response => response.json())
  //     .then(data => {
  //       const hotelData = data.map((item, index) => ({
  //         id: item.id,
  //         image: item.url,
  //         title: item.title,
  //         name: `Hotel ${index + 1}`,
  //         price: (Math.random() * 100 + 50).toFixed(2) // Random price between $50 and $150
  //       }));
  //       setHotels(hotelData);
  //     });
  // }, []);
  const arr = [{name:"Anura Kumara",role: "founder @ Google",des: "Pichai joined Gct management and innovation efforts for a suite of Google's cliens well as being largely responsible for Google Drive."},
    {name:"Anura Kumara",role: "founder @ Google",des: "Pichai  Following a short stint at the management consulting firm McKinsey & Co., Pichai joined Google in 2004,[9] where he lfor Google Drive."},
    {name:"Anura Kumara",role: "founder @ Google",des: "Pichai began his career as a materials ll as being largely responsible for Google Drive."},
    {name:"Anura Kumara",role: "founder @ Google",des: "Pichai began his career nageme9] whte of Google's client ely responsible for Google Drive."},
    {name:"Anura Kumara",role: "founder @ Google",des: "Pichai began his career the management consul joined Google in 2004,[9y responsible for Google Drive."},
    {name:"Anura Kumara",role: "founder @ Google",des: "Pi to., Pithe product management and innovation efforts fo being largely responsible for Google Drive."}
  ]

  return (
    <div className='milestonediv'>
            <h1>Our Milestones</h1>
            <div className='swiper-div'>
              <Swiper
              slidesPerView={3}
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
                {arr.map((milestone, index) => (
                <SwiperSlide key={index}>
                  <Milestone
                    name={milestone.name}
                    role={milestone.role}
                    des={milestone.des}
                  />
                </SwiperSlide>
                ))}
              </Swiper>
            </div>
    </div>
  )
}

export default MilestonesDiv




