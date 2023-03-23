import * as EPCCGateway from '@moltin/sdk'

const gateway = EPCCGateway.gateway({
  host: 'epcc-integration.global.ssl.fastly.net',
  client_id: 'BbS7U59CUZP6mhXFXpaHPH4MCGmknZm8OsDLIiBCAg',
})

export default gateway
