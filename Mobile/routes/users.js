// routes/users.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const BASE_URL = 'http://localhost:8080/api/users';

router.post('/register', (req, res) => axios.post(`${BASE_URL}/register`, req.body).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message)));
router.post('/login', (req, res) => axios.post(`${BASE_URL}/login`, req.body).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message)));
router.get('/:id', (req, res) => { axios.get(`${BASE_URL}/${req.params.id}`).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message));});
router.put('/:id', (req, res) => axios.put(`${BASE_URL}/${req.params.id}`, req.body).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message)));
router.delete('/:id', (req, res) => axios.delete(`${BASE_URL}/${req.params.id}`).then(() => res.status(204).send()).catch(e => res.status(500).send(e.message)));router.get('/all', (req, res) => axios.get(`${BASE_URL}/all`).then(r => res.json(r.data)).catch(e => res.status(500).send(e.message)));

module.exports = router;
