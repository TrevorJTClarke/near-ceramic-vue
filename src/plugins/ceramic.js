import CeramicClient from '@ceramicnetwork/http-client'

// REF: https://developers.ceramic.network/build/installation/
export function getConfig(env, options = {}) {
  const config = {
    ...options,
    appTitle: options.appTitle || 'NEAR',
    contractName: options.contractName || 'test.near',
  }

  switch (env) {
    case 'production':
    case 'testnet':
      // return 'https://gateway-clay.ceramic.network' // READ ONLY
      return 'https://ceramic-clay.3boxlabs.com' // READ, WRITE
    case 'development':
      return 'https://localhost:7007'
  }
}

// Register Ceramic plugin with Vue
export default {
  install: async ({ env, apiUrl }) => {
    const API_URL = apiUrl || getConfig(env || 'production')
    // Add global context and methods for Ceramic
    app.config.globalProperties.$ceramic = new CeramicClient(API_URL)

    // enable re-instantiation
    app.config.globalProperties.$ceramicInit = () => {
      app.config.globalProperties.$ceramic = new CeramicClient(API_URL)
    }

    // TODO: Add convenience methods for VUEX
  },
}