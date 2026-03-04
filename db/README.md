# Database Scripts (Versionados)

Scripts SQL versionados para controle de mudancas estruturais no Supabase.

## Como usar

1. Acesse o **Supabase Dashboard** > **SQL Editor**
2. Execute os scripts em ordem numerica (00001, 00002, ..., 00011)
3. Cada script e idempotente (pode ser executado novamente sem erro)

## Scripts

| Versao | Arquivo | Descricao |
|--------|---------|-----------|
| V001 | `00001_create_enums.sql` | Enums: user_role, appointment_type, appointment_status, notification_type |
| V002 | `00002_create_profiles.sql` | Tabela profiles + trigger handle_new_user |
| V003 | `00003_create_appointments.sql` | Tabela appointments |
| V004 | `00004_create_schedule_config.sql` | Tabela schedule_config |
| V005 | `00005_create_blocked_slots.sql` | Tabela blocked_slots |
| V006 | `00006_create_testimonials.sql` | Tabela testimonials |
| V007 | `00007_create_site_content.sql` | Tabela site_content (JSONB) |
| V008 | `00008_create_notifications.sql` | Tabela notifications |
| V009 | `00009_create_chatbot_sessions.sql` | Tabela chatbot_sessions |
| V010 | `00010_create_rls_policies.sql` | Politicas RLS (Row Level Security) |
| V011 | `00011_create_admin_user.sql` | Cria usuario admin (admin@admin.com / 123456) |
| SEED | `seed.sql` | Dados iniciais (servicos, depoimentos) |

## Ordem de execucao

```
00001 → 00002 → 00003 → ... → 00010 → seed.sql → 00011
```

## Adicionando novos scripts

Ao fazer mudancas no banco, crie um novo arquivo seguindo o padrao:
```
000XX_descricao_da_mudanca.sql
```

Inclua sempre `IF NOT EXISTS` ou verificacoes para garantir idempotencia.
