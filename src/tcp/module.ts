import { Module } from "@nestjs/common";

import NodeTcpController from "./location.controller";

@Module({
    imports: [],
    providers: [],
    controllers: [NodeTcpController],
})
export class TcpModule {}
