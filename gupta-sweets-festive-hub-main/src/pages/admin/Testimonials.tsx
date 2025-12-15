import { useState } from "react";
import { Plus, Search, Edit, Trash2, Star, MoreVertical } from "lucide-react";
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

const mockTestimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Delhi",
    rating: 5,
    review: "Best sweets in town! The Kaju Katli is absolutely divine. We've been ordering from Gupta Sweets for all our family functions.",
    date: "2024-01-15",
    featured: true,
  },
  {
    id: 2,
    name: "Priya Gupta",
    location: "Mumbai",
    rating: 5,
    review: "Amazing quality and taste. The Diwali gift boxes were a huge hit among our relatives. Highly recommended!",
    date: "2024-01-10",
    featured: true,
  },
  {
    id: 3,
    name: "Amit Kumar",
    location: "Bangalore",
    rating: 4,
    review: "Ordered for my daughter's wedding. Everyone loved the sweets. Will definitely order again.",
    date: "2024-01-05",
    featured: false,
  },
  {
    id: 4,
    name: "Sneha Patel",
    location: "Ahmedabad",
    rating: 5,
    review: "The authentic taste of traditional Indian sweets. Feels like homemade!",
    date: "2023-12-28",
    featured: false,
  },
];

const Testimonials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredTestimonials = mockTestimonials.filter((testimonial) =>
    testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    testimonial.review.toLowerCase().includes(searchQuery.toLowerCase())
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
              <form className="space-y-4">
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
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" className="text-gold hover:scale-110 transition-transform">
                        <Star className="h-6 w-6 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="review">Review</Label>
                  <Textarea id="review" placeholder="Enter customer review" rows={4} />
                </div>
                <div className="flex items-center justify-between">
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

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron/10 text-lg font-semibold text-saffron">
                    {testimonial.name.charAt(0)}
                  </div>
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
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
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
