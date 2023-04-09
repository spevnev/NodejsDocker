import express, { Request, Response } from 'express';
import { Client } from 'pg';

const app = express();

app.get('/', async (req: Request, res: Response) => {
    const client = new Client({ connectionString: 'postgresql://root@host.docker.internal:5432/postgres' });
    await client.connect();
    const result = await client.query(`SELECT NOW();`);
    res.send(result.rows[0]?.now);
});

app.listen(3000, () => console.log('Listening.'));
