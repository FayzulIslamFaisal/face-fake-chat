"use client";
import PrivateRoutes from "../components/routes/PrivateRoutes";
import { UseAuth } from "../hooks/UseAuth";
import useAxios from "../hooks/useAxios";
import { useState, useEffect, useTransition } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const { api } = useAxios();
  const { auth } = UseAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        startTransition(async () => {
          const response = await api.get(
            `${process.env.NEXT_PUBLIC_BASE_URL}/profile/${auth?.user?.id}`
          );
          setUser(response?.data?.user);
          setPost(response?.data?.posts);
        });
      } catch (error) {
        console.error(error);
        // Handle error here
        setError(error);
      }
    };
    fetchProfile();
  }, []);
  return (
    <>
      <PrivateRoutes>
        <div className="container mx-auto">
          {isPending ? (
            <div className=" flex items-center justify-center">
              <h1>Fetching in your Profile Data.....</h1>
            </div>
          ) : (
            <h1>{user?.lastName}</h1>
          )}
          <h1 className="text-white">ProfilePage</h1>
        </div>
      </PrivateRoutes>
    </>
  );
};

export default ProfilePage;
