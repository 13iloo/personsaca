import express from 'express';
import PersonsApiController from '../apiControllers/PersonsApiController.js'

const thePersonsApiController = new PersonsApiController();

// we need a router to chain them
const router = express.Router();

router.get("/", thePersonsApiController.retrieveAll)
router.put("/", thePersonsApiController.create)

export default router;