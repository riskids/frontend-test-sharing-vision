import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { getAllArticles } from '../services/apiService.js';

const ITEMS_PER_PAGE = 5;

function Preview() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllArticles(100, 0);
        const items = Array.isArray(data) ? data : [];
        const published = items.filter((a) => a.status === 'publish');
        setArticles(published);
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalPages = Math.max(1, Math.ceil(articles.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  function handlePrevious() {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  }

  function handleNext() {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading articles...</p>;
  }

  if (articles.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-semibold mb-6">Preview</h2>
        <p className="text-center text-muted-foreground py-8">No articles yet</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Preview</h2>

      <div className="space-y-6">
        {paginatedArticles.map((article) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm leading-relaxed">{article.content}</p>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary">{article.category}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage <= 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage >= totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default Preview;