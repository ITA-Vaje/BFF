// routes/vehicles.js
const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const router = express.Router();
const path = require('path');

const PROTO_PATH = path.join(__dirname, '..', 'proto', 'vehicle.proto');
const packageDef = protoLoader.loadSync(PROTO_PATH, { keepCase: true, defaults: true, oneofs: true });
const vehicleProto = grpc.loadPackageDefinition(packageDef).vehicle;

const client = new vehicleProto.VehicleService('localhost:50051', grpc.credentials.createInsecure());

router.post('/', (req, res) => {
  client.AddVehicle(req.body, (err, response) => {
    if (err) return res.status(500).send(err.message);
    res.json(response);
  });
});

router.get('/', (req, res) => {
  client.ListVehicles({}, (err, response) => {
    if (err) return res.status(500).send(err.message);
    res.json(response);
  });
});

router.get('/:id', (req, res) => {
  client.GetVehicle({ id: req.params.id }, (err, response) => {
    if (err) return res.status(500).send(err.message);
    res.json(response);
  });
});

router.put('/:id', (req, res) => {
  const request = { ...req.body, id: req.params.id };
  client.UpdateVehicle(request, (err, response) => {
    if (err) return res.status(500).send(err.message);
    res.json(response);
  });
});

router.delete('/:id', (req, res) => {
  client.DeleteVehicle({ id: req.params.id }, (err) => {
    if (err) return res.status(500).send(err.message);
    res.sendStatus(204);
  });
});

module.exports = router;
