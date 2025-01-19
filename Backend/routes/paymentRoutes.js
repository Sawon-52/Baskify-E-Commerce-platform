import express from "express";
const router = express.Router();
import { paymentCreate, paymentSuccess, paymentFail, paymentCancel } from "../controllers/paymentController.js";

router.route("/:id/pay").post(paymentCreate);
router.route("/pay/success").post(paymentSuccess);
router.route("/pay/fail").post(paymentFail);
router.route("/pay/cancel").post(paymentCancel);
// router.route("/pay/ipn").post(paymentIPN);

export default router;
