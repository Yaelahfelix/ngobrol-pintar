import { Github, Instagram, LinkedinIcon } from "lucide-react";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <footer className="bg-white border-t-2 border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Ngobrol Pintar
              </h3>
              <p className="text-gray-600 text-sm">
                Ruang diskusi santai namun bermakna
              </p>
            </div>

            {/* Social */}
            <div className="flex space-x-3">
              <Github className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              <LinkedinIcon className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-gray-500 text-xs">
              © 2025 Ngobrol Pintar. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
