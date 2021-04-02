import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";

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
    // let { courses } = this.state;
    // let titles = courses.map((course) => <li>{course.title}</li>);

    return (
      <Router>
        <div>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Courses} />
              <Route path="/courses/create" component={CreateCourse} />
              <Route path="/courses/:id/update" component={UpdateCourse} />
              <Route path="/courses/:id" component={CourseDetail} />
              <Route path="/signin" component={UserSignIn} />
              <Route path="/signup" component={UserSignUp} />
              {/* UserSignOut signs out authenticated user and redirects to '/' */}
              <Route path="/signout" component={UserSignOut} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
