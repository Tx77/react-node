const router = require("koa-router")();
const userController = require("./users/userController");
const goodsController = require("./goods/goodsController");
const brandController = require("./goods/brandController");

router.post("/api/user/login", userController.login);
router.post("/api/user/register", userController.register);
router.post("/api/goods/addGoods", goodsController.addGoods);
router.get("/api/goods/getBrand", brandController.getBrand);
router.get("/api/goods/goodsList", goodsController.goodsList);

module.exports = router;
