import express from "express";

export default () => {
  const router = express.Router();

  router.get("/", function (req, res) {
    res.render("index");
  })

  return router;
};