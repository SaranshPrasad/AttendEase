import React from "react";
import { Link } from "react-router";
import Card from "./Card";
import {
  FaRegClock, 
  FaUserCheck,
  FaChartBar,
  FaRegClipboard,
} from "react-icons/fa";

const cardContent = [
  {
    logo: <FaRegClock />,
    title: "Automatoin",
    description:
      "Effertless, real-time tracking that saves valuable class time and minimizes administrative overhead.",
  },
  {
    logo: <FaUserCheck />,
    title: "Attendance Tracking",
    description:
      "Boost productivity with accurate, easily accessible attendance records and student presence monitoring.",
  },
  {
    logo: <FaChartBar  />,
    title: "Analytics",
    description:
      "Gain valuable insights from comprehensive attendance data to improve student engagement and academic outcomes.",
  },
  {
    logo: <FaRegClipboard />,
    title: "Reports and Insights",
    description:
      "Generate detailed reports and visualize key trends to make informed decisions and optimize learning environments.",
  },
];

const Home = () => {
  return (
    <div>
      <section className="flex flex-col justify-center items-center bg-[#0089df]/10 h-screen max-w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-full md:max-w-5xl text-center">
          <h1 className="mb-8 text-[#171A1F] text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Streamline Student{" "}
            <span className="text-[#0089df]">Attendance</span> with{" "}
            <span className="text-[#0089df]">Automation</span>
          </h1>
        </div>
        <div className="max-w-full md:max-w-3xl text-center mb-12 px-2 sm:px-6">
          <h4 className="text-[#565D6D] text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Simply attendance tracking and boost productivity with our smart,
            automated solution. Focus on what matters most - teaching.
          </h4>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link
            to="/login"
            className="border border-[#0089df] bg-[#0089df] text-white rounded-lg px-8 py-3 font-semibold cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-[#0075bf] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005c8d]"
          >
            Get Started
          </Link>
          <Link
            to="/"
            className="border border-[#0089df] text-[#0089df] rounded-lg px-8 py-3 font-semibold cursor-pointer shadow-md transition-colors duration-300 ease-in-out hover:bg-[#0089df] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#005c8d]"
          >
            Learn More
          </Link>
        </div>
      </section>
      <section className="flex flex-col items-center bg-[#0089df]/2 max-h-full max-w-full px-4 sm:px-6 md:px-8">
        <div className="mb-8 mt-9 max-w-5xl md:max-w-5xl text-center">
          <h1 className="text-[#171A1F] text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Core Features
          </h1>
        </div>
        <div className="max-w-full md:max-w-3xl text-center mb-4 px-2 sm:px-6">
          <h4 className="text-[#565D6D] text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Discover how AttendEase transform attendance management with
            powerful and intuitive features.
          </h4>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 p-8 max-w-5xl">
          {cardContent.map((content, idx) => (
            <Card key={idx} content={content} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
