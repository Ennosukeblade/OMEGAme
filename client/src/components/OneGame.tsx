import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
interface IVote {
  VoteId: number
  GameId: number
  userId: number
}

export default function OneGame() {
  const { id } = useParams<Params<string>>();
  const [oneGame, setOneGame] = useState<any>({gameId:0});
  const [user, setUser] = useState<any>({myVotes:[],gameId:0});
  const mydate = new Date(oneGame.createdAt);
  const [voted, setVoted] = useState<boolean>(false);
  const [cookies] = useCookies(["userId"]);

  console.log(cookies.userId)
  const formatedDate = mydate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
  useEffect(() => {
    axios
      .get("https://localhost:7223/api/Game/" + id)
      .then((response) => {
        console.log(response.data);
        setOneGame(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get("https://localhost:7223/api/User/" + cookies.userId)
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((err) => console.log(err));
  }, [oneGame,voted]);
  useEffect(() => {
    if (Array.isArray(oneGame.gameVotes)) {
      oneGame.gameVotes.forEach((OneVote: IVote) => {
        if (OneVote.userId == cookies.userId) {
          
          setVoted(true);
        }
      });
    }
  }, [oneGame]);
  const creatorName =
    oneGame.creator?.firstName + " " + oneGame.creator?.lastName;
  const creatorAvatar =
    oneGame.creator?.firstName + "+" + oneGame.creator?.lastName;
  const handleVote = () => {
    const vote = {UserId :Number = cookies.userId,GameId:Number= oneGame.gameId }
    axios
      .post("https://localhost:7223/api/vote", vote)
      .then((response) => {
        console.log(response.data);
        setVoted(true)
        
      })
      .catch((error) => {
        console.log(error)
      });
  };
  const DeleteVote = () => {
    
    axios
      .delete("https://localhost:7223/api/vote/"+user.myVotes[0].voteId)
      .then((response) => {
        console.log(response.data);
        setVoted(false)
      })
      .catch((error) => {
        console.log(error)
      });
  };
  const handleDownload = () => {
    // Replace '/api/download-folder' with the actual URL or route to your ASP.NET controller action
    window.open(`https://localhost:7223/api/game/download/${id}`, "_blank");
  };
  return (
    <div className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <div className="overflow-hidden rounded-lg lg:block">
            <img
              src={oneGame.myImages ? oneGame.myImages[0].fileName : ""}
              alt={oneGame.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Game info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {oneGame.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Game information</h2>

            <p className="text-3xl tracking-tight text-gray-900">
              {oneGame.price} TND
            </p>

            <form className="mt-10">
              <button
                onClick={handleDownload}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Download
              </button>
            </form>
            {oneGame.isPlayable ? (
              <form className="mt-5">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Play in Browser
                </button>
              </form>
            ) : (
              <></>
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={`https://ui-avatars.com/api/?background=ae369e&color=fff&name=${creatorAvatar}`}
                  alt={creatorName}
                />
                <div className="text-xs">
                  <p className="text-gray-900 leading-none">{creatorName}</p>
                  <p className="text-gray-600">{formatedDate}</p>
                </div>
              </div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{oneGame.description}</p>
              </div>
            </div>
            <div className="w-96">
              <iframe
                src={oneGame.path}
                title={oneGame.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {oneGame.gameJamId != null ? (
              user.myVotes.length == 0 || user.myVotes[0].gameId == oneGame.gameId?(
              voted ? (
                <div className="mt-8">
                  <button className="w-20 bg-blue text-white border border-blue hover:bg-blue-hover font-bold text-xxs uppercase rounded-xl transition duration-150 ease-in px-4 py-3"
                  onClick={DeleteVote}>
                    Voted
                  </button>
                </div>
              ) : (
                <div className="mt-8">
                  <button
                    className="w-20 bg-gray-200 border border-gray-200 hover:border-gray-400 font-bold text-xxs uppercase rounded-xl transition duration-150 ease-in px-4 py-3"
                    onClick={handleVote}
                  >
                    Vote
                  </button>
                </div>
              )
            ):<button
            className="w-85 bg-gray-300 border border-gray-300 hover:border-gray-400 font-bold text-xxs uppercase rounded-xl transition duration-150 ease-in px-4 py-3"
            
          >
            You already voted in another game
          </button>) : (
              <p>Game is not in game jam</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
