import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useState } from "react";
import { getMe } from "@/lib/auth";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try{
      const me = await getMe();
      debugger;
      if (!me || me.role !== 'ADMIN') {
        navigate('/admin/signin');
      } else {
        setLoading(false);
      }
    }catch(err){
      navigate('/admin/signin');
    }})();
  }, [navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="ml-64">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
