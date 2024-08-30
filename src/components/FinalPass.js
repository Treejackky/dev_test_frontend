import React from "react";
import App from "../App";
import Hotel from "../Hotel.png";
import Flight from "../Flight.png";
import Car from "../Car.png";
import Tuhmahal from "../travel_1.jpg";
import BookNow from "../BookNow.png";
import axios from "axios";
import PG3 from "../final_pass.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useEffect } from "react";

export default function FinalPass() {
  function handlehome() {
    window.location.href = "/";
  }
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div>
        {width > 800 && (
          <div class="flex flex-col items-center justify-center w-screen min-h-screen bg-white">
            <div class="mb-8">
              <img src={PG3} alt="Astronaut with flag" class="h-96 w-full" />
            </div>

            <h1 class="text-4xl font-bold text-blue-600 mb-2">
              Booking Successfully Completed
            </h1>

            <p class="text-gray-600 mb-6">
              Your trip schedule is ready, please check under profile.
            </p>

            <button
              onClick={(_) => {
                handlehome();
              }}
              class="px-6 py-2 bg-blue-600 text-white w-1/12 shadow-md hover:bg-blue-700 transition-colors"
            >
              Home
            </button>
          </div>
        )}

        {width <= 800 && (
          <div className="flex flex-col  items-center justify-around w-screen min-h-screen">
            <div class="flex flex-col items-center justify-center w-screen  bg-white">
              <div class="mb-8">
                <img src={PG3} alt="Astronaut with flag" class="h-40 w-full" />
              </div>

              <h1 class="text-2xl font-bold text-blue-600 mb-2">
                Booking Successfully Completed
              </h1>

              <p class="text-gray-600 mb-6">
                Your trip schedule is ready, please check under profile.
              </p>
            </div>

            <button
              onClick={(_) => {
                handlehome();
              }}
              class=" px-6 py-2 bg-blue-600 text-white w-64 shadow-md hover:bg-blue-700 transition-colors"
            >
              Home
            </button>
          </div>
        )}
      </div>
    </>
  );
}
