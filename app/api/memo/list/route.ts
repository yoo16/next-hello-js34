// GETルーティング作成
import { NextResponse } from 'next/server';

// http://localhost:3000/api/memo/list
export async function GET() {
    // dummyデータを作成
    // TODO: DBから取得するように修正
    const memos = [ "りんご", "ばなな", "みかん" ];
    const data = {
        message: "メモ一覧を取得しました",
        memos: memos,
    }
    return NextResponse.json(data);
}