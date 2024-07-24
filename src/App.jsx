import React from "react";
import Home from "./home/Home";
import Courses from "./CoursesFolder/Courses";
import { Route, Routes } from "react-router-dom";
// import Courses from './Components/Courses/Courses';
import Signup from "./Components/Signup";
import Contact from "./ContactFolder/Contact";
import MainLayout from "./Layouts/MainLayout";

function App() {
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Course" element={<Courses />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes> */}
      
          <Routes path="/" element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Course" element={<Courses />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
     
      </div>
    </>
  );
}
export default App;
