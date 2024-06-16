import "./communityFriends.scss"
import man from "../../assets/profilepics/Profile1.jpg";


const CommunityFriends = () => {
  return (
    <div className='communityFriends'>
        <div className="top">
           <h1>Friends</h1>
           <div className='nav-search'>
           <input type="text" placeholder='Search'/>
           <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        </div>
        <div className="bottom">
            <Friend/>
            <Friend/>
            <Friend/>
            <Friend/>
            <Friend/>
            <Friend/>

        </div>
        <div className="view-more">
            <i class="fa-solid fa-angles-down"></i>
           More
        </div>
    </div>
  )
}

const Friend=({name,messages,imageSrc})=>{
  return(
    <div className="friend">
          <img src={man} alt="" />
          <p>{name}</p>
          <div className="circle">{messages}</div> 
  </div>
  )
  
}

Friend.defaultProps = {
  name: "Nimasha Sathsarani",
  messages:6,
  imageSrc: man 
};

export default CommunityFriends