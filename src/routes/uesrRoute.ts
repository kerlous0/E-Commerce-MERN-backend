import express from "express";
import { register, login } from "../services/userServices";

const router = express.Router();

router.post("/register", async (req, res) => {
  const registerData = req.body;
  const resulst = await register(registerData);
  res.status(resulst.statusCode).send(resulst.data);
});

router.post("/login", async (req, res) => {
  const loginData = req.body;
  const result = await login(loginData);
  res.status(result.statusCode).send(result.data);
});

export default router;
