import { ArrowDownIcon, BriefcaseIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function UpdateForm({ jobId }) {
  const [job, setJob] = useState({});
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDiscription] = useState("");
  const [active, setActive] = useState("");
  const [interviewUrl, setInterviewUrl] = useState("");
  const history = useHistory();
  const [errors, setErrors] = useState({
    title: "",
    location: "",
    description: "",
    interview: "",
  });

  const [next, setNext] = useState({
    page: "page1",
    job: {
      title,
      location,
      description,
      status: active,
      interviewUrl,
    },
  });

  const updateJob = () => {
    if (!active || (active === "active" && interviewUrl === "")) {
      console.log("something missed");
    } else {
      axios.put(`http://localhost:5100/api/jobs/${jobId}`, {
        title,
        location,
        description,
        status: active,
        interviewUrl: interviewUrl || "",
        questions: job.questions,
      });
      history.replace("/admin/tab2");
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (title !== "" && description !== "" && location !== "") {
      setNext({
        page: "page2",
        job: {
          title,
          location,
          description,
        },
      });
    }
  };

  const resetForm = (e) => {
    e.preventDefault();
    setTitle("");
    setLocation("");
    setDiscription("");
  };

  useEffect(() => {
    axios.get(`http://localhost:5100/api/jobs/${jobId}`).then((resp) => {
      setJob(resp.data.job);
      setTitle(resp.data.job.title);
      setLocation(resp.data.job.location);
      setDiscription(resp.data.job.description);
      setActive(resp.data.job.status);
      setInterviewUrl(resp.data.job.interview);
    });
  }, [jobId]);

  return (
    <>
      {next.page === "page1" ? (
        <div className="container bg-white p-3 shadow rounded">
          <form onSubmit={onSubmitForm}>
            <div className="form-group d-flex align-items-center p-3 border ">
              <BriefcaseIcon style={{ height: 22, marginRight: 5 }} />
              <h3>Update job</h3>
            </div>
            <div className="form-group">
              <h3 className="fw-bold">Job Title</h3>
              <p>
                A specific job title that candidates will be interviewing for
              </p>
              <input
                value={title}
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrors({ ...errors, title: "¨Please provide a title" });
                  } else {
                    setErrors({ ...errors, title: "" });
                  }
                  setTitle(e.target.value);
                }}
                type="text"
                className={`form-control ${
                  errors.title ? "border-danger" : null
                }`}
                placeholder="Accountant"
              />
              {errors.title && <p className="text-red">{errors.title}</p>}
            </div>
            <div className="form-group">
              <h3>Location</h3>
              <p>
                A specific location(City, State/Province, Country) for where the
                job is located
              </p>
              <input
                value={location}
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrors({
                      ...errors,
                      location: "¨Please provide a location",
                    });
                  } else {
                    setErrors({ ...errors, location: "" });
                  }
                  setLocation(e.target.value);
                }}
                type="text"
                className={`form-control ${
                  errors.location ? "border-danger" : null
                }`}
                placeholder="City, State, Country"
              />
              {errors.location && <p className="text-red">{errors.location}</p>}
            </div>
            <div className="form-group">
              <h3>Description</h3>
              <p>A detailed description of the job so </p>
              <textarea
                value={description}
                className={`form-control ${
                  errors.description ? "border-danger" : null
                }`}
                rows="5"
                onChange={(e) => {
                  if (!e.target.value) {
                    setErrors({
                      ...errors,
                      description: "¨Please provide a description",
                    });
                  } else {
                    setErrors({ ...errors, description: "" });
                  }
                  setDiscription(e.target.value);
                }}
              />
              {errors.description && (
                <p className="text-red">{errors.description}</p>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn bg-pink text-white">
                Continue
              </button>
              <button onClick={resetForm} className="btn">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <div className="flex flex-col justify-between ml-4 px-2 py-2 w-1/3 bg-white shadow-lg h-52">
              <div className="flex items-center space-x-2">
                <ArrowDownIcon className="h-8 text-green-500" />
                <h3 className="text-green-500">Active</h3>
              </div>
              <p>
                Set the job to active so you can start sending interview
                invitations
              </p>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="active"
                  name="status"
                  onChange={(e) => setActive(e.target.value)}
                />
                <label htmlFor="active" className="ml-2">
                  Set to active
                </label>
              </div>
            </div>
            <div className="flex flex-col justify-between ml-4 px-2 py-2 w-1/3 bg-white shadow-lg h-52">
              <div className="flex items-center space-x-2">
                <ArrowDownIcon className="h-8 text-red-500" />
                <h3 className="text-red-500">Inactive</h3>
              </div>
              <p>Save the job as inactive if you want to keep it as a draft</p>
              <div className="flex items-center">
                <input
                  type="radio"
                  value="inactive"
                  name="status"
                  onChange={(e) => setActive(e.target.value)}
                />
                <label htmlFor="active" className="ml-2">
                  Set to inactive
                </label>
              </div>
            </div>
          </div>
          {errors.active && <p className="text-red">{errors.active}</p>}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              className="px-5 py-2 border-[1px] border-gray-600 hover:bg-gray-600 transition-all duration-100 hover:text-white"
              onClick={() => setNext({ ...next, page: "page1" })}
            >
              Back
            </button>
            <button
              onClick={updateJob}
              className="px-5 py-2 bg-green-400 text-white  hover:border-green-500 hover:border-[1px]
            "
            >
              Update job
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateForm;
