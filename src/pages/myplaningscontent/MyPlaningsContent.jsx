import React, { useState } from 'react';
import './MyPlaningsContent.scss';
import MyplanningsAccepted from '../../components/MyplanningsAccepted/MyplanningsAccepted';
import MyplanningsOwnedPlans from '../../components/myplanningsOwnedPlans/MyplanningsOwnedPlans';

const MyPlaningsContent = () => {
  const [activeTab, setActiveTab] = useState('owned');

  return (
    <div className='MyPlanningsContent'>
      <div className="content-top">
        <div className="search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder='Search your content'/>
          <button>Search</button>
        </div>
        <div className="menu">
          <div className="cont">
            <p 
              className={activeTab === 'owned' ? 'active' : ''} 
              onClick={() => setActiveTab('owned')}
            >
              Owned By Me
            </p>
            <p 
              className={activeTab === 'accepted' ? 'active' : ''} 
              onClick={() => setActiveTab('accepted')}
            >
              Accepted
            </p>
          </div>
        </div>
      </div>
      <div className="content-bottom">
        {activeTab === 'owned' && <MyplanningsOwnedPlans />}
        {activeTab === 'accepted' && <MyplanningsAccepted />}
      </div>
    </div>
  );
}

export default MyPlaningsContent;
