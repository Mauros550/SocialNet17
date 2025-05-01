import express from 'express';
import thoughtController from '../controllers/thoughtController.js';

const router = express.Router();

router.route('/')
  .get(thoughtController.getAllThoughts)
  .post(thoughtController.createThought);

router.route('/:thoughtId')
  .get(thoughtController.getThoughtById)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions')
  .post(thoughtController.addReaction);

router.route('/:thoughtId/reactions/:reactionId')
  .delete(thoughtController.removeReaction);

export default router;
