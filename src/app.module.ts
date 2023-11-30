import { Module } from "@nestjs/common";

import ConfigController from "./model/config.controller";
import ServiceController from "./model/service.controller";

@Module({
    imports: [
    ],
    controllers: [
        ConfigController,
        ServiceController
    ],
    providers: [
    ],
})
export class AppModule { }
