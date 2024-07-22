const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/UserModel");

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

exports.signUp = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        username: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    const token = signToken(newUser._id);
    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser,
        },
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    // check if there is an email or a password
    if (!email || !password) {
        return next(
            new createHttpError(400, "Please Provide an email and a password")
        );
    }

    const user = await User.findOne({ email }).select("+password");

    // check if there is a user or the provided password is same as that stored in the database
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new createHttpError(401, "Invalid email or password"));
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: "success",
        token,
    });
});
