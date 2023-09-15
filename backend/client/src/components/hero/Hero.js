import React from "react";
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-6 text-center">Welcome to SkillXchange</h2>
                <div className="mb-8 text-center">
                    <p className="text-lg text-gray-300">
                        Embrace the journey of knowledge sharing and growth. SkillXchange is a platform where you can both learn and teach, fostering a community of passionate individuals who are eager to expand their horizons.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Discover New Skills</h3>
                        <p className="text-gray-300">
                            Dive into a world of endless possibilities. Learn new skills from experts in various fields and ignite your curiosity.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Share Your Expertise</h3>
                        <p className="text-gray-300">
                            Empower others by sharing your knowledge and skills. Become a mentor and guide aspiring learners towards success.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-4">Connect and Collaborate</h3>
                        <p className="text-gray-300">
                            Connect with like-minded individuals who share your passion. Collaborate on projects, discussions, and ideas that fuel innovation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;
