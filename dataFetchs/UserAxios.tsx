"use client";

import { createContext, useEffect, useState } from "react";
import { axiosAdmin, axiosUser } from "./AxiosToken";
import { useRouter } from "next/navigation";

export const UserContext = createContext<any>(null);

const UserAxiosContext = ({ children }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<any>({});
  const [loaderUser, setLoaderUser] = useState<boolean>(true);
  const [newRenderUser, setNewRenderUser] = useState<any>();
  const [tokenUser, setTokenUser] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("SamiDzma-User") : null
  );

  const [admin, setAdmin] = useState<any>({});
  const [loaderAdmin, setLoaderAdmin] = useState<boolean>(true);
  const [newRenderAdmin, setNewRenderAdmin] = useState<any>();
  const [tokenAdmin, setTokenAdmin] = useState<string | null>(
    typeof window !== "undefined"
      ? localStorage.getItem("SamiDzma-Admin")
      : null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userTokenFromLocal = localStorage.getItem("SamiDzma-User");
      const adminTokenFromLocal = localStorage.getItem("SamiDzma-Admin");

      setTokenUser(userTokenFromLocal);
      setTokenAdmin(adminTokenFromLocal);
    }
  }, []);

  const setUserTokenInLocal = (newUserToken: string | null) => {
    setTokenUser(newUserToken);
    if (newUserToken) {
      localStorage.setItem("SamiDzma-User", newUserToken);
    } else {
      localStorage.removeItem("SamiDzma-User");
    }
  };

  const setAdminTokenInLocal = (newAdminToken: string | null) => {
    setTokenAdmin(newAdminToken);
    if (newAdminToken) {
      localStorage.setItem("SamiDzma-Admin", newAdminToken);
    } else {
      localStorage.removeItem("SamiDzma-Admin");
    }
  };

  // get current logged in user
  useEffect(() => {
    if (tokenUser) {
      setLoaderUser(true);
      axiosUser
        .get("user")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((err) => {})
        .finally(() => {
          setLoaderUser(false);
        });
    }
  }, [tokenUser, newRenderUser]);
  // get current logged in user

  // // get current logged in admin
  useEffect(() => {
    if (tokenAdmin) {
      setLoaderAdmin(true);
      axiosAdmin
        .get("admin")
        .then((res) => {
          setAdmin(res.data);
        })
        .catch((err) => {})
        .finally(() => {
          setLoaderAdmin(false);
        });
    }
  }, [tokenAdmin, newRenderAdmin]);
  // // get current logged in admin

  // // logout user
  const handelLogOutUser = () => {
    setLoaderUser(true);
    axiosUser
      .get("userAuth/logOut")
      .then(() => {
        setUserTokenInLocal(null);
        setUser({});
        router.push("/");
      })
      .catch((error) => {})
      .finally(() => {
        setLoaderUser(false);
      });
  };
  // // logout user

  // // logout admin
  const handelLogOutAdmin = () => {
    setLoaderAdmin(true);
    // router.push("/admin");
    axiosAdmin
      .get("adminAuth/logOut")
      .then(() => {
        setAdminTokenInLocal(null);
        setAdmin({});
      })
      .catch((error) => {})
      .finally(() => {
        setLoaderAdmin(false);
      });
  };
  // // logout admin

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loaderUser,
        setLoaderUser,
        setNewRenderUser,
        setUserTokenInLocal,
        handelLogOutUser,

        admin,
        setAdmin,
        loaderAdmin,
        setLoaderAdmin,
        setNewRenderAdmin,
        setAdminTokenInLocal,
        handelLogOutAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserAxiosContext;
