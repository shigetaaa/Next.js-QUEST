export const GET_ARTICLE = async (slug) => {
  try {
    const response = await fetch(`http://localhost:8000/api/articles/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('An error occurred while fetching the article:', error);
    return null;
  }
};
