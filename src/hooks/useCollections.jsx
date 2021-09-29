import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../const";

const useCollections = (id = null) => {
  const cashedCollections = useMemo(
    () => !id && localStorage.getItem("collections"),
    [id]
  );
  const [state, setState] = useState(
    cashedCollections ? JSON.parse(cashedCollections) : []
  );
  const [hasLoaded, setHasLoaded] = useState(cashedCollections ? true : false);

  useEffect(() => {
    var cancelHandler = axios.CancelToken.source();

    axios
      .get(`${API_URL}/api/collection/${id !== null ? id : ""}`, {
        cancelToken: cancelHandler.token,
      })
      .then((res) => {
        if (!id == null) {
          setState([res.data]);
        } else {
          localStorage.setItem("collection", JSON.stringify(res.data));
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

export default useCollections;
