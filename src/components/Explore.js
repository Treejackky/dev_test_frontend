// import './App.css';
import React from "react";
import App from "../App";
import Hotel from "../Hotel.png";
import Flight from "../Flight.png";
import Car from "../Car.png";
import Tuhmahal from "../travel_1.jpg";

import { useState, useEffect } from "react";
// import json file
import thai_provinces from "../thai_provinces.json";
import thai_hotels from "../thai_hotels.json";

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
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [selected, setSelected] = useState("Hotel");
  const dtp = thai_provinces.map((_) => _.name_en);
  const htp = thai_hotels;

  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [visible, setVisible] = useState(false);
  const [params, setParams] = useState("");

  const Params = () => {
    let data = htp.filter((_) => _.state === inputValue2);

    console.log(data);

    setParams(
      `?adults=${adults}&children=${children}&rooms=${rooms}&startDate=${startDate}&endDate=${endDate}`
    );
    console.log(params);
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

  return (
    <>
      {width < 1024 && (
        <div className="relative">
          <img
            src={Tuhmahal}
            alt="travel_1"
            className="rounded-b-2xl w-full h-full z-0 opacity-80"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center text-center justify-center text-white z-10">
            <h1 className="text-2xl font-bold">Incredible India</h1>
            <p className="text-lg">
              “For where thy treasure is, here also will thy heart be.”
            </p>
            <button className="mt-4 px-20 py-2 bg-gray-300 text-white opacity-95 font-semibold rounded-md">
              <p className="text-white">Tour</p>
            </button>
          </div>
        </div>
      )}
      <div className="flex">
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search city , Country, Place for Travel advis.."
            className="ml-8 w-full mt-10 text-[#8E8E8E] bg-[#EBEDFF] px-4 py-2 rounded-lg"
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list bg-white shadow-lg ml-8  w-1/3 mt-2 rounded-lg fixed z-10">
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

          <div className="flex justify-center  ml-8 mt-10">
            <button
              onClick={(_) => {
                Params();
              }}
              className="bg-[#2D3DDF] text-white px-20 py-4  rounded-sm"
            >
              {" "}
              Search{" "}
            </button>
          </div>

          <div className="flex justify-start  ml-10 mt-10">Recent Searches</div>
        </div>

        {width > 1024 && (
          <div className="flex-1 ml-16 w-44 h-full object-cover">
            <img
              src={Tuhmahal}
              alt="travel_1"
              className="w-full h-full  rounded-l-3xl "
            />
            {/* <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center text-center justify-center text-white z-10">
              <h1 className="text-4xl font-bold ml-20 mt-20">Incredible India</h1>
              <p className="text-2xl ml-20">“For where thy treasure is,
              </p>
              <p className="text-2xl ml-20">{" "}”here also will thy heart be.</p>
              <button className="mt-4 px-20 py-2 bg-gray-300 text-white opacity-95 font-semibold rounded-md">
                <p className="text-white">Tour</p>
              </button>
            </div> */}
          </div>
        )}

        {width <= 1024 && <div className="flex-1 ml-16 w-full h-full"></div>}
      </div>
    </>
  );
}
