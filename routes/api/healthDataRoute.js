const express =  require('express')
const router = express.Router();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get('/', (req, res) => {
    const url = 'https://api.sampleapis.com/health/professions';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/allHealthData', {
                title: 'Health Professions',
                name: 'Health professions',
                data    
            });
        })
        .catch(error => {
            console.log('Error', error);
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const url = `https://api.sampleapis.com/health/professions/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(Object.keys(data).length >= 1) {
                res.render('pages/singleHealthData', {
                    title: data.title,
                    name: data.title,
                    data
                });
            } else {
                res.render('pages/error', {
                    title: 404,
                    name: 404,
                });
            }
        })
        .catch(error => {
            console.log('Error:', error);
        })
})

module.exports = router;