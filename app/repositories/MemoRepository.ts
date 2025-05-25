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

    // TODO: data/memos.json が存在しない場合は空の配列を書き込む
}

// メモファイルの内容を読み込む関数
export async function getAllMemos() {
    // TODO: ensureFile を呼び出してファイルを準備

    // TODO: readFile() でファイルを読み込み

    // TODO: JSON.parse() でパースして返す
}

// メモファイルにメモを追加する関数
export async function addMemo(text: string) {
    // TODO: getAllMemos() で既存のメモを取得

    // TODO: 新しいメモを追加

    // TODO: メモをJSON文字列に変換

    // TODO: writeFile() でファイルに書き込む
}


// メモ削除（index指定）
export async function removeMemo(index: number): Promise<void> {
    // TODO: getAllMemos() で既存のメモを取得

    // TODO: index でメモを削除

    // TODO: メモをJSON文字列に変換

    // TODO: writeFile() でファイルに書き込む
}

// 全削除
export async function clearMemos(): Promise<void> {
    // TODO: 空の配列をJSON文字列に変換

    // TODO: writeFile() でファイルに書き込む
}
