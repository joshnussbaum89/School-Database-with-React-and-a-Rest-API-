import React, { Component } from "react";
import Form from "./Form";

class CreateCourse extends Component {
  state = {
    courseTitle: "",
    courseAuthor: "",
    courseDescription: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  render() {
    const {
      courseTitle,
      courseAuthor,
      courseDescription,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    return (
      <>
        <div className="wrap">
          <h2>Create Course</h2>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              <React.Fragment>
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
              </React.Fragment>
            )}
          />
        </div>
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
    const { context } = this.props;
    const userId = context.authenticatedUser.user.id;
    const { emailAddress } = context.authenticatedUser.user;
    const { authenticatedPassword } = context;

    // Local State variables
    const { courseAuthor, materialsNeeded, estimatedTime } = this.state;
    const title = this.state.courseTitle;
    const description = this.state.courseDescription;

    // New course payload
    const course = {
      userId,
      title,
      courseAuthor,
      description,
      materialsNeeded,
      estimatedTime,
    };

    context.data
      .createCourse(course, emailAddress, authenticatedPassword)
      .then((errors) => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log(`New class: "${course.title}" was successfully created!`);
          this.props.history.push("/");
        }
      })
      // handle rejected promises
      .catch((err) => {
        console.error(err);
        // push to history stack
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default CreateCourse;
