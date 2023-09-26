import {createClient} from 'redis';

const subscriber = createClient();
subscriber.on('connect', () => {
    console.log('Redis client connected to the server');
    
});

subscriber.on('error', (error) => {
    console.error(`Redis client not connected to the sever: ${error}`);
});
subscriber.subscribe('holbeton school channel');

subscriber.on('message', (channel, message) => {
    console.log(`Message recieved on channel ${channel} : ${message}`);
    if(message == 'KILL_SERVER'){
	console.log('Unsubscribing and quitting...');
	subscriber.unsubscribe();
	subscriber.quit();
    }
});
