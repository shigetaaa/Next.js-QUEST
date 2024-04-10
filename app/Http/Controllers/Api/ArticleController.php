<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Tag; // 追記
use Illuminate\Support\Str; // 追記

class ArticleController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  // public function index()
  // {
  //   $articles = Article::paginate(10);
  //   return response()->json($articles);
  //   // ページネーション10件ずつの記事一覧を取得
  // }
  public function index()
  {
    $articles = Article::with('tags')->paginate(10);
    return response()->json($articles);
    // ページネーション10件ずつの記事一覧を取得
  }

  /**
   * 記事を新規作成する
   */
  public function store(Request $request)
  {
    $data = $request->get('article');

    $article = new Article();
    $article->title = $data['title'];
    $article->description = $data['description'];
    $article->body = $data['body'];
    $slug = Str::slug($data['title']);
    $originalSlug = $slug;
    $counter = 1;

    while (Article::where('slug', $slug)->exists()) {
      $slug = "{$originalSlug}-" . $counter++;
    }

    $article->slug = $slug;


    $article->save();

    // タグの保存
    foreach ($data['tagList'] as $tag) {
      $tagModel = Tag::firstOrCreate(['name' => $tag]); // 既存のタグがあればそれを取得、なければ新規作成
      $article->tags()->attach($tagModel->id);
    }

    // レスポンスデータの作成
    $response = $article->toArray();
    $response['tagList'] = $article->tags->pluck('name');
    // レスポンスデータを返す
    return response()->json(['article' => $response], 201);
  }

  /**
   * // スラッグに基づいて個別の記事を取得
   */

  public function show(string $slug)
  {
    $article = Article::with('tags')->where('slug', $slug)->firstOrFail();
    return response()->json($article);
  }


  /**
   * スラッグに基づいて記事を更新
   */
  // public function update(Request $request, string $slug)
  // {
  //   $data = $request->get('article');

  //   $article = Article::where('slug', $slug)->firstOrFail();

  //   if (isset($data['title'])) {
  //     $article->title = $data['title'];
  //     $article->slug = Str::slug($data['title']);
  //   }

  //   if (isset($data['description'])) {
  //     $article->description = $data['description'];
  //   }

  //   if (isset($data['body'])) {
  //     $article->body = $data['body'];
  //   }

  //   $article->save();

  //   return response()->json($article);
  // }
  /**
   * スラッグに基づいて記事を更新
   */
  public function update(Request $request, string $slug)
  {
    $data = $request->get('article');
    $article = Article::where('slug', $slug)->firstOrFail();

    if (isset($data['title'])) {
      $article->title = $data['title'];
      $article->slug = Str::slug($data['title']);
    }

    if (isset($data['description'])) {
      $article->description = $data['description'];
    }

    if (isset($data['body'])) {
      $article->body = $data['body'];
    }

    // タグの更新処理
    if (isset($data['tagList'])) {
      $tagIds = [];
      foreach ($data['tagList'] as $tagName) {
        $tag = Tag::firstOrCreate(['name' => $tagName]);
        $tagIds[] = $tag->id;
      }
      $article->tags()->sync($tagIds);
    }

    $article->save();

    return response()->json($article);
  }



  /**
   * 記事の削除
   */
  public function destroy(string $slug)
  {
    $article = Article::where('slug', $slug)->firstOrFail();
    $article->delete();

    return response()->json(null, 204);
  }
}
