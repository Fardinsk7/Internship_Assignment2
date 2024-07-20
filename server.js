const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 7000;

//Initializing Express app
const app = express();

//Launching initial Middlewares
app.use(express.json());
app.disable('x-powered-by')//A Security Practice, avoid hackers

//Declaring all routes
app.use('/api', require("./routes/register"))
app.use('/api', require("./routes/requestOtp"))
app.use('/api', require("./routes/verifyOtp"))


//Demo route for checking
app.get("/", (req, res) => {
    res.send("Demo Endpoint");
})

//******Here is normal http server without encrption*******
// app.listen(port,()=>{
//     console.log(`Server listening on http://localhost:${port}`);
// })


//******Develop https server using self signed certificates*****
//******Note: since it is self signed to enable encryption browser would not consider it as secure becuause it trust only to verified set of signed certificate thus it is only for development process */
const options = {
    key: fs.readFileSync(path.join(__dirname, './ecdsa.key')),
    cert:fs.readFileSync(path.join(__dirname, './ecdsa.crt')),
}

const server = https.createServer(options,app).listen(port, () => {
    console.log(`Server listening on https://localhost:${port}`);
});

server.on('error',(err)=>{
    console.error('Server Error: ',err);
})
