import React from 'react'
import bgImage from "../assets/img/sean-do-EHLd2utEf68-unsplash.jpg";
import Games from "../components/Games"
import Filter from '../components/Filter';

const Home = () => {
    return (
        <>
            {/* Container for demo purpose */}
            <div className="mx-auto">

                {/* Section: Design Block */}
                <section className='-mt-16'>

                    <div className="bg-no-repeat bg-cover" style={{
                        backgroundPosition: "50%",
                        backgroundImage: `url(${bgImage})`,
                        height: "500px"
                    }}>
                        <div className="h-full"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
                            <div className="flex justify-center items-center h-full">
                                <div className="text-center text-white max-w-[800px]">
                                    <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-12">
                                        Are you ready <br /><span>for an adventure</span>
                                    </h2>
                                    <p className="text-lg">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia
                                        consequatur adipisci tenetur repudiandae rerum quos.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <Filter />
            </div>

        </>
    )
}

export default Home
