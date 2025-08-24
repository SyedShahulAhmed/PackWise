import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const authMiddleware = async (req, res, next) => {
  // Let CORS preflight pass
  if (req.method === "OPTIONS") return next();

  try {
    // Header: "Authorization: Bearer <token>"
    const auth = req.headers.authorization || "";
    const hasBearer = auth.startsWith("Bearer ");
    const token = hasBearer ? auth.slice(7) : null;

    if (!token) return res.status(401).json({ message: "No token provided" });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normalize possible id fields from your sign() payload
    const userId =
      decoded.id ||
      decoded._id ||
      decoded.userId ||
      decoded.sub || // if you used `sub` when signing
      null;

    if (!userId) {
      return res.status(401).json({ message: "Token missing user id" });
    }

    // Load user (ensure still exists)
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    // Attach a minimal object; controllers can use req.user.id
    req.user = { id: user._id.toString(), role: user.role }; // add more if you need
    return next();
  } catch (err) {
    // Helpful during debugging; remove in prod if too noisy
    console.error("authMiddleware error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
