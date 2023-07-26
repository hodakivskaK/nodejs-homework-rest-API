const app = require('./app')
const mongoose = require("mongoose")

const { DB_HOST, PORT = 3001 } = process.env;

mongoose.connect(DB_HOST)
  .then(() =>app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3001")
  }))
  .then(() => console.log("Database connection successful"))
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })

