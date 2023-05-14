import React, { useEffect, useState } from 'react';
import bgImage from "../assets/img/gameJam.png";
import OneGameJam from '../components/OneGameJam';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

// const InComingGameJams = [
//     {
//         GameJamId:1,
//         Creator:{
//             firstName: "oussama",
//         },
//         Title:"OMEGAme Game Jam",
//         Description: "First Game Jam",
//         StartDate: "DateTime",
//         EndDate: "DateTime",
//         VotingEndDate:"DateTime"
//     }
// ]
const GameJams = () => {
    const mydate = new Date()
    const formatedDate = mydate.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "2-digit" })
    // const [gameJams, setGameJams] = useState<Array<IGameJam>>([]);
    const [gameJams, setGameJams] = useState<Array<any>>([])
    useEffect(() => {
        // Perform side effects or data fetching here
        // This code runs after the component has rendered
    
        // Example: Fetch data from an API
        fetch('https://localhost:7223/api/GameJam')
          .then(response => response.json())
          .then(data => setGameJams(data));
      }, []); // Empty dependency array to run the effect only once
    
  return (
    <div className="mx-auto ">
      <section className="-mt-16 ">
        <div
          className="bg-no-repeat bg-cover"
          style={{
            backgroundPosition: "50%",
            backgroundImage: `url(${bgImage})`,
            height: "500px",
          }}
        >
          <div
            className="h-full"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
          >
            <div className="flex justify-center items-center h-full">
              <div className="text-center text-white max-w-[800px]">
                <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-12">
                  Are you ready <br />
                  <span>for an adventure!</span>
                </h2>
                <p className="text-lg">
                  Enter a limitless realm of creativity. Join game jams,
                  collaborate, and transform your ideas into captivating
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className=" mx-auto max-w-2xl p-4 sm:px-4 lg:max-w-7xl lg:p-4 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-md my-5">
        <h1 className="text-lime-950 font-bold text-2xl">What's a Game Jam?</h1>
        <div className="flex items-start justify-around">
          <p className="text-neutral-900 w-2/3  ">
            Game jams are time-limited events where developers collaborate to
            create games.Join to prototype ideas, showcase skills, and be part
            of a vibrant community.
          </p>
          <button className="rounded-full bg-green-500 h-10 px-5 hover:bg-green-600 text-white font-medium">
            Host a Jam
          </button>
        </div>
      </div>
      <div className=" container mx-auto max-w-2xl p-4 sm:px-4 lg:max-w-7xl lg:p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md mt-9">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Incoming Jams
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
            {gameJams.map((gameJam) => (
              <OneGameJam 
              gameJamId={gameJam.gameJamId}
              userId={gameJam.userId}
              creator={gameJam.creator}
              title={gameJam.title}
              description={gameJam.description}
              image={gameJam.image}
              startDate={gameJam.startDate}
              endDate={gameJam.endDate}
              votingEndDate={gameJam.votingEndDate}
              createdAt={gameJam.createdAt}
              updatedAt={gameJam.updatedAt}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameJams;
