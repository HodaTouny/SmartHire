const User = require("../models/User");

async function getUserById(id) {
    try {
        const user = await User.findOne({ googleId: id });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
}
async function getUserByMongoID(id) {
    try {
        const user = await User.findOne({ _id: id });
        return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
}

async function saveUser(profile) {
    try {
        const newUser = await User.create({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
        });

        return newUser;
    } catch (error) {
        console.error("Error saving user:", error);
        throw error;
    }
}

module.exports = {
    getUserById,
    saveUser, getUserByMongoID
};
