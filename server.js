const app = require("./app");
const connectDB = require("./db");

const PORT = 3000;

connectDB();
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
