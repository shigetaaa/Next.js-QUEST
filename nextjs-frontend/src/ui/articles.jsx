"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { GET } from '../app/api/articles/route.js';
import styles from './home.module.css';

export function Page() {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  function handlePageClick(url) {
    // URLからページ番号を取得
    const newPage = url ? new URL(url).searchParams.get('page') : 1;
    setCurrentPage(newPage);

    // 新しいページ番号でデータを取得
    fetchData(newPage);
  }

  async function fetchData(page = 1) {
    try {
      const data = await GET(page); // ページ番号を引数として渡す
      console.log('Fetched data:', data);
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  useEffect(() => {
    // async function fetchData() {
    //   try {
    //     const data = await GET();
    //     console.log('Fetched data:', data);  // データのフェッチが成功した場合にログを出力
    //     setData(data); // データをセット
    //   } catch (error) {
    //     console.error('Error fetching data:', error);  // エラーが発生した場合にログを出力
    //   }
    // }
    fetchData(currentPage);// currentPageの変更時に再度データを取得
  }, [currentPage]);

  function handlePageClick(newPage) {
    setCurrentPage(newPage);
  }

  return (
    <div>
      {data && data.data ? (
        <ul>
          {data.data.map((article) => (
            <li key={article.id}>
              <a href={`http://localhost:3000/article/${article.slug}`} className={styles['blog_list_link']}>
                <div className={styles['blog_list_container']}>

                  <h2>{article.title}</h2>
                  <p className={styles['subject_style']}>{article.description}</p>

                  <div className={styles['add_container']} >
                    <span className={styles['read_more']}>read more...</span>
                    {/* タグの表示 */}
                    <ul className={styles['tag_container']}>
                      {article.tags && article.tags.length > 0 ? (
                        article.tags.map((tag) => (
                          <li key={tag.id} className={styles['tag_list']}>{tag.name}</li>
                        ))
                      ) : (
                        <li className={styles['tag_list']}>No tags</li>
                      )}
                    </ul>
                  </div>

                </div>
              </a>
            </li>

          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}

      <ul className={styles['pagination']} >
        {data && data.links && data.links
          .filter(link => link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;') // NextとPreviousをフィルタリング
          .map((link, index) => {
            return (
              <li key={index} className={`page-item ${link.active ? 'active' : ''}`}>
                <a
                  className={styles['page-link']}
                  href={link.url ? link.url : '#'}
                  onClick={(e) => {
                    e.preventDefault();
                    // link.labelから取得したページ番号をhandlePageClickに渡す
                    handlePageClick(link.label);
                  }}>
                  {link.label}
                </a>
              </li>
            );
          })}
      </ul>
    </div >
  );
}
