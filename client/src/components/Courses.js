import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Courses = ({ context }) => {
  const [courses, updateCourses] = useState([]);

  // 1. Get courses
  useEffect(() => {
    context.data
      .api("/courses")
      .then((res) => res.json())
      .then((data) => updateCourses(data));
  }, []);

  // 2. Map over them to display
  const courseInfo = courses.map((course, index) => (
    <Link
      // :id needs to be course id
      to={`courses/${course.id}`}
      key={index}
      className="course--module course--link"
    >
      <h2 className="course--label">Course</h2>
      <h3 className="course--title">{course.title}</h3>
    </Link>
  ));

  return (
    <>
      <div className="wrap main--grid">
        {courseInfo}
        <Link
          to="/courses/create"
          className="course--module course--add--module"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </>
  );
};

export default Courses;
