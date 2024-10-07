import { Command } from '@oclif/core'
import { checkbox, confirm } from '@inquirer/prompts';
import cliProgress from 'cli-progress';
import CaptivateClient from '../../clients/captivate.js'

export default class Downloads extends Command {
    static override args = {}

    static override description = 'get a report of all downloads from Captivate for chosen shows'

    static override examples = []

    static override flags = {}

    public async run(): Promise<void> {
        // create a new progress bar
        const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)

        // init with the captivate client itself
        const client = new CaptivateClient()
        await client.authenticate()

        // query if the user wants to show downloads for all shows
        const allShows = await confirm({
            message: 'Would you like to get downloads for all shows?',
            default: true,
        });

        // if the user does not want to show downloads for all shows, query which shows to show downloads for
        let shows: string[] = []
        if (!allShows) {
            const allShows = await client.getShows()
            const showChoices = allShows.map((show: any) => {
                return {
                    name: show.title,
                    value: show.id,
                }
            })
            const showSelection = await checkbox({
                message: 'Select shows to get downloads for',
                choices: showChoices,
            });
            shows = showSelection
        } else {
            // get all shows from Captivate
            const allShows = await client.getShows()
            shows = allShows.map((show: any) => show.id)
        }

        // start the progress bar
        progressBar.start(100, 0)

        // use the show ids array to get the monthly downloads for each show
        const downloads = await Promise.all(shows.map((showId: string) => client.getMonthlyDownloads(showId)))
        progressBar.update(25)

        // build a table of the downloads data for all shows
        const downloadsData = downloads.map((download) => {
            const { past_12_months } = download
            return past_12_months.map((month) => {
                return {
                    month: month.x,
                    downloads: month.y,
                }
            })
        })
        progressBar.update(50)

        // reduce the table to a single array of key value pairs where the key is
        // the month and the value is the sum of downloads for all shows
        const reducedDownloads = downloadsData.reduce((acc, val) => {
            val.forEach((entry) => {
                if (acc[entry.month]) {
                    acc[entry.month] += entry.downloads
                } else {
                    acc[entry.month] = entry.downloads
                }
            })
            return acc
        }
            , {} as {
                [key: string]: number
            })
        progressBar.update(75)
        
        // format the data as a table
        const table = Object.keys(reducedDownloads).map((key) => {
            return {
                month: key,
                downloads: reducedDownloads[key],
            }
        })
        progressBar.update(100)

        // print the table
        progressBar.stop()
        console.table(table)
    }
}
