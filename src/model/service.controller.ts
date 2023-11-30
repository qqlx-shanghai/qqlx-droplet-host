import fs from 'fs'
import path from 'path'

import { Controller, Query, Body, Get, Patch } from "@nestjs/common";

import type { PondNode, NodeServiceName, getPondNodeServiceDto, getPondNodeServiceRes, patchPondNodeServiceDto, patchPondNodeServiceRes } from "qqlx-core";
import { POND_NODE_SERVICE_PATH, SHANGHAI_PG_SERVICE_NAME } from "qqlx-core";
import { toNumber, toString, ToResponse } from "qqlx-cdk";
import { } from "qqlx-sdk";

@Controller()
export default class {
    service_cache = new Map<string, PondNode>()

    constructor() {
        const config_file = fs.readFileSync(path.join(process.cwd(), "../qqlx-config.json"), "utf-8")
        const config = JSON.parse(config_file)

        this.service_cache.set(SHANGHAI_PG_SERVICE_NAME, {
            name: config.db_name,
            lan_ip: config.db_host,
            port: config.db_port,
            text: `${config.db_username};${config.db_passwd}`
        })
    }

    @Get(POND_NODE_SERVICE_PATH)
    @ToResponse()
    async get (@Query() query: getPondNodeServiceDto): Promise<getPondNodeServiceRes> {
        const keyword = query.keyword

        return {
            key: keyword,
            node: this.service_cache.get(keyword)
        }
    }

    @Patch(POND_NODE_SERVICE_PATH)
    @ToResponse()
    async patch (@Body() body: patchPondNodeServiceDto): Promise<patchPondNodeServiceRes> {

        const name: NodeServiceName = toString(body.key)
        if (name) {
            const node: PondNode = {
                name: name,
                lan_ip: toString(body.node.lan_ip),
                port: toNumber(body.node.port),
                text: toString(body.node.text)
            }
            this.service_cache.set(name, node)
        }

        return null
    }
}
