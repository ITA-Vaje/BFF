// index.js
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const vehicleRoutes = require('./routes/vehicles');

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/Booking', bookingRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.get('/', (req, res) => res.send('Mobile API Gateway running'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Mobile Gateway on http://localhost:${PORT}`));
