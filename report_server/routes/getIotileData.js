const express = require('express');
const router = express.Router();
const iotileBaseUrl = 'https://iotile.cloud/api/v1';
const axios = require('axios');

const sample_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0ODQsInVzZXJuYW1lIjoidW50YXBwZWQiLCJleHAiOjE1NDI4MzM5OTEsImVtYWlsIjoiamltQHVudGFwcGVkLWluYy5jb20iLCJvcmlnX2lhdCI6MTU0MjIyOTE5MX0.lauApXJs2oG8yeG5yu4qxatEzDDKEH0vPOVLEaR2g1c";

// This is a hack for now, needs to figure out the values for these IDs
// TODO: Submit a proposal on adding a `slug` field to most tables so we can have some default
// slugs and keep the SQL queries simple
const latestFeedFlowmeterEntryQuery = `SELECT 
    *
FROM
    reading
WHERE
    kiosk_id = 1 AND parameter_id = 13
        AND sampling_site_id = 2
ORDER BY id DESC
LIMIT 1;
`;

router.get('/', async (req, res) => {
    // const [err, lastSyncDate] = await __hp(getLatestFeedFlowmeterEntry());
    // TODO: save the received token to local storage and check its validity before calling for
    // a new one. Using a sample token for now to make development fast.
    // const [err2, {token}] = await __hp(getIotileToken());
    const [err, feedFlowMeterData] = await __hp(getFeedFlowMeterData(sample_token, '2018-10-21T00:44:58Z'));

    // TODO: Properly handle errors
    // if (err) {
    //     return __te(err, res, 500,
    //         {
    //             error: 'Something wrong happened during login to the IoTile API.'
    //         }
    //     );
    // }

    return res.json({
        feedFlowMeterData
    })
});

// We need the latest entry so we know where to continue gathering
// data from. If there is none, it returns null
const getLatestFeedFlowmeterEntry = () => {
    return new Promise((resolve, reject) => {
        __pool.getConnection(async (err, connection) => {
            connection.query(latestFeedFlowmeterEntryQuery, (err, result) => {
                if (err) return reject(err);
                if (Array.isArray(result) && result.length > 0) {
                    return resolve(result);
                } else {
                    return resolve(null);
                }
            });
        });
    });
}

// Get the token using the credentials in the .env file
const getIotileToken = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${iotileBaseUrl}/auth/api-jwt-auth/`, {
                username: process.env.IOTILE_USERNAME,
                password: process.env.IOTILE_PASSWORD
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Pull stream data from their server using the token received during login
// And the latest feed flow meter entry date
const getFeedFlowMeterData = (token, lastSyncDate) => {
    const feedStreamId = process.env.IOTILE_FEED_FLOWMETER_STREAM_ID;
    const axiosOptions = {
        headers: {
            Authorization: `JWT ${token}`,
            'Content-Type': 'application/json'
        }
    };

    if (lastSyncDate) {
        axiosOptions['params'] = {
            start: lastSyncDate
        };
    }

    return new Promise((resolve, reject) => {
        axios.get(`${iotileBaseUrl}/stream/${feedStreamId}/data/`, axiosOptions)
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// Enter the data received from their server into the SEMA schema

const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        axios.post(`${iotileBaseUrl}/auth/login/`, {
                email: process.env.IOTILE_EMAIL,
                password: process.env.IOTILE_PASSWORD
            })
            .then(result => {
                resolve(result.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = router;
