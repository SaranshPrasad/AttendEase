import React from "react";

const Card = ({content}) => {
  return (
    <div className="bg-white border-1 border-[#DEE1E6] rounded-lg shadow p-6 flex flex-col max-w-s">
      <div className="flex items-center mb-2">
        <div className="bg-[#36a2f5]/10 w-10 h-10 rounded-4xl flex justify-center items-center">
          <span className="text-lg text-[#36a2f5]">{content.logo}</span>
        </div>
        <span className="font-semibold text-lg ml-4">{content.title}</span>
      </div>
      <p className="">{content.description}</p>
    </div>
  );
};

export default Card;
