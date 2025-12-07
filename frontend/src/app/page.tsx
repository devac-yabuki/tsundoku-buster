// 1. クライアントサイドで動作させるための宣言（必須）
'use client';

// 2. Reactから必要な機能をインポート
import { useState, useEffect } from 'react';

export default function Home() {
  // 3. 状態（データ）を管理する変数の定義
  // message: データを保持する変数
  // setMessage: データを更新するための関数
  // useState(""): 初期値は空文字
  const [message, setMessage] = useState('');

  // 4. 画面が表示された後に実行される処理（副作用）
  useEffect(() => {
    // 非同期でデータを取得する関数を定義
    const fetchData = async () => {
      try {
        // バックエンド(FastAPI)へリクエスト
        const res = await fetch('http://localhost:8000/');

        // レスポンスをJSONとして解析
        const data = await res.json();

        // 取得したデータ内の message フィールドをセット
        // バックエンドは {"message": "Hello ..."} を返してくる想定
        setMessage(data.message);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    // 関数を実行
    fetchData();
  }, []); // 空の配列 [] を渡すと、最初の1回だけ実行されます

  // 5. 画面に表示する内容（JSX）
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Tsundoku Buster</h1>
      <div className="text-xl">
        APIからのメッセージ:
        {/* ここに取得したメッセージを表示 */}
        <span className="font-mono p-2 rounded ml-2">{message}</span>
      </div>
    </main>
  );
}
