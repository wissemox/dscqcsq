import axios from "axios";
import React, { useEffect, useState } from "react";
import ShowInterview from "./ShowInterview";

function InterviewForm({ interview, interviewId }) {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [start, setStart] = useState(false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setStart(true);
  };

  return (
    <>
      {!start && (
        <form
          onSubmit={handleSubmitForm}
          className="flex flex-col items-center space-y-5 py-3"
        >
          <div className="flex items-center space-x-10">
            <input
              type="text"
              placeholder="Prénom"
              onChange={(e) => setPrenom(e.target.value)}
              className="border border-gray-300 focus:outline-none px-2 py-2"
            />
            <input
              type="text"
              placeholder="Nom"
              onChange={(e) => setNom(e.target.value)}
              className="border border-gray-300 focus:outline-none px-2 py-2"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 focus:outline-none px-2 py-2"
          />
          <input
            type="text"
            placeholder="Telephone"
            onChange={(e) => setTelephone(e.target.value)}
            className="border border-gray-300 focus:outline-none px-2 py-2"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-green-500 hover:bg-white hover:black hover:border hover:border-black"
          >
            Start Interview
          </button>
        </form>
      )}
      {start && (
        <ShowInterview
          interviewId={interviewId}
          questions={interview.job.questions}
          data={{ nom, prenom, email, telephone }}
        />
      )}
    </>
  );
}

export default InterviewForm;
