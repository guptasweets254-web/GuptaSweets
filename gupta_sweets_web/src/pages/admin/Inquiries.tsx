import { useEffect, useState } from "react";
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
import { getInquiries, updateInquiry, deleteInquiry } from "@/lib/api";



const Inquiries = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getInquiries();
        setInquiries(data || []);
      } catch (err) {
        console.error('Failed to load enquiries', err);
      }
    })();
  }, []);

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      (inquiry.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inquiry.subject || '').toLowerCase().includes(searchQuery.toLowerCase());
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={async () => {
                          try {
                            await updateInquiry(inquiry.id, { status: inquiry.status === 'Unread' ? 'Read' : 'Unread' });
                            const updated = await getInquiries();
                            setInquiries(updated || []);
                          } catch (err) {
                            console.error('Failed to toggle status', err);
                          }
                        }}
                        title="Toggle Read"
                      >
                        {inquiry.status === 'Unread' ? <Mail className="h-4 w-4 text-festival-red" /> : <MailOpen className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={async () => {
                          if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
                          try {
                            await deleteInquiry(inquiry.id);
                            const updated = await getInquiries();
                            setInquiries(updated || []);
                          } catch (err) {
                            console.error('Failed to delete inquiry', err);
                          }
                        }}
                      >
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
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={async () => {
                      try {
                        await updateInquiry(selectedInquiry.id, { status: 'Read' });
                        const updated = await getInquiries();
                        setInquiries(updated || []);
                        const newSelected = updated.find((i: any) => i.id === selectedInquiry.id);
                        setSelectedInquiry(newSelected || null);
                      } catch (err) {
                        console.error('Failed to mark as read', err);
                      }
                    }}
                  >
                    Mark as Read
                  </Button>
                  <Button
                    className="flex-1 bg-saffron hover:bg-saffron/90"
                    onClick={async () => {
                      // open default mail client
                      if (selectedInquiry?.email) {
                        window.location.href = `mailto:${selectedInquiry.email}?subject=${encodeURIComponent(selectedInquiry.subject || 'Re: Inquiry')}`;
                      }
                      try {
                        await updateInquiry(selectedInquiry.id, { status: 'Replied' });
                        const updated = await getInquiries();
                        setInquiries(updated || []);
                        const newSelected = updated.find((i: any) => i.id === selectedInquiry.id);
                        setSelectedInquiry(newSelected || null);
                      } catch (err) {
                        console.error('Failed to mark as replied', err);
                      }
                    }}
                  >
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
