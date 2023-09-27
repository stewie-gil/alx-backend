import {createClient} from 'redis';

const client = createClient();

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

client.on('error', (error) => {
    console.error(`Redis client not connect to the server: ${error}`);
});

function setNewSchool(schoolName, value){
    client.set(schoolName, value, (error, reply) => {
	if(error){
	    console.error(`Error setting value for ${schoolName}: ${error}`);
	} else {
	    console.log('Reply:', reply);
	}
    });
}

function displaySchoolValue(schoolName){
    client.get(schoolName, (error, reply) => {
	if(error){
	    throw  error);
	} else {

	    console.log(reply);
	}

    });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
