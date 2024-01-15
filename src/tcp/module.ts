import { Module } from "@nestjs/common";

import NodeTcpController from "./location.controller";

export const TCP_PORT = 6001;

@Module({
    imports: [],
    providers: [],
    controllers: [NodeTcpController],
})
export class TcpModule { }
