import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="text-neutral-content text-center">
      <div className=" grid md:grid-cols-2  ">
        <div className=" bg-red-700 md:flex justify-end px-40 py-5">
          <div className="my-8">
            <h1 className="text-lg font-semibold mb-3">CONTACT US</h1>
            <p>123 ABC street, Dhaka, Bangladesh</p>
            <p>+8801XXXXXXXXXX</p>
            <p>Mon-Fri: 08:00-22:00</p>
            <p>Sat-Sun: 10:00-23:00</p>
          </div>
        </div>
        <div className="bg-orange-500 md:flex justify-start px-40 py-5">
          <div className="my-8">
            <h1 className="text-lg font-semibold mb-3">FOLLOW US</h1>
            <p>Join Us on Social Media</p>
            <div className="flex justify-center space-x-5 my-3 ">
              <FaFacebookF className="cursor-pointer text-lg" />
              <FaInstagram className="cursor-pointer text-lg" />
              <FaTwitter className="cursor-pointer text-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-black p-3">
        Copyright @ DinerDynastyLTD. All rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
