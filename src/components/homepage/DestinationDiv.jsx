import React, { useEffect, useState } from "react";
import "./DestinationDiv.scss";
import Hotel from "./Hotel";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";

const DestinationDiv = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch data from JSONPlaceholder
    // fetch('https://jsonplaceholder.typicode.com/photos?_limit=11')
    //   .then(response => response.json())
    //   .then(data => {
    //     const hotelData = data.map((item, index) => ({
    //       id: item.id,
    //       image: /*item.url*/'/src/assets/homepage/imagehome1.jpg',
    //       title: /*item.title*/'Hikkaduwa Beach',
    //       name: `Hotel ${index + 1}`,
    //       price: (Math.random() * 100 + 50).toFixed(2) // Random price between $50 and $150
    //     }));
    //     setHotels(hotelData);
    //   });
    const mockData = [
      {
        id: 1,
        image: "/src/assets/homepage/hikkaduwab.jpg",
        title: "Hikkaduwa Beach",
        name: "Hotel Coral Sands",
        city: "Hikkaduwa",
        price: "4.5/5",
      },
      {
        id: 2,
        image: "/src/assets/homepage/sigiriya.jpeg",
        title: "Sigiriya Rock Fortress",
        name: "Hotel Sigiriya",
        city: "Sigiriya",
        price: "4.8/5",
      },
      {
        id: 3,
        image: "/src/assets/homepage/lap.jpg",
        title: "Little Adam's Peak",
        name: "98 Acres Resort",
        city: "Ella",
        price: "4.6/5",
      },
      {
        id: 4,
        image: "/src/assets/homepage/hp.jpg",
        title: "Horton Plains",
        name: "The Grand Hotel",
        city: "Nuwara Eliya",
        price: "4.6/5",
      },
      {
        id: 5,
        image: "/src/assets/homepage/arugambay.jpg",
        title: "Arugam Bay Beach",
        name: "Bay Vista Hotel",
        city: "Arugam Bay",
        price: "3.9/5",
      },
      {
        id: 6,
        image: "/src/assets/homepage/tot.jpg",
        title: "Temple of the Tooth",
        name: "Hotel Thilanka",
        city: "Kandy",
        price: "4.3/5",
      },
      {
        id: 7,
        image: "/src/assets/homepage/lg.jpeg",
        title: "Lighthouse",
        name: "Galle Fort Hotel",
        city: "Galle",
        price: "4.0/5",
      },
      {
        id: 8,
        image: "/src/assets/homepage/elephents.jpg",
        title: "Yala National Park",
        name: "Jetwing Yala",
        city: "Yala",
        price: "4.7/5",
      },
      {
        id: 9,
        image: "/src/assets/homepage/beach.jpeg",
        title: "Coconut Tree Hill",
        name: "Mandara Resort",
        city: "Mirissa",
        price: "4.8/5",
      },
      {
        id: 10,
        image: "/src/assets/homepage/polo.jpeg",
        title: "Polonnaruwa Ancient City",
        name: "Deer Park Hotel",
        city: "Polonnaruwa",
        price: "3.8/5",
      },
      {
        id: 11,
        image: "/src/assets/homepage/fishc.jpeg",
        title: "Nilaveli Beach",
        name: "Trinco Blu by Cinnamon",
        city: "Trincomalee",
        price: "4.2/5",
      },
    ];

    setHotels(mockData);
  }, []);

  return (
    <div className="destination-div">
      <h1>Popular Destinations</h1>
      <div className="swiper-div">
        <Swiper
          slidesPerView={4}
          spaceBetween={20}
          loop={true}
          /*pagination={{
                clickable: true,
                dynamicBullets: true,
              }}*/
          //navigation={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {hotels.map((hotel, index) => (
            <SwiperSlide key={hotel.id}>
              <Hotel
                image={hotel.image}
                title={hotel.title}
                name={hotel.city}
                price={hotel.price}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="btn">
          <button className="swiper-button-prev swiper-navBtn">
            <i className="fa-solid fa-angle-left"></i>
          </button>
          <button className="swiper-button-next swiper-navBtn">
            <i className="fa-solid fa-angle-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDiv;
