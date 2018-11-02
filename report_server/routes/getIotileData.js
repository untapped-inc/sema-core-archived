const express = require('express');
const router = express.Router();
const iotileBaseUrl = 'https://iotile.cloud/api/v1';
const axios = require('axios');

/* GET users listing. */
router.get('/', async (req, res) => {
    try {
        const user = await getUserInfo();
        return res.json({
            message: user
        });
    } catch (err) {
        console.log('error');
        console.log(err);
    }
});

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
