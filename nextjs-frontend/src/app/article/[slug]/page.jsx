import React from 'react';
import "../../globals.css";
import styles from './article.module.css';

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const article = await getArticle(slug);

  return (
    <main className={styles['main']} >
      {/* ヘッダー */}
      <div className={styles['article-banner']}>
        <div className={styles['article-banner-container']}>
          <h1>{article.title}</h1>
        </div>
      </div>
      <div className={styles['article-banner-container']}>
        <p className={styles['description_container']}>{article.description}</p>
        {/* タグの表示 */}
        <div>
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

        {/* 区切り線 */}
        <hr className={styles['divider']} />

        <div className={styles['button_container']}>
          <div>
            <a href={`http://localhost:3000/edit/${slug}`}><span className={styles['button']}  >Edit Article</span></a>
          </div>
          <div>
            <a href={`http://localhost:3000/delete/${slug}`}><span className={styles['button']}  >Delete Article</span></a>
          </div>
        </div>
      </div>
    </main>
  );
}

async function getArticle(slug) {
  try {
    const response = await fetch(`http://localhost:8000/api/articles/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('An error occurred while fetching the article:', error);
    return null;
  }
}
