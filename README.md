# CONDUIT

## 作成内容
提出QUEST　ステップ1
以下の機能を実装
- Home
- Create/Edit Article
- Article

## 構築

### 環境
Laravel Breeze - Next.js Edition

### 構築手順

- GitHubからコードを取り込む
```
git clone "URL"

```

- XAMPPでApacheとMySQLをスタートさせる

- ターミナルで本コードのルートディレクトリに移動。下記コマンドを実行。

```
php artisan serve

```

## 使い方

TOPページ
http://localhost:3000/

個別記事ページ
http://localhost:3000/slug/
TOPページより各記事をクリックするとアクセス可能

投稿ページ
http://localhost:3000/post/
グローバルナビゲーション右側リンク Post createからジャンプ可能

編集
http://localhost:3000/edit/slug/
個別記事ページ下部ボタンよりジャンプ可能

削除
http://localhost:3000/delete/slug/
個別記事ページ下部ボタンよりジャンプ可能
