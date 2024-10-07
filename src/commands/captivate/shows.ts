import { Command } from '@oclif/core'
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
    // create a new CaptivateClient instance
    const client = new CaptivateClient()
    await client.authenticate()
    // get all shows from Captivate
    const shows = await client.getShows()

    // create a table with each shows name and description
    const table = shows.map((show: any) => {
      return {
        name: show.title,
        id: show.id,
        episodes: show.episode_count,
      }
    })

    console.table(table)
  }
}
