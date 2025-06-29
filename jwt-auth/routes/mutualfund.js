const express = require('express');
const router = express.Router();
const MutualFund = require('../models/MutualFund');
const auth = require('../middleware/auth');

// Save mutual funds (bulk insert)
router.post('/', auth, async (req, res) => {
  try {
    const funds = req.body;

    if (!Array.isArray(funds)) {
      return res.status(400).json({ msg: 'Expected an array of mutual funds' });
    }

    // Use upsert to avoid duplicates based on schemeCode
    const bulkOps = funds.map(fund => ({
      updateOne: {
        filter: { schemeCode: fund.schemeCode },
        update: { $set: fund },
        upsert: true
      }
    }));

    await MutualFund.bulkWrite(bulkOps);
    res.json({ msg: 'Mutual funds saved successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all mutual funds
router.get('/', auth ,async (req, res) => {
  try {
    const funds = await MutualFund.find().sort({ schemeCode: 1 });
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
