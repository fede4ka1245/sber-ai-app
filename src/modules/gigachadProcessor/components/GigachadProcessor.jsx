import React from "react";
import {Provider} from "react-redux";
import store from '../store/store';
import Root from "./root/Root";

const GigachadProcessor = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default GigachadProcessor;