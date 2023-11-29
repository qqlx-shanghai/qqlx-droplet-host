import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { } from "qqlx-core";
import { toNumber, toString, toBoolean } from "qqlx-cdk";

import { AppModule } from "./app.module";
import { POND_NODE_TCP_PORT, POND_NODE_HTTP_PORT } from "./const"


async function bootstrap () {
    // 创建基于 TCP 协议的微服务
    // const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    //     transport: Transport.TCP,
    //     options: { host: "0.0.0.0", port: POND_NODE_TCP_PORT },
    // });
    // await microservice.listen();

    // 启动 RESTful API
    const app = await NestFactory.create(AppModule);
    await app.listen(POND_NODE_HTTP_PORT);
}
bootstrap();
