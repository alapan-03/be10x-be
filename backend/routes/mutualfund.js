const express = require('express');
const router = express.Router();
const MutualFund = require('../models/MutualFund');
const auth = require('../middleware/auth');

// save mutiual fund
router.post('/', auth, async (req, res) => {
  try {
    const fund = req.body;

    if (!fund || typeof fund !== 'object') {
      return res.status(400).json({ msg: 'Expected a mutual fund object' });
    }

    fund.userId = req.user.id; // attach logged in user's ID

    // Avoid duplicate for the same user and fund
    await MutualFund.updateOne(
      { schemeCode: fund.schemeCode, userId: req.user.id },
      { $set: fund },
      { upsert: true }
    );

    res.json({ msg: 'Mutual fund saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Get all mutual funds
router.get('/', auth ,async (req, res) => {
  try {
    const funds = await MutualFund.find({userId: req.user.id}).sort({ schemeCode: 1 });
    res.json(funds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:schemeCode', auth ,async (req, res) => {
  try {
    const { schemeCode } = req.params;

    const deletedFund = await MutualFund.findOneAndDelete({ schemeCode: Number(schemeCode) });

    if (!deletedFund) {
      return res.status(404).json({ msg: 'Mutual fund not found' });
    }

    res.json({ msg: 'Mutual fund deleted successfully', deletedFund });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
