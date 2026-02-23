import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {bcrypt_constant, jwt_expire_constant} from "../constant.js"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      default: 18,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    address: [
      {
        city: {
          type: String,
          required: true,
          trim: true,
        },
        state: {
          type: String,
          required: true,
          trim: true,
        },
        pincode: {
          type: Number,
          required: true,
        },
      },
    ],
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "ownerId",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Incorrect Email Entered");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to Login");
  }
  return user;
};

userSchema.methods.genAuthToken = async function () {
  const user = this;
  const jwtToken = jwt.sign(
    { _id: user._id.toString(), email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || jwt_expire_constant },
  );
  user.tokens = user.tokens.concat({ token: jwtToken });
  await user.save();
  return jwtToken;
};

//plain text to hash
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, bcrypt_constant);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
