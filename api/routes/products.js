// create the instance of express
const express = require("express");
const multer = require("multer");
const checkAuth = require('../middleware/check-auth');
const productControllers = require('../controllers/product')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() +'_'+ file.originalname)
  },
});

const upload = multer({storage : storage});

// get the router and create the instance from express.
const router = express.Router();

// get route.
router.get("/", productControllers.get_all_products);

// post route.
router.post("/", checkAuth , upload.single('productImage'), productControllers.add_product);

// patch route
router.patch("/:id", productControllers.update_product);

// delete route
router.delete("/:id", productControllers.delete_product);

// router exported, so that its available to other locations or in other files in the project.
module.exports = router;
