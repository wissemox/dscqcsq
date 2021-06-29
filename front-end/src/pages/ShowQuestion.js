import axios from "axios";
import React, { useState, useEffect } from "react";
import {VideGetall} from '../network/ApiAxios'
function ShowQuestion({ jobId }) {
  const [job, setJob] = useState(null);
  const [videos, setVideos] = useState(null);
  const [Getall, setGetall] = useState();

  const Getallvide =async ()=>{
    const response = await VideGetall()
    setGetall(response.data.VideGet)
  }
  {console.log(Getall)}
  useEffect(() => {
    Getallvide()
    axios
      .get(`http://localhost:5100/api/jobs/${jobId}`)
      .then((res) => setJob(res.data.job))
      .catch((err) => console.log(err));
  }, [jobId]);

  const setVideosHandler = (id) => {
    axios
      .get(`http://localhost:5100/api/jobs/question/${id}`)
      .then((res) => setVideos(res.data.video))
      .catch((err) => console.log(err));
  };

  return (
    <div >
      <div>
        {job &&
          job.questions.map((question) => (
            <p
              onClick={setVideosHandler.bind(this, question._id)}
              key={question._id}
            >
              {question.question}
            </p>
          ))}
      </div>
      <div>
        {!videos && <h3>No videos found!</h3>}
        <p>{jobId}</p>
        {Getall && Getall.filter((catgorie)=>catgorie.Catgory===jobId ).map((el)=><div> 
          <p>{el.name}</p>
          <p>{el.email}</p>
          <p>{el.Catgory}</p>
          <video controls> 
          <source
                src={process.env.PUBLIC_URL +`/${el.vide}` }

                  
                />
              </video>
        </div>)}
       
        {videos &&
          videos.length &&
          videos.map((vid) => (
            <div key={vid._id}>
              <video className="w-4/5" controls>
                <source
                  src={`http://localhost:5100/${vid.video}`}
                />
              </video>
              <div className="flex justify-between items-center w-4/5">
                <p>{vid.email}</p>
                <div className="flex items-center space-x-1">
                  <p>{vid.nom}</p>
                  <p>{vid.prenom}</p>
                
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ShowQuestion;
