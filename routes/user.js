const express = require('express');
const User = require('../models/user');
const { handleGetAllUsers,
        getUserById,
        handleUpdateUser,
        handleDeleteUser } = require('../controllers/user');


const router = express.Router();



router 
    .route("/:id")
    .get(getUserById)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);

router.route("/").get(handleGetAllUsers).post(handleGetAllUsers);

module.exports = router;