var express = require('express');
var router = express.Router();

var Voyage = require('../models/voyages');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /voyages : les données de voyage à partir de departure et arrival*/

router.get('/voyages', async (req, res) => {
  try {
    console.log("QUERY:", req.query);

    const {departure, arrival} = req.query;

    /*Si un des champs est vide*/
    if (!departure || !arrival) {
      return res.status(400).json({
        message : "Remplissez les champs Departure et Arrival!",
      });
    }

    const now = new Date();

    const voyages = await Voyage.find(
      {departure,arrival, date: { $gte: now }},
      "departure arrival date price",
  );

    res.status(200).json(voyages);
  } catch (error) {
    res.status(500).json({
      message : 'Erreur serveur',
      error : error.message,
    });
  }
});

module.exports = router;
