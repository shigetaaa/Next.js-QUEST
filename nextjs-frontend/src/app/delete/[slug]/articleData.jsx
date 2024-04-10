// articleData.js
export async function getArticle(slug) {
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
