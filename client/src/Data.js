import config from "./config";

export default class Data {

  /**
   * Helper function to communicate with API
   * @param {*} path - API endpoint
   * @param {*} method - HTTP method
   * @param {*} body - Data associated with request
   * @param {*} requiresAuth - Boolean
   * @param {*} credentials - Username and password
   * @returns fetched url with method and header options
   */

  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // If auth is required (boolean)
    // Send authorization header to server with authenticated information
    // Uses base-64 encoding - btoa()
    if (requiresAuth) {

      // credentials.username for signIn and credentials.emailAddress for new course
      const username = credentials.username || credentials.emailAddress;
      const encodedCredentials = btoa(`${username}:${credentials.password}`);

      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /**
   * Function used in Data.js to sign in user
   * @param {*} username
   * @param {*} password
   * @returns Authenticated user, null or error
   */

  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  /**
   * Creates new user
   * @param {*} user
   * @returns 201 empty array, 400 error or error
   */

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Creates new course
   * @param {*} course
   * @param {*} emailAddress
   * @param {*} password
   * @returns 201 empty array, 400 error or error
   */

  async createCourse(course, emailAddress, password) {
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Updates selected course
   * @param {*} id 
   * @param {*} course 
   * @param {*} emailAddress 
   * @param {*} password 
   * @returns 204 empty array, 400 error or error
   */

  async updateCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /**
   * Deletes selected course
   * @param {*} id 
   * @param {*} emailAddress 
   * @param {*} password 
   * @returns 204 empty array, 403 error or error
   */

  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      emailAddress,
      password,
    });

    if (response.status === 204) {
      return [];
    } else if (response.status === 403) {
      return response.json().then((data) => {
        return data.message;
      });
    } else {
      throw new Error();
    }
  }
}
