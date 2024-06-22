import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', userData);

            console.log(response.data); // Handle response from backend

            // Store token in local storage or cookies
            localStorage.setItem('token', response.data.token);

            // Redirect to dashboard or profile page
            navigate('/home');
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error status:', error.response.status);
                console.error('Error data:', error.response.data);
                setError('Invalid credentials. Please try again.');
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response from server:', error.request);
                setError('No response from server.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
                setError('Error setting up the request.');
            }
            // Handle error
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold">Login</h1>
                    <p className="py-6">Share your photo to the world!</p>
                </div>
                <div className="card sm:w-[30rem] shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleSubmit}>
                        {error && <p className="text-red-500">{error}</p>}
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="grow"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="">
                                <a className="label-text-alt">Dont have an account?</a>
                                <a href="/signup" className="label-text-alt link link-hover"> Signup</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
