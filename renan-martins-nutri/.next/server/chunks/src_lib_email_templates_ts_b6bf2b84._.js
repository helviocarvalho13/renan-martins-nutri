module.exports=[3395,e=>{"use strict";let o="#1a1a1a",n="#2563eb",t="#f5f5f5";function a(e){return`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renan Martins Nutricionista</title>
</head>
<body style="margin:0;padding:0;background-color:${t};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${t};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:${o};padding:24px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;letter-spacing:-0.5px;">Renan Martins</h1>
              <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">Nutricionista</p>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              ${e}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 24px;border-top:1px solid #eee;text-align:center;">
              <p style="margin:0;color:#999;font-size:12px;">Renan Martins Nutricionista &bull; CRN: XXXXX</p>
              <p style="margin:4px 0 0;color:#bbb;font-size:11px;">Este \xe9 um email autom\xe1tico. N\xe3o responda diretamente.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`}function r(e,o,t){return`
    <div style="background-color:#f8f9fa;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${n};">
      <p style="margin:0 0 4px;font-size:14px;color:#666;">📅 <strong>${e}</strong> \xe0s <strong>${o}</strong></p>
      <p style="margin:0;font-size:13px;color:#888;">Tipo: ${"FIRST_VISIT"===t?"Consulta":"Retorno"}</p>
    </div>
  `}function i(e,n,t,i){return{subject:`Nova consulta agendada - ${e}`,html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Nova consulta agendada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        <strong>${e}</strong> agendou uma nova consulta.
      </p>
      ${r(n,t,i)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Acesse o painel administrativo para confirmar ou gerenciar este agendamento.
      </p>
    `)}}function s(e,n,t,i){return{subject:"Sua consulta foi confirmada!",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Consulta confirmada ✅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Sua consulta foi confirmada.
      </p>
      ${r(n,t,i)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Lembre-se de comparecer no hor\xe1rio agendado. Caso precise cancelar, fa\xe7a com pelo menos 12 horas de anteced\xeancia.
      </p>
    `)}}function l(e,n,t){return{subject:"Consulta cancelada",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Consulta cancelada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>. Sua consulta foi cancelada.
      </p>
      ${r(n,t,"FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Se desejar, voc\xea pode agendar uma nova consulta a qualquer momento.
      </p>
    `)}}function p(e,n,t){return{subject:`Consulta cancelada por ${e}`,html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Consulta cancelada pelo paciente</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        <strong>${e}</strong> cancelou a consulta agendada.
      </p>
      ${r(n,t,"FIRST_VISIT")}
    `)}}function c(e,n,t,i){return{subject:"Lembrete: sua consulta é amanhã!",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Lembrete de consulta 🔔</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Este \xe9 um lembrete de que sua consulta \xe9 <strong>amanh\xe3</strong>.
      </p>
      ${r(n,t,i)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Caso precise cancelar, fa\xe7a com pelo menos 12 horas de anteced\xeancia.
      </p>
    `)}}function d(e,t){return{subject:"Redefinição de senha - Renan Martins Nutricionista",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Redefini\xe7\xe3o de senha 🔐</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Recebemos uma solicita\xe7\xe3o para redefinir a senha da sua conta.
      </p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${t}" style="display:inline-block;background-color:${n};color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:15px;font-weight:600;">
          Redefinir minha senha
        </a>
      </div>
      <p style="color:#777;font-size:13px;line-height:1.6;">
        Se voc\xea n\xe3o solicitou a redefini\xe7\xe3o de senha, ignore este email. Seu acesso permanece seguro.
      </p>
      <p style="color:#aaa;font-size:12px;line-height:1.6;">
        Este link \xe9 v\xe1lido por 1 hora. Caso expire, solicite um novo na tela de login.
      </p>
    `)}}function x(e,n,t,i){return{subject:"Consulta agendada - Aguardando confirmação",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Consulta agendada! ✅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Sua consulta foi agendada e est\xe1 aguardando confirma\xe7\xe3o.
      </p>
      ${r(n,t,i)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Em breve voc\xea receber\xe1 a confirma\xe7\xe3o do seu hor\xe1rio. Caso precise cancelar, fa\xe7a com pelo menos 12 horas de anteced\xeancia.
      </p>
    `)}}function u(e,n,t,i){return{subject:"Consulta concluída - Obrigado!",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Consulta conclu\xedda 🎉</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Sua consulta foi marcada como conclu\xedda.
      </p>
      ${r(n,t,i)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Obrigado por confiar no trabalho do nutricionista Renan Martins. Acesse a \xe1rea do paciente para acompanhar seu progresso.
      </p>
    `)}}function g(e,n,t){return{subject:"Ausência registrada na sua consulta",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Aus\xeancia registrada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>. Sua presen\xe7a n\xe3o foi registrada na consulta agendada.
      </p>
      ${r(n,t,"FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Se isso foi um engano, entre em contato. Voc\xea pode agendar uma nova consulta a qualquer momento.
      </p>
    `)}}function f(e,n,t){return{subject:"Sua consulta foi reagendada",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Consulta reagendada 📅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Sua consulta foi reagendada.
      </p>
      ${r(n,t,"FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Verifique o novo hor\xe1rio na \xe1rea do paciente. Qualquer d\xfavida, entre em contato.
      </p>
    `)}}function h(e,t){return{subject:"Hora de agendar seu retorno!",html:a(`
      <h2 style="margin:0 0 8px;color:${o};font-size:18px;">Sugest\xe3o de retorno 📋</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! O nutricionista Renan Martins sugeriu uma data de retorno para voc\xea.
      </p>
      <div style="background-color:#f0f7ff;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${n};text-align:center;">
        <p style="margin:0;font-size:16px;color:${o};font-weight:600;">📅 Data sugerida: ${t}</p>
      </div>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Acesse a \xe1rea do paciente para agendar seu retorno.
      </p>
    `)}}e.s(["appointmentCancelledAdmin",()=>p,"appointmentCancelledPatient",()=>l,"appointmentCompleted",()=>u,"appointmentConfirmedPatient",()=>s,"appointmentRescheduled",()=>f,"newAppointment",()=>x,"newAppointmentAdmin",()=>i,"noShow",()=>g,"passwordReset",()=>d,"reminder24h",()=>c,"returnSuggestion",()=>h])}];

//# sourceMappingURL=src_lib_email_templates_ts_b6bf2b84._.js.map