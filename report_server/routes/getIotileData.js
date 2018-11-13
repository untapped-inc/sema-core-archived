const express = require('express');
const router = express.Router();
const iotileBaseUrl = 'https://iotile.cloud/api/v1';
const axios = require('axios');

router.get('/', async (req, res) => {
    const [err, latestFeedFlowmeterEntry] = await __hp(getLatestFeedFlowmeterEntry());

    if (err) {
        console.log(err);
        return __te(err, res, 500, {});
    }
    return res.json({
        message: latestFeedFlowmeterEntry
    })
});

// This is a hack for now, needs to figure out the values for these IDs
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

// We need the latest entry so we know where to continue gathering
// data from
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
