import express from 'express';
import songRoute from './song.route.js';


const router = express.Router();

export default (): express.Router => {
    songRoute(router);

  return router;
};