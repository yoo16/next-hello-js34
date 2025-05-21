// GETルーティング作成
import { NextResponse } from 'next/server';

// http://localhost:3000/api/memo/add
export async function POST(req: Request) {
    // TODO: DBまたはファイルに保存

    // リクエストからデータを取得
    const { text } = await req.json();

    // レスポンスデータ作成
    const data = {
        message: "メモを保存しました",
        memo: text,
    }
    return NextResponse.json(data);
}