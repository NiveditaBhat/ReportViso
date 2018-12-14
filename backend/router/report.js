const express = require('express');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

const reportController = require('../controller/report')

router.post('/api/report/save',checkAuth,reportController.saveReport);

router.get('/api/report/fetch',checkAuth,reportController.fetchReports);

router.delete('/api/report/delete/:ids',checkAuth,reportController.deleteReports);

router.put('/api/report/:id',checkAuth,reportController.renameReport);

module.exports = router;
