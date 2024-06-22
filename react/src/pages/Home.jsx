import { useEffect, useState } from 'react';
import ImageGallery from '../components/ImageGallery';
import Navbar from '../components/Navbar';
import UploadForm from '../components/UploadForm';

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="max-w-4xl mx-auto">
            <Navbar user={user} />
            <UploadForm />
            <ImageGallery />
        </div>
    );
};

export default Home;
