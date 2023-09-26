import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.error(`Redis client not connect to the server: ${error}`);
});

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, (error, reply) => {
    if (error) {
      console.error(`Error setting value for ${schoolName}: ${error}`);
    } else {
      console.log('Reply:', reply);
    }
  });
}

async function displaySchoolValue(schoolName) {
  const getAsync = promisify(client.get).bind(client);
  try {
    const reply = await getAsync(schoolName);
    console.log(`Value for ${schoolName}: ${reply}`);
  } catch (error) {
    console.error(`Error getting value for ${schoolName}: ${error}`);
  }
}

// Usage:
displaySchoolValue('Holberton');
