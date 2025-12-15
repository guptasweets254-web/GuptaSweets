import { useState } from "react";
import { Plus, Search, Trash2, Eye } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const mockImages = [
  { id: 1, title: "Kaju Katli Platter", category: "Sweets", url: "https://images.unsplash.com/photo-1666190077595-43884cac5e8c?w=400" },
  { id: 2, title: "Diwali Gift Box", category: "Gift Boxes", url: "https://images.unsplash.com/photo-1547483238-2cbf881a559f?w=400" },
  { id: 3, title: "Shop Interior", category: "Shop", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400" },
  { id: 4, title: "Wedding Order", category: "Events", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400" },
  { id: 5, title: "Gulab Jamun", category: "Sweets", url: "https://images.unsplash.com/photo-1666190077595-43884cac5e8c?w=400" },
  { id: 6, title: "Premium Packaging", category: "Gift Boxes", url: "https://images.unsplash.com/photo-1547483238-2cbf881a559f?w=400" },
];

const categories = ["Sweets", "Gift Boxes", "Shop", "Events", "Special Orders"];

const GalleryAdmin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredImages = mockImages.filter((image) => {
    const matchesSearch = image.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory;
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
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
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
              <form className="space-y-4">
                <div>
                  <Label htmlFor="title">Image Title</Label>
                  <Input id="title" placeholder="Enter image title" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="url">Image URL</Label>
                  <Input id="url" placeholder="Enter image URL" />
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
                src={image.url}
                alt={image.title}
                className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={() => setPreviewImage(image.url)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive">
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
