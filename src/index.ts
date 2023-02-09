import { createUnplugin } from 'unplugin'
import type { Plugin, ViteDevServer, } from 'vite';
import type { Options } from './types'
import qr from 'qrcode-terminal';
import os from "os";

export default createUnplugin<Options | undefined>(options => ({
  name: 'unplugin-starter',
  'vite': {
    'apply': 'serve',
    configureServer(server) {
      const _listen = server.listen;
      server.listen = function () {
        // eslint-disable-next-line prefer-rest-params
        const isRestart = arguments[1] === true;
        if (!isRestart) {
          server.httpServer?.on('listening', () => {
            setTimeout(() => logQrcode(server, options), 0);
          });
        }
        // @ts-ignore
        // eslint-disable-next-line prefer-rest-params
        return _listen.apply(this, arguments);
      };
    }
  },
  'webpack': (compiler) => {
    compiler.hooks.afterEmit.tapAsync('unplugin-qrcode', (compilation, callback) => {
      setTimeout(() => {
        const { options: { devServer } } = compiler;
        const ifaces = os.networkInterfaces();
        let host;
        Object.keys(ifaces).forEach(iface => {
          // @ts-ignore
          ifaces[iface].forEach(address => {
            console.log(address)
            if (address.family === 'IPv4' && !address.internal) {
              host = address.address;
            }
          });
        });
        // @ts-ignore
        const url = `http://${host}:${devServer.port}`;
        qr.generate(url, { small: true }, (result) => {
          console.log(`  ${cyan(url)}\n  ${result.replace(/\n/g, '\n  ')}`)
        })
      }, 1000);

    });
  }
}))


function logQrcode(server: ViteDevServer, options?: PluginOptions) {
  let networkUrls = server.resolvedUrls?.network;

  if (!networkUrls) return;

  if (options?.filter) {
    networkUrls = networkUrls.filter(options.filter);
  }

  if (networkUrls.length === 0) return;

  const info = server.config.logger.info;

  info('\n  Visit page on mobile:');

  for (const url of networkUrls) {
    qr.generate(url, { small: true }, (result) => {
      info(`  ${cyan(url)}\n  ${result.replace(/\n/g, '\n  ')}`);
    });
  }
}

function cyan(str: string): string {
  return `\x1b[36m${str}\x1b[0m`;
}

export interface PluginOptions {
  filter?: (url: string) => boolean;
}