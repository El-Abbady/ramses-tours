import { redirect } from "@/i18n/routing";
import { createClient } from "@/lib/supabase/server";
import AdminDashboardClient from "../../../components/AdminDashboardClient";

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: "/admin/login", locale });
  }

  const { data: tours } = await supabase
    .from("tours")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: bookings } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminDashboardClient
      initialTours={tours || []}
      initialBookings={bookings || []}
      userEmail={user?.email || ""}
    />
  );
}
