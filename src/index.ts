import os from 'os'
import type { AddressInfo } from 'net'
import qr from 'qrcode-terminal'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

const PLUGIN_NAME = 'unplugin-qrcode'
function cyan(str: string): string {
  return `\x1b[36m${str}\x1b[0m`;
}

async function getLocalIpV4() {
  return new Promise((resolve) => {
    const ifaces = os.networkInterfaces()
    let host

    Object.keys(ifaces).forEach((iface) => {
      // @ts-expect-error
      ifaces[iface].forEach((address) => {
        if (address.family === 'IPv4' && !address.internal)
          host = address.address
      })
    })

    resolve(host)
  })
}

async function renderUrl(port: number) {
  const host = await getLocalIpV4()
  if (host) {
    const url = `http://${host}:${port}`
    qr.generate(url, { small: true },(result) =>{
      console.log(`  ${cyan(url)}\n  ${result.replace(/\n/g, '\n  ')}`)
    })
  }
}

export default createUnplugin<Options | undefined>(() => ({
  name: 'PLUGIN_NAME',
  vite: {
    apply: 'serve',
    configureServer(server) {
      server.httpServer?.on('listening', () => {
        setTimeout(() => {
          const resp = server.httpServer?.address() as AddressInfo
          if (resp && resp.port)
            renderUrl(resp.port)
        }, 0)
      })
    },
  },
  webpack: (compiler) => {
    compiler.hooks.afterEmit.tapAsync(PLUGIN_NAME, () => {
      setTimeout(() => {
        const {
          options: { devServer },
        } = compiler
        if (devServer && devServer.port)
          renderUrl(devServer.port)
      }, 0)
    })
  },
}))
