// POSTルーティング作成
import { removeMemo } from '@/app/repositories/MemoRepository';
import { NextResponse } from 'next/server';

// http://localhost:3000/api/memo/add
export async function POST(req: Request) {
    // リクエストからデータを取得
    const { index } = await req.json();

    // TODO: text をRDBまたはファイルに保存
    await removeMemo(index);

    // レスポンスデータ作成
    const data = {
        message: "メモを削除しました",
        index: index,
    }
    // レスポンスを返す
    return NextResponse.json(data);
}