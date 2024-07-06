import React from 'react';

const HeroSection = () => {
    return (
        <section className="bg-gray-900 text-white h-screen flex items-center">
            <div className="grid px-6 mx-auto max-w-screen-xl lg:gap-10 xl:gap-12 lg:grid-cols-12">
                <div className="place-self-center mr-auto lg:col-span-7">
                    <h1 className="mb-6 max-w-2xl text-5xl font-extrabold leading-tight md:text-6xl xl:text-7xl">
                        Upload and Share Your Favorite Images
                    </h1>
                    <p className="mb-8 max-w-2xl font-light text-gray-400 lg:mb-10 md:text-lg lg:text-xl">
                        Discover and share your favorite images with our platform, a place where creativity meets community. Upload your images and explore content from users around the world.
                    </p>
                    <div className="flex space-x-4">
                        <a 
                            href="/login" 
                            className="inline-flex justify-center items-center py-3 px-6 text-base font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 transition-all duration-300"
                        >
                            Get started
                            <svg 
                                className="ml-2 -mr-1 w-5 h-5" 
                                fill="currentColor" 
                                viewBox="0 0 20 20" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    fillRule="evenodd" 
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img 
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png" 
                        alt="mockup"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
