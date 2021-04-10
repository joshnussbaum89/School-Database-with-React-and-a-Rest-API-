import React from "react";
import { Link } from "react-router-dom";

class Courses extends React.Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((courses) => {
        if (Object.keys(courses).length !== 0) {
          this.setState({ courses });
        } else {
          this.props.history.push("/error");
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.history.push("/error");
      });
  }

  render() {
    // Map over them to display
    const { courses } = this.state;
    let courseInfo;

    if (courses.length) {
      courseInfo = courses.map((course, index) => (
        <Link
          to={`courses/${course.id}`}
          key={index}
          className="course--module course--link"
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ));
    }

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
  }
}

export default Courses;
