const express = require('express');
const router = express.Router();
const CrawlController = require('../controllers/crawlController');
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.get('/dataCrawl', async (req, res) => {
	try {
		const data = await CrawlController.getDataCrawl();
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error1' });
	}
});

module.exports = router;