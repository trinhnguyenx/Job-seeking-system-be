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
router.get('/dataCrawl/:id', async (req, res) => {
	const jobID = req.params.id;
	try {
		const data = await CrawlController.getDataCrawlById(jobID);
		res.json(data);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error2' });
	}
});
router.put('/updatejob/:id', async (req, res) => {
	const updatedUser = req.body;
	try {
		const job_id = req.params.id;
		const job = await CrawlController.getDataCrawlById(job_id);
		if (job) {
			await CrawlController.updateJob(job_id, updatedUser);
			const job = await CrawlController.getDataCrawlById(job_id);
			res.json({ 
				message: 'Job updated',
				data: job
			 });	
		} else {
			res.status(404).json({ error: 'Job not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
})

module.exports = router;