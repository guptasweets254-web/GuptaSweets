import { useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { getSettings, updateSettings } from "@/lib/api";

const Settings = () => {
  const { toast } = useToast();

  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Controlled settings fields
  const [siteName, setSiteName] = useState('Gupta Sweets');
  const [tagline, setTagline] = useState('Celebrating Sweet Moments with Pure Taste & Tradition');
  const [description, setDescription] = useState('Gupta Sweets is a premium Indian sweet shop offering authentic handmade sweets made with pure desi ghee and premium ingredients.');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const [phone, setPhone] = useState('+91 98765 43210');
  const [whatsapp, setWhatsapp] = useState('+91 98765 43210');
  const [email, setEmail] = useState('info@guptasweets.com');
  const [address, setAddress] = useState('123, Sweet Lane, Near Central Market, Bareilly - 243001');
  const [mapUrl, setMapUrl] = useState('');

  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [youtube, setYoutube] = useState('');

  const [businessHours, setBusinessHours] = useState('Monday - Saturday: 9:00 AM - 9:00 PM\nSunday: 9:00 AM - 8:00 PM');
  const [zomato, setZomato] = useState('');
  const [swiggy, setSwiggy] = useState('');

  // debounce timer for autosave
  const autosaveTimer = useRef<any | null>(null);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      if (!data) return;
      setSiteName(data.siteName || siteName);
      setTagline(data.tagline || tagline);
      setDescription(data.description || description);
      setLogoUrl(data.logoUrl || null);

      setPhone(data.phone || phone);
      setWhatsapp(data.whatsapp || whatsapp);
      setEmail(data.email || email);
      setAddress(data.address || address);
      setMapUrl(data.mapUrl || '');

      setFacebook(data.facebook || '');
      setInstagram(data.instagram || '');
      setTwitter(data.twitter || '');
      setYoutube(data.youtube || '');

      setBusinessHours(data.businessHours || businessHours);
      setZomato(data.zomato || '');
      setSwiggy(data.swiggy || '');
    } catch (err) {
      console.error('Failed to load settings', err);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      const payload = {
        siteName,
        tagline,
        description,
        logoUrl,
        phone,
        whatsapp,
        email,
        address,
        mapUrl,
        facebook,
        instagram,
        twitter,
        youtube,
        businessHours,
        zomato,
        swiggy,
      };
      await updateSettings(payload);
      toast({ title: 'Settings saved', description: 'Your changes have been saved.' });
    } catch (err) {
      console.error(err);
      toast({ title: 'Save failed', description: 'Failed to save settings.' });
    }
    setIsSaving(false);
    setShowPreview(false);
  };

  // Auto-save effect
  const triggerAutoSave = () => {
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(() => {
      saveSettings();
    }, 1500);
  };

  // Load settings on mount
  useEffect(() => {
    loadSettings();
    // cleanup
    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call auto-save when fields change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFieldChange = (setter: any) => (val: any) => {
    setter(val);
    triggerAutoSave();
  };

  const handleLogoUpload = async (file: File | undefined) => {
    if (!file) return;
    try {
      const csrf = await (await import('@/lib/auth')).getCsrf();
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${import.meta.env.VITE_API_URL ?? ''}/upload`, {
        method: 'POST',
        body: fd,
        credentials: 'include',
        headers: { 'x-csrf-token': csrf },
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setLogoUrl(data.url);
    } catch (err) {
      console.error(err);
    }
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
            <TabsTrigger value="business">Business Info</TabsTrigger>
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
                    <Input id="siteName" value={siteName} onChange={(e) => onFieldChange(setSiteName)(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input id="tagline" value={tagline} onChange={(e) => onFieldChange(setTagline)(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Site Description</Label>
                  <Textarea id="description" rows={3} value={description} onChange={(e) => onFieldChange(setDescription)(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="logoFile">Site Logo</Label>
                  <div className="flex items-center gap-3">
                    <input id="logoFile" type="file" accept="image/*" className="block" onChange={(e) => handleLogoUpload(e.target.files?.[0])} />
                    <img id="logoPreview" src={logoUrl || ''} alt="logo" className="h-16 w-16 rounded-lg object-cover" />
                  </div>
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
                    <Input id="phone" value={phone} onChange={(e) => onFieldChange(setPhone)(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">WhatsApp Number</Label>
                    <Input id="whatsapp" value={whatsapp} onChange={(e) => onFieldChange(setWhatsapp)(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => onFieldChange(setEmail)(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="address">Shop Address</Label>
                  <Textarea id="address" rows={2} value={address} onChange={(e) => onFieldChange(setAddress)(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="mapUrl">Google Maps Embed URL</Label>
                  <Input id="mapUrl" value={mapUrl} onChange={(e) => onFieldChange(setMapUrl)(e.target.value)} placeholder="Enter Google Maps embed URL" />
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
                  <Input id="facebook" value={facebook} onChange={(e) => onFieldChange(setFacebook)(e.target.value)} placeholder="https://facebook.com/guptasweets" />
                </div>
                <div>
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input id="instagram" value={instagram} onChange={(e) => onFieldChange(setInstagram)(e.target.value)} placeholder="https://instagram.com/guptasweets" />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input id="twitter" value={twitter} onChange={(e) => onFieldChange(setTwitter)(e.target.value)} placeholder="https://twitter.com/guptasweets" />
                </div>
                <div>
                  <Label htmlFor="youtube">YouTube URL</Label>
                  <Input id="youtube" value={youtube} onChange={(e) => onFieldChange(setYoutube)(e.target.value)} placeholder="https://youtube.com/@guptasweets" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Business Settings */}
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update business specific details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="hours">Business Hours</Label>
                  <Textarea id="businessHours" rows={2} value={businessHours} onChange={(e) => onFieldChange(setBusinessHours)(e.target.value)} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="zomato">Zomato URL</Label>
                    <Input id="zomato" value={zomato} onChange={(e) => onFieldChange(setZomato)(e.target.value)} placeholder="https://www.zomato.com/your-restaurant" />
                  </div>
                  <div>
                    <Label htmlFor="swiggy">Swiggy URL</Label>
                    <Input id="swiggy" value={swiggy} onChange={(e) => onFieldChange(setSwiggy)(e.target.value)} placeholder="https://www.swiggy.com/your-restaurant" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>

        {/* Save Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={() => setShowPreview(true)}
            disabled={isSaving}
            className="bg-saffron hover:bg-saffron/90"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Preview & Save"}
          </Button>
        </div>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={() => setShowPreview(false)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Preview Settings</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <p className="font-medium">Site Name</p>
                <p className="text-sm text-muted-foreground">{siteName}</p>
              </div>
              <div>
                <p className="font-medium">Tagline</p>
                <p className="text-sm text-muted-foreground">{tagline}</p>
              </div>
              <div>
                <p className="font-medium">Business Hours</p>
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{businessHours}</pre>
              </div>
              <div>
                <p className="font-medium">Contact</p>
                <p className="text-sm text-muted-foreground">{phone} • {email}</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowPreview(false)}>Cancel</Button>
                <Button onClick={saveSettings} disabled={isSaving} className="bg-saffron hover:bg-saffron/90">
                  {isSaving ? 'Saving...' : 'Confirm & Save'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Settings;
