import { useEffect, useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/api';

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState<any | null>(null);

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
      const created = await createCategory(name.trim());
      setCategories((p) => [created, ...p]);
      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    if (!editing || !name.trim()) return;
    try {
      const updated = await updateCategory(editing.id, { name: name.trim() });
      setCategories((p) => p.map((c) => (c.id === updated.id ? updated : c)));
      setEditing(null);
      setName('');
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

  return (
    <div className="min-h-screen">
      <AdminHeader title="Categories" subtitle="Manage product categories" />
      <div className="p-6">
        <div className="mb-4 flex gap-3">
          <Input placeholder="Category name" value={name} onChange={(e:any) => setName(e.target.value)} />
          {editing ? (
            <>
              <Button onClick={handleUpdate} className="bg-saffron">Save</Button>
              <Button variant="outline" onClick={() => { setEditing(null); setName(''); }}>Cancel</Button>
            </>
          ) : (
            <Button onClick={handleCreate} className="bg-saffron">Add</Button>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c.id} className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-sm text-muted-foreground">{c.slug}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { setEditing(c); setName(c.name); }}>Edit</Button>
                  <Button variant="ghost" className="text-destructive" onClick={() => handleDelete(c.id)}>Delete</Button>
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