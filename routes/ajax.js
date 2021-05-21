const express = require("express");

const SupportEntity = require("../models/auxiliaryModels/supportEntity");
const User = require("../models/userModel");

const router = express.Router();

router.get("/entities-names", async (req, res) => {
  const query = req.query.query;
  const items = query.split(";");
  let names;
  if(items[0].length > 0){
    names = await SupportEntity.find({
      name: { $regex: new RegExp(items[1].replace(/\s+/g, "\\s+"), "gi") },
      designation: items[0]
    }).select({ name: 1, _id: 0 });
  }else{
    names = await SupportEntity.find({
      name: { $regex: new RegExp(items[1].replace(/\s+/g, "\\s+"), "gi") },
    }).select({ name: 1, _id: 0 });
  }
  res.status(200).json(names);
});

router.get("/user-emails", async(req, res) => {
  const emailStr = req.query.email;
  let emails = await User.find(
    {
      email: { $regex: new RegExp(emailStr.replace(/\s+/g, "\\s+"), "gi") }
    }, 'email'
  )

  // console.log(emails);
  res.status(200).json(emails);
})

module.exports = router;
