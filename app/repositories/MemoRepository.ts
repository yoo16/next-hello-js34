'use server';

// readFile, writeFile, mkdir をインポート
import { readFile, writeFile, mkdir } from 'fs/promises';
// existsSync をインポート
import { existsSync } from 'fs';
// join をインポート
import { join } from 'path';

// data フォルダのパス
const DATA_DIR = join(process.cwd(), "data");
// data/memos.json のパス
const FILE_PATH = join(DATA_DIR, "memos.json");

// データファイルの準備
async function ensureFile() {
    // TODO: data フォルダが存在しない場合は作成
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
    // TODO: data/memos.json が存在しない場合は空の配列を書き込む
    if (!existsSync(FILE_PATH)) {
        await writeFile(FILE_PATH, JSON.stringify([], null, 2), "utf8");
    }
}

// メモファイルの内容を読み込む関数
export async function getAllMemos() {
    // TODO: ensureFile を呼び出してファイルを準備
    ensureFile();
    // TODO: readFile() でファイルを読み込み
    const json = await readFile(FILE_PATH, "utf8");
    // ファイルが空の場合は空の配列を返す
    if (!json) return [];
    // TODO: JSON を JavaScript オブジェクトに変換して返す
    return JSON.parse(json);
}

// メモファイルにメモを追加する関数
export async function addMemo(text: string) {
    // TODO: getAllMemos() で既存のメモを取得
    const memos = await getAllMemos();
    // TODO: 新しいメモを追加
    memos.push(text)
    // TODO: メモをJSON文字列に変換
    const json = JSON.stringify(memos, null, 2);
    // TODO: writeFile() でファイルに書き込む
    await writeFile(FILE_PATH, json, "utf8");
}


// メモ削除（index指定）
export async function removeMemo(index: number): Promise<void> {
    // TODO: getAllMemos() で既存のメモを取得
    const memos = await getAllMemos();
    if (index < 0 || index >= memos.length) return;
    // TODO: index でメモを削除
    memos.splice(index, 1);
    // TODO: メモをJSON文字列に変換
    const json = JSON.stringify(memos, null, 2);
    // TODO: writeFile() でファイルに書き込む
    await writeFile(FILE_PATH, json, "utf8");
}

// 全削除
export async function clearMemos(): Promise<void> {
    // TODO: 空の配列をJSON文字列に変換

    // TODO: writeFile() でファイルに書き込む
}