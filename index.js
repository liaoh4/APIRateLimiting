const express = require("express");
const {rateLimiter} = require("./middleware/RateLimiter")
const RedisHandler = require("./common/RedisHandler")

const app = express();

app.use(express.static(__dirname));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");

});



app.get("/api-one",rateLimiter(10,5,"API 1"),async (req,res) =>{
    return res.json({
        status: "Success",
        apiMessage: "API 1",
        callsMadeInAWindow: req.numRequests,
        timeLeft: req.timeLeft
    })
});

// Using the express object, handle the default '/api-two' route for GET requests
app.get("/api-two", rateLimiter(4, 1, "API 2"), async (req, res) => {

    // Business logic can be executed here

    return res.json({
        status: "Success",
        apiMessage: "API 2",
        callsMadeInAWindow: req.numRequests,
        timeLeft: req.timeLeft,
    });
});

// Using the express object, handle the default '/api-three' route for GET requests
app.get("/api-three", rateLimiter(5, 3, "API 3"), async (req, res) => {

    // Business logic can be executed here

    return res.json({
        status: "Success",
        apiMessage: "API 3",
        callsMadeInAWindow: req.numRequests,
        timeLeft: req.timeLeft,
    });
});

// Using the express object, handle the default '/api-four' route for GET requests
app.get("/api-four", rateLimiter(20, 10, "API 4"), async (req, res) => {

    // Business logic can be executed here

    return res.json({
        status: "Success",
        apiMessage: "API 4",
        callsMadeInAWindow: req.numRequests,
        timeLeft: req.timeLeft,
    });
});

// Using the express object to listen to port 8000 for incoming requests
app.listen(8000, async () => {
    await RedisHandler.init()
    console.log("The App is listening on port 8000!");
});

