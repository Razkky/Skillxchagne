import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white p-8">
            <div className="container mx-auto text-center">
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} SkillXChange</p>
                <ul className="flex justify-center space-x-6 mt-4">
                    <li>
                        <a href="#" className="hover:text-blue-500">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-500">Terms of Service</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-blue-500">Contact Us</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
