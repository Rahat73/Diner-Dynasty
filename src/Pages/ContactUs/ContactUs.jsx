import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import emailjs from "@emailjs/browser";
import { FaClock, FaMapMarked, FaPhoneVolume } from "react-icons/fa";
import { contactUsVariants } from "./ContactUsVariants";
import Cover from "../Shared/Cover/Cover";
import contactImg from "../../assets/ContactUs/banner.jpg";
import SectionHeader from "../../Components/SectionHeader";
import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import Input from "../../Components/Input";
import { AuthContext } from "../../Providers/AuthProvider";

const ContactUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { user } = useContext(AuthContext);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_service_id,
        import.meta.env.VITE_template_id,
        form.current,
        import.meta.env.VITE_public_key
      )
      .then(
        () => {
          form.reset();
          toast.success("Your message has been sent successfully!");
        },
        (error) => {
          toast.error(error.text);
        }
      );
  };
  return (
    <>
      <Helmet>
        <title>Diner Dynasty | Contact Us</title>
      </Helmet>
      <motion.div
        variants={contactUsVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Cover
          heading={"Contact Us"}
          subHeading={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat et sit placeat soluta voluptatem, aut impedit eos quo error nobis!"
          }
          img={contactImg}
        ></Cover>
        <div className="my-20 w-9/12 mx-auto">
          <SectionHeader
            heading={"Our Location"}
            subHeading={"Visit Us"}
          ></SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="border">
              <h1 className="bg-red-700 w-full text-white flex justify-center py-4 text-3xl ">
                <FaPhoneVolume />
              </h1>
              <div className="bg-base-300 h-28 flex flex-col items-center justify-center mx-6">
                <h4 className="font-bold text-lg">Phone</h4>
                <p>01910123456789</p>
              </div>
            </div>
            <div className="border">
              <h1 className="bg-red-700 w-full text-white flex justify-center py-4 text-3xl ">
                <FaMapMarked />
              </h1>
              <div className="bg-base-300 h-28 flex flex-col items-center justify-center mx-6">
                <h4 className="font-bold text-lg">Address</h4>
                <p>123 ABC street </p>
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="border">
              <h1 className="bg-red-700 w-full text-white flex justify-center py-4 text-3xl ">
                <FaClock />
              </h1>
              <div className="bg-base-300 h-28 flex flex-col items-center justify-center mx-6">
                <h4 className="font-bold text-lg">Working Hours</h4>
                <p>Mon-Fri: 08:00-22:00</p>
                <p>Sat-Sun: 10:00-23:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-9/12 mx-auto my-40">
          <SectionHeader
            heading={"Contact Form"}
            subHeading={"Send Us a Message"}
          ></SectionHeader>
          <form
            ref={form}
            onSubmit={sendEmail}
            className=" md:w-6/12 mx-auto space-y-5 border-4 p-10"
          >
            {!user && <p>Please Log In to continue...</p>}
            <Input
              name={"user_name"}
              defaultValue={user?.displayName}
              disabled
            ></Input>
            <Input
              name={"user_email"}
              defaultValue={user?.email}
              disabled={true}
            ></Input>
            <Input name={"message"}></Input>
            <input
              className="btn btn-outline"
              type="submit"
              value="Send"
              disabled={!user}
            />
          </form>
        </div>
      </motion.div>
    </>
  );
};

export default ContactUs;
