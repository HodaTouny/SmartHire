const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const userdao = require("../dao/Userdoa");
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.SERVER_URL}/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, callback) => {
            console.log(" Google OAuth Callback triggered.");
            console.log("Redirect URI:", `${process.env.SERVER_URL}/auth/google/callback`);

            try {
                const existingUser = await userdao.getUserById(profile.id);

                if (existingUser) {
                    console.log("User already exists:", existingUser.username);
                    return callback(null, existingUser);
                }

                const newUser = await userdao.saveUser(profile);
                console.log("New user created:", newUser.username);

                return callback(null, newUser);
            } catch (error) {
                console.error("Error in Google Strategy callback:", error);
                return callback(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await userdao.getUserByMongoID(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
