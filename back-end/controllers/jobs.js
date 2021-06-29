const Jobs = require("../models/jobs");
const Interview = require("../models/interview");
const Questions = require("../models/questions");
const Video = require("../models/video");

const getJobs = (req, res) => {
  Jobs.find({})
    .populate("questions")
    .populate("interview")
    .exec((err, jobs) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(jobs);
    });
};

const createJobs = (req, res) => {
  const job = new Jobs(req.body);
  job.save(() => {
    return res.status(200).json({
      success: true,
      job,
    });
  });
};

const getJob = (req, res) => {
  Jobs.findOne({ _id: req.params.id })
    .populate("interview")
    .populate("questions")
    .exec((err, job) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        job,
      });
    });
};

const deleteJob = async (req, res) => {
  Jobs.findByIdAndRemove({ _id: req.params.id }, (err, job) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({
      success: true,
      job,
    });
  });
  await Interview.deleteOne({ job: req.params.id });
  await Questions.deleteMany({ job: req.params.id });
};

const updateJob = (req, res) => {
  const { title, questions, location, description, status, interviewUrl } =
    req.body;
  Jobs.updateOne(
    { _id: req.params.id },
    { title, questions, location, description, status, interviewUrl },
    (err) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json({
        success: true,
        message: `updated successfully!`,
      });
    }
  );
};

const createInterview = async (req, res) => {
  const interview = new Interview(req.body);

  const job = await Jobs.findById(req.params.id);
  interview.job = job;
  await interview.save();
  job.interview = interview;
  await job.save();
  return res.status(200).json({
    success: true,
  });
};

const createQuestion = async (req, res) => {
  const question = new Questions(req.body);
  const job = await Jobs.findById(req.params.id);
  question.job = job;
  await question.save();
  job.questions.push(question);
  await job.save();
  return res.status(200).json({
    job,
  });
};

//remove question
const removeQuestion = async (req, res) => {
  const job = await Jobs.findOne({ questions: req.params.id }).populate(
    "questions"
  );
  const newArray = job.questions.filter(
    (question) => question.id !== req.params.id
  );
  job.questions = newArray;
  await job.save();
  await Questions.deleteOne({ _id: req.params.id });
};

const listInterview = (req, res, next) => {
  Interview.findOne({ _id: req.params.id })
    .populate({ path: "job", populate: { path: "questions" } })
    .then((interview) => {
      if (!interview) {
        const error = new Error("No interviews found!");
        error.statusCode = 401;
        throw error;
      }
      return res.json({ success: true, interview });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

const startInterview = async (req, res) => {
  const { nom, prenom, email, telephone } = req.body;
  const videoUrl = `${req.file.path.replace("\\", "/")}`;
  const interview = await Interview.findById(req.params.interviewId);
  const question = await Questions.findById(req.params.questionId);
  const video = new Video({
    nom,
    prenom,
    email,
    telephone,
    video: videoUrl,
  });
  video.question = question;
  video.interview = interview;
  interview.videos.push(video);
  question.video.push(video);
  await interview.save();
  await question.save();
  await video.save();
  return res.json({ success: true, video });
};

const getQuestions = (req, res) => {
  const { id } = req.params;
  Questions.findOne({ _id: id })
    .populate("video")
    .then((question) => res.json(question))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
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
};
