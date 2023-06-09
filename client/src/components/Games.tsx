import { useState, useEffect } from 'react'
import axios from 'axios'
import GameCard from './GameCard'
//import image from 'https://localhost:7223/uploads/6/images/wp7471860.jpg'

// interface Igame {
//     GameId: number
//     UserId: number
//     Title: string
//     Price: number
//     Description: string
//     genre: string
// }
interface IGenreFilter {
    genreFilter: string
}
const Games = ({ genreFilter }: IGenreFilter) => {
    const path: string = "../../../server/"
    const image: string = "https://localhost:7223/uploads/6/images/wp7471860.jpg"

    //const path: string = "D:\\coding dojo\\C# stack\\Final project\\OMEGAme\\server\\"


    let [games, setGames] = useState<Array<any>>([])
    useEffect(() => {
        const fetchGames = async () => {

            await axios.get("https://localhost:7223/api/Game")
                .then(response => {
                    setGames(response.data)
                    console.log(response.data);
                })
                .catch(err => console.log(err))
        }
        fetchGames()
    }, [])
    if (genreFilter !== "All") {
        games = games.filter((game) => game.genre === genreFilter)
    }
    // game.myImages.length !== 0 ? path + game.myImages[0].fileName.replace(/\\/g, '/') : "https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png"
    //console.log(path + games[0].myImages[0])
    return (
        <div className="mx-auto max-w-2xl p-4 sm:px-4 lg:max-w-7xl lg:p-4 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-md">
            {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* <p>{JSON.stringify(games[0]}</p> */}
                {games.map((game) => {
                    // console.log(path + game.myImages[0].fileName.rplace(/\\/g, '/'))
                    return <div key={game.gameId}>
                        <GameCard
                            id={game.gameId}
                            title={game.title}
                            price={game.price}
                            image={game.myImages[0]?.fileName}
                            creator={game.creator.firstName + " " + game.creator.lastName}
                            avatar={`https://ui-avatars.com/api/?background=ae369e&color=fff&name=${game.creator.firstName}+${game.creator.lastName}`}
                            date={game.createdAt}
                            description={game.description}
                            winner={false}
                        />

                        {/* <p>{path + game.myImages[0].fileName.replace(/\\/g, '/')}</p> */}
                        {/* <img src={image} alt="" /> */}
                    </div>
                }

                )}
            </div>
        </div >
    )
}

export default Games