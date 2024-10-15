import fs from 'node:fs'

import {NETWORKS} from '../constants.js'
import CaptivateClient from './captivate.js'

const CLIENT_SWITCH: {
  [x: string]: typeof CaptivateClient
} = {
  [NETWORKS.Captivate]: CaptivateClient,
}

export const getClient = (client: string) => {
  // read the configuration file and get the client configuration
  const config = JSON.parse(fs.readFileSync(`${process.env.HOME}/.podm8rc`).toString())
  const {configurations, defaultNetwork} = config
  const {apiKey, userId} = configurations[defaultNetwork]

  const SelectedClient = CLIENT_SWITCH[client]
  return new SelectedClient(apiKey, userId)
}
