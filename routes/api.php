<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController; // 追加
// use Illuminate\Support\Facades\CsrfToken; // 修正

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// 記事の一覧を取得
Route::get('articles', [ArticleController::class, 'index']);
// 新しい記事を作成
Route::post('articles', [ArticleController::class, 'store']);
// スラッグに基づいて個別の記事を取得
Route::get('articles/{slug}', [ArticleController::class, 'show']);
// スラッグに基づいて記事を更新
Route::put('articles/{slug}', [ArticleController::class, 'update']);
// スラッグに基づいて記事を削除
Route::delete('articles/{slug}', [ArticleController::class, 'destroy']);
// CSRFトークンを取得するエンドポイント
Route::get(
    '/csrf-token',
    function () {
        return response()->json(['token' => csrf_token()]); // 修正
    }
);
