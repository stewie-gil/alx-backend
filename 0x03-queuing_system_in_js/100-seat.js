const express = require('express');
const { createClient } = require('redis');
const { promisify } = require('util');
const kue = require('kue');
const bodyParser = require('body-parser');

const app = express();
const port = 1245;

const client = createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error(`Redis client not connected to the server: ${error}`);
});

const queue = kue.createQueue();

// Initialize the number of available seats
setAsync('available_seats', 50)
  .then(() => {
    console.log('Number of available seats set to 50');
  })
  .catch((error) => {
    console.error(`Error setting available seats: ${error}`);
  });

let reservationEnabled = true;

app.use(bodyParser.json());

app.get('/available_seats', (req, res) => {
  getAsync('available_seats')
    .then((numberOfAvailableSeats) => {
      res.json({ numberOfAvailableSeats });
    })
    .catch((error) => {
      console.error(`Error getting available seats: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservations are blocked' });
  } else {
    const job = queue
      .create('reserve_seat', {})
      .save((error) => {
        if (!error) {
          res.json({ status: 'Reservation in process' });
        } else {
          res.json({ status: 'Reservation failed' });
        }
      });

    job.on('complete', (result) => {
      console.log(`Seat reservation job ${job.id} completed`);
    });

    job.on('failed', (errorMessage) => {
      console.error(`Seat reservation job ${job.id} failed: ${errorMessage}`);
    });
  }
});

app.get('/process', async (req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Queue processing' });
  } else {
    try {
      const currentSeats = await getAsync('available_seats');
      const newSeats = parseInt(currentSeats, 10) - 1;

      if (newSeats >= 0) {
        await setAsync('available_seats', newSeats);

        if (newSeats === 0) {
          reservationEnabled = false;
        }

        res.json({ status: 'Queue processing' });
      } else {
        throw new Error('Not enough seats available');
      }
    } catch (error) {
      console.error(`Error processing the queue: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
