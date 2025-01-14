/*
 * @Date: 2025-01-10 17:25:44
 * @Description: description
 */
import os from 'node:os';
import path from 'node:path';
import util from 'node:util';
import fs from 'node:fs';
import https from 'node:https';
import extract from 'extract-zip';

const CHROMIUM_PATH = path.join(import.meta.dirname, '..', '..', '.local-chromium');

const downloadURLs = {
    linux: 'https://storage.googleapis.com/chromium-browser-snapshots/Linux_x64/%d/chrome-linux.zip',
    darwin: 'https://storage.googleapis.com/chromium-browser-snapshots/Mac/%d/chrome-mac.zip',
    win32: 'https://storage.googleapis.com/chromium-browser-snapshots/Win/%d/chrome-win32.zip',
    win64: 'https://storage.googleapis.com/chromium-browser-snapshots/Win_x64/%d/chrome-win32.zip',
};

async function downloadChromium(revision, progressCallback) {
    let url = null;

    const platform = os.platform();
    if (platform === 'darwin')
        url = downloadURLs.darwin;
    else if (platform === 'linux')
        url = downloadURLs.linux;
    else if (platform === 'win32')
        url = os.arch() === 'x64' ? downloadURLs.win64 : downloadURLs.win32;

    console.assert(url, `Unsupported platform: ${platform}`);

    url = util.format(url, revision);
    
}

function downloadFile(url, destinationPath, progressCallback) {
    let resolve, reject;

    const promise = new Promise((x, y) => {
        // 这样子的好处就是不局限再Promise内部，外部可以随时调用resolve和reject
        resolve = x;
        reject = y;
    });

    const request = https.get(url, response => {
        if (response.statusCode !== 200) {
            const error = new Error(`Download failed: server returned code ${response.statusCode}. URL: ${url}`);
            // 我们不打算读取响应体，所以调用 resume 来忽略它
            response.resume();
            reject(error);
            return;
        }

        const file = fs.createWriteStream(destinationPath);

        file.on('finish', () => resolve());
        file.on('error', error => reject(error));

        response.pipe(file);
    });

    request.on('error', error => reject(error));
    return promise;
}

function extractZip(zipPath, folderPath) {
    return new Promise(resolve => extract(zipPath, { dir: folderPath }, resolve))
}
