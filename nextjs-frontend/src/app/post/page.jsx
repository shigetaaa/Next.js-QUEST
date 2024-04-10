"use client";

import React, { useState } from 'react';
import axios from 'axios';
import "../globals.css";
import styles from './post.module.css';

// XSRF-TOKENをリクエスト時に送信するための設定
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

export default function PostPage() {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

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

    console.log(articleData);  // ここでarticleDataオブジェクトをログに出力

    try {
      // CSRFトークンを取得
      const tokenResponse = await http.get('/api/csrf-token');
      const csrfToken = tokenResponse.data.token;  // 修正

      // CSRFトークンの値をコンソールに出力
      console.log('CSRF Token:', csrfToken);

      // CSRFトークンをヘッダーに含めてリクエストを送信
      const response = await http.post('/api/articles', articleData, {
        headers: {
          'X-CSRF-TOKEN': csrfToken
        }
      });
      // const response = await http.post('/api/articles', articleData);

      // 成功した場合の処理
      console.log('Article posted successfully');
    } catch (error) {
      // 失敗した場合の処理
      console.error('Error posting article', error);
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
        <h1>Post create</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit} className="form_all">
            <fieldset className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" placeholder="Article Title" value={title} onChange={e => setTitle(e.target.value)} className="form_each" />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input type="text" id="subject" name="subject" placeholder="What's this article about?" value={subject} onChange={e => setSubject(e.target.value)} className="form_each" />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea id="content" name="content" rows="8" placeholder="Write your article (in markdown)" value={content} onChange={e => setContent(e.target.value)} className="form_each"></textarea>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="tags">Tags:</label>
              {/* <textarea id="tags" name="tags" placeholder="Tags are entered separated by commas" value={tags} onChange={e => setTags(e.target.value)}></textarea> */}
              <input type="text" id="tags" name="tags" placeholder="Tags are entered separated by commas" value={tags} onChange={e => setTags(e.target.value)} className="form_each" />
              <div>

              </div>
            </fieldset>
            <fieldset className="form-button-container">
              <button type="submit" className="form-button">Publish Article</button>
            </fieldset>
          </form>
        </div>
      </div>
    </main>
  );
}
