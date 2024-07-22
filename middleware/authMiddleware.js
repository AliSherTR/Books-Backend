const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const { promisify } = require("util");
const User = require("../models/UserModel");
exports.protect = catchAsync(async (req, res, next) => {
    // 1) get token
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(
            createHttpError(
                401,
                "You are not logged in! Please log in to get access."
            )
        );
    }
    // 2) verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) check if the user belonging to the token still exists

    const currentUser = await User.findById(decoded.id);

    if (!currentUser)
        return next(new AppError("The user no longer exists!!", 401));

    req.user = currentUser;
    next();
});
