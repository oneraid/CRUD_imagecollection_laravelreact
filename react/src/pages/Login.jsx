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

            localStorage.setItem('token', response.data.token);

            navigate('/home', { replace: true });
        } catch (error) {
            if (error.response) {
                // console.error('Error status:', error.response.status);
                // console.error('Error data:', error.response.data);
                setError('email or password is incorrect. Please try again.');
                setTimeout(() => setError(''), 3000);
            } else if (error.request) {
                console.error('No response from server:', error.request);
                setError('No response from server.');
            } else {
                console.error('Error setting up the request:', error.message);
                setError('Error setting up the request.');
            }
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
                    {error && (
                    <div role="alert" className="alert alert-warning">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 shrink-0 stroke-current"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                    )}
                        <div>
                            <label className="flex items-center gap-2 ">
                                <input
                                    type="text"
                                    className="grow input input-bordered"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="grow input input-bordered"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            <label className="">
                                <a className="label-text-alt">Dont have an account?</a>
                                <a href="/register" className="label-text-alt link link-hover"> Signup</a>
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
