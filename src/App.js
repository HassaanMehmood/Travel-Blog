import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./components/AuthenticationCmponents/login.component.js";
import SignUp from "./components/AuthenticationCmponents/signup.component.js";
import UserAdminDetails from "./components/AuthenticationCmponents/User_Admin_Details.js";
import UserHomePage from "./components/UserComponents/userHomePage.js";
import EditUserData from "./components/UserComponents/editUserData.js";
import AddBlogPost from "./components/UserComponents/addBlogPost.js";
import AdminHomePage from "./components/AdminComponents/adminHomePage.js";
import AdminBlogManagement from "./components/AdminComponents/AdminBlogManagement.js";
import QuizManagement from "./components/AdminComponents/adminQuizManagement.js";
import TravelCostManagement from "./components/AdminComponents/adminBudgetPlannerManagement.js";

import WebHome from "./WebHomeComponents/WebHome.js";
import Blog from "./BlogHomePage.js";
import BlogCardDetails from "./BlogCardDetails.js";
import Navbar from "./Navbar";
import ExplorePage from "./WebHomeComponents/ExplorePage";
import Footer from "./Footer";
import About from "./About";

function App() {
  // getting loggedin true here from sign-in
  const isloggedin = window.localStorage.getItem("loggedin");
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={isloggedin ? <WebHome /> : <UserAdminDetails />}
        />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/user-admin-details" element={<UserAdminDetails />} />
        <Route path="/admin-home-page" element={<AdminHomePage />} />
        <Route
          path="/admin-blog-management"
          element={<AdminBlogManagement />}
        />
        <Route path="/admin-quiz-management" element={<QuizManagement />} />
        <Route
          path="/admin-travel-cost-management"
          element={<TravelCostManagement />}
        />

        <Route path="/user-home-page" element={<UserHomePage />} />
        <Route path="/edit-user-data" element={<EditUserData />} />
        <Route path="/add-blog-post" element={<AddBlogPost />} />
        <Route path="/blog-post-home" element={<Blog />} />
        <Route path="/blog-details/:id" element={<BlogCardDetails />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
