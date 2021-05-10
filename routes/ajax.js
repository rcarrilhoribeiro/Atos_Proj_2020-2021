const express = require('express');

const SupportEntity = require("../models/auxiliaryModels/supportEntity");
const router = express.Router();

router.get('/entities-names', async (req, res) => {
    const names = await SupportEntity.find(
        {
            name: { $regex: new RegExp(req.query.query.replace(/\s+/g, "\\s+"), "gi") }
        }).select({"name": 1, "_id": 0})

    res.status(200).json(
        names,
    )
})

module.exports = router;