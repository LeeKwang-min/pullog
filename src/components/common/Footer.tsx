import { LinkedinIcon, ImageIcon, CodeIcon, MailIcon } from "lucide-react";
import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-700 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="flex space-x-8">
            <Link
              target="_blank"
              href="https://www.instagram.com/lee_kwangbong/"
              className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <ImageIcon className="w-6 h-6 mb-1" />
              <span className="sr-only">Instagram</span>
              <span className="text-xs">Instagram</span>
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/%EA%B4%91%EB%AF%BC-%EC%9D%B4-660a5a295/"
              className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <LinkedinIcon className="w-6 h-6 mb-1" />
              <span className="sr-only">LinkedIn</span>
              <span className="text-xs">LinkedIn</span>
            </Link>
            <Link
              target="_blank"
              href="https://github.com/LeeKwang-min"
              className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <CodeIcon className="w-6 h-6 mb-1" />
              <span className="sr-only">GitHub</span>
              <span className="text-xs">GitHub</span>
            </Link>
            <Link
              href="mailto:dltkdtn56@naver.com"
              className="flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors duration-300"
            >
              <MailIcon className="w-6 h-6 mb-1" />
              <span className="sr-only">Email</span>
              <span className="text-xs">Email</span>
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500">
            <span>&copy; {currentYear} Lee Kwangmin. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
