// POSTルーティング作成
import { addMemo } from '@/app/repositories/MemoRepository';
import { NextResponse } from 'next/server';

// http://localhost:3000/api/memo/add
export async function POST(req: Request) {
    // リクエストからデータを取得
    const { text } = await req.json();

    // TODO: text をRDBまたはファイルに保存
    await addMemo(text);

    // レスポンスデータ作成
    const data = {
        message: "メモを保存しました",
        memo: text,
    }
    // レスポンスを返す
    return NextResponse.json(data);
}