import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button.jsx';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs.jsx';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table.jsx';
import { getAllArticles, updateArticle } from '../services/apiService.js';

function AllPosts() {
  const navigate = useNavigate();
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('published');

  async function fetchArticles() {
    setLoading(true);
    try {
      const data = await getAllArticles(100, 0);
      const articles = Array.isArray(data) ? data : [];
      setAllArticles(articles);
    } catch {
      setAllArticles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  async function handleTrash(id) {
    const article = allArticles.find((a) => a.id === id);
    if (!article) return;
    try {
      await updateArticle(id, {
        title: article.title,
        content: article.content,
        category: article.category,
        status: 'thrash',
      });
      fetchArticles();
    } catch {
      // silently fail
    }
  }

  const published = allArticles.filter((a) => a.status === 'publish');
  const drafts = allArticles.filter((a) => a.status === 'draft');
  const trashed = allArticles.filter((a) => a.status === 'thrash');

  function renderTable(articles) {
    if (articles.length === 0) {
      return (
        <p className="text-center text-gray-500 py-8">No articles yet</p>
      );
    }

    const isTrashed = activeTab === 'trashed';

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="w-24">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium">{article.title}</TableCell>
              <TableCell>{article.category}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/edit/${article.id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  {!isTrashed && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleTrash(article.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading articles...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">All Posts</h2>

      <Tabs defaultValue="published" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="trashed">Trashed</TabsTrigger>
        </TabsList>

        <TabsContent value="published">
          {renderTable(published)}
        </TabsContent>

        <TabsContent value="drafts">
          {renderTable(drafts)}
        </TabsContent>

        <TabsContent value="trashed">
          {renderTable(trashed)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AllPosts;
