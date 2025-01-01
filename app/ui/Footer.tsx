import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <div className="mb-4">
            <Image src="/logo.png" width={64} height={64} alt="Logo" className="w-16 h-16" />
          </div>
          <div className="flex space-x-4">
            <Image
              src="/icon/company2.svg"
              alt="Facebook"
              width={50}
              height={50}
              className="mr-2"
            />
            <Image
              src="/icon/instagram.svg"
              alt="Instagram"
              width={50}
              height={50}
              className="mr-2"
            />
            <Image
              src="/icon/linkedin.svg"
              alt="Linkedin"
              width={50}
              height={50}
              className="mr-2"
            />
          </div>
        </div>

        {/* Use cases */}
        <div>
          <h3 className="text-lg font-bold mb-3">Use cases</h3>
          <ul>
            <li>
              <a href="#">UI design</a>
            </li>
            <li>
              <a href="#">UX design</a>
            </li>
            <li>
              <a href="#">Wireframing</a>
            </li>
            <li>
              <a href="#">Diagramming</a>
            </li>
            <li>
              <a href="#">Brainstorming</a>
            </li>
            <li>
              <a href="#">Team collaboration</a>
            </li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-lg font-bold mb-3">Explore</h3>
          <ul>
            <li>
              <a href="#">Design</a>
            </li>
            <li>
              <a href="#">Prototyping</a>
            </li>
            <li>
              <a href="#">Development features</a>
            </li>
            <li>
              <a href="#">Design systems</a>
            </li>
            <li>
              <a href="#">Collaboration features</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-bold mb-3">Resources</h3>
          <ul>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Best practices</a>
            </li>
            <li>
              <a href="#">Color wheel</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
            <li>
              <a href="#">Developers</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
