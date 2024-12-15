const app = require("./src/app");

// const app = require('./src/app');
// Thay đổi cổng thành 3010
const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
