
/** 绝对不允许外网反向代理到 1*** 端口，因为内部服务不作鉴权 */
export const POND_NODE_TCP_PORT = 1001

/** 切记外网反向代理到 2*** 端口 */
export const POND_NODE_HTTP_PORT = 2001