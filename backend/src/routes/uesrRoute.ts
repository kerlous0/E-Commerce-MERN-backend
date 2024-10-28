import express from "express";
import { register, login } from "../services/userServices";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const registerData = req.body;
    const resulst = await register(registerData);
    res.status(resulst.statusCode).send(resulst.data);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

router.post("/login", async (req, res) => {
  try {
    const loginData = req.body;
    const result = await login(loginData);
    res.status(result.statusCode).send(result.data);
  } catch (error) {
    res.status(500).send("something went wrong");
  }
});

export default router;
