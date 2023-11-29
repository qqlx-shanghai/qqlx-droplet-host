import { Module } from "@nestjs/common";

import CacheController from "./controller";

@Module({
    imports: [
    ],
    controllers: [
        CacheController
    ],
    providers: [
    ],
})
export class AppModule { }
