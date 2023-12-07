import { Module } from "@nestjs/common";

// import ConfigRestController from "./config/controller.rest";
import NodeTcpController from "./node/controller.tcp";

@Module({
    imports: [
    ],
    controllers: [
        // ConfigRestController,
        NodeTcpController
    ],
    providers: [
    ],
})
export class AppModule { }
