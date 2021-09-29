import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL } from "../const";

const useSlides = () => {
  const cashedSlides = useMemo(() => {
    if (localStorage.getItem("slides")) {
      localStorage.getItem("slides");
    }
  }, []);
  const [state, setState] = useState(
    cashedSlides ? JSON.parse(cashedSlides) : []
  );
  const [hasLoaded, setHasLoaded] = useState(cashedSlides ? true : false);
  useEffect(() => {
    var cancelHandler = axios.CancelToken.source();

    axios
      .get(`${API_URL}/api/slide/`, { cancelToken: cancelHandler.token })
      .then((res) => {
        localStorage.setItem("slides", JSON.stringify(res.data));
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
      }
  }, []);
  return { state, hasLoaded };
};

export default useSlides;
