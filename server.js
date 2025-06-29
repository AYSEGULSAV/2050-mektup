const app = require('./app');
const mongoose = require('mongoose'); 
require('./Public/cronJob'); 

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

mongoose.connect(process.env.CONN_STR, {
  
}).then(() => {
    console.log('DB connection successful');
}).catch((err) => {
    console.log('DB connection error:', err);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server has started...");
});
