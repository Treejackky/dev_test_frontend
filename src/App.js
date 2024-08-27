// import './App.css';
import React from "react";
import PG3 from "./PG3.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Explore from "./components/Explore";

//   <h1 style={{ color: "#2D3DDF" }}>Hello, World!</h1>

export default function App() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Explore");

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function Sidebar() {
    return (
      <div className="w-40 h-screen bg-[#2D3DDF] text-white p-4 rounded-br-3xl rounded-tr-3xl">
        <ul>
          <li className="mb-40 w-1/4 ml-10 mt-10">
            <img src={PG3} alt="PG3" />
          </li>
          <li className="ml-10 mb-20">
            {/*  */}

            <button
              onClick={(_) => {
                setSelected("Home");
              }}
              className={`${
                selected === "Home" ? "text-white" : "text-blue-600"
              }`}
            >
              Home
            </button>
          </li>
          <li className="ml-10 mb-20">
            <button
              onClick={(_) => {
                setSelected("Explore");
              }}
              className={`${
                selected === "Explore" ? "text-white" : "text-blue-600"
              }`}
            >
              Explore
            </button>
          </li>
          <li className="ml-10 mb-20">
            <button
              onClick={(_) => {
                setSelected("Trips");
              }}
              className={`${
                selected === "Trips" ? "text-white" : "text-blue-600"
              }`}
            >
              Trips
            </button>
          </li>
          <li className="ml-10 mb-20">
            <button
              onClick={(_) => {
                setSelected("Profile");
              }}
              className={`${
                selected === "Profile" ? "text-white" : "text-blue-600"
              }`}
            >
              Profile
            </button>
          </li>
        </ul>
      </div>
    );
  }

  function Sidebar2() {
    return (
      <div className="bottom-0  text-center justify-center items-center bg-[#2D3DDF] text-white p-4 rounded-t-3xl ">
        <ul className="flex  text-center justify-around items-center">
          <li className="ml-10">
            <button
              onClick={(_) => {
                setSelected("Home");
              }}
              className={`${
                selected === "Home" ? "text-white" : "text-blue-600"
              }`}
            >
              Home
            </button>
          </li>
          <li className="ml-10 ">
            <button
              onClick={(_) => {
                setSelected("Explore");
              }}
              className={`${
                selected === "Explore" ? "text-white" : "text-blue-600"
              }`}
            >
              Explore
            </button>
          </li>
          <li className="ml-10">
            <button
              onClick={(_) => {
                setSelected("Trips");
              }}
              className={`${
                selected === "Trips" ? "text-white" : "text-blue-600"
              }`}
            >
              Trips
            </button>
          </li>
          <li className="ml-10">
            <button
              onClick={(_) => {
                setSelected("Profile");
              }}
              className={`${
                selected === "Profile" ? "text-white" : "text-blue-600"
              }`}
            >
              Profile
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen justify-between ${width <= 800 ? "items-center" : ""} `}>
      <div className="flex">
        {width > 800 && (
          <div className="sticky top-0 h-full">
            <Sidebar />
          </div>
        )}

        <div className="flex-1">{selected === "Explore" && <Explore />}</div>
        {/* <div className="flex-1"></div> */}
      </div>

      {width <= 800 && (
        <footer className="sticky bottom-0 w-full">
          <Sidebar2 />
        </footer>
      )}
    </div>
  );
}
