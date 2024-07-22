const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A user must have a user name"],
    },
    email: {
        type: String,
        unique: [true, "User name already exists!"],
    },
    password: {
        type: String,
        required: [true, "Please enter a passowrd"],
    },
});

UserSchema.pre("save", async function (next) {
    // if the password is not modified then we don't need to change it
    if (!this.isModified("password")) return next();

    // hash the password with a cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    this.passwordConfirm = undefined;
    next();
});

UserSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
