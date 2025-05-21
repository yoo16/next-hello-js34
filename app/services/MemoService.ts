export async function addMemo(text: string) {
    const res = await fetch("/api/memo/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    if (!res.ok) {
        return { message: "メモの追加に失敗しました" };
    }
    const result = await res.json();
    if (res.ok) {
        return result;
    }
}