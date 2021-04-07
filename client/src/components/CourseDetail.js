import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

class CourseDetail extends Component {
  state = {
    course: "",
    firstName: "",
    lastName: "",
    time: "",
    materials: "",
    emailAddress: "",
  };

  componentDidMount() {
    const courseId = this.props.history.location.pathname;

    fetch(`http://localhost:5000/api/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          course: data,
          firstName: data.userOwner.firstName,
          lastName: data.userOwner.lastName,
          time: data.estimatedTime,
        });
        if (data.materialsNeeded) {
          this.setState({
            materials: data.materialsNeeded,
          });
        }
      });
  }

  render() {
    const { history } = this.props;
    const { course, firstName, lastName, time, materials } = this.state;
    const courseId = history.location.pathname;
    const { authenticatedUser } = this.props.context;

    return (
      <>
        <div className="actions--bar">
          <div className="wrap">
            {authenticatedUser ? (
              <>
                <Link to={`${courseId}/update`} className="button">
                  Update Course
                </Link>
                <Link to="/" onClick={this.handleDelete} className="button">
                  Delete Course
                </Link>
                <Link to="/" className="button button-secondary">
                  Return to List
                </Link>
              </>
            ) : (
              <Link to="/" className="button button-secondary">
                Return to List
              </Link>
            )}
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
  }

  // Delete a course
  handleDelete = () => {
    // delete course function
    const { context, history } = this.props;
    const { deleteCourse } = context.data;
    const { id } = this.props.match.params;

    // authenticated user
    if (context.authenticatedUser) {
      const { authenticatedEmail } = context.authenticatedUser.user;
      // authenticated password
      const { authenticatedPassword } = context;
      // delete
      deleteCourse(id, authenticatedEmail, authenticatedPassword);
      history.push("/");
    }
  };
}

export default CourseDetail;
