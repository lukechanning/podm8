import { Command } from '@oclif/core'
import cliProgress from 'cli-progress';
import CaptivateClient from '../../clients/captivate.js'

export default class Shows extends Command {
  static override args = {
  }

  static override description = 'list all shows found in Captivate'

  static override examples = [
  ]

  static override flags = {
  }

  public async run(): Promise<void> {
    // create a new progress bar
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    progressBar.start(100, 0)

    // create a new CaptivateClient instance
    const client = new CaptivateClient()
    progressBar.update(25)

    // authenticate with Captivate
    await client.authenticate()
    progressBar.update(75)

    // get all shows from Captivate
    const shows = await client.getShows()
    progressBar.update(100)

    // create a table with each shows name and description
    const table = shows.map((show: any) => {
      return {
        name: show.title,
        id: show.id,
        episodes: show.episode_count,
      }
    })
    progressBar.stop()

    console.table(table)
  }
}
