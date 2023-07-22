import Cookies from "js-cookie";

export const saveToBrowser = (record, token) => {
   localStorage.setItem("user_record", JSON.stringify(record));
   Cookies.set("user_token", JSON.stringify(token));
};
