// POSTルーティング作成
import { removeMemo } from '@/app/repositories/MemoRepository';
import { NextResponse } from 'next/server';

// http://localhost:3000/api/memo/remove
export async function POST(req: Request) {
    // リクエストから index を取得
    const { index } = await req.json();

    // TODO: ファイルから index でメモを削除
    await removeMemo(index);

    // レスポンスデータ作成
    const data = {
        message: "メモを削除しました",
        index: index,
    }
    // レスポンスを返す
    return NextResponse.json(data);
}