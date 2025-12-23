import { useState } from "react";
import { Save } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your changes have been saved successfully.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title="Settings" subtitle="Manage website settings" />

      <div className="p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Basic website configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input id="siteName" defaultValue="Gupta Sweets" />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" defaultValue="Celebrating Sweet Moments with Pure Taste & Tradition" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Site Description</Label>
                  <Textarea
                    id="description"
                    rows={3}
                    defaultValue="Gupta Sweets is a premium Indian sweet shop offering authentic handmade sweets made with pure desi ghee and premium ingredients."
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">Maintenance Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable the website for maintenance
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium text-foreground">Show Festive Banner</p>
                    <p className="text-sm text-muted-foreground">
                      Display festive greeting banner on homepage
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Settings */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update your business contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" defaultValue="+91 98765 43210" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="info@guptasweets.com" />
                </div>
                <div>
                  <Label htmlFor="address">Shop Address</Label>
                  <Textarea
                    id="address"
                    rows={2}
                    defaultValue="123, Sweet Lane, Near Central Market, Delhi - 110001"
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="mapUrl">Google Maps Embed URL</Label>
                    <Input id="mapUrl" placeholder="Enter Google Maps embed URL" />
                  </div>
                  <div>
                    <Label htmlFor="hours">Business Hours</Label>
                    <Input id="hours" defaultValue="9:00 AM - 9:00 PM" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Media Settings */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
                <CardDescription>Connect your social media profiles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input id="facebook" placeholder="https://facebook.com/guptasweets" />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input id="instagram" placeholder="https://instagram.com/guptasweets" />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input id="twitter" placeholder="https://twitter.com/guptasweets" />
                </div>
                <div>
                  <Label htmlFor="youtube">YouTube URL</Label>
                  <Input id="youtube" placeholder="https://youtube.com/@guptasweets" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Settings */}
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your website for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    defaultValue="Gupta Sweets - Premium Indian Sweets & Traditional Mithai"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Recommended: 50-60 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    rows={3}
                    defaultValue="Order authentic Indian sweets made with pure desi ghee. Kaju Katli, Gulab Jamun, Rasgulla & more. Perfect for Diwali, weddings & celebrations."
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Recommended: 150-160 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    defaultValue="Indian sweets, mithai, Kaju Katli, Gulab Jamun, Diwali sweets, wedding sweets"
                  />
                </div>
                <div>
                  <Label htmlFor="ogImage">OG Image</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="ogImageFile"
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
                          const img = document.getElementById('ogImagePreview') as HTMLImageElement | null;
                          if (img) img.src = data.thumbUrl || data.url;
                          const urlInput = document.getElementById('ogImage') as HTMLInputElement | null;
                          if (urlInput) urlInput.value = data.url;
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    />
                    <img id="ogImagePreview" alt="preview" className="h-12 w-12 rounded-lg object-cover" />
                  </div>
                  <input id="ogImage" type="hidden" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-saffron hover:bg-saffron/90"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
