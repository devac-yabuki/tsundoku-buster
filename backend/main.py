from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, text

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. 接続情報の定義
# docker-compose.yml で設定した内容と一致させる必要があります
# 形式: postgresql://ユーザー名:パスワード@ホスト:ポート/DB名
DATABASE_URL = "postgresql://user:password@localhost:5432/tsundoku_db"

# 2. エンジン（接続の管理役）の作成
engine = create_engine(DATABASE_URL)

@app.get("/")
def read_root():
    return {"message": "Hello Tsundoku-Buster"}

# 3. DB接続テスト用のエンドポイント
@app.get("/health")
def health_check():
    try:
        # 実際にDBに接続して "SELECT 1" という無害なクエリを投げる
        with engine.connect() as connection:
            # text()を使ってSQLを明示的に宣言
            result = connection.execute(text("SELECT 1"))
            return {"status": "ok", "db_response": result.scalar()}
    except Exception as e:
        return {"status": "error", "message": str(e)}
