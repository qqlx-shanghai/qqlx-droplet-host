import { Module } from "@nestjs/common";

import NodeTcpController from "./location/controller.tcp";

@Module({
    imports: [],
    providers: [],
    controllers: [NodeTcpController],
})
export class TcpModule {}
