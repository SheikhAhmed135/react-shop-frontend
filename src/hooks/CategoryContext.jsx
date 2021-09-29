import React, { useContext, useState } from "react";
import axios from "axios";

import { API_URL } from "../const";

const context = React.createContext(null);

const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  var cancelHandler = axios.CancelToken.source();

  const store = {
    value: category,
    hasLoaded,

    allCategories() {
      return new Promise((resolve, reject) => {
        axios
          .get(`${API_URL}/api/category/`, {
            cancelToken: cancelHandler.token,
          })
          .then((res) => {
            setCategory(res.data);
            setHasLoaded(true);
            resolve();
          })
          .catch((err) => {
            if (!axios.isCancel(err)) {
              console.log(err);
            }
            reject(err);
          });
      });
    },

    idCategory({ id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${API_URL}/api/category/${id}`, {
            cancelToken: cancelHandler.token,
          })
          .then((res) => {
            setCategory(res.data);
            setHasLoaded(true);
            resolve();
          })
          .catch((err) => {
            if (!axios.isCancel(err)) {
              console.log(err);
            }
            reject();
          });
      });
    },

    collectionCategories({ id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${API_URL}/api/category/?collection=${id}`, {
            cancelToken: cancelHandler.token,
          })
          .then((res) => {
            setCategory(res.data);
            setHasLoaded(true);
            resolve();
          })
          .catch((err) => {
            if (!axios.isCancel(err)) {
              console.log(err);
            }
            reject();
          });
      });
    },
  };

  return <context.Provider value={store}>{children}</context.Provider>;
};

export default CategoryProvider;
export const useCategory = () => useContext(context);
