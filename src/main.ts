import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { } from "qqlx-core";
import { } from "qqlx-cdk";
import { getLocalNetworkIPs } from "qqlx-sdk";

import { TcpModule } from "./tcp/module";

async function bootstrap () {
    const TCP_PORT = 1001;
    const HTTP_PORT = 2001;

    // 对内的微服务
    const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(TcpModule, {
        transport: Transport.TCP,
        options: { host: "0.0.0.0", port: TCP_PORT },
    });
    await microservice.listen();

    // System tips
    console.log("\n---- ---- ---- main.ts / qqlx-droplet-host");
    const ips = getLocalNetworkIPs();
    for (const ip of ips) console.log(`${Object.values(ip).reverse().join(".")}`);
    console.log(`tcp: ${TCP_PORT}`);
    console.log(`http: ${HTTP_PORT}`);
    console.log("---- ---- ---- success!");
}
bootstrap();
