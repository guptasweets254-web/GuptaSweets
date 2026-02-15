import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api';

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState<any | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageThumb, setImageThumb] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [type, setType] = useState<string>('Food');
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    })();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    try {
      const payload: any = { name: name.trim(), type: type || 'Food' };
      if (imageUrl) payload.imageUrl = imageUrl;
      if (imageThumb) payload.imageThumb = imageThumb;
      if (description) payload.description = description;
      const created = await createCategory(payload);
      setCategories((p) => [created, ...p]);
      setName('');
      setType('Food');
      setImagePreview(null);
      setImageUrl(null);
      setImageThumb(null);
      setDescription(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!editing || !name.trim()) return;
    try {
      const payload: any = { name: name.trim(), type: type || 'Food' };
      if (imageUrl) payload.imageUrl = imageUrl;
      if (imageThumb) payload.imageThumb = imageThumb;
      if (description) payload.description = description;
      const updated = await updateCategory(editing.id, payload);
      setCategories((p) => p.map((c) => (c.id === updated.id ? updated : c)));
      setEditing(null);
      setName('');
      setType('Food');
      setImagePreview(null);
      setImageUrl(null);
      setImageThumb(null);
      setDescription(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this category?')) return;
    try {
      await deleteCategory(id);
      setCategories((p) => p.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageLoading(true);
    try {
      const csrf = await (await import('@/lib/auth')).getCsrf();
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/upload`, {
        method: 'POST',
        body: fd,
        credentials: 'include',
        headers: {
          'x-csrf-token': csrf,
        },
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setImagePreview(data.thumbUrl || data.url || null);
      setImageUrl(data.url);
      setImageThumb(data.thumbUrl || data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title="Categories" subtitle="Manage product categories" />
      <div className="p-6">
        <div className="mb-4 flex flex-col items-between gap-3">
          <div className="md:col-span-2">
            <Input placeholder="Category name" value={name} onChange={(e: any) => setName(e.target.value)} />
          </div>

          <div>
            <Label>Category Type</Label>
            <Select onValueChange={(value: string) => setType(value)} value={type}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Gallery">Gallery</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-[90%] items-center gap-2">
            <div className="w-full">
              <Label>Image</Label>
              <div className="flex items-center gap-3">
                <input
                  id="cat-imageFile"
                  type="file"
                  accept="image/*"
                  className="block flex-1"
                  onChange={handleImageUpload}
                  disabled={imageLoading}
                />
                {imageLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              </div>
            </div>
            <img src={imagePreview || '/placeholder.png'} alt="preview" className="h-12 w-12 rounded-lg object-cover" />
          </div>

          <div>
            <Label htmlFor="cat-description">Description</Label>
            <Textarea
              id="cat-description"
              placeholder="Enter category description"
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex w-full gap-2 mt-2">
            {editing ? (
              <>
                <Button onClick={handleUpdate} className="bg-saffron" disabled={imageLoading}>
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditing(null);
                    setName('');
                    setType('Food');
                    setImagePreview(null);
                    setImageUrl(null);
                    setImageThumb(null);
                    setDescription(null);
                  }}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={handleCreate} className="bg-saffron" disabled={imageLoading}>
                Add
              </Button>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <img
                    src={c.image || c.imageUrl || '/placeholder.png'}
                    alt={c.name}
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {c.slug} {c.type ? `• ${c.type}` : ''}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditing(c);
                      setName(c.name);
                      setType(c.type || 'Food');
                      setImagePreview(c.image || c.imageUrl || null);
                      setImageUrl(c.imageUrl || c.image || null);
                      setImageThumb(c.imageThumb || c.avatarThumb || null);
                      setDescription(c.description || null);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" className="text-destructive" onClick={() => handleDelete(c.id)}>
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;