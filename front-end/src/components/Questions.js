import { PlusIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Questions({ jobId }) {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5100/api/jobs/${jobId}`)
      .then((resp) => setQuestions(resp.data.job.questions));
  }, [jobId, questions]);

  const addQuestion = () => {
    axios.post(`http://localhost:5100/api/jobs/${jobId}/question`, {
      question,
    });
  };

  const removeQuestion = (qs) => {
    axios.delete(`http://localhost:5100/api/jobs/${qs._id}/question`, {
      title: qs.question,
    });
  };

  return (
    <div className="w-1/4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="border-[.8px] px-2 border-gray-600 flex-grow"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <PlusIcon
          onClick={addQuestion}
          className="text-green-600 h-8 cursor-pointer hover:text-black"
        />
      </div>
      <div className="mt-3 w-full flex flex-col">
        {!questions.length ? (
          <div>
            <h3>There is no questions in this job add some</h3>
          </div>
        ) : (
          questions.map((question, i) => (
            <div key={i} className="flex py-2 shadow-lg">
              <p className="pb-2 border-b border-gray-700 flex-grow px-2">
                {question.question}
              </p>
              <XIcon
                onClick={() => removeQuestion(question)}
                className="h-6 text-red-500 transition-all duration-150 transform hover:scale-125 cursor-pointer"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Questions;
