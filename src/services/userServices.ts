import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email: email });
  if (findUser) {
    return { data: "User already exist", statusCode: 400 };
  }

  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: hashedPass,
  });
  await newUser.save();

  return { data: generateJWT({ firstName, lastName, email }), statusCode: 200 };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email: email });
  if (!findUser) {
    return { data: "User not found", statusCode: 400 };
  }

  const passMatch = await bcrypt.compare(password, findUser.password);
  if (passMatch) {
    return {
      data: generateJWT({
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email,
      }),
      statusCode: 200,
    };
  }

  return { data: "Incorrect password", statusCode: 400 };
};

const generateJWT = (data: any) => {
  return jwt.sign(data, "PhPuZRIQFtZ4QmfbW1TZxiybpcLDDQB5");
};
