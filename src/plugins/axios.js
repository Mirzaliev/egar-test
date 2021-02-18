import axios from "axios";

const baseURL = "https://egar-test-default-rtdb.firebaseio.com/";

export default axios.create({
  baseURL,
  headers: {}
});
