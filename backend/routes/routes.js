// const router = require("express").Router();

// const { addProduct, getProducts, updateproduct } = require("../Controllers/ProductRoutes");
// const upload = require("../middleware/upload");

// const {login, register, logout} = require("../Controllers/AuthController");
// const authMiddleware = require("../Middleware/AuthMiddleware");


// router.post("/login", login);
// router.post("/register", register);
// router.post("/logout", logout);
// router.get("/dashboard",authMiddleware, (req, res) => {
//     res.json({ message: "Welcome to the dashboard!" });
//   });

// router.post("/addproducts", upload.single("image"),addProduct);
// router.get("/getproducts", getProducts);
// router.put("/updateproducts/:id", upload.single("image"), updateproduct);


// module.exports = router;