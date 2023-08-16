const { User } = require('../models/user')
const { HttpError, ctrlWrapper, sendEmail } = require('../helpers')
require('dotenv').config()
const { SECRET_KEY, BASE_URL } = process.env;

const path = require("path");
const fs = require("fs/promises");

const gravatar = require("gravatar");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jimp = require('jimp');
const {nanoid} = require('nanoid');
    
const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
         throw HttpError(409, "Email in use");
    }

    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const hashPassword = await bcryptjs.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken })
  
  const verifyMail = {
    to: email,
    subject: "Verify your email",
    html: `<h3>Hi, new user ${email} 😉 <h3/>
    <a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}"> Click for verify your email </a>`
  }


  await sendEmail(verifyMail);


    res.status(201).json({
        "user": {
            "email": newUser.email,
            "subscription": newUser.subscription,
        }
    });

}

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
         throw HttpError(409, "User not found");
  }
  
  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" })
  
   res.status(200).json({
      message: 'Verification successful'
  });

}


const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
    
    const user = await User.findOne({ email });

  if (!user) {
         throw HttpError(409, "User not found");
  }

  if (user.verify) {
         throw HttpError(400, "Verification has already been passed");
  }
  
   const verifyMail = {
    to: email,
    subject: "Verify your email",
    html: `<h3>Hi, new user ${email} 😉 <h3/>
    <h5> Do you failed to verify your account the first time?
        <br/> <a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}"> Click for verify your email !!!
        </a>
    <h5/>`
  }

  await sendEmail(verifyMail);
  
   res.status(200).json({
      "message": "Verification email sent"
  });

}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

  
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
    
    const compereHashPassword = await bcryptjs.compare(password, user.password);
    if (!compereHashPassword) {
         throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
         throw HttpError(409, "User is not verified");
  }
  
     const payload = {
        id: user._id,
    }
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" })
    
    await User.findByIdAndUpdate(user._id, { token })
    
    res.status(200).json(
    {
  "token": token,
    "user": {
    "email": user.email,
    "subscription": user.subscription,
   
  }
});
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;

    res.status(200).json({
        email,
        subscription 
    })
}


const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" }) 

    res.status(204).json()
}



const avatarsPath = path.resolve("public", "avatars")

const updateAvatar = async (req, res) => {
     const { _id } = req.user;

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;

  const resultUpload = path.join(avatarsPath, originalname);

  await jimp.read(tempUpload)
    .then((avatar) => avatar.resize(250, 250).write(resultUpload))
    .catch((e) => console.log(e));

  await fs.unlink(tempUpload);

  
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
}


module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),

}