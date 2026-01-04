import { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, Star, MoreVertical } from "lucide-react";
import { getTestimonials, deleteTestimonial } from "@/lib/api";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";



const Testimonials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err) {
        console.error('Failed to load testimonials', err);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      setTestimonials((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTestimonials = testimonials.filter((testimonial) =>
    testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (testimonial.review || testimonial.text || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <AdminHeader title="Testimonials" subtitle="Manage customer reviews" />

      <div className="p-6">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search testimonials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-saffron hover:bg-saffron/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Testimonial</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault();
                const name = (document.getElementById('name') as HTMLInputElement).value;
                const location = (document.getElementById('location') as HTMLInputElement).value;
                const rating = Number((document.getElementById('rating') as HTMLInputElement).value || 5);
                const review = (document.getElementById('review') as HTMLTextAreaElement).value;
                const featured = (document.getElementById('featured') as HTMLInputElement).checked;
                const avatarUrl = (document.getElementById('avatarUrl') as HTMLInputElement).value || null;
                const avatarThumb = (document.getElementById('avatarThumb') as HTMLInputElement).value || null;
                try {
                  const csrf = await (await import('@/lib/auth')).getCsrf();
                  const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/testimonials`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-csrf-token': csrf,
                    },
                    body: JSON.stringify({ name, location, rating, text: review, featured, avatarUrl, avatarThumbUrl: avatarThumb }),
                  });
                  if (!res.ok) throw new Error('Failed to create testimonial');
                  const created = await res.json();
                  setTestimonials((p) => [{ id: created.id, name: created.name, rating: created.rating ?? 5, review: created.text, location: created.location ?? '', date: new Date(created.createdAt).toISOString().slice(0,10), featured: created.featured ?? false }, ...p]);
                  setIsAddDialogOpen(false);
                } catch (err) {
                  console.error(err);
                }
              }}>

                <div>
                  <Label htmlFor="name">Customer Name</Label>
                  <Input id="name" placeholder="Enter customer name" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Enter location" />
                </div>
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex gap-1 py-2">
                    <Input id="rating" type="number" min={1} max={5} placeholder="Rating 1-5" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="review">Review</Label>
                  <Textarea id="review" placeholder="Enter customer review" rows={4} />
                </div>
                <div>
                  <Label htmlFor="avatar">Avatar</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="avatarFile"
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
                          const img = document.getElementById('avatarPreview') as HTMLImageElement | null;
                          if (img) img.src = data.thumbUrl || data.url;
                          const urlInput = document.getElementById('avatarUrl') as HTMLInputElement | null;
                          if (urlInput) urlInput.value = data.url;
                          const thumbInput = document.getElementById('avatarThumb') as HTMLInputElement | null;
                          if (thumbInput) thumbInput.value = data.thumbUrl || data.url;
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                    <img id="avatarPreview" alt="avatar preview" className="h-12 w-12 rounded-full object-cover" />
                  </div>
                  <input id="avatarUrl" type="hidden" />
                  <input id="avatarThumb" type="hidden" />
                </div>
                <div className="items-center justify-between hidden">
                  <Label htmlFor="featured">Featured on Homepage</Label>
                  <Switch id="featured" />
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
                    Add Testimonial
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Testimonial Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Testimonial</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" onSubmit={async (e) => {
              e.preventDefault();
              if (!editingTestimonial) return;
              const name = (document.getElementById('edit-name') as HTMLInputElement).value;
              const location = (document.getElementById('edit-location') as HTMLInputElement).value;
              const rating = Number((document.getElementById('edit-rating') as HTMLInputElement).value || 5);
              const review = (document.getElementById('edit-review') as HTMLTextAreaElement).value;
              const avatarUrl = (document.getElementById('edit-avatarUrl') as HTMLInputElement).value || null;
              const avatarThumb = (document.getElementById('edit-avatarThumb') as HTMLInputElement).value || null;
              try {
                const updated = await (await import('@/lib/api')).updateTestimonial(editingTestimonial.id, { name, location, rating, text: review,  avatarUrl, avatarThumbUrl: avatarThumb });
                setTestimonials((p) => p.map((x) => x.id === updated.id ? { ...x, ...{ name: updated.name, location: updated.location, rating: updated.rating ?? 5, review: updated.text, avatarUrl: updated.avatarUrl } } : x));
                setIsEditDialogOpen(false);
                setEditingTestimonial(null);
              } catch (err) {
                console.error(err);
              }
            }}>
              <div>
                <Label htmlFor="edit-name">Customer Name</Label>
                <Input id="edit-name" placeholder="Enter customer name" />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input id="edit-location" placeholder="Enter location" />
              </div>
              <div>
                <Label htmlFor="edit-rating">Rating</Label>
                <Input id="edit-rating" type="number" min={1} max={5} placeholder="Rating 1-5" />
              </div>
              <div>
                <Label htmlFor="edit-review">Review</Label>
                <Textarea id="edit-review" placeholder="Enter customer review" rows={4} />
              </div>
              <div>
                <Label htmlFor="edit-avatar">Avatar</Label>
                <div className="flex items-center gap-3">
                  <input
                    id="edit-avatarFile"
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
                        const img = document.getElementById('edit-avatarPreview') as HTMLImageElement | null;
                        if (img) img.src = data.thumbUrl || data.url;
                        const urlInput = document.getElementById('edit-avatarUrl') as HTMLInputElement | null;
                        if (urlInput) urlInput.value = data.url;
                        const thumbInput = document.getElementById('edit-avatarThumb') as HTMLInputElement | null;
                        if (thumbInput) thumbInput.value = data.thumbUrl || data.url;
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  />
                  <img id="edit-avatarPreview" alt="avatar preview" className="h-12 w-12 rounded-full object-cover" />
                </div>
                <input id="edit-avatarUrl" type="hidden" />
                <input id="edit-avatarThumb" type="hidden" />
              </div>
              <div className="hidden items-center justify-between">
                <Label htmlFor="edit-featured">Featured on Homepage</Label>
                <Switch id="edit-featured" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => { setIsEditDialogOpen(false); setEditingTestimonial(null); }}
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

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {testimonial.avatarUrl ? (
                    <img src={testimonial.avatarUrl} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10 text-lg font-semibold text-saffron">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      const p = testimonial;
                      setEditingTestimonial(p);
                      setTimeout(() => {
                        const nameEl = document.getElementById('edit-name') as HTMLInputElement | null;
                        const locEl = document.getElementById('edit-location') as HTMLInputElement | null;
                        const reviewEl = document.getElementById('edit-review') as HTMLTextAreaElement | null;
                        const avatarEl = document.getElementById('edit-avatarPreview') as HTMLImageElement | null;
                        const avatarUrlEl = document.getElementById('edit-avatarUrl') as HTMLInputElement | null;
                        const avatarThumbEl = document.getElementById('edit-avatarThumb') as HTMLInputElement | null;
                        const featuredEl = document.getElementById('edit-featured') as HTMLInputElement | null;
                        if (nameEl) nameEl.value = p.name || '';
                        if (locEl) locEl.value = p.location || '';
                        if (reviewEl) reviewEl.value = p.review || p.text || '';
                        if (avatarEl) avatarEl.src = p.avatarUrl || '';
                        if (avatarUrlEl) avatarUrlEl.value = p.avatarUrl || '';
                        if (avatarThumbEl) avatarThumbEl.value = p.avatarThumbUrl || p.avatarThumb || '';
                        if (featuredEl) featuredEl.checked = !!p.featured;
                      }, 10);
                      setIsEditDialogOpen(true);
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(testimonial.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-gold text-gold"
                        : "text-muted"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-3 text-muted-foreground">{testimonial.review}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{testimonial.date}</span>
                {testimonial.featured && (
                  <span className="rounded-full bg-saffron/10 px-2 py-0.5 text-xs font-medium text-saffron">
                    Featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
