const express = require("express");

const { schemas } = require("../../models/Contacts");

const { validation } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validation(schemas.add), ctrl.addContact);

router.patch(
  "/:id/favorite",
  validation(schemas.updateFavorite),
  ctrl.updateFavoriteContacts
);

router.delete("/:id", ctrl.removeContact);

router.put("/:id", validation(schemas.edit), ctrl.updateContact);

module.exports = router;