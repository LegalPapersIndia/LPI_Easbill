// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "No token provided",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default authMiddleware;



import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    // ── User ki companyId ek hi baar yahan nikaal lo — ──
    // taaki har controller mein baar-baar DB query na karni pade
    const user = await User.findById(req.userId).select("companyId");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    req.companyId = user.companyId;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;