import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import OrgRegistrationForm from "./OrgRegistrationForm";
import SignUp from "./SignUp";

const Header = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <header>
      <nav className="bg-[#F6F6F6] border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
            {/* <span className="self-center text-xl font-semibold whitespace-nowrap text-grey-500">
              Log45
            </span> */}
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to="/login"
              className="text-gray-800 bg-[#2d987f] dark:text-white hover:bg-green-600  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="text-white bg-[#216c5a] hover:bg-green-600 focus:ring-4 focus:bg-[#216c5a] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >
              Get started
            </Link>

            {/* <button
              onClick={() => setShowModal(true)}
              className="text-white bg-[#216c5a] hover:bg-green-600 focus:ring-4 focus:bg-[#216c5a] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            ></button> */}
            {/* {showModal && (
              <div className="fixed top-0 left-0 w-full h-screen flex-colo bg-dry bg-opacity-50 flex justify-center items-center">
                <div className="rounded-lg"> */}
            {/* Close button */}
            {/* <button onClick={() => setShowModal(false)}>Close</button> */}

            {/* Registration form */}
            {/* <RegistrationForm /> */}
            {/* <SignUp /> */}
            {/* </div>
              </div>
            )} */}
            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-gray-900 rounded bg-gray-900 lg:bg-transparent lg:text-grey-900 lg:p-0 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

const HeroSection = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <section className="bg-white">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center mt-10 lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none md:text-5xl xl:text-6xl text-grey-70">
            Your Solution for Streamlined Data Management
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            At Log45, we understand the critical role data plays in modern
            agriculture and scientific research.That's why we developed a
            comprehensive application to streamline the data intake processes
            for farms and laboratories.
          </p>
          <Link
            to="/signup"
            className="text-white bg-[#216c5a] hover:bg-green-600 focus:ring-4 focus:bg-[#216c5a] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
          >
            Get started
          </Link>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-screen flex-colo bg-dry bg-opacity-50 flex justify-center items-center">
              <div className="rounded-lg">
                {/* Close button */}
                <button onClick={() => setShowModal(false)}>Close</button>
                {/* Registration form */}
                {/* <OrgRegistrationForm /> */}
                <SignUp />
              </div>
            </div>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://img.freepik.com/free-photo/full-shot-woman-holding-tablet_23-2149894709.jpg?t=st=1713769170~exp=1713772770~hmac=3228b1dc46c3153eb0c2704e57775ae5e82356fba581684abea59a8470e2c9db&w=2000"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
};

const CompanySection = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
        <h2 className="mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl">
          You’ll be in good company
        </h2>
        <div className="grid grid-cols-2 gap-8 text-gray-500 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 dark:text-gray-400">
          <a href="#" className="flex justify-center items-center">
            {/* Content for first link */}
          </a>
          <a href="#" className="flex justify-center items-center">
            {/* Content for second link */}
          </a>
          <a href="#" className="flex justify-center items-center">
            {/* Content for third link */}
          </a>
          <a href="#" className="flex justify-center items-center">
            {/* Content for fourth link */}
          </a>
          <a href="#" className="flex justify-center items-center">
            <svg
              className="h-9 hover:text-gray-900 dark:hover:text-white"
              viewBox="0 0 137 37"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content */}
            </svg>
          </a>
          <a href="#" className="flex justify-center items-center">
            {/* Content for sixth link */}
          </a>
        </div>
      </div>
    </section>
  );
};
const NewHero = () => {
  return (
    <div class="pt-24 bg-white">
      <div class="px-12 mx-auto max-w-7xl">
        <div class="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
          <h1 class="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-800 md:text-6xl md:tracking-tight">
            <span> Empowering</span>{" "}
            <span class="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-[#216c5a] to-[#228870] lg:inline">
              Agriculture & Research.
            </span>{" "}
            <span>
              We are committed to your{" "}
              <ReactTyped
                className="text-[#216c5a] md:pl-4 pl-2"
                strings={["soil", "livestock", "professionals."]}
                typeSpeed={120}
                backSpeed={140}
                loop
              />
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
const FeaturesSection = () => {
  return (
    <section className="bg-[#F6F6F6]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl font-extrabold text-gray-800">
            Why Choose FarmLab Intake?
          </h2>
          <p className="text-gray-500 sm:text-lg dark:text-gray-400">
            In today's fast-paced world, managing diverse data intake processes
            can be a daunting task. From crop monitoring to soil analysis, and
            from livestock records to research experiments, the sheer volume and
            variety of data can overwhelm even the most experienced
            professionals. That's where FarmLab Intake comes in. Our intuitive
            platform simplifies the entire process, allowing you to focus on
            what truly matters: making informed decisions based on accurate
            data.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          <FeatureItem
            iconBgColor="bg-blue-100 lg:bg-[#216c5a]"
            title="Integration Capabilities"
            description="Seamlessly integrate FarmLab Intake with your existing software systems, including farm management software, laboratory information management systems (LIMS), and more."
          />
          <FeatureItem
            iconBgColor="bg-blue-100 lg:bg-[#216c5a]"
            title="Integration Capabilities"
            description="Seamlessly integrate FarmLab Intake with your existing software systems, including farm management software, laboratory information management systems (LIMS), and more."
          />
          <FeatureItem
            iconBgColor="bg-blue-100 lg:bg-[#216c5a]"
            title="Integration Capabilities"
            description="Seamlessly integrate FarmLab Intake with your existing software systems, including farm management software, laboratory information management systems (LIMS), and more."
          />
          <FeatureItem
            iconBgColor="bg-blue-100 lg:bg-[#216c5a]"
            title="Integration Capabilities"
            description="Seamlessly integrate FarmLab Intake with your existing software systems, including farm management software, laboratory information management systems (LIMS), and more."
          />
          <FeatureItem
            iconBgColor="bg-blue-100 lg:bg-[#216c5a]"
            title="Integration Capabilities"
            description="Seamlessly integrate FarmLab Intake with your existing software systems, including farm management software, laboratory information management systems (LIMS), and more."
          />
          <FeatureItem
            iconBgColor="bg-blue-100 lg:bg-[#216c5a]"
            title="Integration Capabilities"
            description="Seamlessly integrate FarmLab Intake with your existing software systems, including farm management software, laboratory information management systems (LIMS), and more."
          />
        </div>
      </div>
    </section>
  );
};

const FeatureItem = ({ iconBgColor, title, description }) => {
  return (
    <div>
      <div
        className={`flex justify-center items-center mb-4 w-10 h-10 rounded-full ${iconBgColor}`}
      ></div>
      <h3 className="mb-2 text-xl font-bold dark:text-grey-900">{title}</h3>
      <p className="text-gray-500 sm:text-lg dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
const Testimonials = () => {
  return (
    <div className="container mx-auto">
      <p className="uppercase tracking-wider mt-12 mb-16 text-4xl font-extrabold text-gray-900 text-center">
        What customers are saying
      </p>
      <div className="flex flex-col md:flex-row md:-mx-3">
        <TestimonialItem
          name="Jane Doe"
          designation="Chief Of Sugery Medic Vet"
          comment="Log45 has completely transformed the way we manage data on our farm. With its intuitive interface and powerful features, we've been able to streamline our data intake processes and make more informed decisions than ever before."
        />
        <TestimonialItem
          name="John Doe"
          designation="Owner of Green Acres Farm"
          comment="Log45 has truly transformed the way we manage data on our farm. With its intuitive interface and powerful features, we've been able to streamline our data intake processes, saving time and improving accuracy .
        "
        />
        <TestimonialItem
          name="Jane Smith"
          designation="Director of Ridlabs"
          comment="Log45 has completely transformed the way we manage data on our farm. With its intuitive interface and powerful features, we've been able to streamline our data intake processes and make more informed decisions than ever before. "
        />
      </div>
    </div>
  );
};

const TestimonialItem = ({ name, designation, comment }) => {
  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border border-solid border-gray-200 bg-[#F6F6F6] mb-8"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <p className="text-xl font-bold dark:text-grey-900">
          Lorem ipsum dolor sit amet
        </p>
        `
        <p className="text-gray-500 sm:text-lg dark:text-gray-400">{comment}</p>
        <div className="flex items-center mt-8">
          <img
            className="w-12 h-12 mr-4 rounded-full"
            src="https://placeimg.com/150/150/people"
            alt={name}
          />
          <div>
            <p>{name}</p>
            <p className="text-sm text-gray-600">{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <>
      <section className="bg-white">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-extrabold text-gray-900">
              Bridging Farmers and Laboratory Technicians
            </h2>
            <p className="text-gray-500 sm:text-lg dark:text-gray-400">
              We believe that every data challenge presents an opportunity for
              innovation. Our mission is to empower agricultural professionals
              and Laboratory Technicians with the tools they need to turn
              challenges into actionable insights. Whether you're tracking the
              growth of your crops, analyzing the composition of your soil, or
              conducting experiments in the lab, Log45is here to help you every
              step of the way.
            </p>
            <p className="text-gray-500 sm:text-lg dark:text-gray-400">
              We are the ultimate solution for farms and laboratories seeking to
              unlock the full potential of their data. Small enough to be simple
              and quick.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full h-full rounded-lg"
              src="https://img.freepik.com/free-photo/african-american-greenhouse-worker-holding-crate-with-fresh-lettuce-talking-with-farmer-holding-laptop-about-delivery-local-business-bio-farm-workers-preparing-deliver-online-order-client_482257-46505.jpg?t=st=1713768758~exp=1713772358~hmac=687a688aa3d84edc00c55c9ae9b51ce0895a0ac7ddb58a6635698a78e704a6a3&w=2000"
              alt=""
            />
            <img
              className="mt-4 w-full h-full lg:mt-10 rounded-lg"
              src="https://img.freepik.com/free-photo/full-shot-smiley-woman-holding-tablet_23-2149894712.jpg?t=st=1713768823~exp=1713772423~hmac=e04fe8f95429ae68ae2821e34941b1f14aa7788990fd17ddec04df2261de6cfc&w=2000"
              alt="office content 2"
            />
          </div>
        </div>
      </section>

      <Testimonials />

      {/* <section className="bg-[#F6F6F6]">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Powering innovation at{" "}
              <span className="font-extrabold">200,000+</span> companies
              worldwide
            </h2>
            <p className="mb-4 font-light">
              Track work across the enterprise through an open, collaborative
              platform. Link issues across Jira and ingest data from other
              software development tools, so your IT support and operations
              teams have richer contextual information to rapidly respond to
              requests, incidents, and changes.
            </p>
            <p className="mb-4 font-medium">
              Deliver great service experiences fast - without the complexity of
              traditional ITSM solutions.Accelerate critical development work,
              eliminate toil, and deploy changes with ease.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
            >
              Learn more
            </a>
          </div>
        </div>
      </section> */}

      {/* <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h2 className="mb-4 text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
              Start your free trial today
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Try Flowbite Platform for 30 days. No credit card required.
            </p>
            <a
              href="#"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Free trial for 30 days
            </a>
          </div>
        </div>
      </section> */}
    </>
  );
};
// Add more sections/components as needed

const Footer = () => {
  return (
    <footer className="p-4 sm:p-6 bg-[#216c5a]">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src={logo} className="mr-3 h-8" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Log45
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Home
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const LandingPagePG = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <NewHero />
      {/* <CompanySection /> */}
      <FeaturesSection />
      <Home />
      <Footer />
    </div>
  );
};

export default LandingPagePG;
