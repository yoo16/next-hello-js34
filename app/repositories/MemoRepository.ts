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

}

// メモファイルの内容を読み込む関数
export async function getAllMemos() {

}

// メモファイルにメモを追加する関数
export async function addMemo(text: string) {

}