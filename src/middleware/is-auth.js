/* eslint-disable no-undef */
import jwt from "jsonwebtoken";

function isAuth(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized: token is missing or malformed." });
  }

  const token = authorization.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Unauthorized: token is not valid." });
    }

    req.user = { id: decoded.userId };
    next();
  } catch (err) {
    res.status(500).json(err);
  }
}

export default isAuth;
