import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  const fetchJobs = (category = "") => {
    let url = `https://job-app-1-n7z7.onrender.com/api/v1/job/getall`;
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchJobs(category);
  };

  if (!isAuthorized) {
    navigateTo("/");
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h3>ALL AVAILABLE JOBS</h3>
        <div className="filter">
        <label htmlFor="category"></label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select Category</option>
            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Frontend Web Development">Frontend Web Development</option>
            <option value="MERN Stack Development">MERN STACK Development</option>
            <option value="Accounts & Finance">Accounts & Finance</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Video Animation">Video Animation</option>
            <option value="Software Development">Software Development</option>
            <option value="Data Entry Operator">Data Entry Operator</option>
          </select>
        </div>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
