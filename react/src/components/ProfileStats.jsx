
import PropTypes from 'prop-types';

const ProfileStats = ({ profile }) => (
  <div className="w-full lg:w-4/12 px-4 lg:order-1">
    <div className="flex justify-center py-4 lg:pt-4 pt-8">
      <div className="mr-4 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
          {profile.pictures?.length || 0}
        </span>
        <span className="text-sm text-gray-500">Photos</span>
      </div>
      <div className="mr-4 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
          {profile.likeimage?.length || 0}
        </span>
        <span className="text-sm text-gray-500">Likes</span>
      </div>
      <div className="lg:mr-4 p-3 text-center">
        <span className="text-xl font-bold block uppercase tracking-wide text-gray-300">
          {profile.comment?.length || 0}
        </span>
        <span className="text-sm text-gray-500">Comments</span>
      </div>
    </div>
  </div>
);

ProfileStats.propTypes = {
  profile: PropTypes.shape({
    pictures: PropTypes.array,
    likeimage: PropTypes.array,
    comment: PropTypes.array,
  }).isRequired,
};

export default ProfileStats;
