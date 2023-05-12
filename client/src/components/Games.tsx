import { useState, useEffect } from 'react'
import axios from 'axios'

// interface Igame {
//     GameId: number
//     UserId: number
//     Title: string
//     Price: number
//     Description: string
//     genre: string
// }
const Games = () => {
    const [games, setGames] = useState<Array<any>>([])
    useEffect(() => {
        const fetchGames = async () => {
            await axios.get("https://localhost:7223/api/Game")
                .then(response => setGames(response.data))
                .catch(err => console.log(err))
        }
        fetchGames()
    }, [])
    console.log(games[0])
    return (
        <div className="mx-auto max-w-2xl p-4 sm:px-4 lg:max-w-7xl lg:p-4 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-md">
            {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {/* <p>{JSON.stringify(games)}</p> */}
                {games.map((game) => (

                    < div key={game.gameId} className="group relative" >
                        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                            <img
                                src=""
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />

                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0">
                                            {game.title}
                                        </span>
                                    </a>
                                </h3>

                            </div>
                            <p className="text-sm font-medium text-gray-900">{game.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}

export default Games