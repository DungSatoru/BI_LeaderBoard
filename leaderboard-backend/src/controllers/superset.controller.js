const axios = require('axios');

// const baseUrl = 'http://localhost:8088/api/v1';
const baseUrl = 'http://ec2-54-209-229-214.compute-1.amazonaws.com:8088/api/v1';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// login
const getToken = async () => {
    try {
        const apiUrl = `${baseUrl}/security/login`;

        const requestData = {
            "password": "tuan2106",
            "provider": "db",
            "refresh": true,
            "username": "realtun"
        };

        // Gửi yêu cầu POST đến API
        const response = await axios.post(apiUrl, requestData);

        return response.data['access_token']
    } catch (error) {
        return null;
    }
};

const getDataSheet = async () => {
    try {
        const apiUrl = `${baseUrl}/chart/1/data/`;

        const token = await getToken();

        if (!token) {
            return [];
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
        const isOrder = req.query.orderByScore === "true";
        
        let result = data.map(item => ({
            "no": item['STT'],
            "uid": item['Mã sinh viên'],
            "name": item['Họ'] + ' ' + item['Tên'],
            "class": item['Lớp'],
            "cluster": item['Cụm'],
            "group": item['Nhóm'],
            "absences": item['Vắng'],
            "boardTimes": item['Phát biểu'],
            "totalScore": item['Tổng điểm']
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