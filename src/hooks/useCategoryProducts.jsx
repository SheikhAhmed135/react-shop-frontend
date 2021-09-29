import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { API_URL } from "../const";

const useCategoryProducts = (id) => {
  const cashedCategoryProducts = useMemo(
    () => !id && localStorage.getItem("categoryProducts"),
    [id]
  );
  const [state, setState] = useState(
    cashedCategoryProducts ? JSON.parse(cashedCategoryProducts) : []
  );
  const [hasLoaded, setHasLoaded] = useState(
    cashedCategoryProducts ? true : false
  );

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source();

    axios
      .get(`${API_URL}/api/product/?cat=${id}`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        localStorage.setItem("categoryProducts", JSON.stringify(res.data));
        setState(res.data);
        setHasLoaded(true);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          console.log(err);
        }
      });

    return () => {
      cancelHandler.cancel();
    };
  }, [id]);
  return { state, hasLoaded };
};

export default useCategoryProducts;
