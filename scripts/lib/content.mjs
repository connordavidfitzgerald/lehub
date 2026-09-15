// Every word on the site, in both languages, as the documents the dataset
// holds. This file is the seed's source of truth and is not read at build time
// — once it has run, the Studio is where the copy lives.
//
// French is Quebec French, and keeps the distinctions the English copy turns
// on: `organizing` is "organisation communautaire" and `mobilizing` is
// "mobilisation", because the About page sets one ahead of the other and a
// translation that collapsed them would lose the argument. Place names,
// Indigenous nations, and people's names are left as they are.

import {str, text, rich, richText, p} from './pt.mjs'

/** Photographs to upload, by their filename in src/assets/images. */
export const IMAGES = [
  'hero-home.jpg', 'lehub-home.png', 'wiki.png', 'reports.png',
  'hero-studio.jpg', 'about-1.png', 'about-2.jpg', 'about-3.jpg',
  'former.png', 'aboutus.png', 'contact.png', 'footer.png',
  'compass.png', 'offer-catalyst.png', 'ground.png',
  'report-1.png', 'report-2.png', 'report03.png',
  'remy.png', 'tess.png', 'amanda.png', 'jacob.png', 'juhi.png', 'Emilia.png',
]

/** An image field pointing at an uploaded asset. */
const img = (assets, file) =>
  file ? {_type: 'image', asset: {_type: 'reference', _ref: assets[file]}} : undefined

const MAILCHIMP =
  'https://lehub.us7.list-manage.com/subscribe/post?u=6da6ef9a2de17cfdceb029edc&id=d52d6ac267&f_id=0087b0e4f0'
const TRAP = 'b_6da6ef9a2de17cfdceb029edc_d52d6ac267'
const INSTAGRAM = 'https://www.instagram.com/theclimatejusticeorganizinghub'
const FACEBOOK = 'https://www.facebook.com/climatejusticeorganizingHUB'
const TESTIMONIAL_FORM =
  'https://cryptpad.fr/form/#/3/form/view/65931ccc0fee9528dc5bce72b3bdf6f5/'

// ─── Languages ──────────────────────────────────────────────────────────────

const locales = [
  {_id: 'locale-en', _type: 'locale', name: 'English', tag: 'en', isDefault: true, order: 0},
  {_id: 'locale-fr', _type: 'locale', name: 'Français', tag: 'fr', isDefault: false, order: 1},
]

// ─── Site settings ──────────────────────────────────────────────────────────

const siteSettings = (assets) => ({
  _id: 'siteSettings',
  _type: 'siteSettings',
  defaultTitle: str(
    'Le Hub — Training centre for organizers',
    'Le Hub — Centre de formation pour les personnes qui organisent',
  ),
  metaDescription: text(
    'Le Hub is a bilingual training centre for organizers and grassroots groups across so-called Canada and Québec.',
    'Le Hub est un centre de formation bilingue pour les organisateurs et organisatrices et les groupes de la base partout dans ce qu’on appelle le Canada et le Québec.',
  ),
  instagram: INSTAGRAM,
  facebook: FACEBOOK,
  // Both languages point at the English wiki because that is the only one
  // that exists today. The field is localized so a French wiki can be pointed
  // at from the Studio the day there is one, without a deploy.
  wikiUrl: str(
    'https://en.wiki.lehub.ca/index.php/Main_Page',
    'https://en.wiki.lehub.ca/index.php/Main_Page',
  ),
  nextCourse: text(
    'Next course:\nGroundswell (May 18th)',
    'Prochaine formation :\nGroundswell (18 mai)',
  ),

  footerImage: img(assets, 'footer.png'),
  contactEyebrow: text(
    'For general inquiries, training requests, or questions about our programs, reach us at:',
    'Pour toute question générale, demande de formation ou question sur nos programmes, écrivez-nous à :',
  ),
  contactEmail: 'contact@lehub.ca',
  socialEyebrow: str('Follow us on social media:', 'Suivez-nous sur les réseaux sociaux :'),
  testimonialEyebrow: text(
    'Tell us what you learned, what changed in your organizing, and where we can do better — with your name or anonymously. Your reflections keep us accountable and show funders what this work makes possible.',
    'Dites-nous ce que vous avez appris, ce qui a changé dans votre travail d’organisation et ce que nous pourrions faire mieux — avec votre nom ou de façon anonyme. Vos réflexions nous gardent redevables et montrent aux bailleurs de fonds ce que ce travail rend possible.',
  ),
  testimonialLinkLabel: str('Share a testimonial', 'Partager un témoignage'),
  testimonialUrl: TESTIMONIAL_FORM,

  newsletterAction: MAILCHIMP,
  newsletterTrap: TRAP,
  newsletterLabel: str('Subscribe to our newsletter:', 'Abonnez-vous à notre infolettre :'),
  newsletterFooterLabel: str('Sign up for our newsletter:', 'Inscrivez-vous à notre infolettre :'),
  newsletterHeading: str('Subscribe', 'S’abonner'),
  newsletterFinePrint: text(
    'Confirming opens Mailchimp in a new tab. Unsubscribe any time.',
    'La confirmation ouvre Mailchimp dans un nouvel onglet. Désabonnement en tout temps.',
  ),

  landLine: text(
    'Le Hub was founded on the territories of The Kanien’kehá:ka.',
    'Le Hub a été fondé sur les territoires des Kanien’kehá:ka.',
  ),
  landLinkLabel: str('Read more →', 'En savoir plus →'),
  landTitle: str('Land acknowledgement', 'Reconnaissance du territoire'),
  landBody: rich(
    [
      p(
        'The Organizing Hub / Le Hub de Mobilisation was founded on the territories of The Kanien’kehá:ka, who are the keepers of the Eastern Door of the Haudenosaunee Confederacy. The island called “Montreal” is known as Tiotià:ke in Kanien’kehá, and has long been a meeting place for many Indigenous nations. Le Hub team is based across Turtle Island, including Tiotià:ke, unceded Algonquin territory in rural Ontario, and Tkaronto.',
      ),
      p(
        'Our understandings of organizing have been shaped by the leadership of multiple active Indigenous struggles, including: Aamjiwnaang First Nation’s and Grassy Narrows First Nation’s fights against environmental racism in Treaty 29 and Treaty 3 territory; Neskantaga First Nation’s ongoing fight against the so-called Ring of Fire; the massive #ShutDownCanada movement of 2020 led by Wet’suwet’en land defenders; the leadership of Nehirowisiw, Innu, Abenaki and Anishinaabe land defenders in the MAMO Alliance and the km 134 blockades against commercial logging in Quebec; and global Indigenous struggles against Canadian mining across Latin America, Africa, and the Global South.',
      ),
    ],
    [
      p(
        'Le Hub de Mobilisation / The Organizing Hub a été fondé sur les territoires des Kanien’kehá:ka, gardiens et gardiennes de la Porte de l’Est de la Confédération haudenosaunee. L’île appelée « Montréal » porte le nom de Tiotià:ke en kanien’kehá, et elle est depuis longtemps un lieu de rencontre pour de nombreuses nations autochtones. L’équipe du Hub est répartie sur l’Île de la Tortue, notamment à Tiotià:ke, en territoire algonquin non cédé de l’Ontario rural, et à Tkaronto.',
      ),
      p(
        'Notre compréhension de l’organisation communautaire a été façonnée par le leadership de plusieurs luttes autochtones en cours, dont : les luttes de la Première Nation Aamjiwnaang et de la Première Nation Grassy Narrows contre le racisme environnemental sur les territoires visés par les Traités 29 et 3 ; la lutte continue de la Première Nation Neskantaga contre ce qu’on appelle le Cercle de feu ; l’immense mouvement #ShutDownCanada de 2020 mené par les défenseurs et défenseures du territoire Wet’suwet’en ; le leadership des défenseurs et défenseures du territoire nehirowisiw, innu, abénakis et anishinaabe au sein de l’Alliance MAMO et des blocages du km 134 contre la coupe forestière commerciale au Québec ; et les luttes autochtones à l’échelle mondiale contre l’industrie minière canadienne en Amérique latine, en Afrique et dans les Suds globaux.',
      ),
    ],
  ),
})

// ─── Interface labels ───────────────────────────────────────────────────────

const uiStrings = {
  _id: 'uiStrings',
  _type: 'uiStrings',
  menu: str('menu', 'menu'),
  menuClose: str('close', 'fermer'),
  close: str('close ×', 'fermer ×'),
  learnMore: str('Learn more →', 'En savoir plus →'),
  testimonialsHeading: str('Testimonials', 'Témoignages'),
  readFullTestimonial: str('Read full testimonial →', 'Lire le témoignage complet →'),
  fullTestimonialFrom: str('Full testimonial from {name}', 'Témoignage complet de {name}'),
  signUp: str('Sign up', 'Inscrivez-vous'),
  signUpHere: str('here', 'ici'),
  subscribe: str('Subscribe', 'S’abonner'),
  emailPlaceholder: str('Email', 'Courriel'),
  info: str('INFO', 'INFO'),
  pdfSuffix: str('(PDF)', '(PDF)'),
  skipToContent: str('Skip to content', 'Aller au contenu'),
}

// ─── Navigation ─────────────────────────────────────────────────────────────

const navigation = {
  _id: 'navigation',
  _type: 'navigation',
  items: [
    {
      _key: 'about',
      _type: 'navItem',
      label: str('about', 'à propos'),
      href: '/about',
      highlight: 'var(--color-lime)',
    },
    {
      _key: 'resources',
      _type: 'navItem',
      label: str('resources', 'ressources'),
      highlight: 'var(--color-blue)',
      children: [
        {
          _key: 'reports',
          _type: 'navChild',
          label: str('reports', 'rapports'),
          href: '/reports',
        },
        {
          _key: 'wiki',
          _type: 'navChild',
          label: str('wiki', 'wiki'),
          href: 'https://en.wiki.lehub.ca/index.php/Main_Page',
          external: true,
        },
      ],
    },
    {
      _key: 'offerings',
      _type: 'navItem',
      label: str('offerings', 'offres'),
      href: '/offerings',
      highlight: 'var(--color-gold)',
    },
    {
      _key: 'contact',
      _type: 'navItem',
      label: str('contact', 'contact'),
      href: '/contact',
      highlight: 'var(--color-pink-band)',
    },
    {
      _key: 'faq',
      _type: 'navItem',
      label: str('faq', 'faq'),
      href: '/faq',
      highlight: 'var(--color-purple)',
    },
  ],
}

// ─── Home page ──────────────────────────────────────────────────────────────

const homePage = (assets) => ({
  _id: 'homePage',
  _type: 'homePage',
  title: str(
    'Le Hub — Learn to organize, build movements',
    'Le Hub — Apprendre à s’organiser, bâtir des mouvements',
  ),
  heroImage: img(assets, 'hero-home.jpg'),
  heroAlt: str(
    'Organizers making banners together',
    'Des personnes fabriquent des bannières ensemble',
  ),
  heroLines: text(
    'Learn to organize,\nbuild movements.',
    'Apprendre à s’organiser,\nbâtir des mouvements.',
  ),

  aboutBandLabel: str('About', 'À propos'),
  aboutImage: img(assets, 'lehub-home.png'),
  aboutImageAlt: str('Le Hub organizers at work', 'L’équipe du Hub au travail'),
  aboutBody: richText(
    [
      'Le HUB is a bilingual training centre for organizers and grassroots groups across so-called Canada and Québec.',
      'We help communities develop the skills, strategic capacity, and solidarity required to win campaigns that shift power and improve people’s lives.',
    ],
    [
      'Le HUB est un centre de formation bilingue pour les organisateurs et organisatrices et les groupes de la base partout dans ce qu’on appelle le Canada et le Québec.',
      'Nous aidons les communautés à développer les compétences, la capacité stratégique et la solidarité nécessaires pour gagner des campagnes qui déplacent le pouvoir et améliorent la vie des gens.',
    ],
  ),
  offeringsBandLabel: str('Offerings', 'Offres'),

  resourcesBandLabel: str('Resources', 'Ressources'),
  wikiLabel: str('Wiki', 'Wiki'),
  wikiImage: img(assets, 'wiki.png'),
  reportsLabel: str('Reports', 'Rapports'),
  reportsImage: img(assets, 'reports.png'),
})

// ─── About page ─────────────────────────────────────────────────────────────

const aboutPage = (assets) => ({
  _id: 'aboutPage',
  _type: 'aboutPage',
  title: str('Le Hub — About us', 'Le Hub — À propos'),
  heroImage: img(assets, 'hero-studio.jpg'),
  heroAlt: str(
    'Organizers working together in the Le Hub studio',
    'Des personnes travaillent ensemble dans le studio du Hub',
  ),
  bandLabel: str('About us', 'À propos'),

  statement: rich(
    [
      p(
        'In 2019, youth-led climate strikes reminded the world of something history keeps proving: young people drive social change, and when they have support at the grassroots, they do what no one thought possible.',
      ),
      p(
        'We founded Le Hub in 2020 to give young organizers skills-based training built on our values — dignity and respect for all, equity and solidarity, and trust in grassroots knowledge. In 2026, after six years of learning and growth, we widened our mandate to work across all issues.',
      ),
    ],
    [
      p(
        'En 2019, les grèves pour le climat menées par des jeunes ont rappelé au monde ce que l’histoire ne cesse de démontrer : la jeunesse est un moteur de changement social, et lorsqu’elle est soutenue à la base, elle accomplit ce que personne ne croyait possible.',
      ),
      p(
        'Nous avons fondé Le Hub en 2020 pour offrir aux jeunes une formation axée sur les compétences et ancrée dans nos valeurs — la dignité et le respect pour toutes et tous, l’équité et la solidarité, et la confiance dans les savoirs de la base. En 2026, après six années d’apprentissage et de croissance, nous avons élargi notre mandat à l’ensemble des luttes.',
      ),
    ],
  ),
  statementImage: img(assets, 'about-1.png'),
  statementImageAlt: str('A climate justice banner', 'Une bannière pour la justice climatique'),

  focusImage: img(assets, 'about-3.jpg'),
  focusImageAlt: str('A Le Hub training session', 'Une formation du Hub'),
  focus: richText(
    [
      'We focus on honing the craft of organizing – supporting everyday people to build collective power and sustained action that moves beyond awareness-raising or lobbying and toward durable, transformative change.',
      'As the only national bilingual grassroots training centre in Canada, Le Hub plays a crucial role in meeting recurring and emerging organizing needs, fostering movement connections and dialogue, and helping to synthesize and amplify grassroots knowledge within a long-view of social movement development.',
    ],
    [
      'Nous nous consacrons à affiner le métier de l’organisation communautaire — accompagner les gens ordinaires dans la construction d’un pouvoir collectif et d’une action soutenue qui dépasse la sensibilisation ou le lobbying pour aller vers un changement durable et transformateur.',
      'Seul centre de formation national bilingue pour les groupes de la base au Canada, Le Hub joue un rôle crucial : répondre aux besoins récurrents et émergents en matière d’organisation, favoriser les liens et le dialogue entre les mouvements, et contribuer à synthétiser et à amplifier les savoirs de la base dans une perspective à long terme du développement des mouvements sociaux.',
    ],
  ),

  momentImage: img(assets, 'about-2.jpg'),
  moment: richText(
    [
      'We are living through times of overlapping crises — climate catastrophe, housing and worker precarity, rising authoritarianism, and deepening inequality.',
      'Now more than ever, young people and organizers of all ages need spaces to learn, reflect, and build collective power so our movements can grow, adapt, and win. This work is not only about resisting harm, but about developing the social infrastructure and political imagination needed to build a world where all life can flourish. We do this work with you because movements are strongest when organizers share tools, build solidarity, and support each other across difference.',
    ],
    [
      'Nous traversons une époque de crises qui se superposent — catastrophe climatique, précarité du logement et du travail, montée de l’autoritarisme et creusement des inégalités.',
      'Plus que jamais, les jeunes et les personnes qui organisent, à tout âge, ont besoin d’espaces pour apprendre, réfléchir et bâtir un pouvoir collectif, afin que nos mouvements puissent grandir, s’adapter et gagner. Ce travail ne consiste pas seulement à résister aux torts causés : il s’agit de développer l’infrastructure sociale et l’imagination politique nécessaires pour bâtir un monde où toute vie peut s’épanouir. Nous faisons ce travail avec vous, parce que les mouvements sont les plus forts quand les personnes qui organisent partagent leurs outils, tissent la solidarité et se soutiennent par-delà leurs différences.',
    ],
  ),

  teamBandLabel: str('Our team', 'Notre équipe'),
  advisoryBandLabel: str('Advisory board', 'Comité consultatif'),

  rootsBandLabel: str('Building from our roots', 'Bâtir à partir de nos racines'),
  rootsImage: img(assets, 'former.png'),
  rootsImageAlt: str('Le Hub members and alumni', 'Membres et ancien·nes du Hub'),
  rootsBody: richText(
    [
      'Our movements are as strong as the relationships that sustain them.',
      'We honour the dedication, care, and creativity of former members of Le Hub, whose contributions and experiments make our work possible today. Their wisdom continues to shape our pedagogy, our politics, and the ways we show up for organizers across many struggles.',
    ],
    [
      'Nos mouvements sont aussi forts que les relations qui les soutiennent.',
      'Nous saluons le dévouement, le soin et la créativité des ancien·nes membres du Hub, dont les contributions et les expérimentations rendent notre travail possible aujourd’hui. Leur sagesse continue de façonner notre pédagogie, notre politique et la manière dont nous accompagnons les personnes qui organisent dans de nombreuses luttes.',
    ],
  ),
  alumniTitle: str('Former Hub Advisors and Members', 'Ancien·nes conseiller·ères et membres du Hub'),
  alumni: [
    'Tom Liacas', 'Amara Possian', 'Jacqueline Lee-Tam', 'Sara Adams',
    'Jaouad Laaroussi', 'Mackenzie Burnett', 'Florence Lorimier-Dugas',
    'Ayo Ogunremi', 'Kenzie Harris', 'Isabelle Grondin Hernandez',
    'Zoyanne Côté', 'Florence Lachapelle', 'Caitlin Chan', 'Laura Doyle-Péan',
    'Michelle Xie', 'Amina Vance', 'Zahur Ashrafuzzaman', 'Naomi Leung',
    'Tristan Pérez', 'Shi Tao Zhang', 'Sam Lin',
    'Mara Gabriela Puentes-Benitez', 'Léonard Leclerc',
  ],

  approachBandLabel: str('Our approach', 'Notre approche'),
  approachStatement: rich(
    [
      p(
        'We teach organizing: everyday people building power through relationships, strategy, and sustained action that wins real gains and ',
        {t: 'shifts who holds power over time.', em: true},
      ),
    ],
    [
      p(
        'Nous enseignons l’organisation communautaire : des gens ordinaires qui bâtissent du pouvoir par les relations, la stratégie et une action soutenue qui arrache de vrais gains et ',
        {t: 'déplace, avec le temps, celles et ceux qui détiennent le pouvoir.', em: true},
      ),
    ],
  ),
  approachCards: [
    {
      _key: 'organizing-first',
      _type: 'approachCard',
      background: 'bg-paper',
      title: str('Organizing First', 'L’organisation d’abord'),
      body: text(
        'We put organizing ahead of mobilizing and advocacy because movements win by growing the number of people behind a cause and by building the leadership and confidence of ordinary people to act. Alongside other approaches, organizing widens what people think is possible and builds the grassroots power that makes victories last.',
        'Nous plaçons l’organisation communautaire avant la mobilisation et le plaidoyer, parce que les mouvements gagnent en augmentant le nombre de personnes derrière une cause et en développant le leadership et la confiance des gens ordinaires pour passer à l’action. Aux côtés d’autres approches, l’organisation élargit ce que les gens croient possible et construit le pouvoir de la base qui fait durer les victoires.',
      ),
    },
    {
      _key: 'how-we-teach',
      _type: 'approachCard',
      background: 'bg-band-green',
      title: str('How We Teach', 'Notre façon d’enseigner'),
      body: text(
        'Our teaching is practical, relational, and grounded in real movement experience. We cover the skills organizers name as their pain points: choosing a winnable issue, crafting demands, power mapping, developing strategy, escalating tactics, recruiting and keeping members, handling conflict, strengthening group structures, and organizing across difference. We draw on several organizing traditions, real case studies, and the knowledge participants bring. Our programs attract many youth organizers, and their urgency and experimentation sharpen the learning for everyone.',
        'Notre enseignement est pratique, relationnel et ancré dans une véritable expérience de mouvement. Nous couvrons les compétences que les personnes qui organisent nomment comme leurs points de friction : choisir un enjeu gagnable, formuler des revendications, cartographier le pouvoir, élaborer une stratégie, faire escalader les tactiques, recruter et fidéliser des membres, gérer les conflits, renforcer les structures de groupe et organiser par-delà les différences. Nous puisons dans plusieurs traditions d’organisation, dans des études de cas réelles et dans les savoirs qu’apportent les participant·es. Nos programmes attirent de nombreux et nombreuses jeunes, et leur sentiment d’urgence et leur goût de l’expérimentation aiguisent l’apprentissage de tout le monde.',
      ),
    },
    {
      _key: 'shaped-by-need',
      _type: 'approachCard',
      background: 'bg-band-pink',
      title: str('Shaped By Need', 'Façonné par les besoins'),
      body: text(
        'We decide what to teach by asking. Our programs come out of needs assessments with organizers across the country and feedback we gather after every training. Organizers tell us they want deeper strategy, more confidence building a campaign, help with conflict, and room to think through political questions together. Our trainings answer with concrete tools and space to experiment.',
        'Nous décidons quoi enseigner en posant la question. Nos programmes naissent d’évaluations des besoins menées auprès de personnes qui organisent partout au pays et des commentaires recueillis après chaque formation. On nous dit vouloir une stratégie plus approfondie, plus d’assurance pour bâtir une campagne, de l’aide face aux conflits et de la place pour réfléchir ensemble aux questions politiques. Nos formations répondent par des outils concrets et un espace pour expérimenter.',
      ),
    },
    {
      _key: 'our-areas',
      _type: 'approachCard',
      background: 'bg-paper',
      title: str('Our Areas', 'Nos champs d’action'),
      body: text(
        'Our team has organized in climate justice, tenant campaigns, student movements, mutual aid, and community campaigns. We keep learning from the movements we work in.',
        'Notre équipe a organisé en justice climatique, dans des campagnes de locataires, des mouvements étudiants, des réseaux d’entraide et des campagnes communautaires. Nous continuons d’apprendre des mouvements dans lesquels nous travaillons.',
      ),
    },
  ],
})

// ─── The pages that are a hero, a band, and a list ──────────────────────────

const offeringsPage = (assets) => ({
  _id: 'offeringsPage',
  _type: 'offeringsPage',
  title: str('Le Hub — Offerings', 'Le Hub — Offres'),
  heroImage: img(assets, 'hero-studio.jpg'),
  heroAlt: str(
    'The Le Hub studio during a work session',
    'Le studio du Hub pendant une séance de travail',
  ),
  bandLabel: str('Offerings', 'Offres'),
})

const faqPage = (assets) => ({
  _id: 'faqPage',
  _type: 'faqPage',
  title: str('Le Hub — FAQ', 'Le Hub — FAQ'),
  heroImage: img(assets, 'aboutus.png'),
  heroAlt: str(
    'The Le Hub studio during a work session',
    'Le studio du Hub pendant une séance de travail',
  ),
  bandLabel: str('FAQ', 'FAQ'),
})

const reportsPage = (assets) => ({
  _id: 'reportsPage',
  _type: 'reportsPage',
  title: str('Le Hub — Reports', 'Le Hub — Rapports'),
  heroImage: img(assets, 'reports.png'),
  heroAlt: str('A stack of binders', 'Une pile de cartables'),
  bandLabel: str('Reports', 'Rapports'),
})

const contactPage = (assets) => ({
  _id: 'contactPage',
  _type: 'contactPage',
  title: str('Le Hub — Contact', 'Le Hub — Contact'),
  heroImage: img(assets, 'contact.png'),
  heroAlt: str('Organizers at a Le Hub session', 'Des participant·es à une séance du Hub'),
  bandLabel: str('Contact', 'Contact'),
})

// ─── People ─────────────────────────────────────────────────────────────────
//
// Names break over lines exactly where the card should break them, so the
// newlines are part of the content.

const people = (assets) => [
  {
    _id: 'person-remy-klein',
    _type: 'person',
    name: 'Remy\nKlein',
    group: 'team',
    order: 0,
    photo: img(assets, 'remy.png'),
    pronouns: str('they/them', 'iel'),
    role: str('Executive Director', 'Direction générale'),
    bio: text(
      'Remy Klein (they/them) is a community-based educator, facilitator, writer, and organizer, rooted in (a surprisingly queer!) rural community on unceded Algonquin territory in so-called Ontario. Previously based in Toronto, they have been involved in a range of grassroots struggles throughout their 15+ years in social movement, from solidarity with global communities resisting the Canadian mining industry, to neighbourhood-based anti-carceral crisis response work, to workplace organizing amongst fellow disabled workers, and more recently a rural emergency preparedness community of practice.',
      'Remy Klein (iel) est éducateur·rice communautaire, facilitateur·rice, auteur·rice et organisateur·rice, enraciné·e dans une communauté rurale (étonnamment queer !) en territoire algonquin non cédé, dans ce qu’on appelle l’Ontario. Auparavant basé·e à Toronto, iel s’est impliqué·e dans un large éventail de luttes de la base au fil de ses 15 ans et plus dans les mouvements sociaux : de la solidarité avec les communautés du monde entier qui résistent à l’industrie minière canadienne, au travail de réponse aux crises hors du système carcéral à l’échelle du quartier, en passant par l’organisation en milieu de travail auprès d’autres travailleur·euses en situation de handicap, et plus récemment une communauté de pratique en préparation aux urgences en milieu rural.',
    ),
  },
  {
    _id: 'person-tess-cameron',
    _type: 'person',
    name: 'Tess\nCameron',
    group: 'team',
    order: 1,
    photo: img(assets, 'tess.png'),
    pronouns: str('they/them', 'iel'),
    role: str('Program Lead', 'Responsable des programmes'),
    bio: text(
      'Tess Cameron (they/them) grew up on the unceded territory of the Mi’kmaq people in so-called New Brunswick, and is now living in Tio\'tià:ke (Montreal). They were introduced to the climate justice movement in 2019 when they began organizing Fridays for Future walkouts. Since moving to Tio\'tià:ke, they have been involved in a variety of mutual aid and community organizing initiatives. Tess has a particular interest in neighbourhood-based organizing, prefigurative politics, and building ties of solidarity and mutual learning across social movements.',
      'Tess Cameron (iel) a grandi sur le territoire non cédé du peuple mi’kmaq, dans ce qu’on appelle le Nouveau-Brunswick, et vit aujourd’hui à Tio\'tià:ke (Montréal). Iel a découvert le mouvement pour la justice climatique en 2019 en commençant à organiser des débrayages Fridays for Future. Depuis son arrivée à Tio\'tià:ke, iel s’est impliqué·e dans une variété d’initiatives d’entraide et d’organisation communautaire. Tess s’intéresse particulièrement à l’organisation à l’échelle du quartier, aux politiques préfiguratives et au tissage de liens de solidarité et d’apprentissage mutuel entre les mouvements sociaux.',
    ),
  },
  {
    _id: 'person-amanda-harvey-sanchez',
    _type: 'person',
    name: 'Amanda\nHarvey-\nSánchez',
    group: 'team',
    order: 2,
    photo: img(assets, 'amanda.png'),
    pronouns: str('she/her', 'elle'),
    role: str(
      'Principal Coach and\nProgram Development Specialist',
      'Coach principale et\nspécialiste du développement des programmes',
    ),
    bio: text(
      'Amanda Harvey-Sánchez (she/her) is an activist-anthropologist, organizing strategist, and Principal Coach and Program Development Specialist at the Organizing Hub. With more than a decade of experience, she designs leadership development programs, coaching practices, and organizing curricula that strengthen grassroots organizations and social movements across Canada. A Connaught PhDs for Public Impact Fellow and PhD candidate in Anthropology at the University of Toronto, Amanda\'s research examines how organizers build leadership, sustain collective action, and navigate the ethical and political challenges of movement building.',
      'Amanda Harvey-Sánchez (elle) est anthropologue-militante, stratège en organisation communautaire, coach principale et spécialiste du développement des programmes au Hub. Forte de plus d’une décennie d’expérience, elle conçoit des programmes de développement du leadership, des pratiques de coaching et des cursus d’organisation qui renforcent les organisations de la base et les mouvements sociaux partout au Canada. Boursière du programme Connaught PhDs for Public Impact et doctorante en anthropologie à l’Université de Toronto, Amanda étudie dans ses recherches comment les personnes qui organisent développent le leadership, soutiennent l’action collective et composent avec les défis éthiques et politiques de la construction de mouvements.',
    ),
  },
  {
    _id: 'person-jacob-pirro',
    _type: 'person',
    name: 'Jacob\nPirro',
    group: 'team',
    order: 3,
    photo: img(assets, 'jacob.png'),
    pronouns: str('he/him', 'il'),
    role: str(
      'Principal Coach and\nProgram Development Specialist',
      'Coach principal et\nspécialiste du développement des programmes',
    ),
    bio: text(
      'Activist in the environmental and student movement since 2019. I first became involved with Extinction Rebellion in climate justice mobilization and awareness, then as a civil disobedience and industrial climbing trainer. I was the mobilization and care coordinator of Last Generation Canada and am now a member of the Antigone collective. I took part in multiple high visibility actions such as the Valero and Jacques-Cartier bridge blockades in order to pursue social and climate goals.',
      'Militant dans le mouvement environnemental et étudiant depuis 2019. Je me suis d’abord impliqué au sein d’Extinction Rebellion dans la mobilisation et la sensibilisation pour la justice climatique, puis comme formateur en désobéissance civile et en grimpe industrielle. J’ai été coordonnateur de la mobilisation et du soin chez Dernière Génération Canada et je suis maintenant membre du collectif Antigone. J’ai pris part à plusieurs actions très visibles, comme les blocages de Valero et du pont Jacques-Cartier, afin de poursuivre des objectifs sociaux et climatiques.',
    ),
  },
  {
    _id: 'person-juhi-sohani',
    _type: 'person',
    name: 'Juhi\nSohani',
    group: 'advisor',
    order: 0,
    photo: img(assets, 'juhi.png'),
    pronouns: str('she/her', 'elle'),
    role: str('Advisor', 'Conseillère'),
    bio: text(
      'Juhi Sohani is a communicator, digital organizer, and co-founder of Weaver and Imagining an Otherwise. She focuses on maximizing the collective impact of social movements across Canada by supporting campaigners to connect with real, politically persuadable people online and meet them on the ground. Juhi has facilitated narrative development and digital strategy at Amnesty International, the Canadian Federation of Students, and Inuit Tapiriit Kanatami. The student movement led her to the climate movement and Palestine solidarity, where she continues to experiment with using digital tools to facilitate offline power-building. She collaborates with peers around the world at hope-based comms to help make the case for the world people want to see. She was named one of the Top 50 Women Leaders of Montreal for 2023 by Women We Admire, and has not been very admirable since. Juhi is grateful to have found home and connection on the unceded traditional territory of the Kanien\'kehà:ka.',
      'Juhi Sohani est communicatrice, organisatrice numérique et cofondatrice de Weaver et d’Imagining an Otherwise. Elle cherche à maximiser l’impact collectif des mouvements sociaux partout au Canada en aidant les militant·es à rejoindre en ligne de vraies personnes politiquement persuadables, puis à les retrouver sur le terrain. Juhi a animé des processus de développement narratif et de stratégie numérique à Amnistie internationale, à la Fédération canadienne des étudiantes et étudiants et à Inuit Tapiriit Kanatami. Le mouvement étudiant l’a menée au mouvement climatique et à la solidarité avec la Palestine, où elle continue d’expérimenter l’usage des outils numériques pour bâtir du pouvoir hors ligne. Elle collabore avec des pairs partout dans le monde au sein de hope-based comms afin de défendre le monde que les gens veulent voir. Elle a été nommée parmi les 50 femmes leaders de Montréal de 2023 par Women We Admire, et n’a pas été très admirable depuis. Juhi est reconnaissante d’avoir trouvé un chez-soi et des liens sur le territoire traditionnel non cédé des Kanien\'kehà:ka.',
    ),
  },
  {
    _id: 'person-emilia-belliveau',
    _type: 'person',
    name: 'Emilia\nBelliveau',
    group: 'advisor',
    order: 1,
    photo: img(assets, 'Emilia.png'),
    pronouns: str('she/her', 'elle'),
    role: str('Advisor', 'Conseillère'),
    bio: text(
      'Emilia Belliveau has worked on climate and environmental justice issues since 2012, as a community organizer, academic researcher, campaigner with environmental non-profits, and as a policy analyst in the British Columbia Ministry of Energy. She is currently the Energy Transition Program Manager at Environmental Defence. Prior to this she worked with remote First Nations in BC to accelerate the transition off diesel with community-led renewable energy projects and energy efficiency. Emilia holds a master’s degree from the University of Victoria (UVic), where her studies in political ecology focused on fossil fuel divestment, anti-capitalism, youth politicization, and the climate justice movement. Emilia is happiest on the dance floor.',
      'Emilia Belliveau travaille sur les enjeux de justice climatique et environnementale depuis 2012, comme organisatrice communautaire, chercheuse universitaire, militante au sein d’organismes environnementaux et analyste des politiques au ministère de l’Énergie de la Colombie-Britannique. Elle est actuellement gestionnaire du programme de transition énergétique à Environmental Defence. Auparavant, elle a travaillé avec des Premières Nations éloignées en Colombie-Britannique pour accélérer la sortie du diesel grâce à des projets d’énergie renouvelable menés par les communautés et à l’efficacité énergétique. Emilia détient une maîtrise de l’Université de Victoria (UVic), où ses études en écologie politique ont porté sur le désinvestissement des énergies fossiles, l’anticapitalisme, la politisation des jeunes et le mouvement pour la justice climatique. C’est sur la piste de danse qu’Emilia est la plus heureuse.',
    ),
  },
]

// ─── Programmes ─────────────────────────────────────────────────────────────

const programs = (assets) => [
  {
    _id: 'program-compass',
    _type: 'program',
    key: 'compass',
    order: 0,
    imageFirst: false,
    image: img(assets, 'compass.png'),
    title: str('Compass', 'Compass'),
    blurb: text(
      'Compass is our coaching program: ongoing, tailored support for organizers who want to deepen their practice and apply what they learn to real work. You need not have attended a training first.',
      'Compass est notre programme de coaching : un accompagnement continu et sur mesure pour les personnes qui veulent approfondir leur pratique et appliquer ce qu’elles apprennent à du vrai travail. Il n’est pas nécessaire d’avoir suivi une formation au préalable.',
    ),
    body: richText(
      [
        'Compass is our coaching program: ongoing, tailored support for organizers who want to deepen their practice and apply what they learn to real work. You need not have attended a training first.',
        'Come as an individual or a small team, in English or French. Coaches can help you set goals, choose targets and tactics, handle conflict, sharpen your storytelling and media work, recruit and keep members, and build group structures that work.',
      ],
      [
        'Compass est notre programme de coaching : un accompagnement continu et sur mesure pour les personnes qui veulent approfondir leur pratique et appliquer ce qu’elles apprennent à du vrai travail. Il n’est pas nécessaire d’avoir suivi une formation au préalable.',
        'Venez seul·e ou en petite équipe, en français ou en anglais. Nos coachs peuvent vous aider à fixer des objectifs, à choisir des cibles et des tactiques, à gérer les conflits, à affiner votre récit et votre travail médiatique, à recruter et à fidéliser des membres, et à bâtir des structures de groupe qui fonctionnent.',
      ],
    ),
    info: rich(
      [
        p(
          'Coaching is free for grassroots organizers across so-called Canada and Quebec. Write to ',
          {t: 'amanda@lehub.ca', href: 'mailto:amanda@lehub.ca'},
          ' ',
          {t: '(EN)', small: true},
          ' or ',
          {t: 'jacob@lehub.ca', href: 'mailto:jacob@lehub.ca'},
          ' ',
          {t: '(FR)', small: true},
          '.',
        ),
      ],
      [
        p(
          'Le coaching est gratuit pour les groupes de la base partout dans ce qu’on appelle le Canada et le Québec. Écrivez à ',
          {t: 'jacob@lehub.ca', href: 'mailto:jacob@lehub.ca'},
          ' ',
          {t: '(FR)', small: true},
          ' ou ',
          {t: 'amanda@lehub.ca', href: 'mailto:amanda@lehub.ca'},
          ' ',
          {t: '(EN)', small: true},
          '.',
        ),
      ],
    ),
  },
  {
    _id: 'program-catalyst',
    _type: 'program',
    key: 'catalyst',
    order: 1,
    imageFirst: true,
    image: img(assets, 'offer-catalyst.png'),
    title: str('Catalyst', 'Catalyst'),
    blurb: text(
      'Catalyst is our one-day organizing skills camp. It brings organizers from different struggles together in one city or region to build core skills, deepen political relationships, and grow the trust that long-term collaboration needs.',
      'Catalyst est notre camp d’une journée sur les compétences d’organisation. Il réunit dans une même ville ou région des personnes issues de luttes différentes pour développer les compétences de base, approfondir les relations politiques et faire grandir la confiance qu’exige une collaboration à long terme.',
    ),
    body: richText(
      [
        'Catalyst is our one-day organizing skills camp. It brings organizers from different struggles together in one city or region to build core skills, deepen political relationships, and grow the trust that long-term collaboration needs.',
        'We run Catalyst with local grassroots groups and build each one around the problems organizers there name. When organizers meet across issues, movements share lessons and get stronger.',
      ],
      [
        'Catalyst est notre camp d’une journée sur les compétences d’organisation. Il réunit dans une même ville ou région des personnes issues de luttes différentes pour développer les compétences de base, approfondir les relations politiques et faire grandir la confiance qu’exige une collaboration à long terme.',
        'Nous organisons Catalyst avec des groupes de la base locaux et bâtissons chaque édition autour des problèmes que les personnes sur place nomment elles-mêmes. Quand les luttes se rencontrent, les mouvements partagent leurs apprentissages et en ressortent plus forts.',
      ],
    ),
    info: rich(
      [
        p(
          'Subscribe to ',
          {t: 'our newsletter', newsletter: true},
          ' or follow us on ',
          {t: 'Instagram', href: INSTAGRAM},
          ' and ',
          {t: 'Facebook', href: FACEBOOK},
          ' for Catalyst dates.',
        ),
      ],
      [
        p(
          'Abonnez-vous à ',
          {t: 'notre infolettre', newsletter: true},
          ' ou suivez-nous sur ',
          {t: 'Instagram', href: INSTAGRAM},
          ' et ',
          {t: 'Facebook', href: FACEBOOK},
          ' pour connaître les dates de Catalyst.',
        ),
      ],
    ),
  },
  {
    _id: 'program-groundswell',
    _type: 'program',
    key: 'groundswell',
    order: 2,
    imageFirst: false,
    image: img(assets, 'ground.png'),
    title: str('Groundswell', 'Groundswell'),
    blurb: text(
      'Groundswell is our online, multi-session campaign training. Over several weeks, organizers learn to pick a campaign issue, craft winnable demands, map targets and stakeholders, build strategy, and test tactics as the campaign unfolds.',
      'Groundswell est notre formation en ligne sur les campagnes, répartie sur plusieurs séances. Pendant quelques semaines, les participant·es apprennent à choisir un enjeu de campagne, à formuler des revendications gagnables, à cartographier les cibles et les parties prenantes, à bâtir une stratégie et à tester des tactiques au fil de la campagne.',
    ),
    body: richText(
      [
        'Groundswell is our online, multi-session campaign training. Over several weeks, organizers learn to pick a campaign issue, craft winnable demands, map targets and stakeholders, build strategy, and test tactics as the campaign unfolds.',
        'You work in a cohort, so you leave with both skills and people to think alongside. Come with an idea or come mid-campaign — either way you leave with a plan.',
      ],
      [
        'Groundswell est notre formation en ligne sur les campagnes, répartie sur plusieurs séances. Pendant quelques semaines, les participant·es apprennent à choisir un enjeu de campagne, à formuler des revendications gagnables, à cartographier les cibles et les parties prenantes, à bâtir une stratégie et à tester des tactiques au fil de la campagne.',
        'Vous travaillez en cohorte : vous repartez donc avec des compétences et avec des personnes avec qui réfléchir. Venez avec une idée ou en pleine campagne — dans les deux cas, vous repartez avec un plan.',
      ],
    ),
    info: rich(
      [
        p(
          'We run Groundswell twice a year, spring and fall. Subscribe to ',
          {t: 'our newsletter', newsletter: true},
          ' to hear when registration opens.',
        ),
      ],
      [
        p(
          'Groundswell a lieu deux fois par année, au printemps et à l’automne. Abonnez-vous à ',
          {t: 'notre infolettre', newsletter: true},
          ' pour savoir quand les inscriptions ouvrent.',
        ),
      ],
    ),
  },
]

// ─── Reports ────────────────────────────────────────────────────────────────
//
// The PDFs exist in English only, so the French entries point at the same file.

const reports = (assets) => [
  {
    _id: 'report-tools-for-change',
    _type: 'report',
    order: 0,
    cardColor: 'bg-card-pink',
    cover: img(assets, 'report-1.png'),
    title: str('Tools for Change', 'Tools for Change'),
    subtitle: text(
      'Understanding the Needs of Climate Justice Organizers in Canada',
      'Comprendre les besoins des personnes qui organisent pour la justice climatique au Canada',
    ),
    author: str('by Amanda Harvey-Sànchez', 'par Amanda Harvey-Sànchez'),
    pdf: str(
      'https://www.lehub.ca/media/hubtoolsforchangereport.pdf',
      'https://www.lehub.ca/media/hubtoolsforchangereport.pdf',
    ),
  },
  {
    _id: 'report-towards-community-power',
    _type: 'report',
    order: 1,
    cardColor: 'bg-card-yellow',
    cover: img(assets, 'report-2.png'),
    title: str('Towards Community Power', 'Towards Community Power'),
    subtitle: text(
      'Understanding the Needs of Climate Justice Organizers in Canada',
      'Comprendre les besoins des personnes qui organisent pour la justice climatique au Canada',
    ),
    author: str('by Amanda Harvey-Sànchez', 'par Amanda Harvey-Sànchez'),
    pdf: str(
      'https://www.lehub.ca/media/movementmemoreport24.pdf',
      'https://www.lehub.ca/media/movementmemoreport24.pdf',
    ),
  },
  {
    _id: 'report-building-the-whirlwind',
    _type: 'report',
    order: 2,
    cardColor: 'bg-card-green',
    cover: img(assets, 'report03.png'),
    title: str('Building the Whirlwind', 'Building the Whirlwind'),
    subtitle: text(
      'Movement-building lessons from the Montreal climate protests',
      'Leçons de construction de mouvement tirées des manifestations climatiques montréalaises',
    ),
    author: str('published by the Broadbent Institute', 'publié par l’Institut Broadbent'),
    pdf: str(
      'https://www.lehub.ca/media/buildingthewhilrwind.pdf',
      'https://www.lehub.ca/media/buildingthewhilrwind.pdf',
    ),
  },
]

// ─── Testimonials ───────────────────────────────────────────────────────────
//
// These are quotations from real people, given in English. The French is a
// translation, not a second statement — if either person later supplies their
// own French wording, it replaces what is here.

const testimonials = [
  {
    _id: 'testimonial-philip-meintzer',
    _type: 'testimonial',
    order: 0,
    name: 'Philip Meintzer',
    lines: text(
      'Campaign Organizer\nCoalition for Responsible Energy (C4RE)',
      'Organisateur de campagne\nCoalition for Responsible Energy (C4RE)',
    ),
    quote: text(
      '“...an incredibly informative experience for our coalition, as it gave us some much needed direction as we mapped out our first campaign over the following months.”',
      '« ...une expérience incroyablement instructive pour notre coalition, qui nous a donné une orientation dont nous avions grand besoin au moment de tracer notre première campagne dans les mois qui ont suivi. »',
    ),
    full: richText(
      [
        'My name is Phillip Meintzer and I work as a campaign organizer with Coalition for Responsible Energy (C4RE), which includes ordinary Albertans, rural landowners, scientists, and a number of Indigenous, environmental, human health and civil society organizations.',
        'The coalition formed around a shared concern about the ongoing failure of Alberta’s energy regulator to provide safe, orderly, and environmentally responsible energy development. C4RE demands sweeping changes to the way the fossil fuel industry is regulated in Alberta to prioritize the health and wellbeing of Indigenous Communities, Alberta’s ecosystems, and the public.',
        'Many of the groups involved with C4RE were not experienced in the work of grassroots organizing or the tasks required to do so. Which is why I enlisted the services of the Organizing Hub to help introduce C4RE members to the work of organizing, and to help us refine and focus our first campaign.',
        'Across two workshops with Le Hub, their facilitator introduced C4RE members to some of the fundamentals of organizing, including theories of change, ladders of engagement, escalating campaign tactics, and the importance of narrowing down our “mountaintop” goals.',
        'It was an incredibly informative experience for our coalition, as it gave us some much needed direction as we mapped out our first campaign over the following months - which officially launched on May 27, 2025.',
        'The sessions were run efficiently and effectively, and the workshop materials were easy to access and understand. One of the most valuable pieces of Le Hub’s workshops was having a third-party group provide the instruction, which gives it a sense of legitimacy or credibility, rather than someone within the coalition trying to convince others about the necessity of organizing.',
      ],
      [
        'Je m’appelle Phillip Meintzer et je travaille comme organisateur de campagne à la Coalition for Responsible Energy (C4RE), qui réunit des Albertain·es ordinaires, des propriétaires terriens en milieu rural, des scientifiques ainsi que plusieurs organisations autochtones, environnementales, de santé publique et de la société civile.',
        'La coalition s’est formée autour d’une préoccupation commune : l’incapacité persistante de l’organisme de réglementation de l’énergie de l’Alberta à assurer un développement énergétique sécuritaire, ordonné et responsable sur le plan environnemental. C4RE exige des changements en profondeur à la façon dont l’industrie des combustibles fossiles est réglementée en Alberta, afin de donner priorité à la santé et au bien-être des communautés autochtones, des écosystèmes albertains et de la population.',
        'Beaucoup des groupes membres de C4RE n’avaient pas d’expérience du travail d’organisation à la base ni des tâches qu’il suppose. C’est pourquoi j’ai fait appel aux services du Hub pour initier les membres de C4RE au travail d’organisation et nous aider à préciser et à cibler notre première campagne.',
        'Au fil de deux ateliers avec Le Hub, leur facilitatrice a présenté aux membres de C4RE certains fondements de l’organisation communautaire : les théories du changement, les échelles d’engagement, l’escalade des tactiques de campagne et l’importance de resserrer nos objectifs « sommets ».',
        'Ce fut une expérience incroyablement instructive pour notre coalition, qui nous a donné une orientation dont nous avions grand besoin au moment de tracer notre première campagne dans les mois qui ont suivi — campagne officiellement lancée le 27 mai 2025.',
        'Les séances ont été menées avec efficacité et le matériel d’atelier était facile d’accès et à comprendre. L’un des aspects les plus précieux des ateliers du Hub, c’est que la formation venait d’un groupe tiers, ce qui lui donne une légitimité et une crédibilité que n’aurait pas eues quelqu’un de l’intérieur de la coalition essayant de convaincre les autres de la nécessité de s’organiser.',
      ],
    ),
  },
  {
    _id: 'testimonial-anne-keary',
    _type: 'testimonial',
    order: 1,
    name: 'Anne Keary',
    lines: text(
      'TCAN co-chair\nFor Our Kids member',
      'Coprésidente du TCAN\nMembre de For Our Kids',
    ),
    quote: text(
      '“I have returned to the Organizing Hub resources again and again – and learn something new and valuable every time. The Organizing Hub makes activism accessible – and we need that more than ever. I only wish I had had access to the Organizing Hub when I began my journey as an activist.”',
      '« Je suis revenue encore et encore aux ressources du Hub — et j’y apprends chaque fois quelque chose de nouveau et de précieux. Le Hub rend le militantisme accessible, et nous en avons besoin plus que jamais. J’aurais seulement souhaité avoir accès au Hub au début de mon parcours militant. »',
    ),
    full: richText(
      [
        'The Organizing Hub is such a valuable resource for grassroots climate and social justice organizers. I have been actively involved in climate organizing for the last eight years. I am a member of For Our Kids Toronto, a chapter of a nationwide group of parents and caregivers who advocate for climate justice. I am also currently co-chair of Toronto Climate Action Network (TCAN), an umbrella organization of over 70 grassroots climate organizations across Toronto. Through my early years as an activist, I learned primarily from other activists and, through trial and error, from my own experiences. With the Organizing Hub, however, grassroots activists now have a dedicated organization that can take their organizing to the next level.',
        'The For Our Kids Toronto team benefitted from an Organizing Hub session focused on how a campaign can help recruit and retain members when focused on a particular goal, target, and concrete ask. This led to a discussion of capacity and the importance of having a “menu of actions” that teams can choose to create or participate in. Throughout this session, I appreciated the facilitator’s openness to listening to participants, her commitment to meeting activists where they are and supporting them on their journey.',
        'I later attended another two-session course on recruitment and retention with activists from a range of climate and social justice organizations. These sessions provided engaging opportunities to interact with others and brainstorm ideas. They also came with a wealth of resources which synthesized research on movement building, distilled best practices for organizing, and provided many tangible real-world examples.',
        'I have returned to the Organizing Hub resources again and again – and learn something new and valuable every time. The Organizing Hub makes activism accessible – and we need that more than ever. I only wish I had had access to the Organizing Hub when I began my journey as an activist.',
      ],
      [
        'Le Hub est une ressource d’une grande valeur pour les personnes qui organisent à la base en climat et en justice sociale. Je suis activement impliquée dans l’organisation climatique depuis huit ans. Je suis membre de For Our Kids Toronto, une section d’un groupe pancanadien de parents et de proches aidant·es qui militent pour la justice climatique. Je suis aussi coprésidente du Toronto Climate Action Network (TCAN), une organisation-cadre regroupant plus de 70 organisations climatiques de la base à Toronto. Dans mes premières années de militantisme, j’ai surtout appris d’autres militant·es et, par essais et erreurs, de mes propres expériences. Avec Le Hub, les militant·es de la base disposent enfin d’une organisation dédiée qui peut faire passer leur travail d’organisation au niveau supérieur.',
        'L’équipe de For Our Kids Toronto a bénéficié d’une séance du Hub portant sur la façon dont une campagne peut aider à recruter et à fidéliser des membres lorsqu’elle est centrée sur un objectif, une cible et une demande concrète. Cela a mené à une discussion sur la capacité et sur l’importance d’avoir un « menu d’actions » que les équipes peuvent choisir de créer ou auxquelles elles peuvent participer. Tout au long de cette séance, j’ai apprécié l’ouverture de la facilitatrice à écouter les participant·es, son engagement à rejoindre les militant·es là où ils et elles se trouvent et à les accompagner dans leur parcours.',
        'J’ai ensuite suivi un autre cours en deux séances sur le recrutement et la rétention, avec des militant·es issu·es de diverses organisations climatiques et de justice sociale. Ces séances ont offert de belles occasions d’échanger et de faire émerger des idées. Elles s’accompagnaient aussi d’une richesse de ressources qui synthétisaient la recherche sur la construction de mouvements, distillaient les meilleures pratiques d’organisation et fournissaient de nombreux exemples concrets.',
        'Je suis revenue encore et encore aux ressources du Hub — et j’y apprends chaque fois quelque chose de nouveau et de précieux. Le Hub rend le militantisme accessible, et nous en avons besoin plus que jamais. J’aurais seulement souhaité avoir accès au Hub au début de mon parcours militant.',
      ],
    ),
  },
]

// ─── FAQ ────────────────────────────────────────────────────────────────────
//
// Only the first answer came from the client. The rest were drafted to match
// its voice and carry `draft: true` until they are reviewed.

const faqItems = [
  {
    _id: 'faq-are-programs-free',
    _type: 'faqItem',
    order: 0,
    draft: false,
    question: str('Are Le Hub’s programs free?', 'Les programmes du Hub sont-ils gratuits ?'),
    answer: richText(
      [
        'Yes. Every program we run is free, because organizers should have good training and support whatever their income, where they live, or what their organization can afford.',
      ],
      [
        'Oui. Tous nos programmes sont gratuits, parce que les personnes qui organisent devraient avoir accès à de bonnes formations et à du soutien, peu importe leur revenu, l’endroit où elles vivent ou ce que leur organisation a les moyens de payer.',
      ],
    ),
  },
  {
    _id: 'faq-who-can-take-part',
    _type: 'faqItem',
    order: 1,
    draft: true,
    question: str('Who can take part?', 'Qui peut participer ?'),
    answer: rich(
      [
        p(
          'Anyone organizing at the grassroots across so-called Canada and Québec — whether you are part of an established group, a new collective, or organizing on your own. ',
          {t: 'Our programs', href: '/offerings'},
          ' run in English and in French, and many participants are young organizers, though we work with organizers of all ages.',
        ),
      ],
      [
        p(
          'Toute personne qui organise à la base dans ce qu’on appelle le Canada et le Québec — que vous fassiez partie d’un groupe établi, d’un nouveau collectif, ou que vous organisiez seul·e. ',
          {t: 'Nos programmes', href: '/offerings'},
          ' se donnent en français et en anglais, et beaucoup de participant·es sont jeunes, même si nous travaillons avec des gens de tous les âges.',
        ),
      ],
    ),
  },
  {
    _id: 'faq-coaching-without-training',
    _type: 'faqItem',
    order: 2,
    draft: true,
    question: str(
      'Can I sign up for coaching if I’ve never been to a Le Hub training?',
      'Puis-je m’inscrire au coaching si je n’ai jamais suivi de formation du Hub ?',
    ),
    answer: rich(
      [
        p(
          'You can. ',
          {t: 'Compass', href: '/offerings#compass'},
          ' is open to any organizer who wants ongoing, tailored support — attending a training first is welcome but never required.',
        ),
      ],
      [
        p(
          'Oui. ',
          {t: 'Compass', href: '/offerings#compass'},
          ' est ouvert à toute personne qui souhaite un accompagnement continu et sur mesure — avoir suivi une formation au préalable est bienvenu, mais jamais exigé.',
        ),
      ],
    ),
  },
  {
    _id: 'faq-coaching-without-campaign',
    _type: 'faqItem',
    order: 3,
    draft: true,
    question: str(
      'Can I sign up for coaching if I’m not running a campaign?',
      'Puis-je m’inscrire au coaching si je ne mène pas de campagne ?',
    ),
    answer: richText(
      [
        'Yes. Coaches can help you think through where to start: choosing an issue, building a group, or working out what a winnable campaign might look like before you launch one.',
      ],
      [
        'Oui. Nos coachs peuvent vous aider à réfléchir au point de départ : choisir un enjeu, bâtir un groupe, ou imaginer à quoi pourrait ressembler une campagne gagnable avant de la lancer.',
      ],
    ),
  },
  {
    _id: 'faq-collaborate',
    _type: 'faqItem',
    order: 4,
    draft: true,
    question: str(
      'My organization wants to collaborate with Le Hub. How do we get in touch?',
      'Mon organisation aimerait collaborer avec Le Hub. Comment vous joindre ?',
    ),
    answer: rich(
      [
        p(
          'Write to ',
          {t: 'contact@lehub.ca', href: 'mailto:contact@lehub.ca'},
          ' and tell us about your group and what you are working on. We build ',
          {t: 'Catalyst', href: '/offerings#catalyst'},
          ' camps with local grassroots groups, and we are always glad to hear from organizations doing the work.',
        ),
      ],
      [
        p(
          'Écrivez à ',
          {t: 'contact@lehub.ca', href: 'mailto:contact@lehub.ca'},
          ' et parlez-nous de votre groupe et de ce sur quoi vous travaillez. Nous bâtissons les camps ',
          {t: 'Catalyst', href: '/offerings#catalyst'},
          ' avec des groupes de la base locaux, et nous sommes toujours heureux et heureuses d’avoir des nouvelles des organisations qui font le travail.',
        ),
      ],
    ),
  },
  {
    _id: 'faq-hear-about-trainings',
    _type: 'faqItem',
    order: 5,
    draft: true,
    question: str(
      'How do I hear about new trainings and events?',
      'Comment être informé·e des nouvelles formations et des événements ?',
    ),
    answer: rich(
      [
        p(
          'Sign up for ',
          {t: 'our newsletter', newsletter: true},
          ', or follow us on ',
          {t: 'Instagram', href: INSTAGRAM},
          ' and ',
          {t: 'Facebook', href: FACEBOOK},
          '. ',
          {t: 'Groundswell', href: '/offerings#groundswell'},
          ' runs twice a year, in spring and fall, and we announce registration there first.',
        ),
      ],
      [
        p(
          'Abonnez-vous à ',
          {t: 'notre infolettre', newsletter: true},
          ', ou suivez-nous sur ',
          {t: 'Instagram', href: INSTAGRAM},
          ' et ',
          {t: 'Facebook', href: FACEBOOK},
          '. ',
          {t: 'Groundswell', href: '/offerings#groundswell'},
          ' a lieu deux fois par année, au printemps et à l’automne, et c’est là que nous annonçons les inscriptions en premier.',
        ),
      ],
    ),
  },
]

// ─── The dataset ────────────────────────────────────────────────────────────

export function documents(assets) {
  return [
    ...locales,
    siteSettings(assets),
    uiStrings,
    navigation,
    homePage(assets),
    aboutPage(assets),
    offeringsPage(assets),
    faqPage(assets),
    reportsPage(assets),
    contactPage(assets),
    ...people(assets),
    ...programs(assets),
    ...reports(assets),
    ...testimonials,
    ...faqItems,
  ]
}
