import React from "react";
import App from "../App";
import Hotel from "../Hotel.png";
import Flight from "../Flight.png";
import Car from "../Car.png";
import Tuhmahal from "../travel_1.jpg";
import BookNow from "../BookNow.png";
import axios from "axios";
import PG3 from "../PG3.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useState, useEffect } from "react";
// import json file
import thai_provinces from "../thai_provinces.json";
import thai_hotels from "../thai_hotels.json";
// import { fetchHotels } from "./Api";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import InsertInvitationOutlinedIcon from "@mui/icons-material/InsertInvitationOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import moment from "moment-timezone";

import { Popover, Button, Form, InputNumber, Row, Col } from "antd";

export default function Hotels() {
  const navigate = useNavigate();
  const dtp = thai_provinces.map((_) => _.name_en);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [default_data, setDefaultData] = useState([]);

  //   const navigate = useNavigate();
  const [selected, setSelected] = useState("Explore");

  const [width, setWidth] = useState(window.innerWidth);
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function production_check() {
    const isDevelopment =
      window.location.origin.includes("localhost") ||
      window.location.origin.includes("127.0.0.1");

    return isDevelopment
      ? "http://localhost:8765"
      : "https://api-project-blue.vercel.app";
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = dtp.filter((province) =>
        province.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  //   get params
  const { location } = useParams();

  let handle_search = (e) => {
    window.location.href = `/hotels/${e}`;
  };

  let Search_Hotels = async (location) => {
    axios.get(production_check() + "/v1/hotels" + location).then((res) => {
      console.log(res.data.msg);
      setData(res.data.msg);
    });

    axios.get(production_check() + "/v1/hotels" + "Bangkok").then((res) => {
      // console.log(res.data.msg);
      // setData(res.data.msg);
      setDefaultData(res.data.msg);
    });
  };

  const handle_back = () => {
    window.location.href = `/`;
    console.log("Back");
  };

//   {
//     "id": 1,
//     "name": "Centara Grand Mirage Beach Resort Pattaya",
//     "location": "Pattaya",
//     "image": "https://kbpxgdufneefcyphdgpx.supabase.co/storage/v1/object/public/Dev_Test_Img/Img_1.jpg",
//     "desc": "5-star hotel with 2 outdoor pools, near Pattaya Beach",
//     "room": [
//       {
//         "type": "Deluxe Room",
//         "price": 5000
//       },
//       {
//         "type": "Deluxe Ocean Facing Room",
//         "price": 6000
//       },
//       {
//         "type": "Premium Deluxe Room",
//         "price": 7000
//       },
//       {
//         "type": "Premium Deluxe Family Residence",
//         "price": 8000
//       }
//     ]
//   },

  const handle_review = (e) => {

    let locations = e.location;
    let id = e.id;
    let name = e.name;
    let image = e.image;
    let desc = e.desc;
    let room = e.room;
    let room_type = e.room.type;
    
    window.location.href = `/room/${locations}/${id}/${name}`;
    console.log("Review", e);

  };

  useEffect(() => {
    Search_Hotels(location);
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

  const hotel_detail = (
    <div className="flex items-center justify-center bg-white ml-8 mr-8 mt-14 mb-14 shadow-lg rounded-lg ">
      <ul className={`${width > 1024 ? "flex" : ""}`}>
        <img src={Tuhmahal} alt="hotel" className="w-60 h-40 object-fill" />
        <ul
          className={`${
            width > 1024 ? "flex flex-col ml-10" : "flex flex-col mt-5"
          }`}
        >
          <li
            className={`${
              width < 1024
                ? "text-xl font-semibold ml-3"
                : "text-xl font-semibold"
            }`}
          >
            Hotel JW Marriott
          </li>
          <li
            className={`${
              width < 1024 ? "flex items-center ml-3" : "flex items-center"
            }`}
          >
            <span className="text-yellow-400">★★★★☆</span>
            <span className="text-sm text-gray-500 ml-2">4.9</span>
            <span className="text-sm text-gray-500 ml-2">(1366 Reviews)</span>
          </li>
          <li
            className={`${
              width < 1024
                ? "text-sm text-gray-500 ml-3"
                : "text-sm text-gray-500"
            }`}
          >
            Amenities
          </li>

          <li
            className={`${
              width < 1024 ? "flex space-x-2 mt-2 ml-3" : "flex space-x-2 mt-2"
            }`}
          >
            <span
              className={`${
                width < 1024 ? "text-gray-500 ml-3" : "text-gray-500"
              }`}
            >
              🚗
            </span>
            <span
              className={`${
                width < 1024 ? "text-gray-500 ml-3" : "text-gray-500"
              }`}
            >
              🛏️
            </span>
            <span
              className={`${
                width < 1024 ? "text-gray-500 ml-3" : "text-gray-500"
              }`}
            >
              🍽️
            </span>
            <span
              className={`${
                width < 1024 ? "text-gray-500 ml-3" : "text-gray-500"
              }`}
            >
              📶
            </span>
            <span
              className={`${
                width < 1024 ? "text-gray-500 ml-3" : "text-gray-500"
              }`}
            >
              ➕
            </span>
          </li>
          <li
            className={`${
              width < 1024
                ? "text-lg font-bold text-blue-600 mt-4 ml-3"
                : "text-lg font-bold text-blue-600 mt-4"
            }`}
          >
            1,000/night
          </li>
        </ul>

        <li
          className={`${
            width > 1024
              ? "bg-[#2D3DDF] ml-10 text-white items-center text-center justify-center"
              : "bg-[#2D3DDF] text-white mt-5"
          }`}
        >
          <button
            className="flex w-full items-center text-center justify-center px-4 py-2"
            style={{ writingMode: `${width > 1024 ? " vertical-rl" : ""}` }}
          >
            Book Now
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <div
        className={`flex flex-col h-screen justify-between ${
          width <= 800 ? "items-center" : ""
        } `}
      >
        <div className="flex ">
          {width > 800 && (
            <div className="h-screen sticky top-0">
              <Sidebar />
            </div>
          )}

          <div className="flex-1">
            {selected === "Explore" && (
              <div className={`${width > 800 ? "" : ""}`}>
                <div className={`${width > 800 ? "flex w-full" : ""}`}>
                  {width > 800 && (
                    <button
                      onClick={(_) => {
                        handle_back();
                      }}
                      className="flex items-center w-14 h-12 justify-between bg-[#EBEDFF] ml-8 mt-10 mb-14 shadow-lg rounded-full"
                    >
                      <div></div>
                      <ArrowBackIosNewIcon />
                      <div></div>
                    </button>
                  )}
                  {width <= 800 && (
                    <button
                      onClick={(_) => {
                        handle_back();
                      }}
                      className="flex mt-5 w-96 justify-between px-10 py-5 "
                    >
                      <div>
                        <ArrowBackIosIcon />
                      </div>
                      <div>Hotels</div>
                      <div>{""}</div>
                    </button>
                  )}

                  <div
                    className={`${
                      width < 800
                        ? " items-center ml-10 mr-10"
                        : "items-center mt-1 mr-10"
                    }`}
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Search city , Country, Place for Travel advis.."
                      className={`${
                        width < 800
                          ? "w-full mt-5 text-[#8E8E8E] bg-[#EBEDFF] px-20 py-2 rounded-lg"
                          : "ml-8 w-full mt-10 text-[#8E8E8E] bg-[#EBEDFF] px-96 py-2 rounded-lg"
                      }`}
                    />

                    {suggestions.length > 0 && (
                      <ul
                        className={`${
                          width < 800
                            ? "suggestions-list bg-white shadow-lg  overflow-y-auto h-1/6 mt-2 rounded-lg z-10 w-full"
                            : "suggestions-list bg-white shadow-lg h-20 ml-8 overflow-y-auto  mt-2 rounded-lg z-10 w-full"
                        }`}
                      >
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={(_) => [
                              setInputValue(suggestion),
                              setInputValue2(suggestion),
                              setSuggestions([]),
                              handle_search(suggestion),
                              //   Search_Hotels(suggestion),
                            ]}
                            className="p-2 hover:bg-gray-200"
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="ml-10 flex w-52"></div>
                </div>

                {/* {width <= 800 && <div>Hello</div>} */}
                {width <= 800 && (
                  <div className="overflow-auto">
                    {/* Recommended Section */}
                    <div className="">
                      <h1 className="text-xl mt-6 w-96 px-8 font-semibold mb-4">
                        Recommended
                      </h1>

                      <div className=" px-5 mt-5 w-96 flex overflow-auto ">
                        {default_data.map((hotel, index) => (
                          <ul key={index} className="mb-6 space-x-4 w-80">
                            <img
                              src={hotel.image}
                              alt="hotel"
                              className="w-96 h-36 object-cover rounded-lg border-2 border-gray-100  "
                            />
                            <li className="flex space-x-4 mt-4 items-center">
                              <div>
                                <p className="text-sm w-40 font-semibold">
                                  Trips Thailand
                                </p>
                                <p className="w-40 text-xs">
                                  Get 10% off on booking
                                </p>
                              </div>
                            </li>
                          </ul>
                        ))}
                      </div>
                    </div>

                    {/* Main Hotel Listings */}
                    <div className="flex-1  px-5 py-10">
                      <div className="mt-6 justify-between font-semibold mb-4 text-[#2D3DDF] ">
                        <h1 className="text-xl text-black">
                          Best places to enjoy your stay
                        </h1>

                        <div className="space-x-4 mt-4">
                          <button className="border border-[#2D3DDF] px-4 py-2 radius-3xl ">
                            Sort by
                          </button>
                          <button className="border border-[#2D3DDF] px-4 py-2 radius-3xl ">
                            Filter
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-6">
                        {data.map((hotel, index) => (
                          <div
                            key={index}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                          >
                            <img
                              src={hotel.image}
                              alt="hotel"
                              className="w-full h-40 object-cover"
                            />
                            <div className="p-4 flex">
                              <div>
                                <p className="text-sm font-semibold">
                                  {hotel.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Price starts from 1,000
                                </p>
                              </div>
                              <button
                                onClick={(_) => {
                                  handle_review(hotel);
                                }}
                                className="mt-4 h-10 w-48  text-xs bg-gray rounded text-[#2D3DDF] border-2 border-gray-100"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {width > 800 && (
                  <div className="flex">
                    {/* Main Hotel Listings */}
                    <div className="flex-1  px-5 py-10">
                      {/* <h1 className="text-xl font-semibold mb-6">
                        Best places to enjoy your stay
                      </h1> */}
                      <div className="mt-6 justify-between font-semibold mb-4 text-[#2D3DDF] flex">
                        <h1 className="text-xl  text-black">
                          Best places to enjoy your stay
                        </h1>

                        <div className="space-x-4">
                          <button className="border border-[#2D3DDF] px-4 py-2">
                            Sort by
                          </button>
                          <button className="border border-[#2D3DDF] px-4 py-2">
                            Filter
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-6">
                        {data.map((hotel, index) => (
                          <div
                            key={index}
                            className="bg-white shadow-md rounded-lg overflow-hidden"
                          >
                            <img
                              src={hotel.image}
                              alt="hotel"
                              className="w-full h-40 object-cover"
                            />

                            <div className="p-4 flex justify-between">
                              <div>
                                <p className="text-sm font-semibold">
                                  {hotel.name}
                                </p>
                                <p className="text-xs text-gray-600">
                                  Price starts from 1,000
                                </p>
                              </div>

                              <button
                                onClick={(_) => {
                                  handle_review(hotel);
                                }}
                                className="mt-4 h-10 w-40 text-center text-xs bg-gray rounded text-[#2D3DDF] border-2 border-gray-100"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Section */}
                    {/* <div className="w-1/4 bg-slate-300 p-6"> */}
                    <div className=" px-3 mt-5 bg-white shadow-md rounded-lg border-2 border-gray-100">
                      <h1 className="text-xl mt-6 font-semibold mb-4">
                        Recommended
                      </h1>
                      {default_data.map((hotel, index) => (
                        <ul key={index} className="mb-6">
                          <img
                            src={hotel.image}
                            alt="hotel"
                            className="w-72 h-40 object-cover rounded-md"
                          />
                          <li className="flex space-x-4 mt-4 items-center">
                            <div>
                              <p className="text-sm w-40 font-semibold">
                                Trips Thailand
                              </p>
                              <p className="w-32 text-xs">
                                Get 10% off on booking
                              </p>
                            </div>
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {width < 800 && (
          <footer className="sticky bottom-0 w-full">
            <Sidebar2 />
          </footer>
        )}
      </div>
    </>
  );
}
