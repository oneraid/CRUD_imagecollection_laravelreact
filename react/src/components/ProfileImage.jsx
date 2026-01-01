import PropTypes from "prop-types";

const ProfileImage = ({ profile }) => {
  return (
    <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
      <div className="relative">
        <img
          alt="Profile"
          src={
            profile.pictures ||
            "https://api.dicebear.com/9.x/avataaars/svg?seed=default"
          }
          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
          style={{ maxWidth: "150px" }}
        />
      </div>
    </div>
  );
};

ProfileImage.propTypes = {
  profile: PropTypes.shape({
    pictures: PropTypes.string,
    // Add more properties as needed
  }).isRequired,
};

export default ProfileImage;
