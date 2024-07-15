import React from 'react'
import './payment.scss'
import visa from '../../assets/Visa.jpg'
import mastercard from '../../assets/Mastercard.svg'

const Payments = () => {
  return (
    <div className='payment'>
         <div className="payemnt-left">
              <div className="card-number">
                 <div className="top">
                               <h4>Card Number</h4>
                               <p>Enter the 16 digit card number on the card</p>                 
                 </div>
                 <div className="bottom">
                        <div className="bottom-left">
                          <img src={visa} alt="" />
                          <img src={mastercard} alt="" />
                        </div>
                        <input type="text" placeholder='**** **** **** ****'/>
                   

                 </div>
              </div>
              <div className="cvc">
                  <div className="cvc-left">
                      <h4>CVC Number</h4>
                      <p>Enter the 3 or 4 digit number on the card</p>                 
                  </div>
                  <div className="cvc-right">
                 
                  </div>
              </div>
              <div className="exp-date">
                  <div className="exp-date-left">
                      <h4>Expiry Date</h4>
                      <p>Enter the expiry date of the card</p>                 
                  </div>
                  <div className="exp-date-right">
                 
                  </div>
              </div>
              <div className="button">
                   <button>
                      Pay now
                    </button>
              </div>
             
         </div>
         <div className="payment-right"></div>      
    </div>
  )
}

export default Payments
