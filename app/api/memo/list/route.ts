// GETルーティング作成
import { NextResponse } from 'next/server';

export async function GET() {
    const data = {
        message: "メモ一覧を取得しました"
    }
    return NextResponse.json(data);
}