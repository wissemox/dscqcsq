const {
  getJobs,
  createJobs,
  getJob,
  deleteJob,
  updateJob,
  createInterview,
  createQuestion,
  removeQuestion,
  listInterview,
  startInterview,
  getQuestions,
} = require("../controllers/jobs");

const route = require("express").Router();

route.get("/jobs", getJobs);
route.get("/jobs/:id/interview", listInterview);
route.get("/jobs/:id", getJob);
route.post("/jobs", createJobs);
route.delete("/jobs/:id", deleteJob);
route.put("/jobs/:id", updateJob);
route.post("/jobs/:id/interview", createInterview);
route.post("/jobs/:id/question", createQuestion);
route.delete("/jobs/:id/question", removeQuestion);
route.post("/jobs/interview/:interviewId/:questionId", startInterview);
route.get("/jobs/question/:id", getQuestions);

module.exports = route;
