import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

import { } from "qqlx-core";
import { } from "qqlx-cdk";
import { getLocalNetworkIPs } from "qqlx-sdk";

import { TcpModule } from "./tcp/module";
import { TCP_PORT } from "./tcp/module"

async function bootstrap () {

    // 对内的微服务
    const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(TcpModule, {
        transport: Transport.TCP,
        options: { host: "0.0.0.0", port: TCP_PORT },
    });
    await microservice.listen();

    // System tips
    console.log("\n");
    const ips = getLocalNetworkIPs();
    for (const ip of ips) console.log(`- ${Object.values(ip).reverse().join(".")}`);
    console.log(`\n🌸 qqlx-droplet-host at TCP/${TCP_PORT} ✔`);
}
bootstrap();
