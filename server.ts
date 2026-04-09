import type {Request, Response} from 'express';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { UrlModel } from './models/url.model';

const app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URI!)
    .then(() => console.log('MongoDB connected!'))
    .catch((err: unknown) => console.error('Mongoose connection error:', err));

app.post('/api/create', async (req: Request, res: Response) => {
    if (!req.body.url) {
        return res.status(400).json({error: 'Missing url query parameter'});
    }
    const key = createShortUrl();
    try {
        const urlDoc = new UrlModel({ key, url: req.body.url });
        await urlDoc.save();
        return res.status(200).json({success: true, message: "Short URL created successfully", data: { key, url: req.body.url }});
    } catch (err) {
        return res.status(500).json({error: 'Fehler beim Speichern in MongoDB', details: err});
    }
});

app.get('/:id', async (req: Request, res: Response) => {
    try {
        const shortUrl = await UrlModel.findOne({ key: req.params.id });
        if (!shortUrl) return res.status(404).json({error: "Short URL not found"});
        return res.redirect(shortUrl.url);
    } catch (err) {
        return res.status(500).json({error: 'Fail by reading from MongoDB', details: err});
    }
});

app.listen(process.env.PORT, () => console.log(`URL-Shorter API Service listening on port ${process.env.PORT}!`));

const createShortUrl = (): string => Math.random().toString(36).substring(2, 8);