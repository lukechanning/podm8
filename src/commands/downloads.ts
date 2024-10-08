import {checkbox, confirm} from '@inquirer/prompts'
import {Command} from '@oclif/core'

import {getClient} from '../clients/switch.js'

export interface MonthlyDownloadsTableEntry {
  downloads: number
  month: string
}

export default class Downloads extends Command {
  static override args = {}

  static override description = 'get a report of all downloads from Captivate for chosen shows'

  static override examples = []

  static override flags = {}

  public async run(): Promise<void> {
    // initialize the current client
    const client = getClient('CAPTIVATE')
    await client.init()

    // query if the user wants to show downloads for all shows
    const allShows = await confirm({
      default: true,
      message: 'Would you like to get downloads for all shows?',
    })

    // if the user does not want to show downloads for all shows, query which shows to show downloads for
    let shows: string[] = []
    if (allShows) {
      // get all shows from Captivate
      const allShows = await client.getShows()
      shows = allShows.map((show) => show.id)
    } else {
      const showChoices = await client.getShows()
      const showSelection = await checkbox({
        choices: showChoices.map((show) => ({
          name: show.title,
          value: show.id,
        })),
        message: 'Select shows to get downloads for',
      })
      shows = showSelection
    }

    // get the monthly downloads for the selected shows
    const downloads = await client.getMonthlyDownloads(shows)

    // print the table
    console.table(downloads)
  }
}
