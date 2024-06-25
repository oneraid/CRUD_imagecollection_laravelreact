import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import Navbar from '../components/Navbar';
import { FiUpload } from "react-icons/fi";

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="max-w mx-auto">
            <Navbar user={user} />

            <div className='max-w-4xl mx-auto'>

            <Link to="/upload">
                <button className="btn mt-10 gap-3">
                    <FiUpload />
                    Upload New Image
                </button>
            </Link>
            <ImageGallery />
            </div>
        </div>
    );
};

export default Home;
