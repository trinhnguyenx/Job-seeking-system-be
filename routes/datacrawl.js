const express = require('express');
const router = express.Router();
const CrawlController = require('../controllers/crawlController');
const bodyParser = require('body-parser')
router.use(bodyParser.json())

router.get('/dataCrawl', async (req, res) => {
	// const page = parseInt(req.query.page) || 1; 
	// const pageSize = parseInt(req.query.pageSize) || 10;
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
router.get('/jobtitle', async (req, res) => {
	try {
		const data = await CrawlController.getJobByTitle();
		res.json({
			message: 'Job Title',
			data: data
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
})
router.get('/filterjob', async (req, res) => {
	const key1 = req.query.key1 || "";
	const key2 = req.query.key2 || "";
	const key3 = req.query.key3 || "";
	try {
		const data = await CrawlController.filterJob(key1,key2,key3);
		console.log("key1 = :",key1,"key2 = :",key2,"key3 = :",key3)
		res.json({
			message: 'Job Title',
			data: data
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
})

module.exports = router;