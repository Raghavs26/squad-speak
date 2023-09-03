const express = require("express");
const Joi = require("joi");
const { body } = require("express-joi-validation").createValidator({});

const auth = require("../middleware/auth");
const {
  postInvite,
  postAccept,
  postReject,
} = require("../controllers/friendInvitationControllers");

const router = express.Router();

const postFriendInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post("/invite", auth, body(postFriendInvitationSchema), postInvite);
router.post("/accept", auth, body(inviteDecisionSchema), postAccept);
router.post("/reject", auth, body(inviteDecisionSchema), postReject);

module.exports = router;
