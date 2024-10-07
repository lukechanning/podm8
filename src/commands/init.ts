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

    console.log(network, userId, apiKey)
  }
}
