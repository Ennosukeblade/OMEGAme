import { ChangeEvent, FormEvent, useState } from "react"

interface IGame {
    creator: number
    title: string
    genre: string
    price: number
    description: string
}
export const UploadGame = () => {
    const videoGameGenres = ['Action', 'Adventure', 'Role-playing', 'Simulation', 'Strategy', 'Sports', 'Fighting', 'Shooter', 'Horror', 'Platformer', 'Puzzle', 'Racing', 'Music', 'Stealth', 'Party', 'Survival', 'Massively multiplayer online'];
    const [game, setGame] = useState<IGame>({
        creator: 1,
        title: "",
        genre: "",
        price: 0,
        description: ""
    })
    const handleFileUpload = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/Upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            console.log("File uploaded successfully");
        } else {
            console.error("Failed to upload file");
        }
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            handleFileUpload(file);
        }
    };
    const handleChange = (e: ChangeEvent) => {
        e.preventDefault()
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
        setGame({ ...game, [name]: value });
    };
    return (
        <>
            {/* component

            UI Design Prototype
            Link : https://dribbble.com/shots/10452538-React-UI-Components */}

            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-1">
                <div className="relative py-2 sm:max-w-xl sm:mx-auto">
                    <div className="relative px-4 py-5 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-5">
                        <form className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                                <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 className="leading-relaxed">Upload a Game</h2>
                                    <p className="text-sm text-gray-500 font-normal leading-relaxed">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                                </div>
                            </div>
                            {/* <div className="divide-y divide-gray-200"> */}
                            <div className="py-4 text-base leading-6 space-y-2 text-gray-700 sm:text-lg sm:leading-7">
                                <input type="hidden" name="creator" value={game.creator} />
                                <div className="flex flex-col">
                                    <label className="leading-loose">Game Title</label>
                                    <input type="text" className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Event title" name="title" value={game.title} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Genre</label>
                                    <select className="border text-gray-600 text-sm rounded-md focus:ring-gray-500 focus:border-gray-900 block w-full p-2 border-gray-300 placeholder-gray-400" name="genre" onChange={handleChange}>
                                        <option selected>Choose a Genre</option>
                                        {
                                            videoGameGenres.map(genre => <option value={genre}>{genre}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Price</label>
                                    <input type="number" min={0} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" placeholder="Leave it empty if free" name="price" value={game.price} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Upload:</label>
                                    <p className="text-sm pb-1">You can only upload a zipped file</p>
                                    <input onChange={handleFileChange} type="file" accept=".zip,.rar" className="block w-full text-sm text-slate-500
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-full file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-violet-50
                                        hover:file:bg-violet-100"/>
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Description</label>
                                    <textarea rows={4} className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600" name="description" onChange={handleChange}>{game.description}</textarea>
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
                                    <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
                                </button>
                                <button type="submit" className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">Create</button>
                            </div>
                            {/* </div> */}
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
