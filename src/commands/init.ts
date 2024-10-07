import fs from 'fs'
import { Args, Command } from '@oclif/core'
import { input, select } from '@inquirer/prompts'
import { NETWORKS } from '../constants.js'

export default class Init extends Command {
  static override args = {
    file: Args.string({ description: 'file to read' }),
  }

  static override description = 'setup podm8 with your network and project details'

  static override examples = []

  static override flags = {}

  public async run(): Promise<void> {
    // determine what network to configure
    const network = await select({
      message: 'Select the network to configure',
      choices: [
        { name: 'Captivate.fm', value: NETWORKS.Captivate },
      ],
    })
    // gather network API user id
    const userId = await input({
      message: 'Enter your network API user id',
    })
    // gather network API key
    const apiKey = await input({
      message: 'Enter your network API key',
    })

    const JSON_CONFIG = [
      {
        network,
        userId,
        apiKey,
      }
    ]

    try {
      // write a .podm8rc file with the network, userId, and apiKey values
      // to the user's home directory (e.g. ~/.podm8rc)
      fs.writeFileSync(`${process.env.HOME}/.podm8rc`, JSON.stringify(JSON_CONFIG, null, 2))

      console.log('> Configuration saved successfully!')
    } catch (error) {
      console.error('Error saving configuration:', error)
    }
  }
}
