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
        <div className="max-w-7xl mx-auto ml-5.5 ">
            <h1 className="text-center text-white font-bold text-3xl mb-14 mt-20 sm:mt-20">
                Image Gallery
            </h1>
            <div className="mt-10 flex justify-center items-center gap-3 mb-14">
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
