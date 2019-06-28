const router = require("koa-router")();
const userController = require("./users/userController");

router.post("/api/user/login", userController.login);
router.post("/api/user/register", userController.register);

module.exports = router;
