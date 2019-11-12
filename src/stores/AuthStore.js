import { decorate, observable } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";
class AuthStore {
  user = null;

  setUser = token => {
    axios.defaults.headers.common.Authorization = `JWT ${token}`;
    const decodedUser = jwt_decode(token);
    this.user = decodedUser;

    // if(token){
    //     localStorage.setItem("LeToken", token);
    //     axios.defaults.headers.common.Authorization = `JWT ${token}`
    //     const decodedUser = jwt_decode(token);
    //     this.user = decodedUser;
    // } else {
    //     delete.axios.defaults.headers.common.Authorization;
    //     this.user = null;
    //}
  };

  signupUser = async userData => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/signup/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      // history.replace("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  loginUser = async (userData, history) => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      history.replace("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();

export default authStore;
