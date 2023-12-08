import fs from 'fs'
import path from 'path'

import { Controller, Query, Body, Get, Patch } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

import type { PondDropet, getPondDropetDto, getPondDropetRes, patchPondDropetDto, patchPondDropetRes } from "qqlx-core";
import { POND_DROPET_PATH, SHANGHAI_POSTGRESQL_DROPET } from "qqlx-core";
import { toNumber, toString, ToResponse } from "qqlx-cdk";
import { } from "qqlx-sdk";

@Controller()
export default class {
    service_cache = new Map<string, PondDropet>()

    constructor() {
        const config_file = fs.readFileSync(path.join(process.cwd(), "../qqlx-config.json"), "utf-8")
        const config = JSON.parse(config_file)

        this.service_cache.set(SHANGHAI_POSTGRESQL_DROPET, {
            name: config.db_name,
            lan_ip: config.db_host,
            port: config.db_port,
            text: `${config.db_username};${config.db_passwd}`
        })
    }

    @MessagePattern(`${POND_DROPET_PATH}/get`)
    @ToResponse()
    async get (dto: getPondDropetDto): Promise<getPondDropetRes> {
        const name = dto.name

        return {
            name: name,
            dropet: this.service_cache.get(name)
        }
    }

    @MessagePattern(`${POND_DROPET_PATH}/patch`)
    @ToResponse()
    async patch (dto: patchPondDropetDto): Promise<patchPondDropetRes> {

        const name = toString(dto.name)
        if (name) {
            const dropet: PondDropet = {
                name: toString(dto.dropet.name),
                lan_ip: toString(dto.dropet.lan_ip),
                port: toNumber(dto.dropet.port),
                text: toString(dto.dropet.text)
            }
            this.service_cache.set(name, dropet)
        }

        return null
    }
}
