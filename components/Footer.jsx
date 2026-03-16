import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {

  return (

    <footer className="mt-28 glass">

      <div className="flex flex-col md:flex-row items-start justify-between px-8 md:px-20 gap-12 py-14 text-gray-400">

        <div className="max-w-sm">

          <Image className="w-32" src={assets.logo} alt="logo" />

          <p className="mt-6 text-sm">
            Premium electronics marketplace with the latest technology products and accessories.
          </p>

        </div>

        <div>

          <h3 className="text-white font-semibold mb-4">Company</h3>

          <ul className="space-y-2 text-sm">

            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>

          </ul>

        </div>

        <div>

          <h3 className="text-white font-semibold mb-4">Contact</h3>

          <div className="space-y-2 text-sm">

            <p>+1 234 567 890</p>
            <p>contact@muca.dev</p>

          </div>

        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
        © 2026 MUCA Electronics. All rights reserved.
      </div>

    </footer>

  );

};

export default Footer;