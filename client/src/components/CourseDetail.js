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
    errors: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
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
        } else {
          this.props.history.push("/notfound");
        }
      })
      .catch((error) => {
        this.props.history.push("/error");
        console.log("Course not found: ", error);
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
            {authenticatedUser &&
            authenticatedUser.user.id === course.userId ? (
              <>
                <Link to={`${courseId}/update`} className="button">
                  Update Course
                </Link>
                <Link
                  to={`${courseId}`}
                  onClick={this.handleDelete}
                  className="button"
                >
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
          <form onSubmit={this.handleDelete}>
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

  /**
   * Delete a course
   */

  handleDelete = () => {
    const { context, history } = this.props;
    const { id } = this.props.match.params;

    // Authenticated user
    const { emailAddress } = context.authenticatedUser.user;
    // Authenticated password
    const { authenticatedPassword } = context;

    // Confirm and delete
    let confirm = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (confirm) {
      context.data
        .deleteCourse(id, emailAddress, authenticatedPassword)
        .then((errors) => {
          if (errors.length > 0) {
            this.setState({ errors });
          } else {
            history.push("/");
          }
        })
        // Handle rejected promises
        .catch((error) => {
          console.error(error);
          history.push("/error");
        });
    }
  };
}

export default CourseDetail;
