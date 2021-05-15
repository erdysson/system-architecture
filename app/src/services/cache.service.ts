import {promisify} from 'util';

import {Injectable} from '@nestjs/common';
import {createClient, RedisClient} from 'redis';

@Injectable()
export class CacheService {
    private readonly cache: RedisClient;

    readonly getAsync: (key: string) => Promise<string>;

    readonly setAsync: (key: string, value: string) => Promise<string>;

    constructor() {
        this.cache = createClient({
            url: process.env.REDIS_URL
        });

        this.getAsync = promisify(this.cache.get).bind(this.cache);
        this.setAsync = promisify(this.cache.set).bind(this.cache);
    }
}
