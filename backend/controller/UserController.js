const passport = require("passport");


const loginSuccess = (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Logged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
};


const getCurrentUser = (req, res) => {
	
	if (req.user) {
		res.status(200).json({ user: req.user });
	} else {
		res.status(401).json({ message: "Not authenticated" });
	}
};

const loginFailed = (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
};

// Initiates Google OAuth2 login flow with access to user's profile and email
const googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });
// Handles the callback after Google has authenticated the user
const googleCallback = passport.authenticate("google", {
	successRedirect: `${process.env.CLIENT_URL}/recruiter/email-config`,
	failureRedirect: `${process.env.CLIENT_URL}/auth/login/failed`,
});

const logout = (req, res) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ error: true, message: "Logout failed" });
		}
		res.redirect(process.env.CLIENT_URL);
	});
};

module.exports = {
	loginSuccess,
	loginFailed,
	googleAuth,
	googleCallback,
	logout,
	getCurrentUser
};
