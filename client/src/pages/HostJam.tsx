import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
interface IGameJam {
  userId: number;
  title: string;
  description: string;
  image: string;
  startDate: Date;
  endDate: Date;
  votingEndDate: Date;
}
const HostJam = () => {
  const [cookies] = useCookies(['userId', 'firstName', 'lastName']);
  const nav = useNavigate()
  const [gameJam, setGameJam] = useState<IGameJam>({
    userId: cookies.userId,
    title: "",
    description: "",
    image: "",
    startDate: new Date(),
    endDate: new Date(),
    votingEndDate: new Date(),
  });

  const [images, setImages] = useState<File>(new File([], ""));
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(event.target.files[0]);
    }
  };
  const handleChange = (e: ChangeEvent) => {
    e.preventDefault();
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    if (name in ["startDate", "endDate", "votingEndDate"]) {
      const parsedDate = new Date(value); // Parse the input value as a Date object
      if (!isNaN(parsedDate.getTime())) {
        setGameJam({ ...gameJam, [name]: new Date(value) });
      }
    } else {
      setGameJam({ ...gameJam, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Step 1: Create the game
      const gameResponse = await axios.post(
        "https://localhost:7223/api/gameJam",
        gameJam
      );
      if (gameResponse.status === 200) {
        const gameJamId = gameResponse.data.value.gameJamId;
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        console.log(images);

        const imageFormData = new FormData();
        imageFormData.append("image", images);
        console.log(imageFormData);

        const imageUploadResponse = await axios.post(
          `https://localhost:7223/api/GameJam/Image/${gameJamId}`,
          imageFormData,
          { headers }
        );
        if (imageUploadResponse.status === 200) {
          console.log("Image uploaded successfully", imageUploadResponse.data);
          nav("/gamejams")
        }

        // *Make another POST request here for images
      } else {
        // Handle other response statuses here
      }
    } catch (error) {
      console.log("❌ ERROR from server", error);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-1">
        <div className="relative py-2 sm:max-w-xl sm:mx-auto">
          <div className="relative px-4 py-5 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-5">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="flex items-center space-x-5">
                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                  G
                </div>
                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                  <h2 className="leading-relaxed">Host a Jam</h2>
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
                    name="title"
                    onChange={handleChange}
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
                  <label htmlFor="startDate" className="leading-loose">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={gameJam.startDate.toString()} // Convert to ISO string format
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="endDate" className="leading-loose">
                    End Date:
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={gameJam.endDate.toString()} // Convert to ISO string format
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="votingEndDate" className="leading-loose">
                    Voting End Date:
                  </label>
                  <input
                    type="date"
                    id="votingEndDate"
                    name="votingEndDate"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    value={gameJam.votingEndDate.toString()} // Convert to ISO string format
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Description</label>
                  <textarea
                    rows={4}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    name="description"
                    onChange={handleChange}
                  ></textarea>
                </div>
                {/* <div className="flex items-center space-x-4">
                                            <div className="flex flex-col">
                                                <label className="leading-loose">Start</label>
                                                <div className="relative focus-within:text-gray-600 text-gray-400">
                                                    <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="25/02/2020" />
                                                    <div className="absolute left-3 top-2">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <label className="leading-loose">End</label>
                                                <div className="relative focus-within:text-gray-600 text-gray-400">
                                                    <input type="text" className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="26/02/2020" />
                                                    <div className="absolute left-3 top-2">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
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
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  Create
                </button>
              </div>
              {/* </div> */}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostJam;
