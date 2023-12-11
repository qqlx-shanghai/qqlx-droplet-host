import fs from 'fs'
import path from 'path'

import { Controller, Query, Body, Get, Patch } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

import type { PondDroplet, getPondDropletDto, getPondDropletRes, patchPondDropletDto, patchPondDropletRes } from "qqlx-core";
import { PATH_POND_DROPLET, SHANGHAI_POSTGRESQL_DROPLET } from "qqlx-core";
import { toNumber, toString, ToResponse } from "qqlx-cdk";
import { } from "qqlx-sdk";

@Controller()
export default class {
    service_cache = new Map<string, PondDroplet>()

    constructor() {
        const config_file = fs.readFileSync(path.join(process.cwd(), "../qqlx-config.json"), "utf-8")
        const config = JSON.parse(config_file)

        this.service_cache.set(SHANGHAI_POSTGRESQL_DROPLET, {
            name: config.db_name,
            lan_ip: config.db_host,
            port: config.db_port,
            text: `${config.db_username};${config.db_passwd}`
        })
    }

    @MessagePattern(`${PATH_POND_DROPLET}/get`)
    @ToResponse()
    async get (dto: getPondDropletDto): Promise<getPondDropletRes> {
        const name = dto.name

        return {
            name: name,
            droplet: this.service_cache.get(name)
        }
    }

    @MessagePattern(`${PATH_POND_DROPLET}/patch`)
    @ToResponse()
    async patch (dto: patchPondDropletDto): Promise<patchPondDropletRes> {

        const name = toString(dto.name)
        if (name) {
            const droplet: PondDroplet = {
                name: toString(dto.droplet.name),
                lan_ip: toString(dto.droplet.lan_ip),
                port: toNumber(dto.droplet.port),
                text: toString(dto.droplet.text)
            }
            this.service_cache.set(name, droplet)
        }

        return null
    }
}
