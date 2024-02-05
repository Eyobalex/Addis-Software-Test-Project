import { getAll, getById } from "controllers/song.controller.js";
import express from "express";

export default (router: express.Router) => {
  router.get("/songs", getAll);
  router.get("/songs/:id", getById);
};
