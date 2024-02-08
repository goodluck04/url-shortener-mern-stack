import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hours
	limit: 250, // Limit each IP to 250 requests 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
});