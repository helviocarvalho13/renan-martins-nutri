const BRAND_COLOR = "#1a1a1a";
const ACCENT_COLOR = "#2563eb";
const BG_COLOR = "#f5f5f5";

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renan Martins Nutricionista</title>
</head>
<body style="margin:0;padding:0;background-color:${BG_COLOR};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${BG_COLOR};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:${BRAND_COLOR};padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Renan Martins</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">Nutricionista</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #eee;text-align:center;">
              <p style="margin:0;color:#999;font-size:12px;">Renan Martins Nutricionista &bull; CRN: XXXXX</p>
              <p style="margin:4px 0 0;color:#bbb;font-size:11px;">Este é um email automático. Não responda diretamente.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function appointmentBlock(date: string, time: string, type: string): string {
  const typeLabel = type === "FIRST_VISIT" ? "Primeira Consulta" : "Retorno";
  return `
    <div style="background-color:#f8f9fa;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${ACCENT_COLOR};">
      <p style="margin:0 0 4px;font-size:14px;color:#666;">📅 <strong>${date}</strong> às <strong>${time}</strong></p>
      <p style="margin:0;font-size:13px;color:#888;">Tipo: ${typeLabel}</p>
    </div>
  `;
}

export function newAppointmentAdmin(patientName: string, date: string, time: string, type: string): { subject: string; html: string } {
  return {
    subject: `Nova consulta agendada - ${patientName}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Nova consulta agendada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        <strong>${patientName}</strong> agendou uma nova consulta.
      </p>
      ${appointmentBlock(date, time, type)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Acesse o painel administrativo para confirmar ou gerenciar este agendamento.
      </p>
    `),
  };
}

export function appointmentConfirmedPatient(patientName: string, date: string, time: string, type: string): { subject: string; html: string } {
  return {
    subject: "Sua consulta foi confirmada!",
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta confirmada ✅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! Sua consulta foi confirmada.
      </p>
      ${appointmentBlock(date, time, type)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Lembre-se de comparecer no horário agendado. Caso precise cancelar, faça com pelo menos 12 horas de antecedência.
      </p>
    `),
  };
}

export function appointmentCancelledPatient(patientName: string, date: string, time: string): { subject: string; html: string } {
  return {
    subject: "Consulta cancelada",
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta cancelada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>. Sua consulta foi cancelada.
      </p>
      ${appointmentBlock(date, time, "FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Se desejar, você pode agendar uma nova consulta a qualquer momento.
      </p>
    `),
  };
}

export function appointmentCancelledAdmin(patientName: string, date: string, time: string): { subject: string; html: string } {
  return {
    subject: `Consulta cancelada por ${patientName}`,
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Consulta cancelada pelo paciente</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        <strong>${patientName}</strong> cancelou a consulta agendada.
      </p>
      ${appointmentBlock(date, time, "FIRST_VISIT")}
    `),
  };
}

export function reminder24h(patientName: string, date: string, time: string, type: string): { subject: string; html: string } {
  return {
    subject: "Lembrete: sua consulta é amanhã!",
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Lembrete de consulta 🔔</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! Este é um lembrete de que sua consulta é <strong>amanhã</strong>.
      </p>
      ${appointmentBlock(date, time, type)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Caso precise cancelar, faça com pelo menos 12 horas de antecedência.
      </p>
    `),
  };
}

export function returnSuggestion(patientName: string, suggestedDate: string): { subject: string; html: string } {
  return {
    subject: "Hora de agendar seu retorno!",
    html: baseTemplate(`
      <h2 style="margin:0 0 8px;color:${BRAND_COLOR};font-size:18px;">Sugestão de retorno 📋</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Olá, <strong>${patientName}</strong>! O nutricionista Renan Martins sugeriu uma data de retorno para você.
      </p>
      <div style="background-color:#f0f7ff;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${ACCENT_COLOR};text-align:center;">
        <p style="margin:0;font-size:16px;color:${BRAND_COLOR};font-weight:600;">📅 Data sugerida: ${suggestedDate}</p>
      </div>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Acesse a área do paciente para agendar seu retorno.
      </p>
    `),
  };
}
