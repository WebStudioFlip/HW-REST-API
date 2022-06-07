const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/User");
const { createError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const update = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { path: tempDir, filename } = req.file;
    const [extension] = filename.split(".").reverse();
    const name = `${_id}.${extension}`;
    const resultDir = path.join(avatarsDir, name);
    console.log("resultDir - ", resultDir)
    await fs.rename(tempDir, resultDir);
    const image = await Jimp.read(resultDir);
    await image.resize(250, 250).write(tempDir);
    const avatarURL = path.join("avatars", name);
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    throw createError(401, "Not authorized");
  }
};

module.exports = update;
