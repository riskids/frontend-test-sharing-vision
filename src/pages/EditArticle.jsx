import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { Textarea } from '../components/ui/textarea.jsx';
import { getArticleById, updateArticle } from '../services/apiService.js';

function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const data = await getArticleById(id);
        setFormData({
          title: data.title || '',
          content: data.content || '',
          category: data.category || '',
        });
      } catch {
        navigate('/');
      } finally {
        setFetching(false);
      }
    }
    fetchArticle();
  }, [id, navigate]);

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  }

  function parseErrorMessages(error) {
    const fieldErrors = {};
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (Array.isArray(data)) {
        data.forEach((err) => {
          const field = err.field?.toLowerCase() || '';
          if (field === 'title') fieldErrors.title = err.message || err.tag || 'Title is invalid';
          else if (field === 'content') fieldErrors.content = err.message || err.tag || 'Content is invalid';
          else if (field === 'category') fieldErrors.category = err.message || err.tag || 'Category is invalid';
        });
      } else if (typeof data === 'object') {
        if (data.message) {
          const msg = data.message.toLowerCase();
          if (msg.includes('title')) fieldErrors.title = data.message;
          else if (msg.includes('content')) fieldErrors.content = data.message;
          else if (msg.includes('category')) fieldErrors.category = data.message;
          else fieldErrors.general = data.message;
        }
        // Handle object-format errors from backend: { errors: { Title: "msg", Content: "msg" } }
        if (data.errors && typeof data.errors === 'object' && !Array.isArray(data.errors)) {
          Object.entries(data.errors).forEach(([field, message]) => {
            const f = field.toLowerCase();
            if (f === 'title') fieldErrors.title = message;
            else if (f === 'content') fieldErrors.content = message;
            else if (f === 'category') fieldErrors.category = message;
            else if (f === 'status') fieldErrors.status = message;
            else fieldErrors.general = message;
          });
        }
        if (data.errors && Array.isArray(data.errors)) {
          data.errors.forEach((err) => {
            const field = err.field?.toLowerCase() || '';
            if (field === 'title') fieldErrors.title = err.message;
            else if (field === 'content') fieldErrors.content = err.message;
            else if (field === 'category') fieldErrors.category = err.message;
          });
        }
      }
    }
    return fieldErrors;
  }

  async function handleSubmit(status) {
    setErrors({});
    setLoading(true);
    try {
      await updateArticle(id, {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        status: status,
      });
      navigate('/');
    } catch (error) {
      const fieldErrors = parseErrorMessages(error);
      setErrors(fieldErrors);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <p className="text-muted-foreground">Loading article...</p>;
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6">Edit Article</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            placeholder="Article title (min. 20 characters)"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-destructive">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Input
            placeholder="Category (min. 3 characters)"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          />
          {errors.category && (
            <p className="mt-1 text-sm text-destructive">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <Textarea
            placeholder="Article content (min. 200 characters)"
            rows={8}
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-destructive">{errors.content}</p>
          )}
        </div>

        {errors.general && (
          <p className="text-sm text-destructive">{errors.general}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            variant="default"
            disabled={loading}
            onClick={() => handleSubmit('publish')}
          >
            {loading ? 'Saving...' : 'Publish'}
          </Button>
          <Button
            variant="outline"
            disabled={loading}
            onClick={() => handleSubmit('draft')}
          >
            {loading ? 'Saving...' : 'Draft'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditArticle;
