// src/actions/jwt.ts
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Sign JWT
export const signJwt = (payload: object, expiresIn: string = "1h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

// Verify JWT
export const verifyJwt = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    if(error){
      console.log(error);
    }
    return null;
  }
};
