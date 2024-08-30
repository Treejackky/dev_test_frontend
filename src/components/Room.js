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

export default function Room() {
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

  dayjs.extend(customParseFormat);

  const { RangePicker } = DatePicker;
  const timezone = "Asia/Bangkok";
  const dateFormat = "YYYY-MM-DD";

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [visible, setVisible] = useState(false);

  const formatDate = (date) => {
    return date.format("ddd, DD MMM-YYYY");
  };

  const handleSubmit = () => {
    // console.log("Form Values:", values);
    setAdults(adults);
    setChildren(children);
    setRooms(rooms);
    setVisible(false);
  };

  const content = (
    <Form layout="vertical">
      <Col gutter={16} className=" ml-20">
        <Col span={8}>
          <Form.Item name="adults" label="Adults" initialValue={1}>
            <div className="flex ">
              <Button
                className="text-center bg-[#2D3DDF] px-4 py-1 text-white w-full h-full rounded-full text-2xl font-semibold"
                type="text"
                onClick={() => {
                  adults > 0 ? setAdults(adults - 1) : setAdults(0);
                }}
              >
                -
              </Button>
              <input
                type="text"
                value={adults}
                // style={{ width: "100%" }}
                className="text-center  border-gray-200 min-w-full font-semibold text-lg"
              />
              <Button
                className="text-center bg-[#2D3DDF] px-4 py-1 text-white w-full h-full rounded-full text-2xl font-semibold"
                type="text"
                onClick={() => {
                  setAdults(adults + 1);
                }}
              >
                +
              </Button>
            </div>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="children" label="Children" initialValue={0}>
            {/* add button */}
            <div className="flex">
              <Button
                className="text-center bg-[#2D3DDF] px-4 py-1 text-white w-full h-full rounded-full text-2xl font-semibold"
                type="text"
                onClick={() => {
                  children > 0 ? setChildren(children - 1) : setChildren(0);
                }}
              >
                -
              </Button>
              <input
                type="text"
                value={children}
                // style={{ width: "100%" }}
                className="text-center  border-gray-200 min-w-full font-semibold text-lg"
              />
              <Button
                className="text-center bg-[#2D3DDF] px-4 py-1 text-white w-full h-full rounded-full text-2xl font-semibold"
                type="text"
                onClick={() => {
                  setChildren(children + 1);
                }}
              >
                +
              </Button>
            </div>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="rooms" label="Rooms" initialValue={1}>
            <div className="flex">
              <Button
                className="text-center bg-[#2D3DDF] text-white w-full h-full rounded-full text-2xl font-semibold"
                type="text"
                onClick={() => {
                  rooms > 1 ? setRooms(rooms - 1) : setRooms(1);
                }}
              >
                -
              </Button>
              <input
                type="text"
                value={rooms}
                // style={{ width: "100%" }}
                className="text-center  border-gray-200 min-w-full font-semibold text-lg"
              />
              <Button
                className="text-center bg-[#2D3DDF] text-white w-full h-full rounded-full text-2xl font-semibold"
                type="text"
                onClick={() => {
                  setRooms(rooms + 1);
                }}
              >
                +
              </Button>
            </div>
          </Form.Item>
        </Col>
      </Col>
      <Form.Item>
        <Button
          className="bg-[#2D3DDF] rounded-sm border-2 border-opacity-80 shadow-lg px-4 py-5"
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDate") || moment.tz(timezone).format()
  );

  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [endDate, setEndDate] = useState(
    localStorage.getItem("endDate") ||
      moment.tz(timezone).add(1, "day").format()
  );

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
  const { location, id, name } = useParams();

  let handle_search = (e) => {
    window.location.href = `/hotels/${e}`;
  };

  let Search_Hotels = async (location, id, name) => {
    console.log(location, id, name);
    axios.get(production_check() + "/v1/hotels/rooms" + id).then((res) => {
      console.log(res.data.msg);
      setData(res.data.msg);
    });

    //   axios.get(production_check() + "/v1/hotels" + "Bangkok").then((res) => {
    //     // console.log(res.data.msg);
    //     // setData(res.data.msg);
    //     setDefaultData(res.data.msg);
    //   });
  };

  const handle_back = () => {
    window.location.href = `/`;
    console.log("Back");
  };

  const handle_review = (e) => {
    // parse to string json
    let locations = e.location;
    let id = e.id;
    let name = e.name;
    console.log(e);
    // e = JSON.stringify(e);
    //   window.location.href = `/review/${locations}/${name}/${id}`;
    console.log("Review", e);
  };

  const handle_booknow = (room_type, hotels) => {
    // '/review/:checkin/:checkout/:adults/:children/:rooms/:hotel/:location',

    let room = room_type.type;
    let checkin = startDate;
    let checkout = endDate;
    let adult = adults;
    let childrens = children;
    let id = hotels.id;
    let hotel = hotels.name;
    let locations = hotels.location;
    let room_num = rooms;
    let base_price = room_type.price;

    let res = {
      room: room,
      hotel: hotel,
      locations: locations,
      checkin: checkin,
      checkout: checkout,
      adult: adult,
      childrens: childrens,
      room_num: room_num,
    };

    console.log(res);
    window.location.href = `/review/${checkin}/${checkout}/${adult}/${childrens}/${room}/${base_price}/${room_num}/${id}/${hotel}/${locations}`;
  };

  useEffect(() => {
    Search_Hotels(location, id, name);
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

                {width > 800 && (
                  <div className="flex w-full justify-start ml-4">
                    <div className="flex justify-center mt-3 w-96 text-[#8E8E8E] bg-[#ffffff] items-center p-4 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                      <p className=" text-black"> Where are you going ? </p>
                    </div>

                    <div className="flex items-center ml-8 mt-3  text-[#8E8E8E] bg-[#ffffff] px-4 py-2 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                      <InsertInvitationOutlinedIcon />
                      <RangePicker
                        className="ml-7 hover:text-[#2D3DDF]"
                        picker="date"
                        suffixIcon={null}
                        defaultValue={[
                          dayjs(startDate, dateFormat),
                          dayjs(endDate, dateFormat),
                        ]}
                        onChange={(dates) => {
                          if (dates) {
                            setStartDate(dates[0].format(dateFormat));
                            setEndDate(dates[1].format(dateFormat));
                          }
                        }}
                        format={formatDate}
                        renderExtraFooter={() => null}
                        bordered={false}
                        placeholder={["Start Date", "End Date"]}
                      />
                    </div>

                    <div className="flex ml-8 mt-3 items-center text-[#8E8E8E] bg-[#ffffff] px-4 py-2 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                      {/* <div> */}
                      <GroupOutlinedIcon />
                      <p className="ml-10 text-black hover:text-[#2D3DDF]">
                        {" "}
                        <Popover
                          content={content}
                          title="Booking Details"
                          trigger="click"
                          visible={visible}
                          onVisibleChange={handleVisibleChange}
                        >
                          {adults} {"adult,"} {children}
                          {"children"}
                          {" - "}
                          {rooms} {"room"}
                        </Popover>{" "}
                      </p>
                    </div>
                    <div className="flex ml-8 mt-3 items-center text-white bg-[#2D3DDF] px-4 py-2 w-40 justify-center rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                      Search
                    </div>
                  </div>
                )}

                {width <= 800 && (
                  <div className="w-80 ml-10 justify-center items-end align-middle text-center  ">
                    <div className="flex  justify-center mt-3  text-[#8E8E8E] bg-[#ffffff] items-center p-4 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                      <p className=" text-black"> Where are you going ? </p>
                    </div>

                    <div className="flex items-center mt-3  text-[#8E8E8E] bg-[#ffffff] px-4 py-2 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                      <InsertInvitationOutlinedIcon />
                      <RangePicker
                        className="ml-7 hover:text-[#2D3DDF]"
                        picker="date"
                        suffixIcon={null}
                        defaultValue={[
                          dayjs(startDate, dateFormat),
                          dayjs(endDate, dateFormat),
                        ]}
                        onChange={(dates) => {
                          if (dates) {
                            setStartDate(dates[0].format(dateFormat));
                            setEndDate(dates[1].format(dateFormat));
                          }
                        }}
                        format={formatDate}
                        renderExtraFooter={() => null}
                        bordered={false}
                        placeholder={["Start Date", "End Date"]}
                      />
                    </div>

                    <div className="flex mt-3 items-center text-[#8E8E8E] bg-[#ffffff] px-4 py-2 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                      {/* <div> */}
                      <GroupOutlinedIcon />
                      <p className=" text-black hover:text-[#2D3DDF]">
                        {" "}
                        <Popover
                          content={content}
                          title="Booking Details"
                          trigger="click"
                          visible={visible}
                          onVisibleChange={handleVisibleChange}
                        >
                          {adults} {"adult,"} {children}
                          {"children"}
                          {" - "}
                          {rooms} {"room"}
                        </Popover>{" "}
                      </p>
                    </div>
                    <div className="flex mt-3 w-80 items-center text-white bg-[#2D3DDF] px-4 py-2 justify-center rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                      Search
                    </div>
                  </div>
                )}

                <div className="flex">
                  {width > 800 && (
                    <>
                      {data.map((hotels) => (
                        <div
                          key={hotels.id}
                          className="flex flex-col items-center justify-center p-4"
                        >
                          <div className="flex flex-col items-start justify-center w-full space-y-4">
                        <div className="flex space-x-2">
                           <img
                            src={hotels.image}
                            className="w-full h-72 object-cover"
                            alt="hotel"
                          />
                           <div className="flex flex-col space-y-2">
                            <img
                              src={hotels.image}
                              className="w-96 h-48 object-cover"
                              alt="hotel"
                            />
                            <div className="flex space-x-2">
                              <img
                                src={hotels.image}
                                className="w-32 h-24 object-cover"
                                alt="hotel"
                              />
                              <img
                                src={hotels.image}
                                className="w-32 h-24 object-cover"
                                alt="hotel"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                          {/* Hotel Details */}
                          <div className="text-left mt-4 flex w-full justify-around">
                            <div className="text-left">
                              <h2 className="text-lg font-semibold ">
                                {hotels.name}
                              </h2>
                              <p className="text-blue-500">{hotels.location}</p>
                            </div>
                            <p className="text-lg text-right text-[#2D3DDF] mt-2 border border-[#2D3DDF] px-2 py-1 rounded-lg">
                              Price Starting from 1,000 BAHT
                            </p>
                          </div>

                          {/* Room Details */}
                          <div className="flex justify-between w-full">
                        {hotels.room.map((room, index) => (
                          <div className=" items-center justify-center bg-white mr-8 mt-14 mb-14 shadow-lg rounded-lg ">
                            <ul className={`${width > 1024 ? "flex" : ""}`}>
                              <img
                                src={hotels.image}
                                alt="hotel"
                                className="w-60 h-40 object-fill"
                              />
                              <ul
                                className={`${
                                  width > 1024
                                    ? "flex flex-col ml-10"
                                    : "flex flex-col mt-5"
                                }`}
                              >
                                <li
                                  className={`${
                                    width < 1024
                                      ? "text-xl font-semibold ml-3"
                                      : "text-xl font-semibold"
                                  }`}
                                >
                                  {room.type}
                                </li>

                                <li
                                  className={`${
                                    width < 1024
                                      ? "text-lg font-bold text-blue-600 mt-4 ml-3"
                                      : "text-lg font-bold text-blue-600 mt-4"
                                  }`}
                                >
                                  {room.price}/night
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
                                  onClick={(_) => {
                                    handle_booknow(room, hotels);
                                  }}
                                  className="flex w-full items-center text-center justify-center px-4 py-2"
                                  style={{
                                    writingMode: `${
                                      width > 1024 ? " vertical-rl" : ""
                                    }`,
                                  }}
                                >
                                  <p className="h-36 items-center"> Book Now</p>
                                </button>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                          {/* Test */}
                        </div>
                      ))}
                    </>
                  )}

                  {width <= 800 && (
                    <>
                      {data.map((hotels) => (
                        <div
                          key={hotels.id}
                          className="flex flex-col items-center justify-center p-4"
                        >
                          {/* Hotel Images */}
                          <div className="flex flex-col items-start justify-center w-full space-y-4">
                        <div className=" space-y-2">
                           <img
                            src={hotels.image}
                            className="w-full h-72 object-cover"
                            alt="hotel"
                          />
                           <div className="flex flex-col space-y-4">
                            
                            <div className="flex space-x-2">
                              <img
                                src={hotels.image}
                                className="w-96 h-24 object-cover"
                                alt="hotel"
                              />
                              <img
                                src={hotels.image}
                                className="w-96 h-24 object-cover"
                                alt="hotel"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                          {/* Hotel Details */}
                          <div className="text-left mt-4  w-full justify-around">
                            <div className="text-left">
                              <h2 className="text-lg font-semibold ">
                                {hotels.name}
                              </h2>
                              <p className="text-blue-500">{hotels.location}</p>
                            </div>
                            <p className="text-lg text-center text-[#2D3DDF] mt-2 border border-[#2D3DDF] px-2 py-1 rounded-lg">
                              Price Starting from 1,000 BAHT
                            </p>
                          </div>

                          {/* Room Details */}
                          <div className="flex justify-between w-full">
                        {hotels.room.map((room, index) => (
                          <div className=" items-center justify-center bg-white space-x-24  mt-14 mb-14 shadow-lg rounded-lg ">
                            <ul className={`${width > 1024 ? "flex" : "  space-x-2"}`}>
                              <img
                                src={hotels.image}
                                alt="hotel"
                                className="w-60 h-40 object-contain p-4"
                              />
                              <ul
                                className={`${
                                  width > 1024
                                    ? "flex flex-col ml-10"
                                    : "flex flex-col mt-5"
                                }`}
                              >
                                <li
                                  className={`${
                                    width < 1024
                                      ? "text-xl font-semibold ml-3"
                                      : "text-xl font-semibold"
                                  }`}
                                >
                                  {room.type}
                                </li>

                                <li
                                  className={`${
                                    width < 1024
                                      ? "text-lg font-bold text-blue-600 mt-4 ml-3"
                                      : "text-lg font-bold text-blue-600 mt-4"
                                  }`}
                                >
                                  {room.price}/night
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
                                  onClick={(_) => {
                                    handle_booknow(room, hotels);
                                  }}

                                  className="flex w-full items-center text-center justify-center px-4 py-2"
                                  style={{
                                    writingMode: `${
                                      width > 1024 ? " vertical-rl" : ""
                                    }`,
                                  }}
                                >
                                  <p className=" items-center"> Book Now</p>
                                </button>
                              </li>
                            </ul>
                          </div>
                        ))}
                      </div>
                          {/* Test */}
                        </div>
                      ))}
                    </>
                  )}

                  {/* ขวา */}
                  
                </div>
                <div>
                    <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-3">
                      <div class="flex items-center mb-4">
                        <div class="bg-blue-500 text-white text-xl font-bold p-3 rounded-lg mr-3">
                          8.4
                        </div>
                        <div>
                          <p class="font-semibold text-lg">Excellent</p>
                          <p class="text-gray-500 text-sm">6879 Reviews</p>
                        </div>
                      </div>

                      <div class="mb-4">
                        <div class="flex items-center mb-2">
                          <span class="text-gray-700 w-32">Housekeeping</span>
                          <div class="flex space-x-1">
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-gray-300">&#9733;</span>
                          </div>
                        </div>
                        <div class="flex items-center mb-2">
                          <span class="text-gray-700 w-32">Food</span>
                          <div class="flex space-x-1">
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                          </div>
                        </div>
                        <div class="flex items-center mb-2">
                          <span class="text-gray-700 w-32">Service</span>
                          <div class="flex space-x-1">
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-gray-300">&#9733;</span>
                          </div>
                        </div>
                        <div class="flex items-center mb-2">
                          <span class="text-gray-700 w-32">Staff</span>
                          <div class="flex space-x-1">
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-yellow-500">&#9733;</span>
                            <span class="text-gray-300">&#9733;</span>
                          </div>
                        </div>
                      </div>

                      <div class="mb-4">
                        <p class="font-semibold text-gray-700">Services</p>
                        <div class="flex space-x-3 mt-2">
                          <div class="p-2 bg-gray-100 rounded-lg shadow">
                            <i class="fas fa-car"></i>
                          </div>
                          <div class="p-2 bg-gray-100 rounded-lg shadow">
                            <i class="fas fa-swimmer"></i>
                          </div>
                          <div class="p-2 bg-gray-100 rounded-lg shadow">
                            <i class="fas fa-concierge-bell"></i>
                          </div>
                          <div class="p-2 bg-gray-100 rounded-lg shadow">
                            <i class="fas fa-wifi"></i>
                          </div>
                          <div class="p-2 bg-gray-100 rounded-lg shadow">
                            <i class="fas fa-dumbbell"></i>
                          </div>
                        </div>
                      </div>

                      <div class="text-red-500 text-center font-semibold mt-4">
                        <span class="inline-block mr-2">&#9888;</span>
                        This property is in high demand today.
                      </div>
                    </div>
                  </div>
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
