const router = require("express").Router();
const {loginSuccess,loginFailed,googleAuth,googleCallback,logout,getCurrentUser} = require("../controller/UserController");

router.get("/login/success", loginSuccess);
router.get("/login/failed", loginFailed);
router.get("/user", getCurrentUser);
router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);

router.get("/logout", logout);

module.exports = router;
