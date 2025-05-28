export async function addMemo(text: string) {
    // http://localhost:3000/api/memo/add 
    // にPOSTリクエスト&レスポンス
    const res = await fetch("/api/memo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    if (!res.ok) {
        // レスポンスが200 OKでない場合
        return { message: "メモの追加に失敗しました" };
    }
    // APIサーバからのJSONレスポンスをJavaScriptオブジェクトに変換
    const result = await res.json();
    console.log(result);
    if (res.ok) {
        return result;
    }
}

// メモ一覧を取得する関数
export async function loadMemos(){
    const res = await fetch("/api/memo/list");
    const result = await res.json();
    if (res.ok) {
        return result;
    } else {
        return { message: "メモ一覧取得に失敗しました", memos: [] };
    }
}
