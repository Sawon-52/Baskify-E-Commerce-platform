import express from "express";
const router = express.Router();
import { paymentCreate, paymentSuccess, paymentFail, paymentCancel, paymentIPN } from "../controllers/paymentController.js";
// import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/:id/pay").post(paymentCreate);
router.route("/pay/success").post(paymentSuccess);
router.route("/pay/fail").post(paymentFail);
router.route("/pay/cancel").post(paymentCancel);
router.route("/pay/ipn").post(paymentIPN);

export default router;
