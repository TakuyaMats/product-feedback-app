const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const roadmapRoutes = require('./roadmapRoutes');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/roadmap', roadmapRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;