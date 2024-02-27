import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import NotFound from "./pages/shared/notfound/NotFound";
import {
    Navigate,
    Route,
    Routes,
    BrowserRouter as Router,
    Outlet,
    Link,
    useNavigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Navbar from "./pages/shared/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./redux/slices/themeSlice";
import Footer from "./pages/shared/footer/Footer";
import data from "../src/data.json"
function App() {
    const dispatch = useDispatch();
    const { mode } = useSelector((state) => state.theme);
    const profile = JSON.parse(localStorage.getItem("profile"));

    const handleSubscribe = async () => {
        Navigate("/#footer");
    };
    useEffect(() => {
        // When app loads, check if a theme mode is saved in localStorage
        const savedMode = localStorage.getItem("themeMode");
        if (savedMode) {
            // If found, dispatch an action to set the mode
            dispatch(toggleTheme(savedMode));
        }
    }, [dispatch]);
    useEffect(() => {
        // Save the mode to localStorage whenever it changes
        localStorage.setItem("themeMode", mode);
    }, [mode]);

    console.log("data", data);

    return (
        <div className={`${mode === "dark" ? "dark-mode" : "light-mode"} `}>
            <ToastContainer />
            <Router>
                <Routes>
                    {/*Standard......................*/}
                    <Route
                        element={
                            <div className="scroll-smooth antialiased flex flex-col min-h-screen">
                                {/* <div className="w-full md:sticky top-0 z-40">
                                    <Navbar handleSubscribe={handleSubscribe} />
                                </div> */}
                                <Outlet />
                                <div className="flex-grow"></div>
                                <div
                                    className="pt-[80px] md:pt-[150px] bottom-0 noisy "
                                    id="footer"
                                >
                                    <Footer />
                                </div>
                            </div>
                        }
                    >
                        {/*Auth......................*/}
                        <Route element={<Home data={data} />} path="/" />

                        {/* <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route
                            path="/verifyEmail/:token"
                            element={<VerifyEmail />}
                        /> */}

                        {/* <Route
                            path="/reset-password/:resetToken"
                            element={<ResetPassword />}
                        /> */}
                        {/*Posts......................*/}
                        {/* <Route
                            element={<AllPosts />}
                            path="/projects/allposts"
                        /> */}

                        {/*Analysis and tldr......................*/}
                        {/* <Route element={<Analysis />} path="/deck" />
                        <Route element={<Tldr />} path="/tldr" /> */}
                        {/*Profile......................*/}
                        {/* <Route
                            element={<AuthUserRoute element={<Profile />} />}
                            path="/profile"
                        /> */}
                    </Route>

                    {/*Admin route......................*/}
                    {/* <Route
                        element={
                            <div className="scroll-smooth antialiased flex  ">
                                {" "}
                                <div className="  md:sticky left-0 w-fit  ">
                                    <SideNavbar />
                                </div>
                                <div className="adminBg w-full mx-auto">
                                    {" "}
                                    <Outlet />
                                </div>
                            </div>
                        }
                    >
                        <Route
                            element={<AdminRoute element={<AllPostss />} />}
                            path="/admin/posts"
                        />
                        <Route
                            element={<AdminRoute element={<CreatePost />} />}
                            path="/admin/createpost"
                        />
                        <Route
                            element={<AdminRoute element={<EditPost />} />}
                            path="/admin/editpost/:id"
                        />
                        <Route
                            element={<AdminRoute element={<Subscribers />} />}
                            path="/admin/subscribers"
                        />
                    </Route> */}

                    {/*Error 404 not found......................*/}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>{" "}
        </div>
    );
}

export default App;
