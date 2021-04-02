import React, { Component } from "react";

class App extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    this.fetchCourses("http://localhost:5000/api/courses")
      .then((res) => this.setState({ courses: res }))
      .catch((err) => console.log(err));
  }

  fetchCourses = async (string) => {
    const response = await fetch(string);
    const courses = await response.json();
    return courses;
  };

  render() {
    let { courses } = this.state;
    console.log(courses);
    return (
      <div className="App">
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
