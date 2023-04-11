import express, { Request, Response } from 'express';
import currentTime from 'package';

const app = express();

app.get('/', async (req: Request, res: Response) => {
    res.send({ time: await currentTime(), app: 2 });
});

app.listen(3000, () => console.log('Listening.'));
