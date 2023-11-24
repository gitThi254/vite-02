const { default: mongoose } = require("mongoose");
const app = require("./app");
require("dotenv").config();

const port = process.env.PORT || 4001;

mongoose
  .connect(process.env.MONGO_URI)
  .then((conn) => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`server running at ${port}`);
    });
  })
  .catch((err) => [console.log(`DB disconnected`)]);
