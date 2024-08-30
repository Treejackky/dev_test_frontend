import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Explore from './components/Explore';
import Hotels from './components/Hotels';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Room from './components/Room';
import Review from './components/Review';
import Payment from './components/Payments';
import FinalPass from '../src/components/FinalPass';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/explore',
    element: <Explore />,
  },
  {
    path: '/hotels/:location',
    element: <Hotels />,
  },
  {
    path: '/review/:checkin/:checkout/:adult/:childrens/:room/:base_price/:room_num/:id/:hotel/:locations',
    element: <Review />,
  },
  {
    path: '/room/:locations/:id/:name/',
    element: <Room />,
  },
  {
    path: '/payment/:checkin/:checkout/:adult/:childrens/:room/:base_price/:room_num/:id/:hotel/:locations',
    element: <Payment />,
  },
  {
    path: '/finalpass',
    element: <FinalPass />,
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
