import { Controller, Query, Body, Get, Patch } from "@nestjs/common";

import { PondNode, PATH_POND_NODE } from "qqlx-core";
import { toNumber, toString } from "qqlx-cdk";
import { getLocalNetworkIPs } from "qqlx-sdk";

import { POND_NODE_HTTP_PORT } from "./const";

@Controller()
export default class {
    cache = new Map<string, PondNode>()

    constructor() {
        // this._setDefaultNode()
        const ips = getLocalNetworkIPs()
        console.log("\n---- ---- ----")
        console.log(ips)
        console.log(`http service port is: ${POND_NODE_HTTP_PORT}`)
        console.log("---- ---- ---- \n")
    }

    @Get(PATH_POND_NODE)
    async get (@Query() query: Record<string, string>) {
        const keyword = query.keyword

        return this.cache.get(keyword) || null
    }

    @Patch(PATH_POND_NODE)
    async patch (@Body() body: PondNode) {

        const name = toString(body.name)
        if (name) {
            const node: PondNode = {
                name: name,
                lan_ip: toString(body.lan_ip),
                port: toNumber(body.port),
                text: toString(body.text)
            }
            this.cache.set(name, node)
        }
    }
}
