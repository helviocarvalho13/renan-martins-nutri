-- ============================================================
-- SEED: Site Content for Renan Martins Nutricionista
-- ============================================================

INSERT INTO site_content (section, title, content, is_active, sort_order) VALUES
(
  'hero',
  'Transforme sua saude com nutricao personalizada',
  '{
    "subtitle": "Consultas individualizadas para ajudar voce a alcancar seus objetivos de saude e bem-estar com um plano alimentar feito sob medida.",
    "cta_primary": "Agende sua Consulta",
    "cta_secondary": "Saiba mais",
    "badge": "CRN - Nutricionista Clinico",
    "stats": [
      { "icon": "users", "value": "500+", "label": "Pacientes" },
      { "icon": "star", "value": "8+", "label": "Anos de Experiencia" },
      { "icon": "heart", "value": "4.9", "label": "Avaliacao" }
    ]
  }'::jsonb,
  true,
  1
),
(
  'about',
  'Nutricao com ciencia e acolhimento',
  '{
    "subtitle": "Quem Sou Eu",
    "description": "Sou o Renan Martins, nutricionista clinico com mais de 8 anos de experiencia. Acredito que a nutricao vai alem de uma dieta - e sobre construir uma relacao saudavel com a comida e alcancar qualidade de vida.",
    "description_2": "Minha abordagem e baseada em evidencias cientificas e personalizada para cada paciente, considerando objetivos, rotina e preferencias alimentares.",
    "credentials": [
      "Formado em Nutricao pela Universidade Federal",
      "Pos-graduacao em Nutricao Clinica Funcional",
      "Especializacao em Nutricao Esportiva",
      "Membro do Conselho Regional de Nutricionistas"
    ],
    "years_experience": 8
  }'::jsonb,
  true,
  2
),
(
  'services',
  'Como posso te ajudar',
  '{
    "subtitle": "Servicos",
    "description": "Ofereco diferentes tipos de acompanhamento para atender suas necessidades especificas de saude e nutricao.",
    "items": [
      {
        "name": "Consulta Inicial",
        "description": "Avaliacao completa do estado nutricional, anamnese detalhada, definicao de objetivos e elaboracao do plano alimentar personalizado.",
        "duration_minutes": 60,
        "price_cents": 25000,
        "icon": "apple",
        "type": "FIRST_VISIT"
      },
      {
        "name": "Retorno",
        "description": "Acompanhamento da evolucao, ajustes no plano alimentar e orientacoes complementares para manter seus resultados.",
        "duration_minutes": 40,
        "price_cents": 15000,
        "icon": "target",
        "type": "RETURN"
      },
      {
        "name": "Nutricao Esportiva",
        "description": "Plano alimentar focado em performance esportiva, com estrategias de periodizacao nutricional e suplementacao.",
        "duration_minutes": 60,
        "price_cents": 30000,
        "icon": "activity",
        "type": "FIRST_VISIT"
      },
      {
        "name": "Reeducacao Alimentar",
        "description": "Programa completo para transformar sua relacao com a comida, com acompanhamento semanal e suporte continuo.",
        "duration_minutes": 50,
        "price_cents": 20000,
        "icon": "heart",
        "type": "FIRST_VISIT"
      }
    ]
  }'::jsonb,
  true,
  3
),
(
  'testimonials',
  'O que meus pacientes dizem',
  '{
    "subtitle": "Depoimentos"
  }'::jsonb,
  true,
  4
),
(
  'contact',
  'Entre em contato',
  '{
    "subtitle": "Contato",
    "description": "Ficou com alguma duvida? Entre em contato ou agende sua consulta diretamente pelo sistema.",
    "phone": "(11) 99999-9999",
    "email": "contato@renanmartins.com.br",
    "address": "Av. Paulista, 1000 - Bela Vista, Sao Paulo - SP",
    "instagram": "@renanmartins.nutri",
    "working_hours": "Segunda a Sexta, das 8h as 18h",
    "cta_title": "Pronto para comecar?",
    "cta_description": "Agende sua consulta online de forma rapida e pratica. Escolha o melhor horario para voce."
  }'::jsonb,
  true,
  5
),
(
  'footer',
  'Renan Martins Nutricionista',
  '{
    "copyright": "2024 Renan Martins. Todos os direitos reservados.",
    "links": [
      { "label": "Sobre", "href": "#sobre" },
      { "label": "Servicos", "href": "#servicos" },
      { "label": "Depoimentos", "href": "#depoimentos" },
      { "label": "Contato", "href": "#contato" }
    ]
  }'::jsonb,
  true,
  6
),
(
  'seo',
  'Renan Martins - Nutricionista',
  '{
    "meta_description": "Nutricionista Renan Martins - Consultas personalizadas para uma vida mais saudavel. Agende online.",
    "og_title": "Renan Martins - Nutricionista",
    "og_description": "Consultas personalizadas para uma vida mais saudavel. Agende online."
  }'::jsonb,
  true,
  0
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SEED: Initial approved testimonials
-- ============================================================

INSERT INTO testimonials (content, rating, is_approved) VALUES
(
  'O Renan mudou minha relacao com a comida. Em 3 meses consegui resultados que buscava ha anos. Profissional incrivel!',
  5,
  true
),
(
  'Atendimento excepcional. O plano alimentar e totalmente adaptado a minha rotina de treinos. Recomendo muito!',
  5,
  true
),
(
  'Finalmente encontrei um nutricionista que me ouve e entende minhas necessidades. As consultas sao muito completas.',
  5,
  true
)
ON CONFLICT DO NOTHING;
