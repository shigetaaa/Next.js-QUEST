"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../globals.css";
import styles from './delete.module.css';
import { deleteArticle } from './deleteArticle';
import { getArticle } from './articleData'; // 記事取得関数をインポート


// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export default function updatePage({ params }) {
  const { slug } = params;
  const getArticleDone = getArticle(slug);
  const deleteArticleDone = deleteArticle(slug);


  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const article = await getArticle(params.slug); // 記事データを取得
      if (article) {
        setTitle(article.title);
        setSubject(article.description);
        setContent(article.body);
        setTags(article.tags.map(tag => tag.name).join(', ')); // タグ名を ', ' で結合
      }
    };
    fetchArticle();
  }, [params.slug]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const tagList = tags ? tags.split(',').map(tag => tag.trim()) : [];

    const articleData = {
      article: {
        title,
        description: subject,
        body: content,
        tagList,
      }
    };

    try {
      // CSRFトークンを取得
      const tokenResponse = await http.get('/api/csrf-token');
      const csrfToken = tokenResponse.data.token;  // 修正

      // CSRFトークンの値をコンソールに出力
      console.log('CSRF Token:', csrfToken);

      // CSRFトークンをヘッダーに含めてリクエストを送信
      const response = await http.delete(`/api/articles/${params.slug}`, articleData, {
        headers: {
          'X-CSRF-TOKEN': csrfToken
        }
      });


      // 成功した場合の処理
      console.log('Article deleted successfully');
      setMessage('Article deleted successfully.');
    } catch (error) {
      // 失敗した場合の処理
      console.error('Error deleted article', error);
      setMessage('Error deleted article.');
    }
  };


  return (
    <main>
      {/* ヘッダー */}
      <div className="home-banner">
        <h1>conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
      <div className="main_container">
        <h1>Delete Article</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form_all">
            <fieldset className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" value={title} onChange={e => setTitle(e.target.value)} className="form_each" />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" name="subject" value={subject} onChange={e => setSubject(e.target.value)} className="form_each" />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea id="content" name="content" rows="8" value={content} onChange={e => setContent(e.target.value)} className="form_each"></textarea>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="tags">Tags:</label>
              <input type="text" id="tags" name="tags" placeholder="Tags are entered separated by commas" value={tags} onChange={e => setTags(e.target.value)} className="form_each" />

            </fieldset>
            <fieldset className="form-button-container">
              <button type="submit" className="form-button">Delete Article</button>
            </fieldset>
          </form>
          {message && <p className="form-message">{message}</p>}
        </div>
      </div>
    </main>
  );
}
