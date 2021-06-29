import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import Card from "components/Card";
import axios from "axios";
import ShowQuestion from "./ShowQuestion";

function Interviews() {
  const history = useHistory();
  const location = useLocation();
  const query = qs.parse(location.search);
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5100/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {!jobs && <h3>No jobs found!</h3>}
      {jobs &&
        !query.jobId &&
        jobs.map((job) => (
        
          <div
            key={job._id}
            onClick={() =>
              history.push(`${location.pathname}?jobId=${job.title}`)
            }
          >
              {console.log(job)}
            <Card job={job} />
          </div>
        ))}
      {query.jobId && <ShowQuestion jobId={query.jobId} />}
    </div>
  );
}

export default Interviews;
