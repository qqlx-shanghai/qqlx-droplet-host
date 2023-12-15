import { Module } from "@nestjs/common";

import NodeTcpController from "./node/controller.tcp";

@Module({
    imports: [
    ],
    providers: [
    ],
    controllers: [
        NodeTcpController
    ],
})
export class TcpModule { }
