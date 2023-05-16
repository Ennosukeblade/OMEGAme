import React, { useState, useEffect } from "react";
import { Link, Params, useParams } from "react-router-dom";
import axios from "axios";
import GameCard from "../components/GameCard";

const OneGameJamPage = () => {
  const { id } = useParams<Params<string>>();
  const [oneGameJam, setOneGameJam] = useState<any>({});
  const [games, setGames] = useState<any[]>([]);

  const currentDate = new Date();
  const [canUpload, setCanUpload] = useState<boolean>(false);
  const [canFetch, setCanFetch] = useState<boolean>(false);

  useEffect(() => {
    const startDate = new Date(oneGameJam.startDate);
    const endDate = new Date(oneGameJam.endDate);
    const voteEndDate = new Date(oneGameJam.votingEndDate);
    if (
      currentDate > startDate &&
      currentDate < endDate &&
      currentDate < voteEndDate
    ) {
      setCanUpload(true);
    } else {
      setCanUpload(false);
    }
    if (
      currentDate > startDate &&
      currentDate > endDate &&
      currentDate < voteEndDate
    ) {
      setCanFetch(true);
    } else {
      setCanFetch(false);
    }
  }, [oneGameJam]);

  useEffect(() => {
    axios
      .get("https://localhost:7223/api/GameJam/" + id)
      .then((response) => {
        console.log(response.data);
        setOneGameJam(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("https://localhost:7223/api/Game/gameJam/games/" + id)
      .then((response) => {
        console.log(response.data);
        setGames(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">{oneGameJam.title}</li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={oneGameJam.image}
              alt="Game Jam image"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {oneGameJam.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Game information</h2>

            {canUpload ? (
              <div className="mt-10">
                <Link to={`/games/upload/${oneGameJam.gameJamId}`}>
                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Upload Game
                  </button>
                </Link>
              </div>
            ) : (
              <p className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Sorry Cannot upload in the current time
              </p>
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {oneGameJam.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        {canFetch?<div className="mx-auto max-w-2xl p-4 sm:px-4 lg:max-w-7xl lg:p-4 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-md">
          {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* <p>{JSON.stringify(games[0]}</p> */}
            {games.map((game) => {
              // console.log(path + game.myImages[0].fileName.replace(/\\/g, '/'))
              return (
                <div key={game.gameId}>
                  <GameCard
                    id={game.gameId}
                    title={game.title}
                    price={game.price}
                    image={game.myImages[0].fileName}
                    creator={
                      game.creator.firstName + " " + game.creator.lastName
                    }
                    avatar="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT93ATNDzBpB63bYDVaL_DL4UXpH_5t0CBZ-UBFrMLfdvLbczdV"
                    date={game.createdAt}
                    description={game.description}
                  />

                  {/* <p>{path + game.myImages[0].fileName.replace(/\\/g, '/')}</p> */}
                  {/* <img src={require("../../../server/wwwroot/uploads/20/images/image.png")} alt="" /> */}
                </div>
              );
            })}
          </div>
        </div>:<></>}
        
      </div>
    </div>
  );
};

export default OneGameJamPage;
