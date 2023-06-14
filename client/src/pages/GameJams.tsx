import React, { useEffect, useState } from 'react';
import bgImage from "../assets/img/gameJam.png";
import OneGameJam from '../components/GameJamCard';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Link } from 'react-router-dom';

const GameJams = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [gameJams, setGameJams] = useState<Array<any>>([])
    const [incomingGameJams, setIncomingGameJams] = useState<Array<any>>([])
    const [currentGameJams, setCurrentGameJams] = useState<Array<any>>([])
    const [endedGameJams, setEndedGameJams] = useState<Array<any>>([])
    const [voteEndedGameJams, setVoteEndedGameJams] = useState<Array<any>>([])
    useEffect(() => {
        fetch('https://localhost:7223/api/GameJam')
          .then((response) => response.json())
          .then((data) => setGameJams(data));
      }, []);
    
      useEffect(() => {
        const futureGameJams = gameJams.filter((gameJam) => gameJam.startDate > currentDate);
        setIncomingGameJams(futureGameJams);
    
        const presentGameJams = gameJams.filter(
          (gameJam) => gameJam.startDate < currentDate && gameJam.endDate > currentDate
        );
        setCurrentGameJams(presentGameJams);
    
        const pastGameJams = gameJams.filter(
          (gameJam) => gameJam.startDate < currentDate && gameJam.endDate < currentDate && gameJam.votingEndDate > currentDate
        );
        setEndedGameJams(pastGameJams);
        const voteEndGameJams = gameJams.filter(
          (gameJam) => gameJam.startDate < currentDate && gameJam.endDate < currentDate && gameJam.votingEndDate < currentDate
        );
        setVoteEndedGameJams(voteEndGameJams);
      }, [gameJams, currentDate]);
    return (
        <div className="mx-auto">
            <section className="-mt-16">
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
            <div className="px-4 flex flex-col mx-auto max-w-2xl p-4 sm:px-4 lg:max-w-7xl lg:p-4 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-md my-5">
                <h1 className="text-lime-950 font-bold text-2xl">What's a Game Jam?</h1>
                <div className="flex items-start justify-between">
                    <p className="text-neutral-900 w-2/3">
                    Game jams are time-limited events where developers collaborate to
                    create games. Join to prototype ideas, showcase skills, and be part
                    of a vibrant community.
                    </p>
                    <Link to={"/HostJam"}>
                    {/* <button className="rounded-full bg-green-500 h-10 px-5 hover:bg-green-600 text-white font-medium"> */}
                    <button className="px-4 py-2 font-semibold text-sm bg-green-500 hover:bg-green-600 rounded-md border border-slate-900 shadow-sm">

                        Host a Jam
                    </button>
                    </Link>
                </div>
            </div>
            <div className="mb-8 container mx-auto max-w-2xl p-4 sm:px-4 lg:max-w-7xl lg:p-4 bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-md mt-9">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Incoming Jams
                    </h2>
                    {/* Carousel for desktop and large size devices */}
                <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={4} step={1} infinite={true}  naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {incomingGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                    </div>
                    </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={2} step={1} infinite={true}  naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {incomingGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider className="block md:hidden " naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={1} step={1} infinite={true} naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 ml-8 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {incomingGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
                </div>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Current Jams
                    </h2>
                    {/* Carousel for desktop and large size devices */}
                <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={4} step={1} infinite={true}  naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {currentGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt}
                                
                                />
                        ))}
                    </div>
                    </div>
                    </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={2} step={1} infinite={true}  naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {currentGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider className="block md:hidden " naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={1} step={1} infinite={true} naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {currentGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
                </div>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Completed Jams
                    </h2>
                    {/* Carousel for desktop and large size devices */}
                <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={4} step={1} infinite={true}  naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {endedGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                    </div>
                    </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={2} step={1} infinite={true}  naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {endedGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider className="block md:hidden " naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={1} step={1} infinite={true} naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {endedGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
                </div>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Ended Jams
                    </h2>
                    {/* Carousel for desktop and large size devices */}
                <CarouselProvider className="lg:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={4} step={1} infinite={true}  naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {voteEndedGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                    </div>
                    </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for tablet and medium size devices */}
                <CarouselProvider className="lg:hidden md:block hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={2} step={1} infinite={true}  naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {voteEndedGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>

                {/* Carousel for mobile and Small size Devices */}
                <CarouselProvider className="block md:hidden " naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={12} visibleSlides={1} step={1} infinite={true} naturalSlideHeight={0}>
                    <div className="w-full relative flex items-center justify-center">
                        <ButtonBack role="button" aria-label="slide backward" className="absolute z-30 left-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                            <Slider>
                                <div id="slider" className="px-8 h-full w-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 ">
                        {voteEndedGameJams.map((gameJam) => (
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
                                updatedAt={gameJam.updatedAt} />
                        ))}
                    </div>
                                </div>
                            </Slider>
                        </div>
                        <ButtonNext role="button" aria-label="slide forward" className="absolute z-30 right-0 focus:outline-none focus:bg-gray-400 focus:ring-2 focus:ring-offset-2 focus:ring-gray-400" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
                </div>
            </div>
        </div>
    );
};

export default GameJams;
