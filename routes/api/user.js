const express = require("express");

const { schemas } = require("../../models/User");

const { validation } = require("../../middlewares");

const { auth, upload } = require("../../middlewares");

const ctrl = require("../../controllers/users");

const router = express.Router();

router.post("/register", validation(schemas.add), ctrl.register);

router.post("/login", validation(schemas.add), ctrl.login);

router.get("/current", auth, ctrl.current);

router.get("/logout", auth, ctrl.logout);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.update);

router.get("/verify/:verificationToken", ctrl.verification);

router.post("/verify", validation(schemas.emailVerify), ctrl.verifyEmail);

module.exports = router;