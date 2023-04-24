import { combineReducers } from "redux";
import userInfoReducer from "./userInfoReducer";

export default combineReducers({
  userInfo: userInfoReducer,
});
