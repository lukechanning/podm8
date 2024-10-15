import {Command} from '@oclif/core'
import {Presets, SingleBar} from 'cli-progress'

import {getClient} from '../clients/switch.js'

export interface ShowsData {
  episodesCount: number
  id: string
  title: string
}

export default class Shows extends Command {
  static override args = {}

  static override description = 'list all shows found in Captivate'

  static override examples = []

  static override flags = {}

  public async run(): Promise<void> {
    // create a new progress bar
    const progressBar = new SingleBar({}, Presets.shades_classic)
    progressBar.start(100, 0)

    // create a new client instance and initialize it
    const client = getClient('CAPTIVATE')
    await client.init()
    progressBar.update(25)

    // get all shows from Captivate
    const shows = await client.getShows()
    progressBar.update(100)

    // create a table with each shows name and description
    progressBar.stop()

    console.table(shows)
  }
}
