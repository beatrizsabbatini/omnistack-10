const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index (listar itens), show(mostrar um), store(criar), update(atualizar) e destroy(deletar)

module.exports = {
  // -------INDEX-----------------------------------------------------------------

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  // --------STORE----------------------------------------------------------------

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiRes = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiRes.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        bio,
        avatar_url,
        techs: techsArray,
        location
      });
    }

    return res.json(dev);
  }
};
