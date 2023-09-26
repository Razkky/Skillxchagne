import React from "react";

function AboutUs() {
    
    const teamMembers = [
        {
            name: "Mostafa Hassan",
            position: "Software Project Manager",
            bio: "As a Software Project Manager, I possess a unique blend of technical expertise, leadership skills, and a strong commitment to delivering exceptional software solutions. With a proven track record of successfully managing complex projects from inception to completion, I bring a strategic vision and a results-oriented approach to every endeavor. My ability to align project goals with business objectives and foster collaboration among cross-functional teams makes me a valuable asset in achieving project success.",
        },
        {
            name: "Muhammad Abdul Razak",
            position: "Backend Software Engineer",
            bio: "As a Backend Software Engineer with a passion for building robust and scalable solutions, I thrive in the dynamic world of software development. With a background in computer science and years of experience, I bring a wealth of technical knowledge and expertise to every project I tackle. My dedication to writing efficient, maintainable code and my commitment to staying at the forefront of technology make me a valuable asset to any team.",

        },
        {
            name: "Mary Sowa",
            position: "Frontend Software Engineer",
            bio: "As a passionate Frontend Engineer, I thrive on transforming creative concepts into seamless user experiences. With a strong foundation in web technologies and a deep commitment to user-centric design, I bring a blend of technical expertise and creativity to every project. My mission is to craft visually stunning, responsive, and highly performant front-end solutions that engage users and drive business success.",
        },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-24">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    About Us
                </h2>
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-xl text-gray-600 leading-relaxed">
                        We are the dreamers, the creators, the innovators, and the learners. At SkillXChange, we believe that knowledge sharing is the key to growth and inspiration.
                    </p>
                    <p className="text-xl text-gray-600 leading-relaxed mt-4">
                        Our mission is to create a platform where passionate individuals can connect, collaborate, and empower each other to reach new heights.
                    </p>
                    <p className="text-xl text-gray-600 leading-relaxed mt-4">
                        Join us in this journey as we discover new skills, share our expertise, and shape the future together.
                    </p>
                </div>
                <div className="mt-12 flex justify-center">
                    <img
                        src="/about-us-image.jpg" 
                        alt="About Us"
                        className="w-64 h-64 object-cover rounded-full"
                    />
                </div>
                <div className="mt-12">
                    <h3 className="text-3xl font-extrabold text-gray-800 mb-4">Our Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gray-200 p-4 rounded-lg shadow-md"
                            >
                                <h4 className="text-xl font-semibold text-gray-800">
                                    {member.name}
                                </h4>
                                <p className="text-gray-600">{member.position}</p>
                                <p className="text-gray-600 mt-2">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
