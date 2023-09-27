import kue from 'kue';
import { createPushNotificationsJobs } from './8-job';

const queue = kue.createQueue();
queue.testMode.enter();

describe('createPushNotificationsJobs', () => {
  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('should create jobs in the queue', () => {
    const jobs = [
      {
        phoneNumber: '1234567890',
        message: 'Test message 1',
      },
      {
        phoneNumber: '9876543210',
        message: 'Test message 2',
      },
    ];

    createPushNotificationsJobs(jobs, queue);

    const jobCount = queue.testMode.jobs.length;
    assert.strictEqual(jobCount, jobs.length);
  });

  it('should throw an error if jobs is not an array', () => {
    const jobs = 'not_an_array';

    assert.throws(() => createPushNotificationsJobs(jobs, queue), /Jobs is not an array/);
  });
});
