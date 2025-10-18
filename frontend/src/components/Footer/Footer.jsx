import { Link } from "react-router-dom";
import {
  FaRegCopyright,
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F7F9FA] text-[#171A1F] border-t border-[#E4E8EE] mt-16 pt-10 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center lg:justify-between gap-12">
        {/* Brand & Description */}
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-2xl font-extrabold text-[#0089df] mb-2 flex items-center gap-2">
            AttendEase
            <span className="inline-block bg-[#0089df]/10 text-[#0089df] rounded px-2 py-0.5 text-xs font-medium ml-2">
              Beta
            </span>
          </h2>
          <p className="text-[#565D6D] text-base max-w-[250px] mb-4">
            The smart solution for modern education institutions to automate
            attendance.
          </p>
          {/* Social Links */}
          <div className="flex gap-4 mt-2">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0089df] bg-white border border-[#0089df] rounded-full p-2 hover:bg-[#0089df] hover:text-white transition duration-200"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0089df] bg-white border border-[#0089df] rounded-full p-2 hover:bg-[#0089df] hover:text-white transition duration-200"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com"
              aria-label="Github"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0089df] bg-white border border-[#0089df] rounded-full p-2 hover:bg-[#0089df] hover:text-white transition duration-200"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        {/* Columns */}
        <div className="text-[#565D6D] text-base sm:text-sm flex-1 flex flex-col sm:flex-row gap-10 justify-end">
          {/* Product */}
          <div>
            <span className="block font-semibold mb-2 text-[#0089df] hover:text-[#006fc2] transition">
              Product
            </span>
            <ul className="space-y-1">
              <li>
                <Link
                  to="/features"
                  className="hover:text-[#0089df] transition"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#0089df] transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/integration"
                  className="hover:text-[#0089df] transition"
                >
                  Integration
                </Link>
              </li>
              <li>
                <Link to="/updates" className="hover:text-[#0089df] transition">
                  Updates
                </Link>
              </li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <span className="block font-semibold mb-2 text-[#0089df] hover:text-[#006fc2] transition">
              Company
            </span>
            <ul className="space-y-1">
              <li>
                <Link to="/about" className="hover:text-[#0089df] transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-[#0089df] transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#0089df] transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <span className="block font-semibold mb-2 text-[#0089df] hover:text-[#006fc2] transition">
              Legal
            </span>
            <ul className="space-y-1">
              <li>
                <Link to="/privacy" className="hover:text-[#0089df] transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#0089df] transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-[#0089df] transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-8 border-[#d5d7db] max-w-5xl mx-auto" />
      {/* Copyright Row */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between pb-6 text-sm text-[#7A8192] gap-2">
        <span className="flex items-center">
          <FaRegCopyright className="mr-1" />
          2025 AttendEase.
        </span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
