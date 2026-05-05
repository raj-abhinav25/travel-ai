const { CloudantV1 } = require('@ibm-cloud/cloudant');
const { IamAuthenticator } = require('ibm-cloud-sdk-core');

const client = CloudantV1.newInstance({
  authenticator: new IamAuthenticator({
    apikey: process.env.CLOUDANT_APIKEY
  }),
  serviceUrl: process.env.CLOUDANT_URL
});

const USERS_DB = 'users';
const TRIPS_DB = 'trips';

async function initDatabases() {
  // Create users DB
  try {
    await client.putDatabase({ db: USERS_DB });
    console.log('Users DB created');
  } catch (err) {
    if (err.status === 412) console.log('Users DB already exists');
  }

  // Create trips DB
  try {
    await client.putDatabase({ db: TRIPS_DB });
    console.log('Trips DB created');
  } catch (err) {
    if (err.status === 412) console.log('Trips DB already exists');
  }

  // ✅ Combined index for userId AND createdAt
  try {
    await client.postIndex({
      db: TRIPS_DB,
      index: {
        fields: ['userId', 'createdAt']
      },
      name: 'userId-createdAt-index',
      type: 'json'
    });
    console.log('userId-createdAt index created');
  } catch (err) {
    console.log('Index error:', err.message);
  }
}

// ✅ module.exports at the BOTTOM after everything
module.exports = { client, USERS_DB, TRIPS_DB, initDatabases };