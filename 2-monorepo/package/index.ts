import { Client } from 'pg';

let client: undefined | Client;
export default async () => {
    if (!client) {
        client = new Client({ connectionString: 'postgresql://root@host.docker.internal:5432/postgres' });
        await client.connect();
    }
    const result = await client.query('SELECT now();');
    return result.rows[0].now;
};
