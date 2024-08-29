// import './App.css';
import React from "react";
import App from "../App";
import Hotel from "../Hotel.png";
import Flight from "../Flight.png";
import Car from "../Car.png";
import Tuhmahal from "../travel_1.jpg";
import BookNow from "../BookNow.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;
const timezone = "Asia/Bangkok";
const dateFormat = "YYYY-MM-DD";

const formatDate = (date) => {
  return date.format("ddd, DD MMM-YYYY");
};

export default function Explore() {
  const navigate = useNavigate();

  const [width, setWidth] = useState(window.innerWidth);

  const [selected, setSelected] = useState("Hotel");
  const dtp = thai_provinces.map((_) => _.name_en);
  const htp = thai_hotels;

  const [data, setData] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState("");

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


  //  useEffect(() => {
  //   // console.log(fetchHotels());
  //   // setData(res);
  // }, []);

  let Search_Hotels = async (location) => {
    try {
      const res = await axios.get(production_check()+"/v1/hotels" + location);
      // console.log(location);
      console.log(res.data.msg);

      if (location) {
        // navigate(`/hotels/${location}`);
        window.location.href = `/hotels/${location}`;
      }

      // setData(res.data.msg);
      // return res;
    } catch (error) {
      console.error("Error fetching hotels:", error);
      throw error;
    }
  };

  const Params = () => {
    // let value = data.filter((_) => _.location === inputValue2);

    if (inputValue2) {
      Search_Hotels(inputValue2);
    }

    // console.log(value);

    // setParams(
    //   `?adults=${adults}&children=${children}&rooms=${rooms}&startDate=${startDate}&endDate=${endDate}`
    // );
    // console.log(params);
  };

  const handleVisibleChange = (visible) => {
    setVisible(visible);
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
      {width < 1024 && (
        <div className="relative">
          <img
            src={Tuhmahal}
            alt="travel_1"
            className="rounded-b-2xl w-full h-full z-0 opacity-80"
          />
        </div>
      )}
      <div className="flex overflow-hidden">
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search city , Country, Place for Travel advis.."
            className="ml-8 w-full mt-10 text-[#8E8E8E] bg-[#EBEDFF] px-4 py-2 rounded-lg"
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list bg-white shadow-lg ml-8 overflow-y-auto h-1/6 mt-2 rounded-lg z-10 w-full">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={(_) => [
                    setInputValue(suggestion),
                    setInputValue2(suggestion),
                    setSuggestions([]),
                  ]}
                  className="p-2 hover:bg-gray-200"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <div className="flex-1 ml-8 p-8 justify-center  ">
            {/* <h1 style={{ color: "#2D3DDF" }}>Hello, World!</h1> */}

            {/* #EBEDFF */}

            <div className="flex justify-between mt-10 text-4xl font-semibold text-[#2D3DDF]">
              {" "}
              What are you looking for?
            </div>
            <ul className="flex justify-between mt-7 items-center text-center">
              <li
                onClick={(_) => {
                  setSelected("Hotel");
                }}
              >
                <div className="bg-[#2D3DDF] rounded-3xl px-2 py-2 border-2 border-opacity-80 shadow-lg">
                  <img src={Hotel} alt="hotel" className="w-8 h-8" />
                </div>
                <button className="text-[#000000]">Hotel</button>
              </li>
              <li
                onClick={(_) => {
                  setSelected("Flight");
                }}
              >
                <div className="">
                  <img src={Flight} alt="flight" className="w-8 h-8" />
                </div>
                <button className="text-[#000000]">Flight</button>
              </li>
              <li
                onClick={(_) => {
                  setSelected("Car");
                }}
              >
                <div className="">
                  <img src={Car} alt="car" className="w-8 h-8" />
                </div>
                <button className="text-[#000000]">Car</button>
              </li>
            </ul>
          </div>

          <div className="flex ml-8 w-full mt-1 text-[#8E8E8E] bg-[#ffffff] px-4 py-2 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
            <LocationOnOutlinedIcon />
            <p className="ml-10 text-black"> {inputValue2} </p>
          </div>

          <div className="flex items-center ml-8 w-full mt-3 text-[#8E8E8E] bg-[#ffffff] px-4 py-2 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
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

          <div className="flex ml-8 w-full mt-3 text-[#8E8E8E] bg-[#ffffff] px-4 py-2 rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
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

          <div className="flex justify-center ml-16 mt-10">
            <button
              onClick={(_) => {
                Params();
              }}
              className="bg-[#2D3DDF] text-white px-20 py-4 rounded-sm"
            >
              Search
            </button>
          </div>

          <div className="flex justify-start ml-10 mt-10">Recent Searches</div>
          {/* ff */}
        </div>
        {width > 1024 && (
          <div className="flex-1 ml-16 w-44 h-full object-cover">
            <img src={Tuhmahal} alt="travel_1" className="w-full h-full  " />
          </div>
        )}

        {width <= 1024 && <div className="flex-1 ml-16 w-full h-full"></div>}
      </div>

      <div className="mt-8">
        <div className={`flex ${width < 1024 ? "" : ""} space-x-4`}>
          {hotel_detail}
        </div>
      </div>
    </>
  );
}
