import express from 'express';
import { createMessage, getMessage } from "../controller/message";

const router = express.Router();

router.get('/', async (req, res, next) => {
  const result = await getMessage();
  res.status(result.code).send(result.data);
});

router.post('/', async (req, res) => {
    const result = await createMessage(req.body);
    res.status(result.code).send(result.data)  
})

export default router;
