import { sign, verify } from "jsonwebtoken";

const generateJWT = (payload) => {
   const jwt = sign(payload, process.env.JWT_KEY, { expiresIn: "1d", issuer: "ecommerce" });
   return jwt;
};

const verifyJWT = (jwt) => {
   const payload = verify(jwt, process.env.JWT_KEY);
   return payload;
};

export { generateJWT, verifyJWT };
