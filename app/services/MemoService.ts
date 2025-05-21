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
    if (res.ok) {
        return result;
    }
}