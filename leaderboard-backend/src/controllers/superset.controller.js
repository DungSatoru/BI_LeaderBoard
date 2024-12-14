const axios = require('axios');

// http://localhost:8088/api/v1/chart/121/data/
const baseUrl = 'http://localhost:8088/api/v1';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// login
const login = async () => {
    try {
        const apiUrl = `${baseUrl}/security/login`;

        const requestData = {
            "password": "admin",
            "provider": "db",
            "refresh": true,
            "username": "admin"
        };

        // Gửi yêu cầu POST đến API
        const response = await axios.post(apiUrl, requestData);

        return response.data['access_token']
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
};

const getDataSheet = async () => {
    try {
        const apiUrl = `${baseUrl}/chart/161/data/`;

        const token = await login();

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': 'Bearer ' + token
            },
        });

        const data = response.data['result'][0]['data']

        // res.status(200).json({
        //     message: 'Get data success',
        //     data: data
        // });
        return data;
    } catch (error) {
        // res.status(error.response?.status || 500).json({
        //     message: error,
        // });
        return [];
    }
};

const leaderBoard = async (req, res, next) => {
    try {
        const data = await getDataSheet();
        const result = data.map(item => ({
            "no": item['STT'],
            "uid": item['Mã sinh viên'],
            "name": item['Họ'] + ' ' + item['Tên'],
            "class": item['Lớp'],
            "absences": item['Vắng'],
            "boardTimes": item['Phát biểu'],
            "totalScore": 15 - parseInt(item['Vắng']) + parseInt(item['Phát biểu']),
        }));

        res.status(200).json({
            message: 'Get info leader success',
            data: result
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error,
        });
    }
};

module.exports = {
    getDataSheet,
    leaderBoard
}