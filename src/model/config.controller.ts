import { Controller, Query, Body, Get, Patch } from "@nestjs/common";

import type { PondNode, JSONStr, getPondNodeConfigDto, getPondNodeConfigRes, patchPondNodeConfigDto, patchPondNodeConfigRes } from "qqlx-core";
import { POND_NODE_CONFIG_PATH, SHANGHAI_PG_SERVICE_NAME } from "qqlx-core";
import { toNumber, toString, ToResponse } from "qqlx-cdk";
import { } from "qqlx-sdk";

@Controller()
export default class {
    config_cache = new Map<string, JSONStr>()

    constructor() {
    }

    @Get(POND_NODE_CONFIG_PATH)
    @ToResponse()
    async get (@Query() query: getPondNodeConfigDto): Promise<getPondNodeConfigRes> {
        const keyword = query.keyword

        return {
            key: keyword,
            value: this.config_cache.get(keyword)
        }
    }

    @Patch(POND_NODE_CONFIG_PATH)
    @ToResponse()
    async patch (@Body() body: patchPondNodeConfigDto): Promise<patchPondNodeConfigRes> {
        this.config_cache.set(body.key, body.value)

        return null
    }
}
