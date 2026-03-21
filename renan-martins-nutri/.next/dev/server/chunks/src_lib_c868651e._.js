module.exports = [
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
    });
});
}),
"[project]/src/lib/whatsapp/sender.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/src_lib_supabase_server_ts_945294b5._.js",
  "server/chunks/src_lib_whatsapp_sender_ts_f5d9de7c._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/whatsapp/sender.ts [app-route] (ecmascript)");
    });
});
}),
];