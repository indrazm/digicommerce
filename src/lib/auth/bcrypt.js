import { hash, compare } from "bcrypt";

const generateHash = async (password) => {
   const hashedPassword = await hash(password, 13);
   return hashedPassword;
};

const compareHash = async (password, hashedPassword) => {
   const isMatches = await compare(password, hashedPassword);
   return isMatches;
};

export { generateHash, compareHash };
