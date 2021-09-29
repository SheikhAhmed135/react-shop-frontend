import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../const";

const useProducts = (id = null) => {
  const cashedProducts = useMemo(
    () => !id && localStorage.getItem("products"),
    [id]
  );
  const [state, setState] = useState(
    cashedProducts ? JSON.parse(cashedProducts) : []
  );
  const [hasLoaded, setHasLoaded] = useState(cashedProducts ? true : false);

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source();

    axios
      .get(`${API_URL}/api/product/${id !== null ? id : ""}`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        if (id !== null) {
          setState([res.data]);
        } else {
          localStorage.setItem("products", JSON.stringify(res.data));
          setState(res.data);
        }
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

export default useProducts;
