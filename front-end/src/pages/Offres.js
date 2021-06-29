import axios from "axios";
import Card from "components/Card";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import qs from "query-string";
import ViewJob from "./ViewJob";

function Offres() {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const history = useHistory();
  const query = qs.parse(location.search);
  useEffect(() => {
    axios.get("http://localhost:5100/api/jobs").then((resp) => {
      setJobs(resp.data);
    });
  }, [location]);
  return (
    <>
      {Object.keys(query).length === 0 && (
        <>
          {jobs === [] ? (
            <p className="text-center text-xl text-red-600 mt-5">
              There is no jobs!
            </p>
          ) : (
            <div className="flex w-full cursor-pointer flex-wrap">
              {jobs.map((job) => (
                <Card
                  key={job._id}
                  goToJob={() => history.push(`/admin/tab2?jobId=${job._id}`)}
                  job={job}
                />
              ))}
            </div>
          )}
        </>
      )}
      {query.jobId && <ViewJob jobId={query.jobId} />}
    </>
  );
}

export default Offres;
