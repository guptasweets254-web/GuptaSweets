import { useState } from "react";
import { Search, Mail, MailOpen, Trash2, Eye } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const mockInquiries = [
  {
    id: 1,
    name: "Vikram Singh",
    email: "vikram@email.com",
    phone: "+91 98765 43210",
    subject: "Bulk order for wedding",
    message: "Hi, I'm interested in placing a bulk order for my daughter's wedding. We need around 50kg of assorted sweets including Kaju Katli, Gulab Jamun, and Ladoos. The wedding is on 15th February. Please share the pricing and availability.",
    date: "2024-01-20",
    time: "10:30 AM",
    status: "Unread",
  },
  {
    id: 2,
    name: "Anita Reddy",
    email: "anita.r@email.com",
    phone: "+91 87654 32109",
    subject: "Custom gift packaging",
    message: "Do you offer custom gift packaging for corporate gifts? We're looking for branded boxes for our company's Diwali gifts. Quantity would be around 200 boxes.",
    date: "2024-01-19",
    time: "3:45 PM",
    status: "Read",
  },
  {
    id: 3,
    name: "Rajesh Mehta",
    email: "rajesh.m@email.com",
    phone: "+91 76543 21098",
    subject: "Delivery to Mumbai",
    message: "Can you deliver to Mumbai? I want to send sweets to my parents for their anniversary. Need premium quality sweets around 2kg.",
    date: "2024-01-18",
    time: "11:15 AM",
    status: "Replied",
  },
  {
    id: 4,
    name: "Priya Sharma",
    email: "priya.s@email.com",
    phone: "+91 65432 10987",
    subject: "Ingredients inquiry",
    message: "Are your sweets made with pure desi ghee? My mother has dietary restrictions and I need to confirm the ingredients before ordering.",
    date: "2024-01-17",
    time: "2:00 PM",
    status: "Replied",
  },
  {
    id: 5,
    name: "Arun Kumar",
    email: "arun.k@email.com",
    phone: "+91 54321 09876",
    subject: "Franchise inquiry",
    message: "I'm interested in opening a Gupta Sweets franchise in Pune. Could you please share the requirements and investment details?",
    date: "2024-01-16",
    time: "9:00 AM",
    status: "Unread",
  },
];

const Inquiries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<typeof mockInquiries[0] | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInquiries = mockInquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Unread":
        return <Badge className="bg-festival-red text-white">Unread</Badge>;
      case "Read":
        return <Badge className="bg-blue-500 text-white">Read</Badge>;
      case "Replied":
        return <Badge className="bg-green-500 text-white">Replied</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title="Inquiries" subtitle="Manage contact form submissions" />

      <div className="p-6">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search inquiries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className={statusFilter === "all" ? "bg-saffron hover:bg-saffron/90" : ""}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "Unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Unread")}
                className={statusFilter === "Unread" ? "bg-festival-red hover:bg-festival-red/90" : ""}
              >
                Unread
              </Button>
              <Button
                variant={statusFilter === "Replied" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("Replied")}
                className={statusFilter === "Replied" ? "bg-green-600 hover:bg-green-600/90" : ""}
              >
                Replied
              </Button>
            </div>
          </div>
        </div>

        {/* Inquiries Table */}
        <div className="rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className={inquiry.status === "Unread" ? "bg-saffron/5" : ""}>
                  <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{inquiry.name}</p>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="max-w-xs truncate">{inquiry.subject}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{inquiry.date}</p>
                      <p className="text-xs text-muted-foreground">{inquiry.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Inquiry Detail Dialog */}
        <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedInquiry?.status === "Unread" ? (
                  <Mail className="h-5 w-5 text-festival-red" />
                ) : (
                  <MailOpen className="h-5 w-5 text-muted-foreground" />
                )}
                {selectedInquiry?.subject}
              </DialogTitle>
            </DialogHeader>
            {selectedInquiry && (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                  <div>
                    <p className="font-medium text-foreground">{selectedInquiry.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedInquiry.email}</p>
                    <p className="text-sm text-muted-foreground">{selectedInquiry.phone}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>{selectedInquiry.date}</p>
                    <p>{selectedInquiry.time}</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="text-foreground">{selectedInquiry.message}</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1">
                    Mark as Read
                  </Button>
                  <Button className="flex-1 bg-saffron hover:bg-saffron/90">
                    Reply via Email
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Inquiries;
