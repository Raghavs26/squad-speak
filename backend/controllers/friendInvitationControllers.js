// const postInvite = require("./postInvite");
// const postAccept = require("./postAccept");
// const postReject = require("./postReject");

// exports.controllers = {
//   postInvite,
//   postAccept,
//   postReject,
// };

const User = require("../models/User");
const FriendInvitation = require("../models/FriendInvitation");
const {
  updateFriendsPendingInvitations,
  updateFriends,
} = require("../socketHandlers/updates/friends");

const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;

  const { userId, mail } = req.user;

  // check if user cannot invite himself

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res
      .status(409)
      .send("Sorry. You cannot become friends with yourself");
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res
      .status(404)
      .send(
        `Friend of ${targetMailAddress} has not been found. Please check mail address.`
      );
  }

  // check if invitation has been already sent
  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send("Invitation has been already sent");
  }

  // check user is already our friend
  const usersAlreadyFriends = targetUser.friends.find(
    (friendId) => friendId.toString() === userId.toString()
  );

  if (usersAlreadyFriends) {
    return res
      .status(409)
      .send("Friend already added. Please check friends list");
  }

  // create new invitation
  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  // if invtiation has been successfully created we would like to update friends invitations if other user is online

  // send pending invitations update to specific user
  updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send("Invitation has been sent");
};

const postAccept = async (req, res) => {
  try {
    const { id } = req.body;

    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send("Error occured. Please try again");
    }

    const { senderId, receiverId } = invitation;

    // add friends to both users
    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    // delete invitation
    await FriendInvitation.findByIdAndDelete(id);

    // update list of the friends if the users are online
    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());

    // update list of friends pending invitations
    updateFriendsPendingInvitations(receiverId.toString());

    return res.status(200).send("Friend successfuly added");
  } catch (err) {
    return res.status(500).send("Something went wrong. Please try again");
  }
};
const postReject = async (req, res) => {
  try {
    const { id } = req.body;
    const { userId } = req.user;

    // remove that invitation from friend invitations collection
    const invitationExists = await FriendInvitation.exists({ _id: id });

    if (invitationExists) {
      await FriendInvitation.findByIdAndDelete(id);
    }

    // update pending invitations
    updateFriendsPendingInvitations(userId);

    return res.status(200).send("Invitation succesfully rejected");
  } catch (err) {
    return res.status(500).send("Something went wrong please try again");
  }
};
module.exports = { postInvite, postAccept, postReject };
