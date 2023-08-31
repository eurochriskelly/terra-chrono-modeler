// Test

import express from 'express';
import cors from 'cors';
import { httpPut, httpDelete, httpEval } from './curler.js';
import { settings } from '../../config/environment.js';

const app = express();
const port = 3000;
const { mlHostname, mlPort } = settings

app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cors()); // Use cors middleware

// Serve static files from the 'dist' directory
app.use(express.static('dist'));


/**
 * Forward document requests to database
 */
app.post('/api/documents', async (req, res) => {
    console.log('In API command [/api/documents] ...')
    console.log(req.body)
    if (!req.body.uri) {
        console.log('No URI specified in request body')
        return
    }
    const path = `v1/documents?uri=${req.body.uri}`
    try {
        const fn = req.body.json ? httpPut : httpDelete
        await fn(
            `http://${mlHostname}:${mlPort}/${path}`,
            req.body.json
        )
        res.json({ status: 'ok' });
    } catch (err) {
        console.log('There was an error!')
        console.error(err);
        res.status(500).json({ message: 'Error proxying request' });
    }
});

/**
 * Extract a list of layers from the server
 */
app.post('/api/command', async (req, res) => {
    console.log('In API command [/api/command] ...')
    const { cmd, args } = req.body

    { // DEBUG
        console.log('---')
        console.log(req.body)
        console.log(' cmd', cmd)
        console.log(' args', args)
    }

    try {
        const response = await httpEval(
            `http://${mlHostname}:${mlPort}`,
            cmd, args
        )
        res.json(JSON.parse(response))
    }
    catch (err) {
        console.log('There was an error!')
        console.error(err);
        res.status(500).json({ message: 'Error proxying request' });
    }
})

app.listen(port, () => {
    console.log(`[${new Date().toISOString()}] listening at http://localhost:${port}`);
});
