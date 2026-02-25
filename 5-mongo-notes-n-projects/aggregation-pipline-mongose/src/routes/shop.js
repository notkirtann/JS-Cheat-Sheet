import express from "express";

import category from "./category.routes.js";
import companies from "./companies.routes.js";
import product from "./product.routes.js";
import sales from "./sales.routes.js";

const router = express.Router();

router.use("/category", category);
router.use("/companies", companies);
router.use("/product", product);
router.use("/sales", sales);

export default router;
