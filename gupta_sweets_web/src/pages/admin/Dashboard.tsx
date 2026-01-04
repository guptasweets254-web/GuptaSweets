import { useEffect, useState } from "react";
import {
  Package,
  Image,
  MessageSquare,
  Mail,
  TrendingUp,
  Eye,
  ShoppingBag,
  Users,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInquiries, getProducts, getGallery, getTestimonials } from "@/lib/api";

const recentOrders = [
  { id: "ORD001", customer: "Rahul Sharma", items: "Kaju Katli, Gulab Jamun", status: "Pending", amount: "₹1,250" },
  { id: "ORD002", customer: "Priya Gupta", items: "Diwali Gift Box", status: "Completed", amount: "₹2,500" },
  { id: "ORD003", customer: "Amit Kumar", items: "Rasgulla, Rasmalai", status: "Processing", amount: "₹800" },
  { id: "ORD004", customer: "Sneha Patel", items: "Wedding Bulk Order", status: "Pending", amount: "₹15,000" },
];

// Recent inquiries will be fetched from the server
const Dashboard = () => {
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [productCount, setProductCount] = useState(0);
  const [galleryCount, setGalleryCount] = useState(0);
  const [testimonialCount, setTestimonialCount] = useState(0);

  const [newProductsThisMonth, setNewProductsThisMonth] = useState(0);
  const [newImagesThisWeek, setNewImagesThisWeek] = useState(0);
  const [newTestimonialsThisMonth, setNewTestimonialsThisMonth] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [prods, gallery, testimonials, inquiries] = await Promise.all([
          getProducts(),
          getGallery(),
          getTestimonials(),
          getInquiries(5),
        ]);

        setProductCount((prods || []).length);
        setGalleryCount((gallery || []).length);
        setTestimonialCount((testimonials || []).length);

        setRecentInquiries(inquiries || []);
        setUnreadCount((inquiries || []).filter((i: any) => i.status === 'Unread').length);

        const now = new Date();
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);

        setNewProductsThisMonth((prods || []).filter((p: any) => p?.createdAt && new Date(p.createdAt) >= monthAgo).length);
        setNewImagesThisWeek((gallery || []).filter((g: any) => g?.createdAt && new Date(g.createdAt) >= weekAgo).length);
        setNewTestimonialsThisMonth((testimonials || []).filter((t: any) => t?.createdAt && new Date(t.createdAt) >= monthAgo).length);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      }
    })();
  }, []);
  return (
    <div className="min-h-screen">
      <AdminHeader title="Dashboard" subtitle="Welcome back, Admin" />

      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Products"
            value={productCount}
            change={`+${newProductsThisMonth} this month`}
            changeType={newProductsThisMonth > 0 ? "positive" : "neutral"}
            icon={Package}
            iconColor="bg-saffron"
          />
          <StatsCard
            title="Gallery Images"
            value={galleryCount}
            change={`+${newImagesThisWeek} this week`}
            changeType={newImagesThisWeek > 0 ? "positive" : "neutral"}
            icon={Image}
            iconColor="bg-festival-red"
          />
          <StatsCard
            title="Testimonials"
            value={testimonialCount}
            change={`+${newTestimonialsThisMonth} this month`}
            changeType={newTestimonialsThisMonth > 0 ? "positive" : "neutral"}
            icon={MessageSquare}
            iconColor="bg-gold"
          />
          <StatsCard
            title="Total Inquiries"
            value={recentInquiries.length}
            change={`${unreadCount} unread`}
            changeType="neutral"
            icon={Mail}
            iconColor="bg-green-600"
          />
        </div>

        {/* Secondary Stats
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Page Views"
            value="2.4K"
            change="+12% from last week"
            changeType="positive"
            icon={Eye}
            iconColor="bg-blue-600"
          />
          <StatsCard
            title="WhatsApp Orders"
            value={156}
            change="+23% this month"
            changeType="positive"
            icon={ShoppingBag}
            iconColor="bg-green-600"
          />
          <StatsCard
            title="Total Customers"
            value={892}
            change="+45 new customers"
            changeType="positive"
            icon={Users}
            iconColor="bg-purple-600"
          />
          <StatsCard
            title="Revenue"
            value="₹4.2L"
            change="+18% from last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="bg-orange-600"
          />
        </div> */}

        {/* Recent Activity */}
        <div className="mt-6 grid gap-6 lg:grid-cols-1">
          {/* Recent Orders */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent WhatsApp Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{order.amount}</p>
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

          {/* Recent Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentInquiries.map((inquiry, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-lg border border-border p-3"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-saffron/10 text-saffron">
                      {(inquiry.name || '').charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground">{inquiry.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(inquiry.createdAt).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
