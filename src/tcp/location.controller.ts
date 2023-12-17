import fs from "fs";
import path from "path";

import { Controller, Query, Body, Get, Patch } from "@nestjs/common";
import { EventPattern, MessagePattern } from "@nestjs/microservices";

import type { DropletLocation, getDropletLocationDto, getDropletLocationRes, patchDropletLocationDto, patchDropletLocationRes } from "qqlx-core";
import { PATH_DROPLET_LOCATION, SHANGHAI_POSTGRESQL_DROPLET } from "qqlx-core";
import { toNumber, toString, ToResponse, isValid } from "qqlx-cdk";
import {} from "qqlx-sdk";

@Controller()
export default class {
    private _cache = new Map<string, DropletLocation>();

    constructor() {
        const config_file = fs.readFileSync(path.join(process.cwd(), "../qqlx-config.json"), "utf-8");
        const config = JSON.parse(config_file);

        // 服务配置
        this._cache.set(SHANGHAI_POSTGRESQL_DROPLET, {
            lan_ip: config.db_host,
            port: config.db_port,
            remark: `${config.db_name};${config.db_username};${config.db_passwd}`,
        });

        // 其他配置
        for (const key in config) {
            if (/db_/.test(key)) continue;

            const value = toString(config[key]);
            if (isValid(key) && isValid(value)) {
                this._cache.set(key, {
                    lan_ip: "",
                    port: -1,
                    remark: value,
                });
            }
        }
    }

    @MessagePattern(`${PATH_DROPLET_LOCATION}/get`)
    @ToResponse()
    async get(dto: getDropletLocationDto): Promise<getDropletLocationRes> {
        const key = dto.key;
        const droplet = this._cache.get(key);
        if (!droplet) throw new Error(`droplet-location: can not find droplet by ${key}`);

        return { droplet };
    }

    @MessagePattern(`${PATH_DROPLET_LOCATION}/patch`)
    @ToResponse()
    async patch(dto: patchDropletLocationDto): Promise<patchDropletLocationRes> {
        if (dto.key) {
            const droplet: DropletLocation = {
                lan_ip: toString(dto.droplet.lan_ip),
                port: toNumber(dto.droplet.port),
                remark: toString(dto.droplet.remark),
            };
            this._cache.set(dto.key, droplet);
        }

        return null;
    }
}
