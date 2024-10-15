/* eslint-disable camelcase */
/* eslint-disable unicorn/no-array-reduce */
import {MonthlyDownloadsTableEntry} from '../commands/downloads.js'
import {ShowsData} from '../commands/shows.js'

interface DownloadsData {
  past_12_months: [
    {
      x: string
      y: number
    },
  ]
}

class CaptivateClient {
  private apiKey: string
  private apiUrl: string = 'https://api.captivate.fm'
  private token: string = ''
  private userId: string

  constructor(apiKey: string, userId: string) {
    this.userId = userId
    this.apiKey = apiKey
  }

  public async getMonthlyDownloads(showIds: string[]): Promise<MonthlyDownloadsTableEntry[]> {
    // use the show ids array to get the monthly downloads for each show
    const downloads = await Promise.all(
      showIds.map((showId: string) =>
        this.api<DownloadsData>(`${this.apiUrl}/insights/${showId}/monthly`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        }),
      ),
    )

    // build a table of the downloads data for all shows
    const downloadsData = downloads.map((download) => {
      const {past_12_months} = download
      return past_12_months.map((month) => ({
        downloads: month.y,
        month: month.x,
      }))
    })

    // reduce the table to a single array of key value pairs where the key is
    // the month and the value is the sum of downloads for all shows
    const reducedDownloads = downloadsData.reduce(
      (acc, val) => {
        for (const entry of val) {
          if (acc[entry.month]) {
            acc[entry.month] += entry.downloads
          } else {
            acc[entry.month] = entry.downloads
          }
        }

        return acc
      },
      {} as {
        [key: string]: number
      },
    )

    // format the data as a table
    const table = Object.keys(reducedDownloads).map((key, i) => ({
      month: key,
      // eslint-disable-next-line perfectionist/sort-objects
      downloads: reducedDownloads[key],
      // produce a percent change from the previous month
      percentChange: Math.round(
        (i === 0
          ? 0
          : (reducedDownloads[key] - reducedDownloads[Object.keys(reducedDownloads)[i - 1]]) /
            reducedDownloads[Object.keys(reducedDownloads)[i - 1]]) * 100,
      ),
    })) as MonthlyDownloadsTableEntry[]

    // return the table
    return table
  }

  public async getShows(): Promise<ShowsData[]> {
    const allShows = await this.api<{
      shows: {
        episode_count: number
        id: string
        title: string
      }[]
    }>(`${this.apiUrl}/users/${this.userId}/shows`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
    const formattedShows = allShows.shows.map((show) => ({
      title: show.title,
      // eslint-disable-next-line perfectionist/sort-objects
      id: show.id,
      // eslint-disable-next-line perfectionist/sort-objects
      episodesCount: show.episode_count,
    }))
    return formattedShows
  }

  public async init(): Promise<void> {
    await this.authenticate()
  }

  private async api<T>(url: string, options: RequestInit): Promise<T> {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json() as Promise<T>
  }

  private async authenticate(): Promise<void> {
    const response = await fetch(`${this.apiUrl}/authenticate/token`, {
      body: JSON.stringify({
        token: this.apiKey,
        username: this.userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const data = await response.json()
    this.token = data.user.token
  }
}

export default CaptivateClient
