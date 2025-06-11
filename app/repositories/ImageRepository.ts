import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from 'uuid';

const DATA_DIR = join(process.cwd(), "public/images");
/**
 * Gemini API を使用するためのディレクトリを確認し、存在しない場合は作成
 */
export async function ensureFile() {
    if (!existsSync(DATA_DIR)) {
        await mkdir(DATA_DIR, { recursive: true });
    }
}

/**
 * ファイルを Base64 に変換する
 * @param file - File オブジェクト
 * @returns Base64 文字列と MIME タイプ
 */
export async function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return {
        base64: buffer.toString("base64"),
        mimeType: file.type,
    };
}

export function uploadImageInfo(ext = ".png"): { filePath: string; url: string } {
    // ディレクトリチェック
    ensureFile();
    // ファイル名をUUIDで生成
    const fileName = uuidv4() + ext;
    const filePath = join(DATA_DIR, fileName);
    const url = `/images/${fileName}`;
    return { filePath, url };
}

export async function saveImage(path: string, data: string, type: BufferEncoding = "base64") {
    const buffer = Buffer.from(data, type);
    await writeFile(path, buffer);
}