import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Params, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";

const videoGameGenres = [
  "Action",
  "Adventure",
  "Role-playing",
  "Simulation",
  "Strategy",
  "Sports",
  "Fighting",
  "Shooter",
  "Horror",
  "Platformer",
  "Puzzle",
  "Racing",
  "Music",
  "Stealth",
  "Party",
  "Survival",
  "Massively multiplayer online",
];

const Loading = () => {
  return <p className="text-center">Uploading in progress...</p>
}

export const UploadGame = () => {

  const { id } = useParams<Params<string>>();
  const [cookies] = useCookies(['userId']);
  const [game, setGame] = useState<any>({
    UserId: cookies.userId,
    Title: "",
    Genre: "",
    Price: 0,
    Description: "",
    isPlayable: false,
    Path: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    if (id != "0") {
      console.log("anything here")
      setGame({ ...game, GameJamId: id })
    }
  }, []);

  const [formData, setFormData] = useState<FormData | null>(null);
  const handleFileUpload = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    setFormData(data);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleFileUpload(file);
    }
  };

  const [images, setImages] = useState<File>(new File([], ""));
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(event.target.files[0]);
    }
  };
  const handleChange = (e: ChangeEvent) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setGame({ ...game, [name]: value });

  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      // Step 1: Create the game
      const gameResponse = await axios.post(
        "https://localhost:7223/api/game",
        game
      );
      if (gameResponse.status === 200) {
        const gameId = gameResponse.data.value.gameId;

        // *Make another POST request here for game file
        console.log(game);
        const gameUploadResponse = await axios.post(
          `https://localhost:7223/api/Game/upload/${gameId}`,
          formData
        );
        if (gameUploadResponse.status === 200) {
          console.log(
            "Game file uploaded successfully",
            gameUploadResponse.data
          );
        }
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        console.log(images);

        const imageFormData = new FormData();
        imageFormData.append("image", images);
        console.log(imageFormData);

        const imageUploadResponse = await axios.post(
          `https://localhost:7223/api/Image/${gameId}`,
          imageFormData,
          { headers }
        );
        if (gameResponse.status === 200) {
          console.log("Image uploaded successfully", imageUploadResponse.data);
        }

        // *Make another POST request here for images
      } else {
        // Handle other response statuses here
      }
    } catch (error) {
      console.log("❌ ERROR from server", error);
    }
    setIsLoading(false)

  };
  return (
    <>
      {/* component

            UI Design Prototype
            Link : https://dribbble.com/shots/10452538-React-UI-Components */}

      <div className="py-6 flex flex-col justify-center sm:py-1">
        <div className="relative py-2 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-5 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-5">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  i
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Upload a Game</h2>
                  <p className="text-sm text-gray-500 font-normal leading-relaxed">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
              {/* <div className="divide-y divide-gray-200"> */}
              <div className="py-4 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
                <input type="hidden" name="UserId" value="10" />
                <div className="flex flex-col">
                  <label className="leading-loose">Game Title</label>
                  <input
                    type="text"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Event title"
                    name="Title"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Genre</label>
                  <select
                    className="border text-gray-600 text-sm rounded-md focus:ring-gray-500 focus:border-gray-900 block w-full p-2 border-gray-300 placeholder-gray-400"
                    name="Genre"
                    onChange={handleChange}
                  >
                    <option selected>Choose a Genre</option>
                    {videoGameGenres.map((Genre) => (
                      <option value={Genre}>{Genre}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Price</label>
                  <input
                    type="number"
                    min={0}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="Leave it empty if free"
                    name="Price"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Upload:</label>
                  <p className="text-sm pb-1">
                    You can only upload a zipped file
                  </p>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept=".zip,.rar"
                    className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50
                                        hover:file:bg-violet-100"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Upload Images:</label>
                  <p className="text-sm pb-1">You can only upload 5 images</p>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50
                                        hover:file:bg-violet-100"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Description</label>
                  <textarea
                    rows={4}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    name="Description"
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none">
                  <svg
                    className="w-6 h-6 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>{" "}
                  Cancel
                </button>

                {isLoading ?
                  <button type="button" className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none" disabled>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    </svg>
                    Processing...
                  </button>
                  : <button
                    type="submit"
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                  >
                    Create
                  </button>}

              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};
