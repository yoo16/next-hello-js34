// GETルーティング作成
import { NextResponse } from 'next/server';

// http://localhost:3000/api/memo/add
export async function POST(req: Request) {
    // リクエストからデータを取得
    const { text } = await req.json();

    // TODO: text をDBまたはファイルに保存

    // レスポンスデータ作成
    const data = {
        message: "メモを保存しました",
        memo: text,
    }
    // レスポンスを返す
    return NextResponse.json(data);
}