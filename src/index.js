import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProSidebarProvider } from "react-pro-sidebar";
import {createBrowserRouter,RouterProvider, } from 'react-router-dom';
//import 'bootstrap/dist/css/bootstrap.min.css';
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App/>,
//     children:[
//       {
//         path : "home",
//         element: <Home/>,
//       },
//       {
//         path:"database",
//         element:<Form/>
//       }
//     ]
//   },
  
// ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    
    <ProSidebarProvider>
      <App/>
    {/*<RouterProvider router={router}/> */}
    </ProSidebarProvider>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
