const app = require("./src/app");

// Thay đổi cổng thành 3010
const PORT = process.env.PORT || 3010;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});
