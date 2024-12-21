const axios = require('axios');

const SHEET_ID = '1jSTFR5O8Vi1LYp-w02jFH_eqZtlc7W8-X5j8_H0D90k';
const RANGE = 'Test!A:E,W:X';
const API_KEY = 'AIzaSyDQLb-AtQ7sinPvUW4sc5OUsFaxKzaKMdg';
const RANGE1 = 'DS_DiemDanh_15cot!A:E'; // Cột A đến E
const RANGE2 = 'DS_DiemDanh_15cot!W:X'; // Cột W đến X

async function readGoogleSheet(req, res, next) {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values:batchGet?ranges=${RANGE1}&ranges=${RANGE2}&key=${API_KEY}`;
        
        const response = await axios.get(url);

        const data = response.data['valueRanges'];
        const dataRange1 = data[0]['values'];
        const dataRange2 = data[1]['values'];

        res.status(200).json({
            message: 'Get data success',
            data: data
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
}

module.exports = {
    readGoogleSheet
}