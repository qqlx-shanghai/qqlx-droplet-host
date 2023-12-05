import fs from 'fs'
import path from 'path'

import { Controller, Query, Body, Get, Patch } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

import type { PondNode, NodeServiceName, getPondNodeServiceDto, getPondNodeServiceRes, patchPondNodeServiceDto, patchPondNodeServiceRes } from "qqlx-core";
import { POND_NODE_SERVICE_PATH, SHANGHAI_PG_SERVICE_NAME } from "qqlx-core";
import { toNumber, toString, ToResponse } from "qqlx-cdk";
import { } from "qqlx-sdk";

@Controller(POND_NODE_SERVICE_PATH)
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

    @MessagePattern("/get")
    @ToResponse()
    async get (dto: getPondNodeServiceDto): Promise<getPondNodeServiceRes> {
        const keyword = dto.keyword

        return {
            key: keyword,
            node: this.service_cache.get(keyword)
        }
    }

    @MessagePattern("/patch")
    @ToResponse()
    async patch (dto: patchPondNodeServiceDto): Promise<patchPondNodeServiceRes> {

        const name: NodeServiceName = toString(dto.key)
        if (name) {
            const node: PondNode = {
                name: name,
                lan_ip: toString(dto.node.lan_ip),
                port: toNumber(dto.node.port),
                text: toString(dto.node.text)
            }
            this.service_cache.set(name, node)
        }

        return null
    }
}
