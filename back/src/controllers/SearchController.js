const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);
    try {
      const devs = await Dev.find({
        techs: {
          $in: techsArray
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: 100000
          }
        }
      });
      //Buscar todos devs num raio 10km
      //Filtrar por tecnologias
      return res.json({ devs });
    } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
    }
    return res.status(500).json();
  }
};
