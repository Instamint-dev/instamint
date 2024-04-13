interface connection_response_login{
    type: string
    name: string
    token: string
    abilities : string[]
    lastUseAt: string
    expiresAt: string
}

export default connection_response_login