import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qxevmpitaozizzttymbw.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)

// ─── Companies ───────────────────────────────────────────────────────────────

const companies = [
  {
    name: 'Maroc Telecom',
    city: 'Rabat',
    description:
      "Opérateur télécom leader au Maroc, fournissant des services mobiles, internet et TV à plus de 20 millions d'abonnés.",
    website: 'https://www.iam.ma',
    logo_url: null,
  },
  {
    name: 'OCP Group',
    city: 'Casablanca',
    description:
      "Leader mondial dans la production et l'exportation de phosphate et de produits dérivés. Groupe industriel en pleine transformation digitale.",
    website: 'https://www.ocpgroup.ma',
    logo_url: null,
  },
  {
    name: 'Attijariwafa Bank',
    city: 'Casablanca',
    description:
      "Première banque du Maroc et d'Afrique francophone, proposant des services bancaires retail, corporate et d'investissement.",
    website: 'https://www.attijariwafabank.com',
    logo_url: null,
  },
  {
    name: 'Intelcia',
    city: 'Casablanca',
    description:
      "Groupe spécialisé dans l'outsourcing, la relation client et les services IT. Présent dans plus de 15 pays.",
    website: 'https://www.intelcia.com',
    logo_url: null,
  },
  {
    name: 'Capgemini Maroc',
    city: 'Casablanca',
    description:
      "Filiale marocaine du groupe Capgemini, leader mondial en conseil, services technologiques et transformation digitale.",
    website: 'https://www.capgemini.com/ma-fr/',
    logo_url: null,
  },
  {
    name: 'Majorel Maroc',
    city: 'Rabat',
    description:
      "Fournisseur mondial de services aux clients pour les marques les plus admirées au monde. Expertise en CX digitale.",
    website: 'https://www.majorel.com',
    logo_url: null,
  },
  {
    name: 'Leyton Maroc',
    city: 'Casablanca',
    description:
      "Cabinet de conseil spécialisé dans l'optimisation fiscale, financière et le financement de l'innovation.",
    website: 'https://www.leyton.com/ma',
    logo_url: null,
  },
  {
    name: 'LaFactory',
    city: 'Casablanca',
    description:
      "Startup studio et agence digitale marocaine spécialisée dans le développement de produits tech et d'applications mobiles.",
    website: null,
    logo_url: null,
  },
]

// ─── Jobs (generated after inserting companies) ───────────────────────────────

function jobsFor(companyIds: Record<string, string>) {
  const now = new Date()
  const daysAgo = (d: number) => new Date(now.getTime() - d * 86_400_000).toISOString()

  return [
    // Maroc Telecom
    {
      title: 'Ingénieur Développement Backend Node.js',
      description: `Vous intégrerez l'équipe digitale de Maroc Telecom pour développer et maintenir les APIs REST qui alimentent nos applications mobiles et web.

**Responsabilités :**
- Concevoir et développer des APIs REST performantes avec Node.js et Express
- Assurer l'intégration avec nos systèmes BSS/OSS existants
- Participer aux revues de code et aux sessions d'architecture
- Mettre en place des tests unitaires et d'intégration

**Profil recherché :**
- Bac+5 en informatique ou école d'ingénieurs
- 3+ ans d'expérience en développement Node.js
- Maîtrise de TypeScript, REST APIs, PostgreSQL
- Connaissance de Docker et Kubernetes souhaitée`,
      city: 'Rabat',
      location: 'Rabat, Maroc',
      contract_type: 'CDI',
      is_remote: false,
      salary_min: 18000,
      salary_max: 25000,
      sector: 'Informatique',
      company_id: companyIds['Maroc Telecom'],
      created_at: daysAgo(1),
    },
    {
      title: 'Chef de Projet Digital',
      description: `Maroc Telecom recherche un Chef de Projet Digital expérimenté pour piloter la transformation numérique de nos services clients.

**Missions :**
- Coordonner les projets digitaux de bout en bout
- Gérer les équipes pluridisciplinaires (Dev, UX, Métier)
- Suivre les KPIs et rendre compte à la direction
- Animer les rituels Agile (sprints, rétrospectives)`,
      city: 'Rabat',
      location: 'Rabat, Maroc',
      contract_type: 'CDI',
      is_remote: false,
      salary_min: 20000,
      salary_max: 30000,
      sector: 'Informatique',
      company_id: companyIds['Maroc Telecom'],
      created_at: daysAgo(3),
    },

    // OCP Group
    {
      title: 'Data Scientist – Optimisation Industrielle',
      description: `Au sein de la Direction Transformation Digitale d'OCP, vous développerez des modèles prédictifs pour optimiser nos processus de production.

**Responsabilités :**
- Développer des modèles de Machine Learning pour la maintenance prédictive
- Analyser les données des capteurs industriels (IoT)
- Construire des dashboards de suivi avec Power BI ou Tableau
- Collaborer avec les équipes opérationnelles sur le terrain

**Compétences requises :**
- Python (Pandas, Scikit-learn, TensorFlow ou PyTorch)
- Expérience en traitement de séries temporelles
- Connaissance des environnements industriels appréciée`,
      city: 'Casablanca',
      location: 'Casablanca ou Khouribga',
      contract_type: 'CDI',
      is_remote: true,
      salary_min: 22000,
      salary_max: 35000,
      sector: 'Informatique',
      company_id: companyIds['OCP Group'],
      created_at: daysAgo(0),
    },
    {
      title: 'Responsable Comptabilité et Contrôle de Gestion',
      description: `OCP Group recrute un Responsable Comptabilité pour superviser les opérations comptables et participer au reporting groupe.

**Missions principales :**
- Superviser la clôture mensuelle et annuelle des comptes
- Produire les états financiers selon les normes IFRS
- Piloter le budget et les prévisions financières
- Manager une équipe de 5 comptables`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'CDI',
      is_remote: false,
      salary_min: 25000,
      salary_max: 38000,
      sector: 'Finance',
      company_id: companyIds['OCP Group'],
      created_at: daysAgo(5),
    },

    // Attijariwafa Bank
    {
      title: 'Analyste Risque Crédit',
      description: `La Direction des Risques d'Attijariwafa Bank recherche un Analyste Risque Crédit pour renforcer son équipe.

**Vos missions :**
- Analyser les dossiers de crédit entreprises et particuliers
- Évaluer la solvabilité des emprunteurs (scoring, ratios financiers)
- Rédiger les avis de crédit et participer aux comités
- Contribuer à l'amélioration des modèles de scoring internes

**Profil :**
- Bac+5 Finance, Audit ou École de Commerce
- 2-4 ans d'expérience en analyse crédit ou audit financier
- Maîtrise d'Excel et des outils d'analyse financière`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'CDI',
      is_remote: false,
      salary_min: 15000,
      salary_max: 22000,
      sector: 'Finance',
      company_id: companyIds['Attijariwafa Bank'],
      created_at: daysAgo(2),
    },
    {
      title: 'Stage – Business Analyst Digital Banking',
      description: `Dans le cadre de notre programme de stage, Attijariwafa Bank vous propose d'intégrer l'équipe Digital Banking pour 6 mois.

**Missions :**
- Analyser les parcours utilisateurs sur l'application mobile Attijari
- Rédiger les cahiers des charges fonctionnels
- Participer aux tests d'acceptation utilisateur (UAT)
- Produire des reportings d'avancement pour la direction

**Ce que nous offrons :**
- Indemnité de stage attractive
- Encadrement par des experts métier
- Possibilité de CDI à l'issue du stage`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'Stage',
      is_remote: false,
      salary_min: 4000,
      salary_max: 6000,
      sector: 'Finance',
      company_id: companyIds['Attijariwafa Bank'],
      created_at: daysAgo(0),
    },

    // Intelcia
    {
      title: 'Responsable RH – Acquisition de Talents',
      description: `Intelcia Group renforce son équipe RH et recherche un Responsable Acquisition de Talents pour piloter le recrutement de nos populations IT et BPO.

**Responsabilités :**
- Définir et déployer la stratégie de sourcing (LinkedIn, job boards, cooptation)
- Gérer l'intégralité du processus de recrutement (profil → intégration)
- Piloter les KPIs recrutement (délai, coût, qualité)
- Développer l'employer branding sur les réseaux sociaux`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'CDI',
      is_remote: false,
      salary_min: 14000,
      salary_max: 20000,
      sector: 'RH',
      company_id: companyIds['Intelcia'],
      created_at: daysAgo(4),
    },
    {
      title: 'Développeur Full Stack React / Django',
      description: `Intelcia IT Solutions recherche un développeur Full Stack pour intégrer son centre de compétences techniques.

**Stack technique :**
- Frontend : React, TypeScript, Tailwind CSS
- Backend : Django REST Framework, PostgreSQL
- DevOps : Docker, GitLab CI/CD, AWS

**Profil :**
- 2+ ans d'expérience sur les deux couches
- Capacité à travailler en mode Agile Scrum
- Bon niveau de communication en français et anglais`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'CDI',
      is_remote: true,
      salary_min: 16000,
      salary_max: 24000,
      sector: 'Informatique',
      company_id: companyIds['Intelcia'],
      created_at: daysAgo(1),
    },

    // Capgemini Maroc
    {
      title: 'Consultant SAP FI/CO Senior',
      description: `Capgemini Maroc recherche un Consultant SAP Finance & Controlling pour accompagner ses clients dans des projets de transformation ERP.

**Missions :**
- Conduire des ateliers de recueil des besoins métiers
- Paramétrer et déployer les modules SAP FI/CO
- Rédiger la documentation technique et fonctionnelle
- Former les key users et assurer le support post Go-Live

**Expérience requise :**
- 5+ ans de consulting SAP avec au moins 3 projets en phase Go-Live
- Certification SAP FI appréciée
- Disponibilité pour des déplacements ponctuels`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'CDI',
      is_remote: true,
      salary_min: 28000,
      salary_max: 42000,
      sector: 'Informatique',
      company_id: companyIds['Capgemini Maroc'],
      created_at: daysAgo(2),
    },
    {
      title: 'Ingénieur DevOps / SRE',
      description: `Au sein de la practice Cloud & Infrastructure, vous gérerez les pipelines CI/CD et assurerez la fiabilité des plateformes de nos clients.

**Responsabilités :**
- Concevoir et maintenir les pipelines CI/CD (GitLab, Jenkins)
- Gérer l'infrastructure cloud AWS/Azure avec Terraform
- Implémenter des solutions de monitoring (Datadog, Grafana)
- Participer aux astreintes et répondre aux incidents P1/P2

**Compétences :** Kubernetes, Helm, Docker, Terraform, Python/Bash`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'CDI',
      is_remote: true,
      salary_min: 20000,
      salary_max: 32000,
      sector: 'Informatique',
      company_id: companyIds['Capgemini Maroc'],
      created_at: daysAgo(0),
    },

    // Majorel Maroc
    {
      title: 'Team Leader Service Client Bilingue (FR/AR)',
      description: `Majorel Maroc recrute un Team Leader pour superviser une équipe de conseillers clients dédiée à un grand compte e-commerce.

**Missions :**
- Encadrer et coacher une équipe de 12 à 15 conseillers
- Suivre les indicateurs de performance (FCR, CSAT, AHT)
- Conduire les entretiens individuels et les sessions de calibration
- Coordonner avec les équipes qualité et formation`,
      city: 'Rabat',
      location: 'Rabat, Maroc',
      contract_type: 'CDI',
      is_remote: false,
      salary_min: 10000,
      salary_max: 14000,
      sector: 'Commerce',
      company_id: companyIds['Majorel Maroc'],
      created_at: daysAgo(6),
    },
    {
      title: 'Chargé de Marketing Digital & Content',
      description: `Majorel cherche un profil créatif et analytique pour gérer sa présence digitale au Maroc et attirer les meilleurs talents.

**Vos missions :**
- Gérer les réseaux sociaux (LinkedIn, Instagram, TikTok)
- Créer du contenu engageant (vidéos, posts, articles)
- Piloter les campagnes de performance (Google Ads, Meta)
- Analyser les performances et optimiser le ROI

**Profil :** Bac+3/5 Marketing digital, 1-3 ans d'expérience, créatif et orienté data`,
      city: 'Rabat',
      location: 'Rabat, Maroc',
      contract_type: 'CDD',
      is_remote: false,
      salary_min: 9000,
      salary_max: 13000,
      sector: 'Marketing',
      company_id: companyIds['Majorel Maroc'],
      created_at: daysAgo(3),
    },

    // Leyton Maroc
    {
      title: 'Consultant Financement de l\'Innovation (CIR/CII)',
      description: `Leyton Maroc recherche un consultant pour accompagner ses clients dans l'optimisation de leurs financements publics à l'innovation.

**Missions :**
- Identifier et qualifier les dépenses éligibles au CIR/CII
- Rédiger les dossiers techniques de demande de financement
- Animer des réunions avec les équipes R&D client
- Effectuer une veille sur les dispositifs de financement publics

**Profil :**
- Bac+5 École d'ingénieurs ou équivalent
- Curiosité pour les sujets transverses (tech, pharma, industrie)
- Excellent niveau de rédaction en français`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'CDI',
      is_remote: true,
      salary_min: 13000,
      salary_max: 18000,
      sector: 'Finance',
      company_id: companyIds['Leyton Maroc'],
      created_at: daysAgo(7),
    },

    // LaFactory
    {
      title: 'Développeur Mobile React Native',
      description: `LaFactory, studio digital marocain, recherche un développeur React Native pour travailler sur des applications innovantes pour ses clients startups et grands comptes.

**Ce que tu vas faire :**
- Développer des apps iOS et Android avec React Native + Expo
- Intégrer des APIs REST et GraphQL
- Collaborer directement avec les designers et les PMs
- Livrer des apps de qualité production

**Stack :** React Native, TypeScript, Expo, Zustand, React Query

**Ce qu'on offre :**
- Équipe jeune et bienveillante
- Projets variés (fintech, logistique, e-commerce)
- Télétravail 3 jours/semaine
- Formation continue`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'CDI',
      is_remote: true,
      salary_min: 15000,
      salary_max: 22000,
      sector: 'Informatique',
      company_id: companyIds['LaFactory'],
      created_at: daysAgo(0),
    },
    {
      title: 'Stage – UX/UI Designer',
      description: `Tu veux concevoir des produits digitaux utilisés par des milliers de Marocains ? Rejoins LaFactory pour un stage de 4 à 6 mois.

**Ce que tu vas apprendre :**
- Mener des entretiens utilisateurs et analyser les insights
- Concevoir des wireframes et prototypes sur Figma
- Créer des design systems cohérents
- Collaborer avec les devs pour assurer la faisabilité

**Profil :**
- Étudiant en design, HCI, ou école d'art appliqué
- Portfolio de projets UX (même personnels ou académiques)
- Curiosité, rigueur et sens de l'esthétique

Indemnité : 5 000 MAD/mois`,
      city: 'Casablanca',
      location: 'Casablanca, Maroc',
      contract_type: 'Stage',
      is_remote: false,
      salary_min: 5000,
      salary_max: 5000,
      sector: 'Informatique',
      company_id: companyIds['LaFactory'],
      created_at: daysAgo(2),
    },
    {
      title: 'Freelance – Développeur Next.js / TypeScript',
      description: `LaFactory a régulièrement besoin de développeurs freelance pour renforcer ses équipes sur des missions de 1 à 3 mois.

**Mission type :**
- Développement de fonctionnalités frontend et backend
- Intégration de maquettes Figma au pixel
- Mise en place de tests et revue de code

**Stack :** Next.js 15, TypeScript, Tailwind CSS, Supabase/Prisma

**Tarif :** 500 à 700 MAD/jour selon expérience`,
      city: 'Casablanca',
      location: 'Full remote possible',
      contract_type: 'Freelance',
      is_remote: true,
      salary_min: null,
      salary_max: null,
      sector: 'Informatique',
      company_id: companyIds['LaFactory'],
      created_at: daysAgo(1),
    },
  ]
}

// ─── Clear ───────────────────────────────────────────────────────────────────

async function clear() {
  console.log('🗑️  Clearing existing data…')
  // Delete in FK-safe order: applications → jobs → companies
  for (const table of ['applications', 'jobs', 'companies'] as const) {
    const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000')
    if (error) {
      console.error(`❌ Failed to clear ${table}:`, error.message)
      process.exit(1)
    }
    console.log(`   cleared ${table}`)
  }
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function seed() {
  if (process.argv.includes('--clear')) {
    await clear()
  }

  console.log('🌱 Seeding companies…')

  const { data: insertedCompanies, error: companyError } = await supabase
    .from('companies')
    .insert(companies)
    .select('id, name')

  if (companyError) {
    console.error('❌ Company insert failed:', companyError.message)
    process.exit(1)
  }

  console.log(`✅ Inserted ${insertedCompanies.length} companies`)

  const companyIds: Record<string, string> = {}
  for (const c of insertedCompanies) {
    companyIds[c.name] = c.id
  }

  console.log('🌱 Seeding jobs…')

  const jobs = jobsFor(companyIds)

  const { data: insertedJobs, error: jobError } = await supabase
    .from('jobs')
    .insert(jobs)
    .select('id, title')

  if (jobError) {
    console.error('❌ Job insert failed:', jobError.message)
    process.exit(1)
  }

  console.log(`✅ Inserted ${insertedJobs.length} jobs`)
  console.log('\nDone! 🎉')
}

seed()
