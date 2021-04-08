import React, { Component } from "react";
import Form from "./Form";

// In case user manually types in courses/:id/update for a course they don't own
import Forbidden from "./Forbidden";

class UpdateCourse extends Component {
  state = {
    courseTitle: "",
    courseAuthor: "",
    courseDescription: "",
    userId: null,
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          courseTitle: data.title,
          courseAuthor: `${data.userOwner.firstName} ${data.userOwner.lastName}`,
          courseDescription: data.description,
          userId: data.userId,
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded,
        });
      })
      .catch((error) => {
        this.props.history.push("/notfound");
        console.log("Course not found: ", error);
      });
  }

  render() {
    const {
      courseTitle,
      courseAuthor,
      courseDescription,
      userId,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;
    const { authenticatedUser } = this.props.context;

    return (
      <>
        {authenticatedUser.user.id === userId ? (
          <div className="wrap">
            <h2>Update Course</h2>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Update Course"
              elements={() => (
                <>
                  <div className="main--flex">
                    <div>
                      <label htmlFor="courseTitle">Course Title</label>
                      <input
                        id="courseTitle"
                        name="courseTitle"
                        type="text"
                        onChange={this.change}
                        value={courseTitle}
                      />
                      <label htmlFor="courseAuthor">Course Author</label>
                      <input
                        id="courseAuthor"
                        name="courseAuthor"
                        type="text"
                        onChange={this.change}
                        value={courseAuthor}
                      />
                      <label htmlFor="courseDescription">
                        Course Description
                      </label>
                      <textarea
                        id="courseDescription"
                        name="courseDescription"
                        onChange={this.change}
                        value={courseDescription}
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="estimatedTime">Estimated Time</label>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        onChange={this.change}
                        value={estimatedTime}
                      />

                      <label htmlFor="materialsNeeded">Materials Needed</label>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        onChange={this.change}
                        value={materialsNeeded}
                      ></textarea>
                    </div>
                  </div>
                </>
              )}
            />
          </div>
        ) : (
          // If currently signed in user is not the course owner
          <Forbidden />
        )}
      </>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    // Context variables
    const { context, history } = this.props;
    const userId = context.authenticatedUser.user.id;
    const { emailAddress } = context.authenticatedUser.user;
    const { authenticatedPassword } = context;

    // Local State variables
    const { courseAuthor, materialsNeeded, estimatedTime } = this.state;
    const title = this.state.courseTitle;
    const description = this.state.courseDescription;

    // course id
    const { id } = this.props.match.params;

    // New course payload
    const course = {
      userId,
      title,
      courseAuthor,
      description,
      materialsNeeded,
      estimatedTime,
    };

    // courses/:id/update

    // Confirm and update
    // console.log(context.authenticatedUser, context.authenticatedUser.user, id);
    // console.log(userId, id, course);
    let confirm = window.confirm(
      "Are you sure you want to update this course?"
    );
    if (confirm) {
      context.data
        .updateCourse(id, course, emailAddress, authenticatedPassword)
        .then((errors) => {
          if (errors.length) {
            console.log(errors);
            this.setState({ errors });
          } else {
            console.log(
              `Your course: "${course.title}" was successfully updated!`
            );
            history.push(`/courses/${id}`);
          }
        })
        // handle rejected promises
        .catch((error) => {
          console.log(error);
          history.push("/error");
        });
    }
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default UpdateCourse;
