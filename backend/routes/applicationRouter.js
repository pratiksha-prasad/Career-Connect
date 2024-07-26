import express from "express";
import {
    postApplication,
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  checkApplicationStatus,
} from "../controllers/applicationController.js";
import { isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthorized, postApplication);
router.get("/employer/getall", isAuthorized, employerGetAllApplications);
router.get("/jobseeker/getall", isAuthorized, jobseekerGetAllApplications);
router.delete("/delete/:id", isAuthorized, jobseekerDeleteApplication);
router.get("/application/check/:id", isAuthorized, checkApplicationStatus);

export default router;