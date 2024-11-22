const User = require('../models/user'); // Make sure this points to the correct model


async function createUser (req, res, next) {
        const body = req.body;
    
        if (
            !body ||
            !body.first_name ||
            !body.last_name ||
            !body.email ||
            !body.gender ||
            !body.job_title
        ){
            return res.status(400).json({ error: "All fields are required." });
        }
        try {
            const result =  await User.create({
                first_name: body.first_name,
                last_name: body.last_name,
                email: body.email,
                gender: body.gender,
                job_title: body.job_title,
    
            });
            console.log(result);
            return res.status(201).json({ message: "user created successfully.", user: result });
    
        }catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error." });
        }
};

// Handle GET request for all users
async function handleGetAllUsers(req, res) {
    try {
        const allDbUsers = await User.find({});
        return res.json(allDbUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve users" });
    }
}

// Handle GET request for a user by ID
async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to retrieve user" });
    }
}

// Handle PATCH request to update a user's info
async function handleUpdateUser(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ status: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to update user" });
    }
}

// Handle DELETE request to delete a user
async function handleDeleteUser(req, res) {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ status: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to delete user" });
    }
}

module.exports = {
    handleGetAllUsers,
    getUserById,
    handleUpdateUser,
    handleDeleteUser,
    createUser,
 
};
