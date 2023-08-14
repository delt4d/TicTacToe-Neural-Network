import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export const sleep = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};

export const saveFile = (path, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

export const dirname = () => {
    return path.dirname(fileURLToPath(import.meta.url));
};
