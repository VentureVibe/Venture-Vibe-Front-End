import profile1 from './assets/profilepics/Profile1.jpg'
import profile2 from './assets/profilepics/Profile2.jpg'
import profile3 from './assets/profilepics/Profile3.jpg'
import profile4 from './assets/profilepics/Profile4.jpg'
import profile5 from './assets/profilepics/Profile5.jpg'
import profile6 from './assets/profilepics/Profile6.jpg'
import profile7 from './assets/profilepics/Profile7.jpg'
import profile8 from './assets/profilepics/Profile8.jpg'
import profile9 from './assets/profilepics/Profile9.jpg'
import profile10 from './assets/profilepics/Profile10.jpg'

import Image1 from './assets/Places/ella.jpg'
import Image2 from './assets/Places/seegiriyawebp.webp'
import Image3 from './assets/Places/beach.jpg'
import Image4 from './assets/Places/galle.jpg'
import Image5 from './assets/Places/ambulawawa.webp'
import Image6 from './assets/Places/DambullaCave.webp'
import Image7 from './assets/Places/dunhida.jpg'
import Image8 from './assets/Places/Nuwaraeliya.jpg'
import Image9 from './assets/Places/Colombo.jpg'

import Hotel1 from './assets/hotel1.jpg';
import Hotel2 from './assets/hotel2.jpg';
import Hotel3 from './assets/hotel3.jpg';

import Place1 from './assets/place1.jpg';
import Place2 from './assets/place2.jpg';
import Place3 from './assets/place3.jpg';

import Res1 from './assets/res1.jpg';
import Res2 from './assets/res2.jpg';
import Res3 from './assets/res3.jpg';

export const days = [
    "Sunday, June 9th",
    "Monday, June 10th",
    "Tuesday, June 11th",
    "Wednesday, June 12th",
    "Thursday, June 13th",
    "Friday, June 14th",
    "Saturday, June 15th"
]

export const hotels = [
    {
        id: 1,
        name: "The Fortress Resort and Spa",
        price: 150,
        imageSrc: Hotel1,
        rating: 4.5
    },
    {
        id: 2,
        name: "The Fort Printers",
        price: 250,
        imageSrc: Hotel2,
        rating: 4.8
    },
    {
        id: 3,
        name: "Jetwing Lighthouse",
        price: 170,
        imageSrc: Hotel3,
        rating: 5
    }
]


export const places = [
    {
        id: 1,
        name: "Unawatuna Beach",
        rating: 4.5,
        imageSrc: Place1
    },
    {
        id: 2,
        name: "Galle Dutch Fort",
        rating: 5.0,
        imageSrc: Place2
    },
    {
        id: 3,
        name: "Jungle Beach",
        rating: 4.7,
        imageSrc: Place3
    }
]

export const restaurants = [
    {
        id: 1,
        name: "Luuma Beach",
        rating: 4.5,
        imageSrc: Res2
    },
    {
        id: 2,
        name: "Ocean Bistro by Starbeans",
        rating: 4.8,
        imageSrc: Res3
    },
    {
        id: 3,
        name: "Sea Waves Restaurant",
        rating: 4.0,
        imageSrc: Res1
    }
]

export const friends = [
    {
        id: 1,
        name: "Himasha Ravishanka",
        messages: 2,
        imageSrc: profile1,
        coverSrc: Image1
    },
    {
        id: 2,
        name: "John Doe",
        messages: 5,
        imageSrc: profile2,
        coverSrc: Image2
    },
    {
        id: 3,
        name: "Jane Smith",
        messages: 3,
        imageSrc: profile3,
        coverSrc: Image3
    },
    {
        id: 4,
        name: "Michael Johnson",
        messages: 1,
        imageSrc: profile4,
        coverSrc: Image4
    },
    {
        id: 5,
        name: "Emily Brown",
        messages: 0,
        imageSrc: profile5,
        coverSrc: Image5
    },
    {
        id: 6,
        name: "David Wilson",
        messages: 4,
        imageSrc: profile6,
        coverSrc: Image6
    },
    {
        id: 7,
        name: "Sarah Lee",
        messages: 2,
        imageSrc: profile7,
        coverSrc: Image7
    },
    {
        id: 8,
        name: "Chris Martin",
        messages: 7,
        imageSrc: profile8,
        coverSrc: Image8
    },
    {
        id: 9,
        name: "Emma Davis",
        messages: 6,
        imageSrc: profile9,
        coverSrc: Image9
    },
    {
        id: 10,
        name: "James Rodriguez",
        messages: 2,
        imageSrc: profile10,
        coverSrc: Image3
    }
];


export const posts = [
    {
        id: 1,
        profile: profile1,
        imageSrc: Image1,
        description: "I just returned from an amazing trip to Ella! The scenic views and charming atmosphere made it an unforgettable experience. 🌄✨ #Ella #TravelDiaries",
        userId: 1,
        name: "Himasha Ravishaka"
    },
    {
        id: 2,
        profile: profile2,
        imageSrc: Image2,
        description: "Just returned from Sigiriya! The ancient fortress and breathtaking views were unforgettable. 🏰🌿 #Sigiriya #TravelMagic",
        userId: 2,
        name: "John Doe"
    },
    {
        id: 3,
        profile: profile3,
        imageSrc: Image3,
        description: "Just returned from Nilaveli! The pristine beaches and serene atmosphere made it a perfect getaway. 🏖️🌊 #Nilaveli #TravelBliss",
        userId: 3,
        name: "Jane Smith",
    },
    {
        id: 4,
        profile: profile4,
        imageSrc: Image4,
        userId: 4,
        description: "Just got back from an incredible journey to Galle! The historic fort, beautiful beaches, and vibrant culture made it a trip to remember. 🏰🌊✨ #Galle #TravelAdventures",
        name: "Michael Johnson",
    },
    {
        id: 5,
        profile: profile5,
        imageSrc: Image5,
        description: "Visited Ambulawawa Tower! The panoramic views from the top and the surrounding nature were breathtaking. 🏞️🌳 #Ambulawawa #NatureViews",
        name: "Emily Brown",
        userId: 5,
    },

    {
        id: 6,
        profile: profile6,
        imageSrc: Image6,
        description: "Exploring Dunhinda Falls! The cascading waterfalls amidst lush greenery made for a refreshing day out. 🌊🌿 #DunhindaFalls #NatureBeauty",
        name: "David Wilson",
        userId: 6,
    },
    {
        id: 7,
        profile: profile7,
        imageSrc: Image8,
        description: "Chilling in Nuwara Eliya! The cool climate and scenic tea estates provided a relaxing retreat. ☕🍃 #NuwaraEliya #TeaCountry",
        name: "Chris Martin",
        userId: 7,
    },
    {
        id: 8,
        profile: profile9,
        imageSrc: Image9,
        description: "Exploring Colombo! The bustling city life, historic sites, and vibrant markets made for an exciting urban adventure. 🏙️🌆 #Colombo #CityLife",
        name: "James Rodriguez",
        userId: 8,
    },
    {
        id: 9,
        profile: profile5,
        imageSrc: Image9,
        description: "Visited Ambulawawa Tower! The panoramic views from the top and the surrounding nature were breathtaking. 🏞️🌳 #Ambulawawa #NatureViews",
        name: "Emily Brown",
        userId: 5,
    },
];

export const getUserById = (userId) => {
    return friends.find(friend => friend.id === userId);
};