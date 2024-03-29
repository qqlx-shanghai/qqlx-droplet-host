import fs from "fs";
import path from "path";

import { Controller, Query, Body, Get, Patch } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

import type { DropletHost, getDropletHostDto, getDropletHostRes, putDropletHostDto, putDropletHostRes } from "qqlx-core";
import { PATH_DROPLET_HOST, DROPLET_SHANGHAI_POSTGRESQL } from "qqlx-core";
import { toNumber, toString, ToResponse, isValid } from "qqlx-cdk";
import { } from "qqlx-sdk";

@Controller()
export default class {
    private _cache = new Map<string, DropletHost>();

    constructor() {
        const config_file = fs.readFileSync(path.join(process.cwd(), "../qqlx-config.json"), "utf-8");
        const config = JSON.parse(config_file);

        // 服务配置
        this._cache.set(DROPLET_SHANGHAI_POSTGRESQL, {
            lan_ip: config.db_host,
            port: config.db_port,
            remark: `${config.db_name};${config.db_username};${config.db_passwd}`,
        });

        // 其他配置
        for (const key in config) {
            if (/db_/.test(key)) continue;

            const value = toString(config[key]);
            const beingValid = (isValid(key) && isValid(value))
            if (!beingValid) continue
            this._cache.set(key, {
                lan_ip: "",
                port: -1,
                remark: value,
            });
        }
    }

    @MessagePattern(`${PATH_DROPLET_HOST}/get`)
    @ToResponse()
    async get (dto: getDropletHostDto): Promise<getDropletHostRes> {
        const key = dto.key;
        const droplet = this._cache.get(key);
        if (!droplet) throw new Error(`droplet-host（404）${key}`);

        return droplet;
    }

    @MessagePattern(`${PATH_DROPLET_HOST}/put`)
    @ToResponse()
    async put (dto: putDropletHostDto): Promise<putDropletHostRes> {
        if (dto.key) {
            const droplet: DropletHost = {
                lan_ip: toString(dto.schema.lan_ip),
                port: toNumber(dto.schema.port),
                remark: toString(dto.schema.remark),
            };
            this._cache.set(dto.key, droplet);
        }

        // console.log("======")
        // for (const value of this._cache) console.log(value[0], value[1])

        return null;
    }
}
