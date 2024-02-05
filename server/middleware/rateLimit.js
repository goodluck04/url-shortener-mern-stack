import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hours
	limit: 100, // Limit each IP to 100 requests 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
});