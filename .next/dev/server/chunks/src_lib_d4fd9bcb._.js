module.exports = [
"[project]/src/lib/notifications.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/src_lib_c868651e._.js",
  "server/chunks/src_lib_fa2cb485._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/notifications.ts [app-route] (ecmascript)");
    });
});
}),
"[project]/src/lib/google-calendar.ts [app-route] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/src_lib_supabase_server_ts_945294b5._.js",
  "server/chunks/node_modules_tr46_3e4df63f._.js",
  "server/chunks/node_modules_google-auth-library_b89331ac._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_admin_abc7b40c._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_aiplatform_v1_5ecc5b69.js",
  "server/chunks/node_modules_googleapis_build_src_apis_aiplatform_v1beta1_1106a319.js",
  "server/chunks/node_modules_googleapis_build_src_apis_aiplatform_index_6d20d982.js",
  "server/chunks/node_modules_googleapis_build_src_apis_alloydb_ea714aa2._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_analytics_ce9c9784._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_analyticsadmin_d329c735._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_androidpublisher_cd3ad950._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_apigeeregistry_232c0f22._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_appengine_1469e983._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_apphub_541d2e19._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_artifactregistry_0803a731._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_authorizedbuyersmarketplace_f7158474._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_beyondcorp_5a6a55b1._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_classroom_447649b5._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_cloudbuild_899b9cde._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_cloudfunctions_8eba4da7._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_cloudidentity_a12a7bd6._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_cloudresourcemanager_9d074bc7._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_compute_alpha_a4bd5ba4.js",
  "server/chunks/node_modules_googleapis_build_src_apis_compute_beta_ef03a08c.js",
  "server/chunks/node_modules_googleapis_build_src_apis_compute_v1_6ec66e8d.js",
  "server/chunks/node_modules_googleapis_build_src_apis_compute_index_0015f67b.js",
  "server/chunks/node_modules_googleapis_build_src_apis_connectors_3a13aa66._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_container_aa8bf30b._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_containeranalysis_25bd2faf._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_content_ffb6282f._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_datacatalog_c7c5c3c3._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_datamigration_9a257375._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_dataplex_0517dcbe._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_dataproc_66270e5e._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_deploymentmanager_8f7ec1e4._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_dfareporting_1c529a3f._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_dialogflow_55af89ab._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_discoveryengine_d566a466._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_displayvideo_d1b13088._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_dlp_e8764df7._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_dns_234c1eb5._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_domains_69f73a9a._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_drive_c08d56ee._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_firebaseappcheck_217ba262._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_firestore_e326a809._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_gkehub_d3d4eb00._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_healthcare_66d1e6f9._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_iam_677c0d8c._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_logging_b5eef6c1._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_managedidentities_55cf166b._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_merchantapi_d4d2d62d._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_metastore_f83cdfcd._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_migrationcenter_14b0e1a2._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_netapp_0eefaefd._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_networkconnectivity_514049a5._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_networksecurity_816059ad._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_networkservices_5b71f3c3._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_notebooks_e4ad7d26._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_osconfig_763b96e0._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_recommender_f7207fe6._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_retail_83944188._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_run_fa5d9c9f._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_securitycenter_5c2e5dfe._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_spanner_1120b842._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_sqladmin_e050ad8e._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_storage_c638be08._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_tagmanager_2775cee1._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_tpu_24ebaac0._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_translate_07426af2._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_vmmigration_38b09ae6._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_vmwareengine_4860fdca._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_walletobjects_cd3a1a3e._.js",
  "server/chunks/node_modules_googleapis_build_src_apis_cebb67db._.js",
  "server/chunks/node_modules_googleapis_build_src_index_78c21750.js",
  "server/chunks/node_modules_googleapis_build_src_googleapis_f0de4fbc.js",
  "server/chunks/node_modules_da41a5d4._.js",
  "server/chunks/[root-of-the-server]__72e04209._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/src/lib/google-calendar.ts [app-route] (ecmascript)");
    });
});
}),
];