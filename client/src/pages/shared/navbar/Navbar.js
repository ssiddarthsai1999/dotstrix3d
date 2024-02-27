import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../redux/slices/themeSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/images/google-logo.jpg";
function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mode } = useSelector((state) => state.theme);
    const handleMenuOpen = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const closeMenu = () => {
        setIsMenuOpen(isMenuOpen === false);
    };

    const toggleDarkOrLight = () => {
        dispatch(toggleTheme());
    };

    console.log("mode", mode);
    return (
        <div
            className={`w-full  shadow-md  items-center align-middle  p-4 ${
                mode === "dark" ? "bg-black" : "bg-white"
            }`}
        >
            <div className="flex justify-between align-middle items-center md:px-24 px-6 ">
                <Link
                    to="/"
                    className="items-center flex justify-center align-middle"
                >
                    <div className=" flex cursor-pointer  ">
                        <img src={logo} alt="logo" className="w-10" />
                    </div>
                </Link>
                <div className="pr-10">
                    {/* Conditionally render the FontAwesome icon for smaller screens */}
                    <div className="lg:hidden">
                        <i
                            className="fa-solid fa-bars cursor-pointer"
                            onClick={handleMenuOpen}
                        ></i>
                        {isMenuOpen && (
                            <div className=" top-0 inset-x-0 fixed bg-black min-h-screen shadow-2xl p-2">
                                <i
                                    className="fa-solid fa-xmark cursor-pointer justify-end flex"
                                    onClick={closeMenu}
                                ></i>
                                <ul className="flex flex-col gap-4 font-bold text-[14px] mt-2 text-white">
                                    <Link to="/" onClick={closeMenu}>
                                        <h6 className="text-white text-[12px] lg:text-[18px]">
                                            Home
                                        </h6>
                                    </Link>
                                    <Link to="/" onClick={closeMenu}>
                                        <h6 className="text-white text-[12px] lg:text-[18px]">
                                            About
                                        </h6>
                                    </Link>
                                    {/* <Link to="/login" onClick={closeMenu}>
                                        <h6 className="text-white text-[12px] lg:text-[18px]">
                                            LOGIN
                                        </h6>
                                    </Link> */}

                                    {/* <Link to="/" onClick={closeMenu}>
                                        {" "}
                                        <h6 className="lg:text-[18px] text-[12px]">
                                            NEWS
                                        </h6>{" "}
                                    </Link> */}

                                    {/* <Link to="/" onClick={closeMenu}>
                                        {" "}
                                        <h6 className="lg:text-[18px] text-[12px]">
                                            ABOUT
                                        </h6>
                                    </Link> */}
                                    {/* <div className="dropdown ">
                                        <p>dropdown content</p>
                                    </div> */}
                                </ul>
                            </div>
                        )}
                    </div>
                    {/* Conditionally render the navigation links for larger screens */}
                    <ul className="hidden lg:flex gap-4 font-bold text-[18px] align-middle items-center  ">
                        <Link to="/">
                            <h6 className=" ease-in duration-100">Home</h6>
                        </Link>
                        <Link to="/">
                            <h6 className=" ease-in duration-100">About</h6>
                        </Link>
                        <div
                            className="cursor-pointer"
                            onClick={toggleDarkOrLight}
                        >
                            {mode === "dark" ? (
                                <i class="fa-regular fa-moon"></i>
                            ) : (
                                <i class="fa-regular fa-sun"></i>
                            )}
                        </div>

                        {/* <div className="dropdown ">
                            <p>dropdown content</p>
                        </div> */}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
