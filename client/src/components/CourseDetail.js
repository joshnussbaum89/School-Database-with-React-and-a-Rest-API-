import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const CourseDetail = ({ match, history, context }) => {
  const [course, updateCourse] = useState([]);
  const [firstName, updateFirstName] = useState();
  const [lastName, updateLastName] = useState();
  const [time, updateTime] = useState();
  const [materials, updateMaterials] = useState();
  const courseId = history.location.pathname;
  const { id } = match.params;

  // 1. Get courses
  useEffect(() => {
    context.data
      .api(courseId)
      .then((res) => res.json())
      // 2. set data in hooks
      .then((data) => {
        updateCourse(data);
        updateFirstName(data.userOwner.firstName);
        updateLastName(data.userOwner.lastName);
        updateTime(data.estimatedTime);
        if (data.materialsNeeded) {
          updateMaterials(data.materialsNeeded);
        }
      });
  }, [context.data, courseId]);
  // :ids go 1, 2, 3, 27, 34 ... 42
  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          <Link to={`${courseId}/update`} className="button">
            Update Course
          </Link>
          <Link
            to="/"
            onClick={() => context.data.deleteCourse(id)}
            className="button"
          >
            Delete Course
          </Link>
          <Link to="/" className="button button-secondary">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                {firstName} {lastName}
              </p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{time}</p>
              <h3 className="course--detail--title">Materials Needed</h3>
              <ReactMarkdown className="course--detail--list">
                {materials}
              </ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;
