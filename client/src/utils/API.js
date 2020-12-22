import axios from "axios";

export default {

  // USER Routes
  getUser: function () {
    return axios.get("/api/user");
  },

  createUser: function (formCred) {
    return axios.post("/api/user", {
      email: formCred.Email,
      username: formCred.Username,
      password: formCred.Password
    }).then(user => {console.log(user)})
    .catch(err => {console.log(err)});
  },

  getUserId: function (id) {
    return axios.get("/api/user/" + id);
  },

  removeUser: function (id) {
    return axios.delete("/api/user/" + id);
  },

  getUsername: function (username) {
    return axios.get("/api/user/" + username);
  },

  // AUTHORIZATION Routes
  getAuthToken: function (username, password) {
    return axios.post("/api/auth/", {
      username: username,
      password: password
    })
  },

  // SURVEY Routes
    getSurvey: function () {
      return axios.get("/api/survey");
    },

    createSurvey: function () {
      return axios.post("/api/survey");
    },

    getSurveyId: function (id) {
      return axios.get("/api/survey/" + id);
    },

    updateSurvey: function (id) {
      return axios.put("/api/survey/" + id);
    },

    deleteSurvey: function (id) {
      return axios.delete("/api/survey/" + id);
    },
};
