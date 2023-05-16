/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Params, useParams } from 'react-router-dom'
import axios from 'axios'

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function OneGame() {
    const { id } = useParams<Params<string>>();
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const [oneGame, setOneGame] = useState<any>({})
    const mydate = new Date(oneGame.createdAt)
    const formatedDate = mydate.toLocaleDateString('en-US', { year: "numeric", month: "long", day: "2-digit" })
    useEffect(() => {
        axios.get("https://localhost:7223/api/Game/" + id)
            .then(response => {
                console.log(response.data);
                setOneGame(response.data)
            })
            .catch(err => console.log(err))
    }, [])
    const creatorName = oneGame.creator?.firstName + " " + oneGame.creator?.lastName
    const creatorAvatar = oneGame.creator?.firstName + "+" + oneGame.creator?.lastName
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


                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">

                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{oneGame.title}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Game information</h2>

                        <p className="text-3xl tracking-tight text-gray-900">{oneGame.price} TND</p>

                        <form className="mt-10">
                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Download
                            </button>
                        </form>
                        <form className="mt-5">
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Play in Browser
                            </button>
                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                        {/* Description and details */}
                        <div className='flex flex-col gap-4'>
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

                        {/* <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {product.highlights.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div> */}

                        {/* <div className="mt-10">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{product.details}</p>
                            </div>
                        </div> */}
                        {/* <iframe src="https://localhost:7223/uploads/21/index.html" title={oneGame.title} width="1600" height="900"></iframe> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
