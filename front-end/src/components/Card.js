import { BriefcaseIcon } from "@heroicons/react/outline";
import React from "react";

function Card({ job, goToJob }) {
  return (
    <div
      className="flex flex-col px-2 py-3 w-1/3 transition-all transform hover:scale-105 cursor-pointer duration-75 hover:z-20 bg-white shadow-lg rounded-sm"
      onClick={goToJob}
    >
      <div className="flex items-center space-x-3 mb-2">
        <BriefcaseIcon className=" h-24 border-2 text-purple-500 rounded-full border-purple-400 p-4" />
        <div>
          <h3>{job.title}</h3>
          <span className="text-sm">{job.location}</span>
        </div>
      </div>
      <span>Manager: </span>

      <span>
        Status:{" "}
        <span
          className={`${
            job.status === "inactive" ? "text-red-600" : "text-green-600"
          }`}
        >
          {job.status}
        </span>
      </span>
      <span>
        Updated on:{" "}
        {`${job.updatedAt.slice(0, 10)} ${job.updatedAt.slice(11, 19)}`}
      </span>
    </div>
  );
}

export default Card;
