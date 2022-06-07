const { User } = require("../../models/User");
const { createError, sendEmail  } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const nanoid = require("nanoid")

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      throw createError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    const result = await User.create({ email, password: hashPassword, avatarURL, verificationToken,  });
    const mail = {
      to: email,
      subject: "Пітдверження реєстрації на сайті",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Натисніть для підтвердження email</a>`,
    };
    await sendEmail(mail);
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
