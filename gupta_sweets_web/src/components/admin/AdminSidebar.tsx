import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Image,
  MessageSquare,
  Gift,
  Mail,
  Settings,
  LogOut,
  Store,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Package, label: "Products", path: "/admin/products" },
  { icon: Tag, label: "Categories", path: "/admin/categories" },
  { icon: Image, label: "Gallery", path: "/admin/gallery" },
  { icon: MessageSquare, label: "Testimonials", path: "/admin/testimonials" },
  { icon: Gift, label: "Offers", path: "/admin/offers" },
  { icon: Mail, label: "Inquiries", path: "/admin/inquiries" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminSidebar = () => {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-card border-r border-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-border px-6 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-saffron to-festival-red">
            <Store className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-foreground">
              Gupta Sweets
            </h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-saffron/10 text-saffron"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <NavLink
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <LogOut className="h-5 w-5" />
            Back to Website
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
