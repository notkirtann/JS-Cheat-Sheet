import express from "express";
import userController from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Auth Routes
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/logout", auth, userController.logoutUser);
router.post("/logoutAll", auth, userController.logoutAll);

// Profile
router
  .route("/me")
  .get(auth, userController.getMyProfile)
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

// Address & Phone
router.patch(
  "/:userId/address/:addressId",
  auth,
  userController.updateAddressField,
);
router.patch(
  "/:userId/:phoneId",
  auth,
  userController.updatePhoneNumberField,
);
router.delete(
  "/:userId/address/:addressId",
  auth,
  userController.removeAddressField,
);

export default router;
