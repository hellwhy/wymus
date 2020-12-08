import axios from "axios";

const apiaxios = axios.create({
  timeOut: 5000,
});

export default apiaxios;
