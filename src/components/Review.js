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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
    const [width, setWidth] = useState(window.innerWidth);
    
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return(
        <>
         <h1>"Review"</h1>
        </>
    )
}