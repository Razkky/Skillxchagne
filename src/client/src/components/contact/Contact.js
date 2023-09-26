import React from "react";

function Contact() {
    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-24">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
                    Contact Us
                </h2>
                <div className="max-w-md mx-auto">
                    <p className="mb-4 text-center text-gray-600 font-medium">
                        If you have any questions, please feel free to{" "}
                        <a
                            href="mailto:m0st4f4h4ss4n@gmail.com"
                            className="text-blue-600 hover:underline"
                        >
                            email us
                        </a>
                        .
                    </p>
                    <form>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-gray-600 font-medium"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Your Name"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="message"
                                className="block text-gray-600 font-medium"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="4"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                placeholder="Your Message"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
