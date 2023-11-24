const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      strim: true,
      required: true,
    },
    email: {
      type: String,
      strim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      strim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePW = async function (pw) {
  return await bcrypt.compare(pw, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
