import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Eye } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getGallery, deleteGalleryImage } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/lib/api";

// categories loaded from server
const categories: any[] = []; // placeholder — replaced by state below

const GalleryAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [addCategory, setAddCategory] = useState<string>("");
  const [categoriesState, setCategoriesState] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getGallery();
        setImages(data);
        const cats = await getCategories();
        setCategoriesState(cats || []);
      } catch (err) {
        console.error('Failed to load gallery images or categories', err);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    try {
      await deleteGalleryImage(id);
      setImages((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredImages = images.filter((image) => {
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || (image.category || "").toString().toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <AdminHeader title="Gallery" subtitle="Manage your image gallery" />

      <div className="p-6">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoriesState.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-saffron hover:bg-saffron/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Image</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                const title = (document.getElementById('title') as HTMLInputElement).value;
                const category = addCategory;
                const url = (document.getElementById('url') as HTMLInputElement).value;
                const thumbUrl = (document.getElementById('thumbUrl') as HTMLInputElement).value || null;
                try {
                  const csrf = await (await import('@/lib/auth')).getCsrf();
                  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/gallery`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-csrf-token': csrf,
                    },
                    body: JSON.stringify({ title, category, imageUrl: url, thumbUrl }),
                  });
                  if (!res.ok) throw new Error('Failed to create image');
                  const created = await res.json();
                  setImages((p) => [{ id: created.id, title: created.title, category: created.category, url: created.imageUrl }, ...p]);
                  setIsAddDialogOpen(false);
                } catch (err) {
                  console.error(err);
                }
              }}>

                <div>
                  <Label htmlFor="title">Image Title</Label>
                  <Input id="title" placeholder="Enter image title" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={addCategory} onValueChange={setAddCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoriesState.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="url">Image</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      className="block"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
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
                          const img = document.getElementById('imagePreview') as HTMLImageElement | null;
                          if (img) img.src = data.thumbUrl || data.url;
                          const urlInput = document.getElementById('url') as HTMLInputElement | null;
                          if (urlInput) urlInput.value = data.url;
                          const thumbInput = document.getElementById('thumbUrl') as HTMLInputElement | null;
                          if (thumbInput) thumbInput.value = data.thumbUrl || data.url;
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                    <img id="imagePreview" alt="preview" className="h-12 w-12 rounded-lg object-cover" />
                  </div>
                  <input id="url" type="hidden" />
                  <input id="thumbUrl" type="hidden" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 bg-saffron hover:bg-saffron/90">
                    Add Image
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Image Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card"
            >
              <img
                src={image.url || image.imageUrl || image.thumbUrl || ''}
                alt={image.title}
                className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setPreviewImage(image.thumbUrl || image.url || image.imageUrl)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => handleDelete(image.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3">
                <p className="font-medium text-foreground">{image.title}</p>
                <p className="text-sm text-muted-foreground">{image.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Dialog */}
        <Dialog open={!!previewImage} onOpenChange={() => setPreviewImage(null)}>
          <DialogContent className="max-w-3xl p-0">
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full rounded-lg"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default GalleryAdmin;
