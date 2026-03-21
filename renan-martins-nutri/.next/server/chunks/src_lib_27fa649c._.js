module.exports=[94748,e=>e.a(async(t,a)=>{try{var n=e.i(75705),o=e.i(35839),i=e.i(75225),r=e.i(67974),s=e.i(3395),l=t([n,r]);function c(e){if(!e)return e;let t=e.match(/^(\d{4})-(\d{2})-(\d{2})$/);return t?`${t[3]}/${t[2]}/${t[1]}`:e}async function p({userId:e,type:t,title:a,message:i,appointmentId:r}){try{await n.db.insert(o.notifications).values({userId:e,type:t,title:a,message:i,appointmentId:r??null})}catch(e){console.error("[createNotification] Error:",e)}}async function d(){let e=await n.db.select({id:o.user.id}).from(o.user).where((0,i.eq)(o.user.role,"ADMIN")).limit(1);return e[0]?.id??null}async function u(e){let t=await n.db.select({name:o.user.name}).from(o.user).where((0,i.eq)(o.user.id,e)).limit(1);return t[0]?.name||"Paciente"}async function m(t,a,n,o,i,l,d,u="PRESENCIAL"){let f="ONLINE"===u?"Online":"Presencial";if(await p({userId:l,type:"APPOINTMENT_CREATED",title:"Nova consulta agendada",message:`${t} agendou uma consulta para ${c(a)} \xe0s ${n} (${f}).`,appointmentId:i}),d){await p({userId:d,type:"APPOINTMENT_CREATED",title:"Consulta agendada",message:`Sua consulta foi agendada para ${c(a)} \xe0s ${n}. Aguardando confirma\xe7\xe3o.`,appointmentId:i});let l=await (0,r.getPatientEmail)(d);if(l){let{subject:e,html:i}=s.newAppointment(t,a,n,o);await (0,r.sendEmail)(l,e,i)}try{let{sendWhatsApp:i,buildWhatsAppMessage:r,getPatientPhone:s}=await e.A(7394),l=await s(d);if(l){let e=await r(t,o,c(a),n,u);await i(l,e)}}catch(e){console.error("[notifyNewAppointment] WhatsApp error:",e)}}let g=await (0,r.getAdminEmail)();if(g){let{subject:e,html:i}=s.newAppointmentAdmin(t,a,n,o);await (0,r.sendEmail)(g,e,i)}}async function f(t,a,l,d,m){let f=await u(t);await p({userId:t,type:"APPOINTMENT_CONFIRMED",title:"Consulta confirmada",message:`Sua consulta para ${c(a)} \xe0s ${l} foi confirmada.`,appointmentId:m});let g=await (0,r.getPatientEmail)(t);if(g){let{subject:e,html:t}=s.appointmentConfirmedPatient(f,a,l,d);await (0,r.sendEmail)(g,e,t)}try{let{sendWhatsApp:r,buildWhatsAppMessage:s}=await e.A(7394),p=await n.db.select({phone:o.user.phone}).from(o.user).where((0,i.eq)(o.user.id,t)).limit(1),u=p[0]?.phone;if(u){let e=await s(f,d,c(a),l);await r(u,e)}}catch(e){console.error("[notifyAppointmentConfirmed] WhatsApp error:",e)}}async function g(e,t,a,n){let o=await u(e);await p({userId:e,type:"APPOINTMENT_CANCELLED",title:"Consulta cancelada",message:`Sua consulta para ${c(t)} \xe0s ${a} foi cancelada pela cl\xednica.`,appointmentId:n});let i=await (0,r.getPatientEmail)(e);if(i){let{subject:e,html:n}=s.appointmentCancelledPatient(o,t,a);await (0,r.sendEmail)(i,e,n)}}async function x(e,t,a,n){let o=await u(e),i=await d();i&&await p({userId:i,type:"APPOINTMENT_CANCELLED",title:"Consulta cancelada pelo paciente",message:`${o} cancelou a consulta de ${c(t)} \xe0s ${a}.`,appointmentId:n}),await p({userId:e,type:"APPOINTMENT_CANCELLED",title:"Consulta cancelada",message:`Sua consulta para ${c(t)} \xe0s ${a} foi cancelada.`,appointmentId:n});let l=await (0,r.getAdminEmail)();if(l){let{subject:e,html:n}=s.appointmentCancelledAdmin(o,t,a);await (0,r.sendEmail)(l,e,n)}}async function h(e,t,a,n,o){let i=await u(e);await p({userId:e,type:"APPOINTMENT_COMPLETED",title:"Consulta concluída",message:`Sua consulta de ${c(t)} foi marcada como conclu\xedda. Obrigado!`,appointmentId:o});let l=await (0,r.getPatientEmail)(e);if(l){let{subject:e,html:o}=s.appointmentCompleted(i,t,a,n);await (0,r.sendEmail)(l,e,o)}}async function y(e,t){let a=await u(e);await p({userId:e,type:"GENERAL",title:"Sugestão de retorno",message:`O Renan sugeriu seu retorno para ${c(t)}.`});let n=await (0,r.getPatientEmail)(e);if(n){let{subject:e,html:o}=s.returnSuggestion(a,t);await (0,r.sendEmail)(n,e,o)}}async function w(e,t,a,n){let o=await u(e);await p({userId:e,type:"GENERAL",title:"Ausência registrada",message:`Sua consulta de ${c(t)} \xe0s ${a} foi marcada como aus\xeancia.`,appointmentId:n});let i=await (0,r.getPatientEmail)(e);if(i){let{subject:e,html:n}=s.noShow(o,t,a);await (0,r.sendEmail)(i,e,n)}}async function $(e,t,a,n){let o=await u(e);await p({userId:e,type:"APPOINTMENT_CONFIRMED",title:"Consulta reagendada",message:`Sua consulta foi reagendada para ${c(t)} \xe0s ${a}.`,appointmentId:n});let i=await (0,r.getPatientEmail)(e);if(i){let{subject:e,html:n}=s.appointmentRescheduled(o,t,a);await (0,r.sendEmail)(i,e,n)}}[n,r]=l.then?(await l)():l,e.s(["createNotification",()=>p,"getAdminUserId",()=>d,"getPatientName",()=>u,"notifyAppointmentCancelledByAdmin",()=>g,"notifyAppointmentCancelledByPatient",()=>x,"notifyAppointmentCompleted",()=>h,"notifyAppointmentConfirmed",()=>f,"notifyAppointmentRescheduled",()=>$,"notifyNewAppointment",()=>m,"notifyNoShow",()=>w,"notifyReturnSuggestion",()=>y]),a()}catch(e){a(e)}},!1),67974,e=>e.a(async(t,a)=>{try{var n=e.i(75705),o=e.i(35839),i=e.i(75225),r=t([n]);[n]=r.then?(await r)():r;let p=process.env.RESEND_FROM_EMAIL||"Renan Martins Nutricionista <noreply@renanmartins.com.br>";async function s(e,t,a){let n=process.env.RESEND_API_KEY;if(!n)return console.warn("[email/sender] RESEND_API_KEY not configured. Skipping email."),!1;try{let o=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({from:p,to:[e],subject:t,html:a})});if(!o.ok){let e=await o.text();return console.error("[email/sender] Resend API error:",o.status,e),!1}let i=await o.json();return console.log("[email/sender] Email sent:",i.id),!0}catch(e){return console.error("[email/sender] Failed to send email:",e),!1}}async function l(e){let t=await n.db.select({email:o.user.email}).from(o.user).where((0,i.eq)(o.user.id,e)).limit(1);return t[0]?.email??null}async function c(){let e=await n.db.select({email:o.user.email}).from(o.user).where((0,i.eq)(o.user.role,"ADMIN")).limit(1);return e[0]?.email??null}e.s(["getAdminEmail",()=>c,"getPatientEmail",()=>l,"sendEmail",()=>s]),a()}catch(e){a(e)}},!1),3395,e=>{"use strict";let t="#1a1a1a",a="#2563eb",n="#f5f5f5";function o(e){return`<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Renan Martins Nutricionista</title>
</head>
<body style="margin:0;padding:0;background-color:${n};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:${n};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:${t};padding:24px 32px;text-align:center;">
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
</html>`}function i(e,t,n){return`
    <div style="background-color:#f8f9fa;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${a};">
      <p style="margin:0 0 4px;font-size:14px;color:#666;">📅 <strong>${e}</strong> \xe0s <strong>${t}</strong></p>
      <p style="margin:0;font-size:13px;color:#888;">Tipo: ${"FIRST_VISIT"===n?"Consulta":"Retorno"}</p>
    </div>
  `}function r(e,a,n,r){return{subject:`Nova consulta agendada - ${e}`,html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Nova consulta agendada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        <strong>${e}</strong> agendou uma nova consulta.
      </p>
      ${i(a,n,r)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Acesse o painel administrativo para confirmar ou gerenciar este agendamento.
      </p>
    `)}}function s(e,a,n,r){return{subject:"Sua consulta foi confirmada!",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Consulta confirmada ✅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Sua consulta foi confirmada.
      </p>
      ${i(a,n,r)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Lembre-se de comparecer no hor\xe1rio agendado. Caso precise cancelar, fa\xe7a com pelo menos 12 horas de anteced\xeancia.
      </p>
    `)}}function l(e,a,n){return{subject:"Consulta cancelada",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Consulta cancelada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>. Sua consulta foi cancelada.
      </p>
      ${i(a,n,"FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Se desejar, voc\xea pode agendar uma nova consulta a qualquer momento.
      </p>
    `)}}function c(e,a,n){return{subject:`Consulta cancelada por ${e}`,html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Consulta cancelada pelo paciente</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        <strong>${e}</strong> cancelou a consulta agendada.
      </p>
      ${i(a,n,"FIRST_VISIT")}
    `)}}function p(e,a,n,r){return{subject:"Lembrete: sua consulta é amanhã!",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Lembrete de consulta 🔔</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Este \xe9 um lembrete de que sua consulta \xe9 <strong>amanh\xe3</strong>.
      </p>
      ${i(a,n,r)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Caso precise cancelar, fa\xe7a com pelo menos 12 horas de anteced\xeancia.
      </p>
    `)}}function d(e,n){return{subject:"Redefinição de senha - Renan Martins Nutricionista",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Redefini\xe7\xe3o de senha 🔐</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Recebemos uma solicita\xe7\xe3o para redefinir a senha da sua conta.
      </p>
      <div style="text-align:center;margin:24px 0;">
        <a href="${n}" style="display:inline-block;background-color:${a};color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:15px;font-weight:600;">
          Redefinir minha senha
        </a>
      </div>
      <p style="color:#777;font-size:13px;line-height:1.6;">
        Se voc\xea n\xe3o solicitou a redefini\xe7\xe3o de senha, ignore este email. Seu acesso permanece seguro.
      </p>
      <p style="color:#aaa;font-size:12px;line-height:1.6;">
        Este link \xe9 v\xe1lido por 1 hora. Caso expire, solicite um novo na tela de login.
      </p>
    `)}}function u(e,a,n,r){return{subject:"Consulta agendada - Aguardando confirmação",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Consulta agendada! ✅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Sua consulta foi agendada e est\xe1 aguardando confirma\xe7\xe3o.
      </p>
      ${i(a,n,r)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Em breve voc\xea receber\xe1 a confirma\xe7\xe3o do seu hor\xe1rio. Caso precise cancelar, fa\xe7a com pelo menos 12 horas de anteced\xeancia.
      </p>
    `)}}function m(e,a,n,r){return{subject:"Consulta concluída - Obrigado!",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Consulta conclu\xedda 🎉</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Sua consulta foi marcada como conclu\xedda.
      </p>
      ${i(a,n,r)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Obrigado por confiar no trabalho do nutricionista Renan Martins. Acesse a \xe1rea do paciente para acompanhar seu progresso.
      </p>
    `)}}function f(e,a,n){return{subject:"Ausência registrada na sua consulta",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Aus\xeancia registrada</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>. Sua presen\xe7a n\xe3o foi registrada na consulta agendada.
      </p>
      ${i(a,n,"FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Se isso foi um engano, entre em contato. Voc\xea pode agendar uma nova consulta a qualquer momento.
      </p>
    `)}}function g(e,a,n){return{subject:"Sua consulta foi reagendada",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Consulta reagendada 📅</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Sua consulta foi reagendada.
      </p>
      ${i(a,n,"FIRST_VISIT")}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Verifique o novo hor\xe1rio na \xe1rea do paciente. Qualquer d\xfavida, entre em contato.
      </p>
    `)}}function x(e,n){return{subject:"Hora de agendar seu retorno!",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Sugest\xe3o de retorno 📋</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! O nutricionista Renan Martins sugeriu uma data de retorno para voc\xea.
      </p>
      <div style="background-color:#f0f7ff;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid ${a};text-align:center;">
        <p style="margin:0;font-size:16px;color:${t};font-weight:600;">📅 Data sugerida: ${n}</p>
      </div>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Acesse a \xe1rea do paciente para agendar seu retorno.
      </p>
    `)}}e.s(["appointmentCancelledAdmin",()=>c,"appointmentCancelledPatient",()=>l,"appointmentCompleted",()=>m,"appointmentConfirmedPatient",()=>s,"appointmentRescheduled",()=>g,"newAppointment",()=>u,"newAppointmentAdmin",()=>r,"noShow",()=>f,"passwordReset",()=>d,"reminder24h",()=>p,"returnSuggestion",()=>x])},7394,e=>{e.v(t=>Promise.all(["server/chunks/_2808251e._.js"].map(t=>e.l(t))).then(()=>t(74353)))}];

//# sourceMappingURL=src_lib_27fa649c._.js.map