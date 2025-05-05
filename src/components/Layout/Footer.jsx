import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ toggleDarkMode, darkMode }) => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="currentColor" 
                                className="w-8 h-8 text-teal-500"
                            >
                                <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z" clipRule="evenodd" />
                            </svg>
                            <span className="self-center text-2xl font-bold text-white whitespace-nowrap">IWB</span>
                        </Link>
                        <p className="text-gray-400">
                            Innovative Wealth Builders - Pioneering e-waste solutions in Southern Africa.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {[
                                { path: "/", label: "Home" },
                                { path: "/about", label: "About" },
                                { path: "/services", label: "Services" },
                                { path: "/contact", label: "Contact" }
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link 
                                        to={link.path}
                                        className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            {[
                                "RAM Recycling",
                                "Hard Drive Processing",
                                "Motherboard Components",
                                "Secure Data Destruction",
                                "Cloud Solutions"
                            ].map((service) => (
                                <li key={service}>
                                    <span className="text-gray-400 hover:text-teal-400 transition-colors duration-200 cursor-pointer">
                                        {service}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Lesotho Headquarters</h3>
                        <address className="not-italic text-gray-400 space-y-2">
                            <p>Maseru, Lesotho</p>
                            <p>Founded: 2024</p>
                            <p>Email: info@iwb.co.ls</p>
                            <p>Phone: +266 57736313</p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} Innovative Wealth Builders. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <button
                            onClick={toggleDarkMode}
                            className="text-gray-400 hover:text-teal-400 transition-colors duration-200"
                            aria-label="Toggle dark mode"
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
