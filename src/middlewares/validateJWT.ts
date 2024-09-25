import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";

export interface ExtendedRequest extends Request {
  user?: any;
}

const validateJWT = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).json("authorization header was not provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).json("Bearer token not found");
    return;
  }

  jwt.verify(
    token,
    "PhPuZRIQFtZ4QmfbW1TZxiybpcLDDQB5",
    async (err, payload) => {
      if (err) {
        res.status(403).json("Invalid token");
        return;
      }

      if (!payload) {
        res.status(403).json("Invalid token payload");
        return;
      }

      const userPayload = payload as {
        firstName: string;
        lastName: string;
        email: string;
      };

      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
