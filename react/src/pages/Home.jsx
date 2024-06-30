import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import { FiUpload } from 'react-icons/fi';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="max-w-7xl mx-auto ml-5.5"> {/* Add margin-left to make space for sidebar */}
            <div className="mt-10 flex justify-center items-center gap-3">
                <Link to="/upload">
                    <button className="btn flex items-center gap-1">
                        <FiUpload />
                        Upload New Image
                    </button>
                </Link>
            </div>
            <ImageGallery />
        </div>
    );
};

export default Home;
