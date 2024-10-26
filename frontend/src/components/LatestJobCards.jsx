import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  
  // Function to truncate the job description to 50 characters
  const truncateDescription = (description) => {
    if (!description) return '';
    return description.length > 50 ? `${description.slice(0, 47)}...` : description;
  };

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="flex flex-col border-2 border-[#c3c6ce] rounded-2xl bg-[#f5f5f5] p-6 transition duration-500 ease-out hover:border-[#008bf8] hover:shadow-lg cursor-pointer my-4 mx-auto w-full max-w-xs md:max-w-md lg:max-w-lg"
    >
      <div className="text-black grid gap-2">
        <div>
          <h1 className="font-medium text-lg md:text-xl">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2 md:text-xl">{job?.title}</h1>
          <p className="text-sm text-gray-600 md:text-base">
            {truncateDescription(job?.description)}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <Badge className={"text-blue-700 font-bold"} variant="ghost">
            {job?.position} Positions
          </Badge>
          <Badge className={"text-[#F83002] font-bold"} variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default LatestJobCards;
