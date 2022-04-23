//external imports
const express = require('express');

// internal imports
const {
    getUsers,
    addUser,
    removeUser,
  } = require("../controller/usersController");
  const decorateHtmlResponse = require("../middlewears/common/decorateHtmlResponse");
  const avatarUpload = require("../middlewears/users/avatarUpload");
  const {
    addUserValidators,
    addUserValidationHandler,
  } = require("../middlewears/users/userValidators");

const router = express.Router();

//Users page
router.get("/",decorateHtmlResponse("Users"),getUsers);

//add user
router.post(
    "/",
    avatarUpload,
    addUserValidators,
    addUserValidationHandler,
    addUser
  );
  
  // remove user
  router.delete("/:id", removeUser);
  


module.exports = router;

