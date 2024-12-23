const axios = require('axios');
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://sinhvien1.tlu.edu.vn';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

// login
const login = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/oauth/token`;

        // Mẫu body request
        // {
        //     "client_id": "education_client",
        //     "grant_type": "password",
        //     "username": "",
        //     "password": "",
        //     "client_secret": "password"
        // }

        // Dữ liệu gửi đi từ body của client
        const requestData = req.body;

        // Gửi yêu cầu POST đến API
        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Trả kết quả từ API cho client
        res.status(200).json({
            message: 'Get token success',
            token: `Bearer ${response.data['access_token']}`,
            // data: response.data
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message,
        });
    }
};

const getCurrentStudent = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/api/users/getCurrentUser`;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token
            },
        });

        const data = response.data;
        const result = {
            "displayName": data['displayName'],
            "username": data['username'],
            "email": data['email'],
            "birthPlace": data['birthPlace'],
            "birthDate": data['person']['birthDateString'],
            "phoneNumber": data['person']['phoneNumber'],
            "idNumber": data['person']['idNumber']
        };

        res.status(200).json({
            message: 'Get current user success',
            data: result,
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const getListMarkDetail = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/api/studentsubjectmark/getListMarkDetailStudent`;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token
            },
        });

        const result = response.data.map(item => {
            return {
                subjectName: item['subject']['subjectName'],
                mark: item['mark'],
                mark4: item['mark4'],
                charmark: item['charMark']
            };
        });

        res.status(200).json({
            message: 'Get list mark success',
            data: result
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const getSummaryMark = async (req, res, next) => {
    try {
        const apiUrl = `${baseUrl}/education/api/studentsummarymark/getbystudent`;

        const token = req.headers.authorization;

        if (!token) {
            return res.status(400).json({
                message: 'Authorization token is required',
            });
        }

        const response = await axios.get(apiUrl, {
            headers: {
                'Authorization': token
            },
        });

        const data = response.data;
        const result = {
            "uid": data['student']['studentCode'],
            "displayName": data['student']['displayName'],
            "username": data['student']['username'],
            "email": data['student']['user']['email'],
            "birthPlace": data['student']['birthPlace'],
            "birthDate": data['student']['birthDateString'],
            "gender": data['student']['gender'],
            "phoneNumber": data['student']['phoneNumber'],
            "idNumber": data['student']['idNumber'],
            "class": data['student']['enrollmentClass']['className'],
            "speciality": data['student']['enrollmentClass']['speciality']['name'],
            "department": data['student']['enrollmentClass']['department']['name'],
            "courseyear": data['student']['enrollmentClass']['courseyear']['name'],
            "gpa4": data['mark4'],
            "gpa10": data['mark']
        };

        // const isSaved = await saveToJson(result);
        // if(!isSaved){
        //     res.status(500).json({
        //         message: 'Save data backup error',
        //         data: []
        //     });
        //     return;
        // }

        res.status(200).json({
            message: 'Get student info success',
            data: result
        });
    } catch (error) {
        res.status(error.response?.status || 500).json({
            message: error.message
        });
    }
};

const saveToJson = async (data) => {
    try {
        const filePath = path.resolve(__dirname, '../data/backup.json');
        // const dirPath = path.dirname(filePath);

        if (!fs.existsSync(filePath)) {
            await fs.promises.writeFile(filePath, JSON.stringify([], null, 2), 'utf8');
        }

        const fileContent = await fs.promises.readFile(filePath, 'utf8');
        const dataList = JSON.parse(fileContent);

        dataList.push(data);

        await fs.promises.writeFile(filePath, JSON.stringify(dataList, null, 2), 'utf8');
        // console.log(`Dữ liệu đã được lưu vào file ${filePath}`);
        return true;
    } catch (err) {
        // console.error('Lỗi khi lưu file JSON:', err.message);
        return false;
    }
}

const isExisted = async (uid) => {
    const filePath = path.resolve(__dirname, '../data/backup.json');

    if (!fs.existsSync(filePath)) {
        await fs.promises.writeFile(filePath, JSON.stringify([], null, 2), 'utf8');
    }

    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);

    return data.some(element => element.uid === uid);
}

module.exports = {
    login,
    getCurrentStudent,
    getListMarkDetail,
    getSummaryMark
};