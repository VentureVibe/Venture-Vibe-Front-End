import React from 'react'
import './main.scss'

const Main = () => {
  return (
    <div className='home'>
    <div className='div-1'>
      <div className='left-div-1'>
        <p className='head'>The Adventures<br /><span className='head-1'></span></p>
        <p>This is a main paragraph in our travel planning website. You can take many services from our web and it's also Free.</p>
        <div className='btn-with-input'>
          <input type='text' placeholder='Where you want to go ?' />
          <button>Search</button>
        </div>
        <div className='data-div-1'>
          <div className='each-data'><h1>50+</h1><p>Destinations</p></div>
          <div className='each-data'><h1>200+</h1><p>Tourists</p></div>
          <div className='each-data'><h1>100+</h1><p>Hotels</p></div>
        </div>
      </div>
      <div className='right-div-1'>
          <div className='image-wrapper'><img src='/src/assets/homepage/imagehome1.jpg' /></div>
          <div className='image-wrapper'><img src='/src/assets/homepage/imagehome3.jpg' /></div>
          <div className='image-wrapper'><img src='/src/assets/homepage/imagehome5.jpg' /></div>
      </div>
    </div>

    <div className='div-2'>
      <div className='left-div-2'>
        <div className='image-container'>
          <img src='/src/assets/homepage/imagehome2.jpg' />
          <div className='image-des'>
            <p>Island Indonesio</p>
            <div className='rating'>
            <i className="fa fa-star" aria-hidden="true"></i>
            <p>4.5/5</p>
            </div>
            <div className='favorite'>
            <i className="fa fa-heart" aria-hidden="true"></i>
            <p>1.2k</p>
            </div>
          </div>
        </div>
        <div className='image-container'>
          <img src='/src/assets/homepage/imagehome3.jpg' />
          <div className='image-des'>
            <p>Island Indonesio</p>
            <div className='rating'>
            <i className="fa fa-star" aria-hidden="true"></i>
            <p>4.5/5</p>
            </div>
            <div className='favorite'>
            <i className="fa fa-heart" aria-hidden="true"></i>
            <p>1.2k</p>
            </div>
          </div>
        </div>
        <div className='image-container'>
        <img src='/src/assets/homepage/imagehome1.jpg' />
          <div className='image-des'>
            <p>Island Indonesio</p>
            <div className='rating'>
            <i className="fa fa-star" aria-hidden="true"></i>
            <p>50</p>
            </div>
            <div className='favorite'>
            <i className="fa fa-heart" aria-hidden="true"></i>
            <p>LR</p>
            </div>
          </div>
        </div>
      </div>
      <div className='right-div-2'>
        <p>THIS WEEK'S TOP<br />PICKS</p>
        <p>Let's spend your money and enjoy</p>
        <button>Find Place</button> 
      </div>
    </div>

    <div className='div-3'>
      <div className='div-3-container'>
      <i className="fa fa-user-plus fa-2xl" aria-hidden="true"></i>
      <p className='head'>Sign Up</p>
      <p className='des'>Sign up free and<br /> enjoy more packages</p>
      </div>
      <div className='div-3-container'>
      <i className="fa-solid fa-route fa-2xl"></i>
      <p className='head'>Existing Travel</p>
      <p className='des'>Start and explore a wide<br />range of existing travel experiance</p>
      </div>
      <div className='div-3-container'>
      <i className="fa-solid fa-hand-holding-dollar fa-2xl"></i>
      <p className='head'>Worth of Money</p>
      <p className='des'>We hve a lot of hotels and  packages<br />so save your money</p>
      </div>
    </div>
    </div>
  )
}

export default Main
