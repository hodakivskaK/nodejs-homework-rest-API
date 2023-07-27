const app = require('./app')
const mongoose = require("mongoose")

const { DB_HOST, PORT = 3001 } = process.env;

mongoose.connect(DB_HOST)
  .then(() =>app.listen(PORT, () => {
  console.log("Server running. Use our API on port: 3001")
<<<<<<< HEAD
  }))
  .then(() => console.log("Database connection successful"))
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })
=======

})


>>>>>>> e9e67de8b9b0dab1dab6b37e2a979045c8c08c85

