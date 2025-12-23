import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCsrf } from "@/lib/auth";
import { getProducts, deleteProduct, getCategories, updateProduct } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// categories are loaded from API now


const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        const cats = await getCategories();
        setCategories(cats);
        console.log(data);
      } catch (err) {
        console.error('Failed to load products or categories', err);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <AdminHeader title="Products" subtitle="Manage your sweet menu" />

      <div className="p-6">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-saffron hover:bg-saffron/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                const name = (document.getElementById('name') as HTMLInputElement).value;
                const categoryId = Number(selectedCategory || 0) || null;
                const price = (document.getElementById('price') as HTMLInputElement).value;
                const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                const imageUrl = (document.getElementById('imageUrl') as HTMLInputElement).value;
                const imageThumb = (document.getElementById('imageThumb') as HTMLInputElement).value || null;
                try {
                  const csrf = await getCsrf();
                  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/products`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-csrf-token': csrf,
                    },
                    body: JSON.stringify({ name, categoryId, price, description, imageUrl, imageThumb }),
                  });
                  if (!res.ok) throw new Error('Failed to create product');
                  const created = await res.json();
                  setProducts((p) => [{ id: created.id, name: created.name, category: created.category?.name || null, price: created.price, status: created.status ?? 'Active', image: created.imageThumb || created.imageUrl }, ...p]);
                  setIsAddDialogOpen(false);
                } catch (err) {
                  console.error(err);
                }
              }}>

                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input id="name" placeholder="Enter product name" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(category:string)=>{setSelectedCategory(category)}}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" placeholder="₹ per kg" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter product description" />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
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
                          const csrf = await getCsrf();
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
                          // set preview and hidden fields
                          const img = document.getElementById('imagePreview') as HTMLImageElement | null;
                          if (img) img.src = data.thumbUrl || data.url;
                          const urlInput = document.getElementById('imageUrl') as HTMLInputElement | null;
                          if (urlInput) urlInput.value = data.url;
                          const thumbInput = document.getElementById('imageThumb') as HTMLInputElement | null;
                          if (thumbInput) thumbInput.value = data.thumbUrl || data.url;
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                    <img id="imagePreview" alt="preview" className="h-12 w-12 rounded-lg object-cover" />
                  </div>
                  <input id="imageUrl" type="hidden" />
                  <input id="imageThumb" type="hidden" />
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
                    Add Product
                  </Button>
                </div>
              </form>
            </DialogContent>

            {/* Edit dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  if (!editingProduct) return;
                  const name = (document.getElementById('name') as HTMLInputElement).value;
                  const categoryId = Number(selectedCategory || 0) || null;
                  const price = (document.getElementById('price') as HTMLInputElement).value;
                  const description = (document.getElementById('description') as HTMLTextAreaElement).value;
                  const imageUrl = (document.getElementById('imageUrl') as HTMLInputElement).value;
                  const imageThumb = (document.getElementById('imageThumb') as HTMLInputElement).value || null;
                  try {
                    const updated = await updateProduct(editingProduct.id, { name, categoryId, price, description, imageUrl, imageThumb });
                    setProducts((p) => p.map((x) => x.id === updated.id ? { ...x, ...{ name: updated.name, category: updated.category?.name || null, price: updated.price, image: updated.imageThumb || updated.imageUrl } } : x));
                    setIsEditDialogOpen(false);
                    setEditingProduct(null);
                  } catch (err) {
                    console.error(err);
                  }
                }}>
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" placeholder="Enter product name" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(category:string)=>{setSelectedCategory(category)}} value={selectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" placeholder="₹ per kg" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter product description" />
                  </div>
                  <div>
                    <Label htmlFor="image">Image</Label>
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
                            const csrf = await getCsrf();
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
                            // set preview and hidden fields
                            const img = document.getElementById('imagePreview') as HTMLImageElement | null;
                            if (img) img.src = data.thumbUrl || data.url;
                            const urlInput = document.getElementById('imageUrl') as HTMLInputElement | null;
                            if (urlInput) urlInput.value = data.url;
                            const thumbInput = document.getElementById('imageThumb') as HTMLInputElement | null;
                            if (thumbInput) thumbInput.value = data.thumbUrl || data.url;
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      />
                      <img id="imagePreview" alt="preview" className="h-12 w-12 rounded-lg object-cover" />
                    </div>
                    <input id="imageUrl" type="hidden" />
                    <input id="imageThumb" type="hidden" />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={() => { setIsEditDialogOpen(false); setEditingProduct(null); }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="flex-1 bg-saffron hover:bg-saffron/90">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </Dialog>
        </div>

        {/* Products Table */}
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image || product.imageThumb || '/placeholder.png'}
                        alt={product.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category?.name || product.category}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          // open edit dialog and prefill
                          const p = product;
                          setEditingProduct(p);
                          // prefill form fields
                          setTimeout(() => {
                            const nameEl = document.getElementById('name') as HTMLInputElement | null;
                            const priceEl = document.getElementById('price') as HTMLInputElement | null;
                            const descEl = document.getElementById('description') as HTMLTextAreaElement | null;
                            const imageEl = document.getElementById('imagePreview') as HTMLImageElement | null;
                            const imageUrlEl = document.getElementById('imageUrl') as HTMLInputElement | null;
                            const imageThumbEl = document.getElementById('imageThumb') as HTMLInputElement | null;
                            if (nameEl) nameEl.value = p.name || '';
                            if (priceEl) priceEl.value = p.price || '';
                            if (descEl) descEl.value = p.description || '';
                            if (imageEl) imageEl.src = p.image || '';
                            if (imageUrlEl) imageUrlEl.value = p.imageUrl || p.image || '';
                            if (imageThumbEl) imageThumbEl.value = p.imageThumb || '';
                            if (p.category && p.category.id) setSelectedCategory(String(p.category.id));
                          }, 10);
                          setIsEditDialogOpen(true);
                        }}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Products;
