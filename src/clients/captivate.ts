import fs from 'fs';
import { NETWORKS } from '../constants.js';

interface DownloadsData {
    past_12_months: [
        {
            x: string,
            y: number,
        }
    ]
}

class CaptivateClient {
    private apiUrl: string = 'https://api.captivate.fm';
    private userId: string;
    private apiKey: string;
    private token: string = '';

    constructor() {
        const config = JSON.parse(fs.readFileSync(`${process.env.HOME}/.podm8rc`).toString());
        const captivateConfig = config.find((c: any) => c.network === NETWORKS.Captivate);
        const { userId, apiKey } = captivateConfig;
        this.userId = userId;
        this.apiKey = apiKey;
    }

    public async authenticate(): Promise<void> {
        const response = await fetch(`${this.apiUrl}/authenticate/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.userId,
                token: this.apiKey,
            }),
        });
        const data = await response.json();
        this.token = data.user.token;
    }

    public async getShows(): Promise<[]> {
        const response = await fetch(`${this.apiUrl}/users/${this.userId}/shows`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        const data = await response.json();
        return data.shows;
    }

    public async getMonthlyDownloads(showId: string): Promise<DownloadsData> {
        const response = await fetch(`${this.apiUrl}/insights/${showId}/monthly`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        const data = await response.json();
        return data;
    }
}

export default CaptivateClient;