import {MonthlyDownloadsTableEntry} from '../commands/downloads.js'
import {ShowsData} from '../commands/shows.js'
import CaptivateClient from './captivate.js'

interface Client {
  getMonthlyDownloads(showIds: string[]): Promise<MonthlyDownloadsTableEntry[]>
  getShows(): Promise<ShowsData[]>
  init: () => Promise<void>
}

const CLIENT_SWITCH: {
  [key: string]: Client
} = {
  CAPTIVATE: new CaptivateClient(),
}

export const getClient = (client: string) => CLIENT_SWITCH[client]
