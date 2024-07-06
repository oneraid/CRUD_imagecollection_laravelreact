
import PropTypes from 'prop-types';

const EditProfileForm = ({
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  handleCancel,
}) => (
  <div className="mt-10 py-10 border-t border-gray-600 text-center">
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="bg-gray-600 text-gray-300 rounded-lg focus:outline-none focus:shadow-outline w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="bg-gray-600 text-gray-300 rounded-lg focus:outline-none focus:shadow-outline w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="pictures">
          Profile Picture
        </label>
        <input
          id="pictures"
          name="pictures"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="bg-gray-600 text-gray-300 rounded-lg focus:outline-none focus:shadow-outline w-full"
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-pink-500 active:bg-pink-600 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-500 active:bg-gray-600 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

EditProfileForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    pictures: PropTypes.instanceOf(File),
  }).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditProfileForm;
