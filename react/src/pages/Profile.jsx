// Profile.js

import { useEffect, useState } from "react";
import axios from "axios";
import EditProfileForm from "../components/ProfileEditForm";
import ProfileStats from "../components/ProfileStats";
import PropTypes from "prop-types";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    pictures: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data.data);
        setFormData({
          name: response.data.data.name,
          bio: response.data.data.bio || "",
          pictures: null,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pictures: e.target.files[0],
    });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset form data to current profile data if cancel is clicked
    setFormData({
      name: profile.name,
      bio: profile.bio || "",
      pictures: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const form = new FormData();
      form.append("_method", "PUT");
      form.append("name", formData.name);
      form.append("bio", formData.bio);
      if (formData.pictures) {
        form.append("pictures", formData.pictures);
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/profile/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfile(response.data.user);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="profile-page bg-gray-900 text-white">
      <section className="relative block" style={{ height: "500px" }}>
        {/* Background image and overlay */}
      </section>

      <section className="relative py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                {/* Profile picture and edit button */}
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <div className="avatar relative w-40 h-40 -mt-20 rounded-full ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                      <img
                        alt="Profile"
                        src={
                          profile.pictures
                            ? `http://127.0.0.1:8000/photos_profile/${profile.pictures}`
                            : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                {/* Stats section */}
                <ProfileStats profile={profile} />

                {/* Edit button */}
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={handleEdit}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>

              {/* Conditional rendering based on editMode */}
              {editMode ? (
                <EditProfileForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  handleSubmit={handleSubmit}
                  handleCancel={handleCancel}
                />
              ) : (
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-200">
                    {profile.name}
                  </h3>
                  <div className="mb-2 text-gray-300 mt-10">
                    <h1 className=" text-2xl fas fa-briefcase mr-2 text-gray-300">
                      {profile.bio}
                    </h1>
                  </div>
                </div>
              )}

              {/* Bio section */}
              <div className="mt-10 py-10 border-t border-gray-600 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <a
                      href="#pablo"
                      className="font-normal text-pink-400"
                      onClick={(e) => e.preventDefault()}
                    >
                      Show more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    pictures: PropTypes.string,
    likeimage: PropTypes.array,
    comment: PropTypes.array,
  }).isRequired,
};
