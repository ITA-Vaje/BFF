// routes/bookings.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'http://localhost:8081/api/Booking';

router.get('/:id', (req, res) => axios.get(`${BASE_URL}/${req.params.id}`).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message)));
router.get('/', (req, res) => axios.get(`${BASE_URL}`).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message)));
router.post('/', (req, res) => axios.post(`${BASE_URL}`, req.body).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message)));
router.put('/:id', (req, res) => axios.put(`${BASE_URL}/${req.params.id}`, req.body).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message)));
router.delete('/:id', (req, res) => axios.delete(`${BASE_URL}/${req.params.id}`).then(() => res.status(204).send()).catch(e => res.status(500).send(e.message)));

module.exports = router;
