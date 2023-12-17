import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import {} from "qqlx-core";
import {} from "qqlx-cdk";
import { getLocalNetworkIPs } from "qqlx-sdk";

import { TcpModule } from "./tcp/module";

async function bootstrap() {
    const TCP_PORT = 1001;
    const HTTP_PORT = 2001;

    // 对内的微服务
    const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(TcpModule, {
        transport: Transport.TCP,
        options: { host: "0.0.0.0", port: TCP_PORT },
    });
    await microservice.listen();

    // System tips
    console.log("\n---- ---- ---- main.ts");
    const ips = getLocalNetworkIPs();
    for (const ip of ips) console.log(`qqlx-droplet-location:ip: ${Object.values(ip).reverse().join(".")}`);
    console.log(`qqlx-droplet-location:tcp: ${TCP_PORT}`);
    console.log(`qqlx-droplet-location:http: ${HTTP_PORT}`);
    console.log("---- ---- ---- \nrunning success!");
}
bootstrap();
