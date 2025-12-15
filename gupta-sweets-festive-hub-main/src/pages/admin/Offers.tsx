import { useState } from "react";
import { Plus, Edit, Trash2, MoreVertical, Calendar, Percent } from "lucide-react";
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

const mockOffers = [
  {
    id: 1,
    title: "Diwali Special",
    description: "Get 20% off on all gift boxes this Diwali season!",
    discount: "20%",
    validFrom: "2024-10-15",
    validTo: "2024-11-15",
    status: "Active",
    featured: true,
  },
  {
    id: 2,
    title: "Wedding Season Offer",
    description: "Special bulk pricing for wedding orders above ₹10,000",
    discount: "15%",
    validFrom: "2024-01-01",
    validTo: "2024-03-31",
    status: "Active",
    featured: true,
  },
  {
    id: 3,
    title: "Weekend Special",
    description: "Free delivery on orders above ₹500 every weekend",
    discount: "Free Delivery",
    validFrom: "2024-01-01",
    validTo: "2024-12-31",
    status: "Active",
    featured: false,
  },
  {
    id: 4,
    title: "New Year Celebration",
    description: "Flat 10% off on all sweets",
    discount: "10%",
    validFrom: "2023-12-25",
    validTo: "2024-01-05",
    status: "Expired",
    featured: false,
  },
];

const Offers = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <AdminHeader title="Offers" subtitle="Manage promotional offers" />

      <div className="p-6">
        {/* Actions Bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" className="text-green-600 border-green-600">
              Active ({mockOffers.filter(o => o.status === "Active").length})
            </Button>
            <Button variant="outline" className="text-muted-foreground">
              Expired ({mockOffers.filter(o => o.status === "Expired").length})
            </Button>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-saffron hover:bg-saffron/90">
                <Plus className="mr-2 h-4 w-4" />
                Add Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Offer</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="title">Offer Title</Label>
                  <Input id="title" placeholder="Enter offer title" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter offer description" />
                </div>
                <div>
                  <Label htmlFor="discount">Discount</Label>
                  <Input id="discount" placeholder="e.g., 20% or Free Delivery" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="validFrom">Valid From</Label>
                    <Input id="validFrom" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="validTo">Valid To</Label>
                    <Input id="validTo" type="date" />
                  </div>
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
                    Create Offer
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Offers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockOffers.map((offer) => (
            <div
              key={offer.id}
              className={`rounded-lg border bg-card p-6 ${
                offer.status === "Expired" ? "opacity-60" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-saffron/10">
                  <Percent className="h-6 w-6 text-saffron" />
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

              <h3 className="mt-4 text-lg font-semibold text-foreground">{offer.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{offer.description}</p>

              <div className="mt-4 flex items-center gap-2">
                <span className="rounded-full bg-gold/20 px-3 py-1 text-sm font-semibold text-gold">
                  {offer.discount}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    offer.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {offer.status}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {offer.validFrom} - {offer.validTo}
              </div>

              {offer.featured && (
                <div className="mt-3">
                  <span className="rounded-full bg-saffron/10 px-2 py-0.5 text-xs font-medium text-saffron">
                    Featured on Homepage
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
