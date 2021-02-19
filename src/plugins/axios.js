/**
 * БИБЛИОТЕКА AXIOS для доступа к API
 */
import axios from "axios";

/**
 * базовый URL rest api сервера
 * @type {string}
 */
const baseURL = "https://egar-test-default-rtdb.firebaseio.com/";

export default axios.create({
  baseURL
});
