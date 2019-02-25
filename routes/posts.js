const axios = require('axios');

const express = require('express');

const router = express.Router();
const solveDistance = require('../utils/solveDistance');
const getMinValue = require('../utils/getMinValue');

const API_URL = 'https://jsonplaceholder.typicode.com';
const POSTS_ENDPOINT = `${API_URL}/posts`;
const USERS_ENDPOINT = `${API_URL}/users`;

router.post('/proximity', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const { data } = await axios.get(USERS_ENDPOINT);
    const allDistances = data.map(({ address: { geo: { lat, lng } } }) => solveDistance(lng, lat, longitude, latitude));
    const minDistance = getMinValue(allDistances);
    const userIndex = allDistances.indexOf(minDistance);
    const { id: userId, username } = data[userIndex];
    const posts = await axios.get(`${POSTS_ENDPOINT}?userId=${userId}`);

    res.render('posts', { list: posts.data, username, distance: `${minDistance.toFixed(1)} km` });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
