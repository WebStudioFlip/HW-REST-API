const { User } = require("../../models/User");
const { createError, sendEmail } = require("../../helpers");

const verifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(400);
    }
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Пітдверження реєстрації на сайті",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Натисніть для підтвердження email</a>`,
    };
    await sendEmail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyEmail;