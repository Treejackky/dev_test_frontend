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

export default function Review() {
  const {
    checkin,
    checkout,
    adult,
    childrens,
    room_num,
    base_price,
    room,
    id,
    hotel,
    locations,
  } = useParams();
  const navigate = useNavigate();
  const dtp = thai_provinces.map((_) => _.name_en);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [default_data, setDefaultData] = useState([]);

  const [hotel_name, setHotel_name] = useState("");
  const [hotel_desc, setHotel_desc] = useState("");
  const [img, setImg] = useState("");
  const [checkin_api, setCheckin_api] = useState(Date());
  const [checkout_api, setCheckout_api] = useState(Date());
  const [adult_api, setAdult_api] = useState(0);
  const [children_api, setChildren_api] = useState(0);
  const [room_type_api, setRoomType_api] = useState("");
  const [room_num_api, setRoomNum_api] = useState(0);
  const [total_day, setTotalDay_api] = useState(0);

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
    checkin || moment.tz(timezone).format()
  );

  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [endDate, setEndDate] = useState(
    checkout || moment.tz(timezone).add(1, "day").format()
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

  const handle_booknow = (e) => {
    console.log(e);
  };

  useEffect(() => {
    // Search_Hotels(location, id, name);
    console.log(
      checkin,
      checkout,
      adult,
      childrens,
      room,
      room_num,
      id,
      hotel,
      locations
    );

    // setAdults(adult);
    // setChildren(childrens);
    // setRooms(room_num);
    // setStartDate(checkin);
    // setEndDate(checkout);

    api_cal();
  }, []);


  const handle_payment = (e) => {
    let path = `/payment/${checkin}/${checkout}/${adult}/${childrens}/${room}/${base_price}/${room_num}/${id}/${hotel}/${locations}`;
    window.location.href = path;
    // window.location.href = `/hotels/${e}`;
  }

  const api_cal = async () => {
    console.log(production_check());
    try {
      // ส่งคำขอ POST ไปยัง API ด้วยข้อมูลที่ต้องการ
      const res = await axios.post(production_check() + "/v1/cal_price", {
        checkin: checkin,
        checkout: checkout,
        adult: adult,
        childrens: childrens,
        rooms: room,
        room_num: room_num,
        id: id,
        hotel: hotel,
        base_price: base_price,
        locations: locations,
      });

      //   console.log(res.data.msg);
      if (res.data.msg) {
        setData(res.data.msg);
        setHotel_name(res.data.msg.hotel[0].name);
        setHotel_desc(res.data.msg.hotel[0].desc);
        setImg(res.data.msg.hotel[0].image);
        setCheckin_api(res.data.msg.checkin);
        setCheckout_api(res.data.msg.checkout);
        setAdult_api(res.data.msg.adult);
        setChildren_api(res.data.msg.children);
        setRoomType_api(res.data.msg.rooms);
        setRoomNum_api(res.data.msg.room_num);

        const date1 = new Date(checkin);
        const date2 = new Date(checkout);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setTotalDay_api(diffDays);

        // console.log(res.data.adult)
        // console.log(res.data.room_num)
      }
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

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

                {width > 800 && (
                    <div className="flex">
                    <div className="p-6 w-1/2">
                      {/* Review your booking title */}
                      <h2 className="text-2xl font-semibold mb-4">
                        Review your booking
                      </h2>
  
                      {/* Hotel Information */}
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-blue-600">
                            {hotel_name}{" "}
                            <span className="text-yellow-400">★★★★☆</span>
                          </h3>
                          <p className="text-sm text-gray-600">{locations}</p>
                          <p className="text-xs text-gray-500">{hotel_desc}</p>
                        </div>
                        <img
                          src={img}
                          alt="Hotel"
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                      </div>
  
                      {/* Booking Details */}
                      <div className="bg-gray-100 p-4 w-full rounded-lg flex justify-between items-center mb-6">
                        <div>
                          <p className="text-sm text-gray-500">Check-in</p>
                          <p className="text-lg font-bold">{checkin_api}</p>
                          <p className="text-sm text-gray-500">10am</p>
                        </div>
                        <div className="text-center">
                          <p className="bg-blue-100 text-blue-500 px-4 py-1 rounded-full">
                            {total_day-1} Night
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Check-out</p>
                          <p className="text-lg font-bold">{checkout_api}</p>
                          <p className="text-sm text-gray-500">10am</p>
                        </div>
                        <p className="text-lg font-semibold">
                          {adult_api} Adult - {room_num_api} room
                        </p>
                      </div>
  
                      {/* Guest Details Form */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium mb-2">
                          Guest Details
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="border border-gray-300 rounded p-2"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="border border-gray-300 rounded p-2"
                          />
                          <input
                            type="email"
                            placeholder="E-mail address"
                            className="border border-gray-300 rounded p-2"
                          />
                          <input
                            type="text"
                            placeholder="Mobile number"
                            className="border border-gray-300 rounded p-2"
                          />
                        </div>
  
                        {/* Add Guest Button */}
                        <button className="text-blue-500 mt-2">
                          Add Guest +
                        </button>
  
                        {/* Special Request Field */}
                        <div className="mt-4">
                          <h4 className="text-lg font-medium mb-2">
                            Special Request (optional)
                          </h4>
                          <textarea
                            className="w-full border border-gray-300 rounded p-2"
                            rows="4"
                            placeholder="Enter any special requests..."
                          ></textarea>
                        </div>
                      </div>
                      <button onClick={(_)=>{handle_payment()}} className="flex  mt-3 items-center text-white bg-[#2D3DDF] px-4 py-2 w-40 justify-center rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                        Continue
                      </button>
                    </div>
  
                    {/* ขวา */}
             
                    <div>
                      {/* <div class="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-3"> */}
                      <div className="p-6 mt-3 mx-auto">
                        <div class=" items-center space-y-2 mb-4">
                          <div className="flex justify-between space-x-24">
                            <p class="text-gray-500 text-sm">
                              {data && data.room_num} room x{" "}
                              {data && data.room_num - 1} night
                            </p>
                            <p class="text-gray-500 text-sm">
                              {data && data.price} Bath
                            </p>
                          </div>
                          <div className="flex justify-between space-x-24">
                            <p class="text-gray-500 text-sm">Total Discount</p>
                            <p class="text-gray-500 text-sm">
                              {data && data.total_discount} Bath
                            </p>
                          </div>
                          <div className="flex justify-between space-x-24">
                            <p class="text-gray-500 text-sm">
                              Price after discount
                            </p>
                            <p class="text-gray-500 text-sm">
                              {data && data.price_after_discount} Bath
                            </p>
                          </div>
                          <div className="flex justify-between space-x-24">
                            <p class="text-gray-500 text-sm">
                              Taxes & services fees
                            </p>
                            <p class="text-gray-500 text-sm">
                              {Math.floor(data && data.taxe_vat)} Bath
                            </p>
                          </div>
                          <div className="flex justify-between space-x-24">
                            <p class="text-black text-lg font-semibold">
                              Total Amount
                            </p>
                            <p class="text-black text-lg font-semibold">
                              {data && data.total_price} Bath
                            </p>
                          </div>
                          {/*  */}
                          <div className="space-y-2 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-3">
                            <div className="flex justify-between space-x-24">
                              <p class="text-black text-lg font-semibold">
                                Cancelation Charges
                              </p>
                            </div>
  
                            <div className="flex justify-between space-x-24">
                              <p class="text-black text-sm font-semibold">
                              Non Refundable
                              </p>
                            </div>
  
                            <div className="flex justify-between space-x-24">
                              <p class="text-gray-500 text-xs">
                                Penalty may be charged by the airline & by MMT
                                based on how close to departure date you cancel.
                                View fare rules to know more.
                              </p>
                            </div>
  
                            <div className="flex justify-between space-x-24">
                              <p class="text-gray-500 text-lg font-semibold">
                                View Policy
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {width <= 800 && (
                    <div className="">
                    <div className=" w-full px-4 py-3 ">
                      {/* Review your booking title */}
                      <h2 className="text-2xl font-semibold mb-4 px-4 py-5">
                        Review your booking
                      </h2>
  
                      {/* Hotel Information */}
                      <div className=" justify-center items-center mb-6 px-4 py5 ">
                        <div>
                          <h3 className="text-lg font-bold text-blue-600">
                            {hotel_name}{" "}
                            <span className="text-yellow-400">★★★★☆</span>
                          </h3>
                          <p className="text-sm text-gray-600">{locations}</p>
                          <p className="text-xs text-gray-500">{hotel_desc}</p>
                        </div>
                        <img
                          src={img}
                          alt="Hotel"
                          className="w-full  h-32 object-cover rounded-lg"
                        />
                      </div>
  
                      {/* Booking Details */}
                      <div className="bg-gray-100 p-4 w-96  rounded-lg justify-center items-center mb-6">
                        <div className="flex w-full  justify-between items-center">
                        <div className="">
                          <p className="text-sm text-gray-500">Check-in</p>
                          <p className="text-lg font-bold">{checkin_api}</p>
                          <p className="text-sm text-gray-500">10am</p>
                        </div>
                        <div className="text-center items-center ">
                          <p className="bg-blue-100 text-blue-500 px-4 py-1 rounded-full">
                            {total_day-1} Night
                          </p>
                        </div>

                        </div>
                        <div className="flex w-full justify-between items-center">

                        <div>
                          <p className="text-sm text-gray-500">Check-out</p>
                          <p className="text-lg font-bold">{checkout_api}</p>
                          <p className="text-sm text-gray-500">10am</p>
                        </div>
                        <p className="text-lg font-semibold">
                          {adult_api} Adult - {room_num_api} room
                        </p>
                      </div>
                      </div>
                     
                    </div>
  
                    {/* ขวา */}
             
                    <div>
                      <div class="p-6 rounded-lg max-w-md mx-auto mt-3">
                        <div class=" items-center space-y-2 mb-4">
                          <div className="flex justify-between space-x-24">
                            <p class="text-gray-500 text-sm">
                              {data && data.room_num} room x{" "}
                              {data && data.room_num - 1} night
                            </p>
                            <p class="text-gray-500 text-sm">
                              {data && data.price} Bath
                            </p>
                          </div>
                          <div className="flex justify-between space-x-24 ">
                            <p class="text-gray-500 text-sm">Total Discount</p>
                            <p class="text-gray-500 text-sm">
                              {data && data.total_discount} Bath
                            </p>
                          </div>
                          <div className="flex justify-between space-x-24">
                            <p class="text-gray-500 text-sm">
                              Price after discount
                            </p>
                            <p class="text-gray-500 text-sm">
                              {data && data.price_after_discount} Bath
                            </p>
                          </div>
                          <div className="flex justify-between space-x-24">
                            <p class="text-gray-500 text-sm">
                              Taxes & services fees
                            </p>
                            <p class="text-gray-500 text-sm">
                              {Math.floor(data && data.taxe_vat)} Bath
                            </p>
                          </div>
                          <div className="flex justify-between space-x-24">
                            <p class="text-black text-lg font-semibold">
                              Total Amount
                            </p>
                            <p class="text-black text-lg font-semibold">
                              {data && data.total_price} Bath
                            </p>
                          </div>
                          {/*  */}
                          <div className="space-y-2 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-3">
                            <div className="flex justify-between space-x-24">
                              <p class="text-black text-lg font-semibold">
                                Cancelation Charges
                              </p>
                            </div>
  
                            <div className="flex justify-between space-x-24">
                              <p class="text-black text-sm font-semibold">
                              Non Refundable
                              </p>
                            </div>
  
                            <div className="flex justify-between space-x-24">
                              <p class="text-gray-500 text-xs">
                                Penalty may be charged by the airline & by MMT
                                based on how close to departure date you cancel.
                                View fare rules to know more.
                              </p>
                            </div>
  
                            <div className="flex justify-between space-x-24">
                              <p class="text-gray-500 text-lg font-semibold">
                                View Policy
                              </p>
                            </div>
                          </div>
                        </div>
                        {/* Guest Details Form */}
                     <div className="space-y-4">
                        <h4 className="text-lg font-medium mb-2">
                          Guest Details
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="border border-gray-300 rounded p-2"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="border border-gray-300 rounded p-2"
                          />
                          <input
                            type="email"
                            placeholder="E-mail address"
                            className="border border-gray-300 rounded p-2"
                          />
                          <input
                            type="text"
                            placeholder="Mobile number"
                            className="border border-gray-300 rounded p-2"
                          />
                        </div>
  
                        {/* Add Guest Button */}
                        <button className="text-blue-500 mt-2">
                          Add Guest +
                        </button>
  
                        {/* Special Request Field */}
                        <div className="mt-4">
                          <h4 className="text-lg font-medium mb-2">
                            Special Request (optional)
                          </h4>
                          <textarea
                            className="w-full border border-gray-300 rounded p-2"
                            rows="4"
                            placeholder="Enter any special requests..."
                          ></textarea>
                        </div>
                      </div>
                      <button  onClick={(_)=>{handle_payment()}} className="flex  mt-3 items-center text-white bg-[#2D3DDF] px-4 py-2 w-full justify-center rounded-sm border-opacity-35 border-2 border-[#2D3DDF]">
                        Continue
                      </button>
                      </div>
                      
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
