import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const serverSupabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await serverSupabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Nao autenticado" }, { status: 401 });
  }

  if (user.user_metadata?.role !== "admin") {
    return NextResponse.json({ error: "Acesso negado" }, { status: 403 });
  }

  const body = await request.json();
  const { status } = body;

  const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
  if (!status || !validStatuses.includes(status)) {
    return NextResponse.json(
      { error: "Status invalido" },
      { status: 400 }
    );
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Erro ao atualizar agendamento" },
      { status: 500 }
    );
  }

  return NextResponse.json({ appointment: data });
}
