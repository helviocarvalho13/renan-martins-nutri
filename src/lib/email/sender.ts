const RESEND_API_URL = "https://api.resend.com/emails";
const FROM_EMAIL = "Renan Martins Nutricionista <noreply@renanmartins.com.br>";

export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[email/sender] RESEND_API_KEY not configured. Skipping email.");
    return false;
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [to],
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("[email/sender] Resend API error:", response.status, errorBody);
      return false;
    }

    const data = await response.json();
    console.log("[email/sender] Email sent successfully:", data.id);
    return true;
  } catch (error) {
    console.error("[email/sender] Failed to send email:", error);
    return false;
  }
}

export async function getPatientEmail(patientId: string): Promise<string | null> {
  const { createServiceRoleClient } = await import("@/lib/supabase/server");
  const supabase = createServiceRoleClient();

  const { data } = await supabase.auth.admin.getUserById(patientId);
  return data?.user?.email || null;
}

export async function getAdminEmail(): Promise<string | null> {
  const { createServiceRoleClient } = await import("@/lib/supabase/server");
  const supabase = createServiceRoleClient();

  const { data: admins } = await supabase
    .from("profiles")
    .select("id")
    .eq("role", "ADMIN")
    .limit(1);

  if (!admins || admins.length === 0) return null;

  const { data } = await supabase.auth.admin.getUserById(admins[0].id);
  return data?.user?.email || null;
}
