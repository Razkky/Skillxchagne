import React from "react";
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-24">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
                <h2 className="text-6xl font-extrabold tracking-tight text-center">Welcome to SkillXChange</h2>
                <div className="text-center">
                    <p className="text-2xl text-gray-200 leading-relaxed">
                        Dive into a world of knowledge sharing. SkillXchange is where passion meets growth.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-700">
                        <h3 className="text-3xl font-bold mb-6">Discover New Skills</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Explore endless possibilities. Ignite your curiosity with expert insights.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-700">
                        <h3 className="text-3xl font-bold mb-6">Share Your Expertise</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Empower and inspire. Be the mentor you wish you had.
                        </p>
                    </div>
                    <div className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-700">
                        <h3 className="text-3xl font-bold mb-6">Connect and Collaborate</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Join a community of innovators. Together, we create the future.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
}

export default Hero;
