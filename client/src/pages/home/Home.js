import React from "react";
import Hero from "./components/hero/Hero";
import Testimonials from "./components/testimonials/Testimonials";
import Scene from "../shared/models/Scene";

function Home({ data }) {
    return (
        <div className=" max-w-full  w-full mx-auto ">
            {/* <div className="my-[40px]">
                <Testimonials data={data.testimonials} />
            </div>
            <div className="my-[40px]">
                <Hero />
            </div> */}
            <div className="">
                <Scene />
            </div>
        </div>
    );
}

export default Home;
