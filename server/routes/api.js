const express = require('express'),
      router  = express.Router(),
      fetch   = require('node-fetch');

const EVENTS_ENDPOINT = `https://graph.facebook.com/v3.1/${process.env.FB_PAGE_ID}` +
    `/events?access_token=${process.env.FB_ACCESS_TOKEN}&` +
    'event_state_filter[0]=published&' +
    'time_filter=upcoming&include_canceled=false';

router.get('/', (req, res) => {
    res.send('Hello! This is UoB Startup Society API. To learn more visit ' +
        'our <a href=https://www.startupsoc.com/>website</a>.');
});

router.get('/fb-events', (req, res) => {
    let endPoint = EVENTS_ENDPOINT;
    if(req.body.fields) {
        endPoint += '&fields=' + req.body.fields;
    }

    fetch(endPoint)
        .then(data => data.json())
        .then(json => res.send(json));
});

module.exports = router;