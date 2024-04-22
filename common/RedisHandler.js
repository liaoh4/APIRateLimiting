const redis = require("redis");

class RedisHandler{
    #redisClient

    constructor() {
        if(RedisHandler.singleInstance)
            return RedisHandler.singleInstance;
        else RedisHandler.singleInstance = this;
    }
    init = async () =>{
        if(this.#redisClient) return;
        this.#redisClient = redis.createClient();
        this.#redisClient.connect();
    }

    getRedisClient(){
        if(this.#redisClient) return this.#redisClient;
        this.#redisClient = redis.createClient();
        this.#redisClient.connect();
        return this.#redisClient;
    }

}

const redisHandlerInstance = new RedisHandler();
module.exports = redisHandlerInstance;
