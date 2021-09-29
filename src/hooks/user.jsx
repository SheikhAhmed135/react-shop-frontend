import axios from "axios";
import { useCallback, useContext, useLayoutEffect, useState } from "react";
import { createContext } from "react";
import Loading from "../components/Loading";
import { API_URL } from "../const";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const tokenSaved = localStorage["token"];
  const [isLogin, setIsLogin] = useState(
    tokenSaved === undefined ? false : true
  );
  const [token, setToken] = useState(
    localStorage.getItem("token") === undefined
      ? null
      : localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = useCallback(() => {
    setToken(null);
    setIsLogin(false);
    setUser(null);
    setProfile(null);
    setLoading(false);
    localStorage.removeItem("token");
  }, []);

  const fetchUser = useCallback(
    (options) => {
      return new Promise((resolve, reject) => {
        const userUrl = `${API_URL}/rest-auth/user/`;
        const userRequest = axios.get(userUrl, options);

        const profileURL = `${API_URL}/api/user-profile/`;
        const profileRequest = axios.get(profileURL, options);

        const request = [userRequest, profileRequest];

        axios
          .all(request)
          .then(
            axios.spread((...responses) => {
              setUser(responses[0].data);
              setProfile(responses[1].data[0]);
              setIsLogin(true);
              setLoading(false);
              resolve(123);
            })
          )
          .catch((err) => {
            console.log(err);
            if (axios.isAxiosError(err)) {
              logout();
              resolve(123);
            }
            reject(err);
          });
      });
    },
    [logout]
  );

  const login = useCallback(
    (ld) => {
      setLoading(true);
      return axios
        .post(`${API_URL}/rest-auth/login/`, ld)
        .then(async (res) => {
          setToken(res.data.key);
          localStorage.setItem("token", res.data.key);

          const options = {
            headers: {
              Authorization: `Token ${res.data.key}`,
            },
          };

          await fetchUser(options);
          return;
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    },
    [fetchUser]
  );

  const signin = useCallback(
    (sd) => {
      setLoading(true);
      return axios
        .post(`${API_URL}/rest-auth/registration/`, sd)
        .then(async (res) => {
          const token = res.data.key;
          localStorage.setItem("token", token);
          setToken(token);
          const options = {
            headers: { Authorization: `Token ${token}` },
          };
          await fetchUser(options);
          setLoading(false);

          return;
        })
        .catch((err) => {
          setLoading(false);
          throw err;
        });
    },
    [fetchUser]
  );

  const editProfile = useCallback(
    (values) => {
      const options = {
        headers: { Authorization: `Token ${token}` },
      };

      return axios
        .put(`${API_URL}/api/edit-profile/`, values, options)
        .then((res) => {
          setProfile({ ...profile, ...res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [token, profile]
  );

  const editUser = useCallback(
    (values) => {
      const options = {
        headers: { Authorization: `Token ${token}` },
      };

      return axios
        .put(`${API_URL}/rest-auth/user/`, values, options)
        .then((res) => {
          setUser({ ...user, ...res.data });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [token, user]
  );

  useLayoutEffect(() => {
    if (
      localStorage["token"] === undefined &&
      user === null &&
      profile === null
    ) {
      const options = {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      };
      const getUser = async () => {
        setLoading(true);
        await fetchUser(options);
        setLoading(false);
      };
      getUser();
    }
  }, [fetchUser, user, profile]);

  return (
    <UserContext.Provider
      value={{
        isLogin,
        actions: {
          login,
          logout,
          signin,
          editProfile,
          editUser,
        },
        loading,
        state: {
          profile,
          user,
          token,
        },
      }}
    >
      {isLogin ? (
        token === null || user === null || profile === null ? (
          <Loading />
        ) : (
          children
        )
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);
export default useUser;