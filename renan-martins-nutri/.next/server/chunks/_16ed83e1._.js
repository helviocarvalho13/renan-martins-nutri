module.exports=[94748,e=>e.a(async(t,a)=>{try{var n=e.i(75705),o=e.i(35839),i=e.i(75225),r=e.i(67974),s=e.i(3395),l=t([n,r]);function c(e){if(!e)return e;let t=e.match(/^(\d{4})-(\d{2})-(\d{2})$/);return t?`${t[3]}/${t[2]}/${t[1]}`:e}async function d({userId:e,type:t,title:a,message:i,appointmentId:r}){try{await n.db.insert(o.notifications).values({userId:e,type:t,title:a,message:i,appointmentId:r??null})}catch(e){console.error("[createNotification] Error:",e)}}async function p(){let e=await n.db.select({id:o.user.id}).from(o.user).where((0,i.eq)(o.user.role,"ADMIN")).limit(1);return e[0]?.id??null}async function u(e){let t=await n.db.select({name:o.user.name}).from(o.user).where((0,i.eq)(o.user.id,e)).limit(1);return t[0]?.name||"Paciente"}async function m(t,a,n,o,i,l,p,u="PRESENCIAL"){let f="ONLINE"===u?"Online":"Presencial";if(await d({userId:l,type:"APPOINTMENT_CREATED",title:"Nova consulta agendada",message:`${t} agendou uma consulta para ${c(a)} \xe0s ${n} (${f}).`,appointmentId:i}),p){await d({userId:p,type:"APPOINTMENT_CREATED",title:"Consulta agendada",message:`Sua consulta foi agendada para ${c(a)} \xe0s ${n}. Aguardando confirma\xe7\xe3o.`,appointmentId:i});let l=await (0,r.getPatientEmail)(p);if(l){let{subject:e,html:i}=s.newAppointment(t,a,n,o);await (0,r.sendEmail)(l,e,i)}try{let{sendWhatsApp:i,buildWhatsAppMessage:r,getPatientPhone:s}=await e.A(7394),l=await s(p);if(l){let e=await r(t,o,c(a),n,u);await i(l,e)}}catch(e){console.error("[notifyNewAppointment] WhatsApp error:",e)}}let g=await (0,r.getAdminEmail)();if(g){let{subject:e,html:i}=s.newAppointmentAdmin(t,a,n,o);await (0,r.sendEmail)(g,e,i)}}async function f(t,a,l,p,m){let f=await u(t);await d({userId:t,type:"APPOINTMENT_CONFIRMED",title:"Consulta confirmada",message:`Sua consulta para ${c(a)} \xe0s ${l} foi confirmada.`,appointmentId:m});let g=await (0,r.getPatientEmail)(t);if(g){let{subject:e,html:t}=s.appointmentConfirmedPatient(f,a,l,p);await (0,r.sendEmail)(g,e,t)}try{let{sendWhatsApp:r,buildWhatsAppMessage:s}=await e.A(7394),d=await n.db.select({phone:o.user.phone}).from(o.user).where((0,i.eq)(o.user.id,t)).limit(1),u=d[0]?.phone;if(u){let e=await s(f,p,c(a),l);await r(u,e)}}catch(e){console.error("[notifyAppointmentConfirmed] WhatsApp error:",e)}}async function g(e,t,a,n){let o=await u(e);await d({userId:e,type:"APPOINTMENT_CANCELLED",title:"Consulta cancelada",message:`Sua consulta para ${c(t)} \xe0s ${a} foi cancelada pela cl\xednica.`,appointmentId:n});let i=await (0,r.getPatientEmail)(e);if(i){let{subject:e,html:n}=s.appointmentCancelledPatient(o,t,a);await (0,r.sendEmail)(i,e,n)}}async function h(e,t,a,n){let o=await u(e),i=await p();i&&await d({userId:i,type:"APPOINTMENT_CANCELLED",title:"Consulta cancelada pelo paciente",message:`${o} cancelou a consulta de ${c(t)} \xe0s ${a}.`,appointmentId:n}),await d({userId:e,type:"APPOINTMENT_CANCELLED",title:"Consulta cancelada",message:`Sua consulta para ${c(t)} \xe0s ${a} foi cancelada.`,appointmentId:n});let l=await (0,r.getAdminEmail)();if(l){let{subject:e,html:n}=s.appointmentCancelledAdmin(o,t,a);await (0,r.sendEmail)(l,e,n)}}async function x(e,t,a,n,o){let i=await u(e);await d({userId:e,type:"APPOINTMENT_COMPLETED",title:"Consulta concluída",message:`Sua consulta de ${c(t)} foi marcada como conclu\xedda. Obrigado!`,appointmentId:o});let l=await (0,r.getPatientEmail)(e);if(l){let{subject:e,html:o}=s.appointmentCompleted(i,t,a,n);await (0,r.sendEmail)(l,e,o)}}async function y(e,t){let a=await u(e);await d({userId:e,type:"GENERAL",title:"Sugestão de retorno",message:`O Renan sugeriu seu retorno para ${c(t)}.`});let n=await (0,r.getPatientEmail)(e);if(n){let{subject:e,html:o}=s.returnSuggestion(a,t);await (0,r.sendEmail)(n,e,o)}}async function w(e,t,a,n){let o=await u(e);await d({userId:e,type:"GENERAL",title:"Ausência registrada",message:`Sua consulta de ${c(t)} \xe0s ${a} foi marcada como aus\xeancia.`,appointmentId:n});let i=await (0,r.getPatientEmail)(e);if(i){let{subject:e,html:n}=s.noShow(o,t,a);await (0,r.sendEmail)(i,e,n)}}async function E(e,t,a,n){let o=await u(e);await d({userId:e,type:"APPOINTMENT_CONFIRMED",title:"Consulta reagendada",message:`Sua consulta foi reagendada para ${c(t)} \xe0s ${a}.`,appointmentId:n});let i=await (0,r.getPatientEmail)(e);if(i){let{subject:e,html:n}=s.appointmentRescheduled(o,t,a);await (0,r.sendEmail)(i,e,n)}}[n,r]=l.then?(await l)():l,e.s(["createNotification",()=>d,"getAdminUserId",()=>p,"getPatientName",()=>u,"notifyAppointmentCancelledByAdmin",()=>g,"notifyAppointmentCancelledByPatient",()=>h,"notifyAppointmentCompleted",()=>x,"notifyAppointmentConfirmed",()=>f,"notifyAppointmentRescheduled",()=>E,"notifyNewAppointment",()=>m,"notifyNoShow",()=>w,"notifyReturnSuggestion",()=>y]),a()}catch(e){a(e)}},!1),67974,e=>e.a(async(t,a)=>{try{var n=e.i(75705),o=e.i(35839),i=e.i(75225),r=t([n]);[n]=r.then?(await r)():r;let d=process.env.RESEND_FROM_EMAIL||"Renan Martins Nutricionista <noreply@renanmartins.com.br>";async function s(e,t,a){let n=process.env.RESEND_API_KEY;if(!n)return console.warn("[email/sender] RESEND_API_KEY not configured. Skipping email."),!1;try{let o=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify({from:d,to:[e],subject:t,html:a})});if(!o.ok){let e=await o.text();return console.error("[email/sender] Resend API error:",o.status,e),!1}let i=await o.json();return console.log("[email/sender] Email sent:",i.id),!0}catch(e){return console.error("[email/sender] Failed to send email:",e),!1}}async function l(e){let t=await n.db.select({email:o.user.email}).from(o.user).where((0,i.eq)(o.user.id,e)).limit(1);return t[0]?.email??null}async function c(){let e=await n.db.select({email:o.user.email}).from(o.user).where((0,i.eq)(o.user.role,"ADMIN")).limit(1);return e[0]?.email??null}e.s(["getAdminEmail",()=>c,"getPatientEmail",()=>l,"sendEmail",()=>s]),a()}catch(e){a(e)}},!1),3395,e=>{"use strict";let t="#1a1a1a",a="#2563eb",n="#f5f5f5";function o(e){return`<!DOCTYPE html>
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
    `)}}function d(e,a,n,r){return{subject:"Lembrete: sua consulta é amanhã!",html:o(`
      <h2 style="margin:0 0 8px;color:${t};font-size:18px;">Lembrete de consulta 🔔</h2>
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Ol\xe1, <strong>${e}</strong>! Este \xe9 um lembrete de que sua consulta \xe9 <strong>amanh\xe3</strong>.
      </p>
      ${i(a,n,r)}
      <p style="color:#555;font-size:14px;line-height:1.6;">
        Caso precise cancelar, fa\xe7a com pelo menos 12 horas de anteced\xeancia.
      </p>
    `)}}function p(e,n){return{subject:"Redefinição de senha - Renan Martins Nutricionista",html:o(`
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
    `)}}function h(e,n){return{subject:"Hora de agendar seu retorno!",html:o(`
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
    `)}}e.s(["appointmentCancelledAdmin",()=>c,"appointmentCancelledPatient",()=>l,"appointmentCompleted",()=>m,"appointmentConfirmedPatient",()=>s,"appointmentRescheduled",()=>g,"newAppointment",()=>u,"newAppointmentAdmin",()=>r,"noShow",()=>f,"passwordReset",()=>p,"reminder24h",()=>d,"returnSuggestion",()=>h])},82773,e=>e.a(async(t,a)=>{try{var n=e.i(89171),o=e.i(75705),i=e.i(35839),r=e.i(75225),s=e.i(67974),l=e.i(3395),c=e.i(94748),d=t([o,s,c]);async function p(e){let t=e.headers.get("Authorization"),a=process.env.CRON_SECRET;if(!a)return n.NextResponse.json({error:"CRON_SECRET not configured"},{status:403});if(t!==`Bearer ${a}`)return n.NextResponse.json({error:"Unauthorized"},{status:401});let d=new Date,p=new Date(d.toLocaleString("en-US",{timeZone:"America/Sao_Paulo"}));p.setDate(p.getDate()+1);let u=p.toISOString().split("T")[0],m=await o.db.select().from(i.appointments).where((0,r.and)((0,r.eq)(i.appointments.date,u),(0,r.eq)(i.appointments.status,"CONFIRMED")));if(0===m.length)return n.NextResponse.json({message:"No reminders to send",count:0});let f=0;for(let e of m)try{let t=await (0,c.getPatientName)(e.patientId),a=e.startTime?.slice(0,5);await (0,c.createNotification)({userId:e.patientId,type:"APPOINTMENT_REMINDER",title:"Lembrete: consulta amanhã",message:`Sua consulta est\xe1 marcada para amanh\xe3, ${u}, \xe0s ${a}.`,appointmentId:e.id});let n=await (0,s.getPatientEmail)(e.patientId);if(n){let{subject:o,html:i}=(0,l.reminder24h)(t,u,a,e.type||"FIRST_VISIT");await (0,s.sendEmail)(n,o,i)}f++}catch(t){console.error(`[cron/reminders] Error for appointment ${e.id}:`,t)}return n.NextResponse.json({message:"Reminders sent",count:f})}[o,s,c]=d.then?(await d)():d,e.s(["GET",()=>p]),a()}catch(e){a(e)}},!1),9044,e=>e.a(async(t,a)=>{try{var n=e.i(47909),o=e.i(74017),i=e.i(96250),r=e.i(59756),s=e.i(61916),l=e.i(74677),c=e.i(69741),d=e.i(16795),p=e.i(87718),u=e.i(95169),m=e.i(32084),f=e.i(66012),g=e.i(70101),h=e.i(26937),x=e.i(10372),y=e.i(93695);e.i(52474);var w=e.i(220),E=e.i(82773),R=t([E]);[E]=R.then?(await R)():R;let $=new n.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/cron/reminders/route",pathname:"/api/cron/reminders",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/cron/reminders/route.ts",nextConfigOutput:"",userland:E}),{workAsyncStorage:N,workUnitAsyncStorage:b,serverHooks:v}=$;function C(){return(0,i.patchFetch)({workAsyncStorage:N,workUnitAsyncStorage:b})}async function A(e,t,a){$.isDev&&(0,r.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let n="/api/cron/reminders/route";n=n.replace(/\/index$/,"")||"/";let i=await $.prepare(e,t,{srcPage:n,multiZoneDraftMode:!1});if(!i)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:E,params:R,nextConfig:C,parsedUrl:A,isDraftMode:N,prerenderManifest:b,routerServerContext:v,isOnDemandRevalidate:S,revalidateOnlyGenerated:I,resolvedPathname:P,clientReferenceManifest:T,serverActionsManifest:O}=i,_=(0,c.normalizeAppPath)(n),z=!!(b.dynamicRoutes[_]||b.routes[P]),M=async()=>((null==v?void 0:v.render404)?await v.render404(e,t,A,!1):t.end("This page could not be found"),null);if(z&&!N){let e=!!b.routes[P],t=b.dynamicRoutes[_];if(t&&!1===t.fallback&&!e){if(C.experimental.adapterPath)return await M();throw new y.NoFallbackError}}let D=null;!z||$.isDev||N||(D=P,D="/index"===D?"/":D);let q=!0===$.isDev||!z,j=z&&!q;O&&T&&(0,l.setManifestsSingleton)({page:n,clientReferenceManifest:T,serverActionsManifest:O});let k=e.method||"GET",L=(0,s.getTracer)(),F=L.getActiveScopeSpan(),U={params:R,prerenderManifest:b,renderOpts:{experimental:{authInterrupts:!!C.experimental.authInterrupts},cacheComponents:!!C.cacheComponents,supportsDynamicResponse:q,incrementalCache:(0,r.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:C.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,n,o)=>$.onRequestError(e,t,n,o,v)},sharedContext:{buildId:E}},H=new d.NodeNextRequest(e),B=new d.NodeNextResponse(t),V=p.NextRequestAdapter.fromNodeNextRequest(H,(0,p.signalFromNodeResponse)(t));try{let i=async e=>$.handle(V,U).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=L.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==u.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=a.get("next.route");if(o){let t=`${k} ${o}`;e.setAttributes({"next.route":o,"http.route":o,"next.span_name":t}),e.updateName(t)}else e.updateName(`${k} ${n}`)}),l=!!(0,r.getRequestMeta)(e,"minimalMode"),c=async r=>{var s,c;let d=async({previousCacheEntry:o})=>{try{if(!l&&S&&I&&!o)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await i(r);e.fetchMetrics=U.renderOpts.fetchMetrics;let s=U.renderOpts.pendingWaitUntil;s&&a.waitUntil&&(a.waitUntil(s),s=void 0);let c=U.renderOpts.collectedTags;if(!z)return await (0,f.sendResponse)(H,B,n,U.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(n.headers);c&&(t[x.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==U.renderOpts.collectedRevalidate&&!(U.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&U.renderOpts.collectedRevalidate,o=void 0===U.renderOpts.collectedExpire||U.renderOpts.collectedExpire>=x.INFINITE_CACHE?void 0:U.renderOpts.collectedExpire;return{value:{kind:w.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:o}}}}catch(t){throw(null==o?void 0:o.isStale)&&await $.onRequestError(e,t,{routerKind:"App Router",routePath:n,routeType:"route",revalidateReason:(0,m.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:S})},!1,v),t}},p=await $.handleResponse({req:e,nextConfig:C,cacheKey:D,routeKind:o.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:b,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:I,responseGenerator:d,waitUntil:a.waitUntil,isMinimalMode:l});if(!z)return null;if((null==p||null==(s=p.value)?void 0:s.kind)!==w.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(c=p.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",S?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),N&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let u=(0,g.fromNodeOutgoingHttpHeaders)(p.value.headers);return l&&z||u.delete(x.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||u.get("Cache-Control")||u.set("Cache-Control",(0,h.getCacheControlHeader)(p.cacheControl)),await (0,f.sendResponse)(H,B,new Response(p.value.body,{headers:u,status:p.value.status||200})),null};F?await c(F):await L.withPropagatedContext(e.headers,()=>L.trace(u.BaseServerSpan.handleRequest,{spanName:`${k} ${n}`,kind:s.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},c))}catch(t){if(t instanceof y.NoFallbackError||await $.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,m.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:S})},!1,v),z)throw t;return await (0,f.sendResponse)(H,B,new Response(null,{status:500})),null}}e.s(["handler",()=>A,"patchFetch",()=>C,"routeModule",()=>$,"serverHooks",()=>v,"workAsyncStorage",()=>N,"workUnitAsyncStorage",()=>b]),a()}catch(e){a(e)}},!1),7394,e=>{e.v(t=>Promise.all(["server/chunks/_d917e2ac._.js"].map(t=>e.l(t))).then(()=>t(74353)))}];

//# sourceMappingURL=_16ed83e1._.js.map