const express = require('express');
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default:fetch}) => fetch(...args));
router.use(express.static('public'));

const healthDataRoute = require('./api/healthDataRoute');

router.use('/allHealthData', healthDataRoute);

router.use('/', (req, res) => {
    const url = 'https://api.sampleapis.com/health/professions';
    fetch (url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'Health Professions',
                name: 'Health Professions',
                data
            });
        })
        .catch(error => {
            console.log('Error', error)
        });
});

router.get('*', (req, res) => {
    if(req.url == '/favico/ico') {
        res.end();
    } else {
        res.render('pages/error', {
            title: 404,
            name: 404,
        })
    }
})

module.exports = router;