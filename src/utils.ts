import { FSWatcher, WatchListener } from "fs";

export function loop(count: number): number[] {
    const arr: number[] = [];

    for (let i = 0; i < count; i++) {
        arr.push(i);
    }

    return arr;
}

export function where<T>(data: T[], fn: (item: T) => boolean): T[] {
    return data.filter(fn);
}

export function iterate<T, R>(data: T[], fn: (item: T, index: number) => R): R[] {
    return data.map(fn);
}

export function every<T>(data: T[], fn: (item: T) => boolean): boolean {
    return iterate(data, fn).every((item) => item === true);
}

export function some<T>(data: T[], fn: (item: T) => boolean): boolean {
    return iterate(data, fn).some((item) => item === true);
}

export function oneBetween(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function toggle<T>(item: T, opt1: T, opt2: T): T {
    return item === opt1 ? opt2 : opt1;
}

export function switchb<T>(b: boolean, opt1: T, opt2: T): T {
    return b ? opt1 : opt2;
}

export function joinArrays<T>(...arrays: T[][]): T[] {
    return arrays.reduce((acc, arr) => [...acc, ...arr], []);
}

export async function saveFile(
    filename: string,
    data: string | NodeJS.ArrayBufferView
) {
    const fs = await import("fs");
    const util = await import("util");
    const writeFile = util.promisify(fs.writeFile);

    await writeFile(filename, data);
}

export async function readFile(filename: string): Promise<string> {
    const fs = await import("fs");
    const util = await import("util");
    const readFile = util.promisify(fs.readFile);

    return await readFile(filename, "utf8");
}

export async function watchFile(
    filename: string,
    listener?: WatchListener<string> | undefined
) {
    const fs = await import("fs");
    fs.watch(filename, { encoding: "utf-8" }, listener);
}

export async function sleep(time: number) {
    return await new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
