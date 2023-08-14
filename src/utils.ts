import fs from 'fs';

export const sleep = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
};

export const saveFile = (path: string, content: string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, content, (err) => {
            if (err) reject(err);
            else resolve(null);
        });
    });
};

export const randomBetween = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

