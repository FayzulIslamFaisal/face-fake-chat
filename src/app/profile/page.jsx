import PrivateRoutes from "../components/routes/PrivateRoutes";

const ProfilePage = () => {
  return (
    <>
      <PrivateRoutes>
        <div className="container mx-auto">
          <h1 className="text-white">ProfilePage</h1>
        </div>
      </PrivateRoutes>
    </>
  );
};

export default ProfilePage;
