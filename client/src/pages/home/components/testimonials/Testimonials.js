import React from "react";
import TestimonialsCard from "./TestimonialsCard";

function Testimonials({ data }) {
    return (
        <div className=" md:p-4 p-2 ">
            <h1 className="text-center mb-[40px]">Testimonials</h1>
            <div className="flex gap-2 items-center align-middle  justify-center  ">
                {data.map((item) => (
                    <TestimonialsCard item={item} />
                ))}{" "}
            </div>
        </div>
    );
}

export default Testimonials;
