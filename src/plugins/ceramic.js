// import CeramicClient from '@ceramicnetwork/http-client'
// import { NearAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
// import * as uint8arrays from 'uint8arrays'

// REF: https://developers.ceramic.network/build/installation/
export function getConfig(env, options = {}) {
  switch (env) {
    case 'production':
    case 'testnet':
      // return 'https://gateway-clay.ceramic.network' // READ ONLY
      return 'https://ceramic-clay.3boxlabs.com' // READ, WRITE
    case 'development':
      return 'https://localhost:7007'
  }
}

export class NearSigner {
  // Pass in the keypair class
  // REF: https://near.github.io/near-api-js/classes/_utils_key_pair_.keypair.html
  constructor(nearKeyPair) {
    this.provider = nearKeyPair;
  }

  // return: Promise<{ signature: String, account: String }>
  async sign(message) {
    const { signature, publicKey } = await this.provider.sign(
      uint8arrays.fromString(message)
    );
    return {
      signature: uint8arrays.toString(signature, 'base64pad'),
      account: uint8arrays.toString(publicKey.data, 'base64pad'),
    };
  }
}

// Returns the wallet provider within the ceramic standard provider
export const getProvider = nearKeyInstance => {
  const provider = new NearSigner(nearKeyInstance);
  return new NearAuthProvider(
    provider,
    nearKeyInstance.getPublicKey().toString(),
    chainRef
  );
}

// Register Ceramic plugin with Vue
export default {
  install: async (app, { env, apiUrl }) => {
    const API_URL = apiUrl || getConfig(env || 'production')

    // Called every time blockchain authentication is complete
    app.config.globalProperties.$setCeramicProvider = async nearKeyInstance => {
      const didProvider = await getProvider(nearKeyInstance)

      // Add global context and methods for Ceramic
      app.config.globalProperties.$ceramic = new CeramicClient(API_URL)
      await app.config.globalProperties.$ceramic.setDIDProvider(didProvider)
    }
  },
}