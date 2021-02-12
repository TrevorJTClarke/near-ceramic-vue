import vue from '@vitejs/plugin-vue'

// export default {
//   plugins: [vue()],
//   optimizeDeps: {
//     exclude: [
//       // '@ceramicnetwork/http-client',
//       // '@ceramicnetwork/blockchain-utils-linking',
//       // 'uint8arrays',
//     ],
//   },
// }

import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

export default {
  plugins: [vue()],
  // minify: false,
  // sourcemap: true,
  optimizeDeps: {
    exclude: [
    '@ceramicnetwork/http-client',
    '@ceramicnetwork/blockchain-utils-linking',
    'uint8arrays',
    ],
  },
  rollupInputOptions: {
    pluginsOptimizer: [globals(), insertBuiltinsPlugin()],
  },
};

function insertBuiltinsPlugin() {
  return {
    name: 'creaton:insert-builtins-plugin',
    options(options) {
      const plugins = options.plugins
      const idx = plugins.findIndex((plugin) => plugin.name === 'node-resolve')
      plugins.splice(idx, 0, builtins({ crypto: true, stream: true, fs: 'empty', net: 'empty' }))
      return options
    },
  }
}