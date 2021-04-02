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

// Context
import withContext from "./Context";
// import PrivateRoute from "./PrivateRoute";

// Connects Components to context
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

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
              <Route
                path="/courses/create"
                component={CreateCourseWithContext}
              />
              <Route
                path="/courses/:id/update"
                component={UpdateCourseWithContext}
              />
              <Route path="/courses/:id" component={CourseDetailWithContext} />
              <Route path="/signin" component={UserSignInWithContext} />
              <Route path="/signup" component={UserSignUpWithContext} />
              {/* UserSignOut signs out authenticated user and redirects to '/' */}
              <Route path="/signout" component={UserSignOutWithContext} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
