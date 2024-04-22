const RedisHandler = require('../common/RedisHandler')

function rateLimiter(secondsWindow, allowedAPIHits, apiMessage){

    return async  function(req,res,next){
        const redisClient = await RedisHandler.getRedisClient()
        let ipAddress = req.headers["x-forwarded-for"]|| req.connection.remoteAddress;
        if(ipAddress.substring(0,7)==="::ffff:"){
            ipAddress = ipAddress.substring(7);
        }

        const numRequests = await redisClient.incr(ipAddress+apiMessage);
        let ttl = secondsWindow;
        if(numRequests === 1)
            await redisClient.expire(ipAddress+apiMessage,secondsWindow);
        else
             ttl = await  redisClient.ttl(ipAddress+apiMessage);
        if(numRequests > allowedAPIHits){
            return res.status(503).json({
                status: "Failure, click too frequently",
                apiMessage: apiMessage,
                callsMadeInAWindow: numRequests,
                timeLeft: ttl
            });
        }
        else{
            req.numRequests = numRequests;
            req.timeLeft = ttl;
            next();
        }
    }
}
module.exports = {
    rateLimiter
}
