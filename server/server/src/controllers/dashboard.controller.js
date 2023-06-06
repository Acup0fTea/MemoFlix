import express from "express";
import userModel from "../models/user.model.js";
import reviewModel from "../models/review.model.js";
import responseHandler from "../handlers/request.handler.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.session.userId;
    const userData = await userModel.findById(userId);

    if (userData && userData.roles.includes("admin")) {
      res.render("dashboard");
    } 
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const reviews = await reviewModel.find();
    responseHandler.ok(res, reviews);
  } catch (err) {
    console.error(err);
    responseHandler.error(res);
  }
});

router.delete("/reviews/:id", async (req, res) => {
  try {
    const deletedReview = await reviewModel.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return responseHandler.notfound(res);
    }
    responseHandler.ok(res, { message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    responseHandler.error(res);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await userModel.find();
    responseHandler.ok(res, users);
  } catch (err) {
    console.error(err);
    responseHandler.error(res);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return responseHandler.notfound(res);
    }
    responseHandler.ok(res, { message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    responseHandler.error(res);
  }
});

export default router;
