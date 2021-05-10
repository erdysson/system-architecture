import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as fs from 'fs';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        // httpsOptions: {
        //   key: fs.readFileSync(path.join(process.cwd(), 'config', 'certificate', 'localhost.key')),
        //   cert: fs.readFileSync(path.join(process.cwd(), 'config', 'certificate', 'localhost.crt'))
        // }
    });
    // cookie parser
    app.use(cookieParser());
    // todo : move to config file
    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,POST'
    });
    await app.listen(3000);
}
bootstrap();
