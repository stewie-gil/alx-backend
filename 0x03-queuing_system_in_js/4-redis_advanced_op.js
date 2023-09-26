import { createClient } from 'redis';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error(`Redis client not connect to the server: ${error}`);
});

// Create Hash
client.hset(
  'HolbertonSchools',
  'Portland',
  50,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'Seattle',
  80,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'New York',
  20,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'Bogota',
  20,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'Cali',
  40,
  redis.print
);

client.hset(
  'HolbertonSchools',
  'Paris',
  2,
  redis.print
);

// Display Hash
client.hgetall('HolbertonSchools', (error, reply) => {
  if (error) {
    console.error(`Error getting hash values: ${error}`);
  } else {
    console.log(reply);
  }
});
