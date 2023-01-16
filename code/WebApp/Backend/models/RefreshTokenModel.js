const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const RefreshTokenSchema = new mongoose.Schema({
    token: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expiryDate: Date,
  });

  RefreshTokenSchema.statics.createToken = async function (user) {
    let expiredAt = new Date();
  
    expiredAt.setSeconds(
      expiredAt.getSeconds() + process.env.JWT_REFRESH_TOKEN_EXPIRATION
    );
  
    let _token = uuidv4();
  
    let _object = new this({
      token: _token,
      user: user._id,
      expiryDate: expiredAt.getTime(),
    });
  
    console.log(_object);
  
    let refreshToken = await _object.save();
  
    return refreshToken.token;
  };

  RefreshTokenSchema.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  }

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);