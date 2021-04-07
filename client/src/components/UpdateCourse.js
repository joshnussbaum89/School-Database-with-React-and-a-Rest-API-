import React, { Component } from "react";
import Form from "./Form";

class UpdateCourse extends Component {
  state = {
    courseTitle: "",
    courseAuthor: "",
    courseDescription: "",
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
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded,
        });
      });
  }

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

    // TODO
    // This needs to redirect to homepage after course is updated
    // OR you can display a message indicating course was updated
    context.data
      .updateCourse(id, course, emailAddress, authenticatedPassword)
      .then((errors) => {
        if (errors) {
          this.setState({ errors });
        } else {
          console.log(
            `Your course: "${course.title}" was successfully updated!`
          );
          this.props.history.push("/");
        }
      })
      // handle rejected promises
      .catch((err) => {
        console.error(err);
        // push to history stack
        history.push("/error");
      });
    // this.props.history.push("/");
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default UpdateCourse;
