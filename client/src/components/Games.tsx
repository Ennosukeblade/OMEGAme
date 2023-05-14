import { useState, useEffect } from 'react'
import axios from 'axios'
import GameCard from './GameCard'
import image from '../assets/img/wp7471860.jpg'
import GameCard from './GameCard'
import image from '../assets/img/wp7471860.jpg'

// interface Igame {
//     GameId: number
//     UserId: number
//     Title: string
//     Price: number
//     Description: string
//     genre: string
// }
const Games = () => {
    const path: string = "../../../server/"
    //const path: string = "D:\\coding dojo\\C# stack\\Final project\\OMEGAme\\server\\"

    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
    ]
    const [games, setGames] = useState<Array<any>>([])
    useEffect(() => {
        const fetchGames = async () => {

            await axios.get("https://localhost:7223/api/Game")
                .then(response => setGames(response.data))
                .catch(err => console.log(err))
        }
        fetchGames()
    }, [])
    // game.myImages.length !== 0 ? path + game.myImages[0].fileName.replace(/\\/g, '/') : "https://theperfectroundgolf.com/wp-content/uploads/2022/04/placeholder.png"
    //console.log(path + games[0].myImages[0])
    return (
        <div className="mx-auto max-w-2xl p-4 sm:px-4 lg:max-w-7xl lg:p-4 bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-md">
            {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2> */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {/* <p>{JSON.stringify(games[0]}</p> */}
                {games.map((game) => {
                    // console.log(path + game.myImages[0].fileName.replace(/\\/g, '/'))
                    return <div key={game.gameId}>
                        <GameCard
                            id={game.gameId}
                            title={game.title}
                            price={game.price}
                            image={image}
                            creator={game.creator.firstName + " " + game.creator.lastName}
                            avatar='https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT93ATNDzBpB63bYDVaL_DL4UXpH_5t0CBZ-UBFrMLfdvLbczdV'
                            date={game.createdAt}
                            description={game.description}
                        />

                        {/* <p>{path + game.myImages[0].fileName.replace(/\\/g, '/')}</p> */}
                        {/* <img src={require("../../../server/wwwroot/uploads/20/images/image.png")} alt="" /> */}
                    </div>
                }

                )}
            </div>
        </div >
    )
}

export default Games