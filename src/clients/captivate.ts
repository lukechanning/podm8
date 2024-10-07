import fs from 'fs';
import { NETWORKS } from '../constants.js';

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


}

export default CaptivateClient;