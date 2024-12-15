const axios = require('axios');

const baseUrl = 'http://localhost:8088/api/v1';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// login
const getToken = async () => {
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

        const token = await getToken();

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
        const isOrder = req.body.orderByScore;
        let result = data.map(item => ({
            "no": item['STT'],
            "uid": item['Mã sinh viên'],
            "name": item['Họ'] + ' ' + item['Tên'],
            "class": item['Lớp'],
            "absences": item['Vắng'],
            "boardTimes": item['Phát biểu'],
            "totalScore": item['Tổng điểm'],
            // "totalScore": 15 - parseInt(item['Vắng']) + parseInt(item['Phát biểu']),
        }));

        if(isOrder === true){
            result.sort((a, b) => b.totalScore - a.totalScore);

            result = result.map((item, index) => ({
                top: index + 1,
                ...item,
            }));
        
            // Xoá thuộc tính "no"
            result.forEach(item => delete item.no);
        }

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