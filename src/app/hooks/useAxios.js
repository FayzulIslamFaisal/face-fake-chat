import { useEffect } from "react";
import { api } from "../api";
import { UseAuth } from "./UseAuth";

const useAxios = () => {
  const { auth, setAuth } = UseAuth(); // `setAuth` is not used, so removed it.

  useEffect(() => {
    // Add a request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const orginalRequest = error.config;
        if (error.response.status === 401 && !orginalRequest._retry) {
          orginalRequest._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;
            console.log("interceptors token===>", token);
            setAuth({ ...auth, authToken: token });
            orginalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(orginalRequest);
          } catch (error) {
            console.error("Error refreshing token:", error);
            // Log out user or handle the error as needed
            throw error;
          }
        }
        return Promise.reject(error);
      }
    );

    // Cleanup function to eject interceptors when the component unmounts
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth?.authToken]);
  return { api };
};

export default useAxios;
