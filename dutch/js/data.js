/* data.js — Dutch curriculum.
   Organised the way a teacher would teach it:
   - LEVELS   : CEFR A1 → C2
   - THEMES   : topic units, each with a teacher's introduction + key phrases
   - VOCAB    : words tagged by theme AND level (theme is the primary sort)
   - GRAMMAR  : lessons with a teacher "tip", worked examples and a quiz
   - SENTENCES: sentence bank for translation & dictation, tagged by theme
   Everything is plain data so the engine stays generic and content can grow. */

const LEVELS = [
  { id:"A1", name:"A1 — Beginner",        blurb:"Survival Dutch: greetings, numbers, everyday words." },
  { id:"A2", name:"A2 — Elementary",      blurb:"Daily life, past tense, simple opinions." },
  { id:"B1", name:"B1 — Intermediate",    blurb:"Hold conversations, express plans, connect ideas." },
  { id:"B2", name:"B2 — Upper-intermed.", blurb:"Abstract topics, nuance, spoken & written fluency." },
  { id:"C1", name:"C1 — Advanced",        blurb:"Idioms, register, complex argumentation." },
  { id:"C2", name:"C2 — Mastery",         blurb:"Near-native precision, formal & literary Dutch." },
];

/* THEMES — the teacher's syllabus. `intro` is written in a warm teaching voice;
   `phrases` are ready-to-use expressions students can deploy immediately. */
const THEMES = [
  { id:"greetings", icon:"👋", en:"Greetings & Politeness", nl:"Begroetingen & beleefdheid",
    intro:"We always start here. In Dutch, how you greet someone and whether you use <b>je</b> (informal) or <b>u</b> (formal) sets the whole tone. Learn these first — you'll use them in every single conversation.",
    phrases:[
      { nl:"Hoe gaat het met u?", en:"How are you? (formal)" },
      { nl:"Aangenaam kennis te maken.", en:"Pleased to meet you." },
      { nl:"Tot ziens!", en:"Goodbye!" },
      { nl:"Sorry, dat geeft niet.", en:"Sorry — never mind / no problem." },
    ] },
  { id:"people", icon:"👨‍👩‍👧", en:"People & Family", nl:"Mensen & familie",
    intro:"Family words come up constantly when you introduce yourself. Notice that Dutch distinguishes <b>de</b>-people (de vader, de moeder) — nearly all people are de-words. Learn the relationships as a set; they reinforce each other.",
    phrases:[
      { nl:"Ik heb twee broers en een zus.", en:"I have two brothers and a sister." },
      { nl:"Dit is mijn partner.", en:"This is my partner." },
      { nl:"Hoe heet jij?", en:"What's your name?" },
    ] },
  { id:"numbers", icon:"🔢", en:"Numbers & Counting", nl:"Getallen & tellen",
    intro:"Numbers are pure memorisation but pay off immediately — prices, times, ages, phone numbers. A Dutch quirk: from 21 up you say the units <i>before</i> the tens — <b>eenentwintig</b> = 'one-and-twenty'. Drill these until they're automatic.",
    phrases:[
      { nl:"Dat kost vijf euro vijftig.", en:"That costs five euros fifty." },
      { nl:"Ik ben dertig jaar oud.", en:"I am thirty years old." },
    ] },
  { id:"time", icon:"⏰", en:"Time, Days & Dates", nl:"Tijd, dagen & data",
    intro:"To make plans you need days, months and telling the time. Watch the tricky half-hours: <b>half drie</b> means 2:30 (literally 'half [to] three'), not 3:30. This trips up every learner — practise it aloud.",
    phrases:[
      { nl:"Hoe laat is het?", en:"What time is it?" },
      { nl:"Het is kwart over negen.", en:"It's a quarter past nine." },
      { nl:"Zullen we maandag afspreken?", en:"Shall we meet on Monday?" },
    ] },
  { id:"food", icon:"🍞", en:"Food & Drink", nl:"Eten & drinken",
    intro:"Ordering, cooking, shopping for groceries — this theme is used daily. Learn the article with each food word; you'll need it to say 'the' and to form plurals correctly.",
    phrases:[
      { nl:"Ik wil graag afrekenen.", en:"I'd like to pay, please." },
      { nl:"Mag ik de menukaart?", en:"May I have the menu?" },
      { nl:"Eet smakelijk!", en:"Enjoy your meal!" },
    ] },
  { id:"home", icon:"🏠", en:"Home & Household", nl:"Huis & huishouden",
    intro:"Describe where you live and what's in it. Rooms and furniture are concrete and easy to picture — a great theme for building noun vocabulary and practising <b>er is / er zijn</b> ('there is / there are').",
    phrases:[
      { nl:"Ik woon in een appartement.", en:"I live in an apartment." },
      { nl:"De wasmachine is kapot.", en:"The washing machine is broken." },
    ] },
  { id:"health", icon:"🩺", en:"Body & Health", nl:"Lichaam & gezondheid",
    intro:"At the doctor or pharmacy you must say what hurts. The key pattern is <b>Ik heb pijn in mijn…</b> ('I have pain in my…'). Learn the body parts and this one sentence frame carries you a long way.",
    phrases:[
      { nl:"Ik voel me niet lekker.", en:"I don't feel well." },
      { nl:"Ik heb hoofdpijn.", en:"I have a headache." },
      { nl:"Ik moet naar de huisarts.", en:"I need to see the GP." },
    ] },
  { id:"clothing", icon:"👕", en:"Clothing & Appearance", nl:"Kleding & uiterlijk",
    intro:"Shopping for clothes and describing people. This theme pairs perfectly with adjectives and colours, and with the verb <b>aantrekken</b> (to put on) — a separable verb, so great practice for that grammar point.",
    phrases:[
      { nl:"Welke maat heeft u?", en:"What size are you?" },
      { nl:"Mag ik dit passen?", en:"May I try this on?" },
    ] },
  { id:"travel", icon:"🚆", en:"Travel & Transport", nl:"Reizen & vervoer",
    intro:"The Netherlands runs on trains and bikes. You'll need to buy tickets, ask about delays and platforms. Learn <b>met de</b> + transport ('met de trein', 'met de fiets') — it's how you say 'by' a means of transport.",
    phrases:[
      { nl:"Welk perron vertrekt de trein?", en:"Which platform does the train leave from?" },
      { nl:"Is deze plaats vrij?", en:"Is this seat free?" },
      { nl:"Ik ga met de fiets.", en:"I'm going by bike." },
    ] },
  { id:"city", icon:"🏙️", en:"City & Directions", nl:"Stad & wegwijs",
    intro:"Finding your way and naming places in town. The core skill is understanding directions: <b>links, rechts, rechtdoor</b> (left, right, straight on). Practise both giving and understanding them.",
    phrases:[
      { nl:"Waar is het dichtstbijzijnde station?", en:"Where is the nearest station?" },
      { nl:"Ga bij het stoplicht linksaf.", en:"Turn left at the traffic light." },
      { nl:"Is het ver lopen?", en:"Is it far to walk?" },
    ] },
  { id:"shopping", icon:"🛒", en:"Shopping & Money", nl:"Winkelen & geld",
    intro:"Prices, paying, comparing. In the Netherlands you'll often be asked '<b>Pinnen of contant?</b>' (card or cash?). This theme also introduces comparatives — goedkoop, goedkoper, goedkoopst — so it feeds straight into grammar.",
    phrases:[
      { nl:"Kan ik met pin betalen?", en:"Can I pay by card?" },
      { nl:"Heeft u dit in een andere kleur?", en:"Do you have this in another colour?" },
    ] },
  { id:"work", icon:"💼", en:"Work & Career", nl:"Werk & carrière",
    intro:"Talking about your job, applying for work, office life. This is where A2 turns into B1: you start expressing responsibilities, experience and plans. Essential if you intend to work in Dutch.",
    phrases:[
      { nl:"Waar werk je?", en:"Where do you work?" },
      { nl:"Ik ben op zoek naar een baan.", en:"I'm looking for a job." },
      { nl:"Ik heb een sollicitatiegesprek.", en:"I have a job interview." },
    ] },
  { id:"education", icon:"🎓", en:"Education & Learning", nl:"Onderwijs & leren",
    intro:"School, courses, and — usefully — the language of learning Dutch itself. Knowing how to say 'Can you repeat that?' or 'How do you spell that?' lets you keep a conversation going when you get stuck.",
    phrases:[
      { nl:"Kunt u dat herhalen, alstublieft?", en:"Could you repeat that, please?" },
      { nl:"Hoe schrijf je dat?", en:"How do you spell that?" },
      { nl:"Wat betekent dit woord?", en:"What does this word mean?" },
    ] },
  { id:"nature", icon:"🌿", en:"Nature, Weather & Environment", nl:"Natuur, weer & milieu",
    intro:"The Dutch talk about the weather constantly — it's the ultimate small-talk topic. At higher levels this theme opens into the environment and sustainability, key B2/C1 discussion subjects.",
    phrases:[
      { nl:"Wat een lekker weer vandaag!", en:"What lovely weather today!" },
      { nl:"Het gaat regenen, denk ik.", en:"It's going to rain, I think." },
    ] },
  { id:"animals", icon:"🐄", en:"Animals", nl:"Dieren",
    intro:"A friendly, concrete theme — good for early motivation and for children's stories, which are excellent reading practice. Many animal words are also in common idioms (de kat uit de boom kijken!).",
    phrases:[
      { nl:"Heb je huisdieren?", en:"Do you have pets?" },
      { nl:"Ik ben allergisch voor katten.", en:"I'm allergic to cats." },
    ] },
  { id:"emotions", icon:"😊", en:"Emotions & Personality", nl:"Emoties & karakter",
    intro:"To sound human you must express how you feel and describe people. Note the reflexive pattern <b>zich voelen</b> ('Ik voel me blij'). These adjectives also power your opinions at B1 and beyond.",
    phrases:[
      { nl:"Ik voel me een beetje moe.", en:"I feel a little tired." },
      { nl:"Hij is heel behulpzaam.", en:"He is very helpful." },
    ] },
  { id:"hobbies", icon:"⚽", en:"Hobbies, Sport & Leisure", nl:"Hobby's & vrije tijd",
    intro:"Free-time talk is where friendships form. Learn to say what you <b>graag</b> ('gladly') do — 'Ik voetbal graag' = 'I like playing football'. This little word <b>graag</b> is your shortcut to expressing preferences.",
    phrases:[
      { nl:"Wat doe je in je vrije tijd?", en:"What do you do in your free time?" },
      { nl:"Ik hou van lezen.", en:"I love reading." },
    ] },
  { id:"tech", icon:"💻", en:"Technology & Media", nl:"Technologie & media",
    intro:"Modern life vocabulary: phones, apps, news, the internet. Many of these words are borrowed from English but pronounced the Dutch way — a good chance to train your ear and accent.",
    phrases:[
      { nl:"Mijn telefoon is bijna leeg.", en:"My phone is almost dead (empty)." },
      { nl:"Kun je me het bestand sturen?", en:"Can you send me the file?" },
    ] },
  { id:"society", icon:"🏛️", en:"Society, Politics & News", nl:"Maatschappij & politiek",
    intro:"To read a newspaper or follow the news you need this register. It's the heart of B2: policy, government, developments, consequences. Abstract, but essential for the higher exams.",
    phrases:[
      { nl:"Volgens het nieuws stijgen de prijzen.", en:"According to the news, prices are rising." },
      { nl:"De regering heeft nieuwe regels ingevoerd.", en:"The government has introduced new rules." },
    ] },
  { id:"business", icon:"📈", en:"Business & Economy", nl:"Zakelijk & economie",
    intro:"Meetings, deadlines, negotiations, figures. This professional register is where C1 fluency is tested. Precision matters: 'stijgen/dalen', 'winst/verlies', 'aanbod/vraag' — small words with big financial meaning.",
    phrases:[
      { nl:"We moeten de deadline halen.", en:"We have to meet the deadline." },
      { nl:"De omzet is met tien procent gestegen.", en:"Turnover has risen by ten percent." },
    ] },
  { id:"abstract", icon:"💭", en:"Abstract & Academic", nl:"Abstract & academisch",
    intro:"The language of ideas, arguments and analysis. At C1/C2 you must distinguish, assume, emphasise and qualify. This is the vocabulary of essays and debates — dense, but it's what separates advanced from fluent.",
    phrases:[
      { nl:"Enerzijds… anderzijds…", en:"On the one hand… on the other hand…" },
      { nl:"Dat hangt ervan af.", en:"That depends." },
      { nl:"Ik wil dat even nuanceren.", en:"I'd like to qualify that." },
    ] },
  { id:"connectors", icon:"🔗", en:"Connectors & Discourse", nl:"Verbindingswoorden",
    intro:"Connectors are the joints of the language — they turn a list of sentences into an argument. Crucially, some (omdat, hoewel, terwijl) send the verb to the end of the clause, while others (want, dus, maar) don't. Master the difference and your Dutch instantly sounds advanced.",
    phrases:[
      { nl:"Ik blijf thuis omdat ik ziek ben.", en:"I'm staying home because I'm ill." },
      { nl:"Het regent, dus we blijven binnen.", en:"It's raining, so we're staying in." },
    ] },
  { id:"idioms", icon:"🗣️", en:"Idioms & Expressions", nl:"Uitdrukkingen & spreekwoorden",
    intro:"Idioms are the final polish. Use one well and native speakers light up. Never translate them word-for-word — learn the whole expression and the situation it fits. A little goes a long way at C-level.",
    phrases:[
      { nl:"Nu komt de aap uit de mouw.", en:"Now the truth comes out." },
      { nl:"Dat is de spijker op de kop.", en:"That's spot on (hit the nail on the head)." },
    ] },
  { id:"verbs", icon:"⚡", en:"Core Verbs", nl:"Kernwerkwoorden",
    intro:"A handful of verbs do most of the work in Dutch. Master their present, past and perfect forms — especially the irregular ones (zijn, hebben, gaan, doen) — and you can build endless sentences. These are worth over-learning.",
    phrases:[
      { nl:"Ik kan het zelf doen.", en:"I can do it myself." },
      { nl:"Wat ben je aan het doen?", en:"What are you doing (right now)?" },
    ] },
];

/* Vocabulary. Fields:
   nl, en, level, theme (THEME id), art (het/de for nouns, "" otherwise),
   pos, ex (Dutch example), exEn (English of example). nl must be unique. */
const VOCAB = [
  // ================= GREETINGS =================
  { nl:"hallo", en:"hello", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Hallo, hoe gaat het?", exEn:"Hello, how are you?" },
  { nl:"hoi", en:"hi (informal)", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Hoi! Alles goed?", exEn:"Hi! All good?" },
  { nl:"goedemorgen", en:"good morning", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Goedemorgen allemaal.", exEn:"Good morning everyone." },
  { nl:"goedenavond", en:"good evening", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Goedenavond, mevrouw.", exEn:"Good evening, madam." },
  { nl:"tot ziens", en:"goodbye", level:"A1", theme:"greetings", art:"", pos:"phrase", ex:"Tot ziens en bedankt!", exEn:"Goodbye and thanks!" },
  { nl:"tot morgen", en:"see you tomorrow", level:"A1", theme:"greetings", art:"", pos:"phrase", ex:"Tot morgen op het werk.", exEn:"See you tomorrow at work." },
  { nl:"alsjeblieft", en:"please / here you go (informal)", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Een koffie, alsjeblieft.", exEn:"A coffee, please." },
  { nl:"alstublieft", en:"please / here you go (formal)", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Uw kaartje, alstublieft.", exEn:"Your ticket, please." },
  { nl:"dank je wel", en:"thank you (informal)", level:"A1", theme:"greetings", art:"", pos:"phrase", ex:"Dank je wel voor je hulp.", exEn:"Thank you for your help." },
  { nl:"dank u wel", en:"thank you (formal)", level:"A1", theme:"greetings", art:"", pos:"phrase", ex:"Dank u wel, meneer.", exEn:"Thank you, sir." },
  { nl:"graag gedaan", en:"you're welcome", level:"A1", theme:"greetings", art:"", pos:"phrase", ex:"Bedankt! — Graag gedaan.", exEn:"Thanks! — You're welcome." },
  { nl:"sorry", en:"sorry", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Sorry, ik was te laat.", exEn:"Sorry, I was late." },
  { nl:"pardon", en:"excuse me", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Pardon, mag ik erlangs?", exEn:"Excuse me, may I get past?" },
  { nl:"welkom", en:"welcome", level:"A1", theme:"greetings", art:"", pos:"interj", ex:"Welkom in Nederland!", exEn:"Welcome to the Netherlands!" },
  { nl:"aangenaam", en:"pleased to meet you", level:"A2", theme:"greetings", art:"", pos:"adj", ex:"Aangenaam kennis te maken.", exEn:"Pleased to meet you." },
  { nl:"ja", en:"yes", level:"A1", theme:"greetings", art:"", pos:"adv", ex:"Ja, dat klopt.", exEn:"Yes, that's right." },
  { nl:"nee", en:"no", level:"A1", theme:"greetings", art:"", pos:"adv", ex:"Nee, dank je.", exEn:"No, thank you." },

  // ================= PEOPLE & FAMILY =================
  { nl:"man", en:"man / husband", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Die man werkt hier.", exEn:"That man works here." },
  { nl:"vrouw", en:"woman / wife", level:"A1", theme:"people", art:"de", pos:"noun", ex:"De vrouw leest een boek.", exEn:"The woman is reading a book." },
  { nl:"kind", en:"child", level:"A1", theme:"people", art:"het", pos:"noun", ex:"Het kind speelt buiten.", exEn:"The child plays outside." },
  { nl:"baby", en:"baby", level:"A1", theme:"people", art:"de", pos:"noun", ex:"De baby slaapt nu.", exEn:"The baby is sleeping now." },
  { nl:"vader", en:"father", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Mijn vader kookt goed.", exEn:"My father cooks well." },
  { nl:"moeder", en:"mother", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Haar moeder woont in Gent.", exEn:"Her mother lives in Ghent." },
  { nl:"broer", en:"brother", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Ik heb een oudere broer.", exEn:"I have an older brother." },
  { nl:"zus", en:"sister", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Mijn zus studeert nog.", exEn:"My sister is still studying." },
  { nl:"ouders", en:"parents", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Mijn ouders zijn met pensioen.", exEn:"My parents are retired." },
  { nl:"opa", en:"grandpa", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Opa vertelt graag verhalen.", exEn:"Grandpa likes telling stories." },
  { nl:"oma", en:"grandma", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Oma bakt de lekkerste taart.", exEn:"Grandma bakes the best cake." },
  { nl:"vriend", en:"friend / boyfriend", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Hij is mijn beste vriend.", exEn:"He is my best friend." },
  { nl:"vriendin", en:"female friend / girlfriend", level:"A1", theme:"people", art:"de", pos:"noun", ex:"Mijn vriendin komt uit België.", exEn:"My girlfriend is from Belgium." },
  { nl:"partner", en:"partner", level:"A2", theme:"people", art:"de", pos:"noun", ex:"Dit is mijn partner, Sam.", exEn:"This is my partner, Sam." },
  { nl:"buurman", en:"(male) neighbour", level:"A2", theme:"people", art:"de", pos:"noun", ex:"De buurman is heel aardig.", exEn:"The neighbour is very nice." },
  { nl:"collega", en:"colleague", level:"A2", theme:"people", art:"de", pos:"noun", ex:"Mijn collega helpt me vaak.", exEn:"My colleague often helps me." },
  { nl:"iedereen", en:"everyone", level:"A2", theme:"people", art:"", pos:"pron", ex:"Iedereen is welkom.", exEn:"Everyone is welcome." },
  { nl:"niemand", en:"nobody", level:"A2", theme:"people", art:"", pos:"pron", ex:"Er is niemand thuis.", exEn:"There is nobody home." },
  { nl:"volwassene", en:"adult", level:"B1", theme:"people", art:"de", pos:"noun", ex:"Alleen voor volwassenen.", exEn:"For adults only." },
  { nl:"kennis", en:"acquaintance", level:"B1", theme:"people", art:"de", pos:"noun", ex:"Hij is een kennis van me.", exEn:"He is an acquaintance of mine." },

  // ================= NUMBERS =================
  { nl:"nul", en:"zero", level:"A1", theme:"numbers", art:"", pos:"num", ex:"Het staat nul-nul.", exEn:"The score is nil-nil." },
  { nl:"een (1)", en:"one", level:"A1", theme:"numbers", art:"", pos:"num", ex:"Ik heb één vraag.", exEn:"I have one question." },
  { nl:"twee", en:"two", level:"A1", theme:"numbers", art:"", pos:"num", ex:"Twee koffie, graag.", exEn:"Two coffees, please." },
  { nl:"drie", en:"three", level:"A1", theme:"numbers", art:"", pos:"num", ex:"Ik heb drie broers.", exEn:"I have three brothers." },
  { nl:"vier", en:"four", level:"A1", theme:"numbers", art:"", pos:"num", ex:"De les duurt vier uur.", exEn:"The class lasts four hours." },
  { nl:"vijf", en:"five", level:"A1", theme:"numbers", art:"", pos:"num", ex:"Vijf minuten, alsjeblieft.", exEn:"Five minutes, please." },
  { nl:"tien", en:"ten", level:"A1", theme:"numbers", art:"", pos:"num", ex:"Tien euro per stuk.", exEn:"Ten euros each." },
  { nl:"twintig", en:"twenty", level:"A1", theme:"numbers", art:"", pos:"num", ex:"Ze is twintig jaar.", exEn:"She is twenty years old." },
  { nl:"eenentwintig", en:"twenty-one", level:"A2", theme:"numbers", art:"", pos:"num", ex:"Nummer eenentwintig, graag.", exEn:"Number twenty-one, please." },
  { nl:"honderd", en:"hundred", level:"A1", theme:"numbers", art:"", pos:"num", ex:"Honderd procent zeker.", exEn:"A hundred percent sure." },
  { nl:"duizend", en:"thousand", level:"A2", theme:"numbers", art:"", pos:"num", ex:"Duizend excuses!", exEn:"A thousand apologies!" },
  { nl:"eerste", en:"first", level:"A2", theme:"numbers", art:"", pos:"num", ex:"De eerste keer is spannend.", exEn:"The first time is exciting." },
  { nl:"tweede", en:"second", level:"A2", theme:"numbers", art:"", pos:"num", ex:"Op de tweede verdieping.", exEn:"On the second floor." },
  { nl:"helft", en:"half", level:"A2", theme:"numbers", art:"de", pos:"noun", ex:"De helft is al weg.", exEn:"Half of it is already gone." },
  { nl:"aantal", en:"number / quantity", level:"B1", theme:"numbers", art:"het", pos:"noun", ex:"Een groot aantal mensen.", exEn:"A large number of people." },

  // ================= TIME, DAYS & DATES =================
  { nl:"vandaag", en:"today", level:"A1", theme:"time", art:"", pos:"adv", ex:"Vandaag regent het.", exEn:"Today it's raining." },
  { nl:"morgen", en:"tomorrow", level:"A1", theme:"time", art:"", pos:"adv", ex:"Tot morgen!", exEn:"Until tomorrow!" },
  { nl:"gisteren", en:"yesterday", level:"A1", theme:"time", art:"", pos:"adv", ex:"Gisteren was ik moe.", exEn:"Yesterday I was tired." },
  { nl:"nu", en:"now", level:"A1", theme:"time", art:"", pos:"adv", ex:"We gaan nu weg.", exEn:"We're leaving now." },
  { nl:"uur", en:"hour / o'clock", level:"A1", theme:"time", art:"het", pos:"noun", ex:"Het is drie uur.", exEn:"It's three o'clock." },
  { nl:"dag", en:"day", level:"A1", theme:"time", art:"de", pos:"noun", ex:"Een mooie dag vandaag.", exEn:"A nice day today." },
  { nl:"week", en:"week", level:"A1", theme:"time", art:"de", pos:"noun", ex:"Volgende week ben ik vrij.", exEn:"Next week I'm off." },
  { nl:"maand", en:"month", level:"A1", theme:"time", art:"de", pos:"noun", ex:"Deze maand is druk.", exEn:"This month is busy." },
  { nl:"jaar", en:"year", level:"A1", theme:"time", art:"het", pos:"noun", ex:"Gelukkig nieuwjaar!", exEn:"Happy New Year!" },
  { nl:"maandag", en:"Monday", level:"A1", theme:"time", art:"de", pos:"noun", ex:"Op maandag werk ik thuis.", exEn:"On Monday I work from home." },
  { nl:"zaterdag", en:"Saturday", level:"A1", theme:"time", art:"de", pos:"noun", ex:"Zaterdag ga ik sporten.", exEn:"On Saturday I'll exercise." },
  { nl:"weekend", en:"weekend", level:"A1", theme:"time", art:"het", pos:"noun", ex:"Fijn weekend!", exEn:"Have a nice weekend!" },
  { nl:"vroeg", en:"early", level:"A2", theme:"time", art:"", pos:"adj", ex:"Ik sta vroeg op.", exEn:"I get up early." },
  { nl:"laat", en:"late", level:"A2", theme:"time", art:"", pos:"adj", ex:"Het is al laat.", exEn:"It's already late." },
  { nl:"altijd", en:"always", level:"A2", theme:"time", art:"", pos:"adv", ex:"Hij is altijd te laat.", exEn:"He's always late." },
  { nl:"nooit", en:"never", level:"A2", theme:"time", art:"", pos:"adv", ex:"Ik drink nooit koffie.", exEn:"I never drink coffee." },
  { nl:"soms", en:"sometimes", level:"A2", theme:"time", art:"", pos:"adv", ex:"Soms kook ik zelf.", exEn:"Sometimes I cook myself." },
  { nl:"vaak", en:"often", level:"A2", theme:"time", art:"", pos:"adv", ex:"We gaan vaak wandelen.", exEn:"We often go walking." },
  { nl:"meteen", en:"immediately", level:"B1", theme:"time", art:"", pos:"adv", ex:"Ik kom er meteen aan.", exEn:"I'll be right there." },
  { nl:"onlangs", en:"recently", level:"B1", theme:"time", art:"", pos:"adv", ex:"Ik heb hem onlangs gezien.", exEn:"I saw him recently." },
  { nl:"tegenwoordig", en:"nowadays", level:"B2", theme:"time", art:"", pos:"adv", ex:"Tegenwoordig werkt iedereen thuis.", exEn:"Nowadays everyone works from home." },

  // ================= FOOD & DRINK =================
  { nl:"water", en:"water", level:"A1", theme:"food", art:"het", pos:"noun", ex:"Mag ik een glas water?", exEn:"May I have a glass of water?" },
  { nl:"brood", en:"bread", level:"A1", theme:"food", art:"het", pos:"noun", ex:"Ik eet brood met kaas.", exEn:"I eat bread with cheese." },
  { nl:"kaas", en:"cheese", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Nederlandse kaas is lekker.", exEn:"Dutch cheese is tasty." },
  { nl:"koffie", en:"coffee", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Ik drink graag koffie.", exEn:"I like drinking coffee." },
  { nl:"thee", en:"tea", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Een kopje thee, graag.", exEn:"A cup of tea, please." },
  { nl:"melk", en:"milk", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Koffie met melk, alsjeblieft.", exEn:"Coffee with milk, please." },
  { nl:"appel", en:"apple", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Een appel per dag.", exEn:"An apple a day." },
  { nl:"vlees", en:"meat", level:"A1", theme:"food", art:"het", pos:"noun", ex:"Ik eet geen vlees.", exEn:"I don't eat meat." },
  { nl:"vis", en:"fish", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Verse vis van de markt.", exEn:"Fresh fish from the market." },
  { nl:"groente", en:"vegetable(s)", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Eet je groente op!", exEn:"Eat your vegetables!" },
  { nl:"fruit", en:"fruit", level:"A1", theme:"food", art:"het", pos:"noun", ex:"Fruit is gezond.", exEn:"Fruit is healthy." },
  { nl:"ontbijt", en:"breakfast", level:"A2", theme:"food", art:"het", pos:"noun", ex:"Het ontbijt is om acht uur.", exEn:"Breakfast is at eight." },
  { nl:"avondeten", en:"dinner", level:"A2", theme:"food", art:"het", pos:"noun", ex:"Wat eten we als avondeten?", exEn:"What are we having for dinner?" },
  { nl:"lekker", en:"tasty / nice", level:"A1", theme:"food", art:"", pos:"adj", ex:"Dat smaakt lekker!", exEn:"That tastes nice!" },
  { nl:"honger", en:"hunger", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Ik heb honger.", exEn:"I'm hungry." },
  { nl:"dorst", en:"thirst", level:"A1", theme:"food", art:"de", pos:"noun", ex:"Heb je dorst?", exEn:"Are you thirsty?" },
  { nl:"bestellen", en:"to order", level:"A2", theme:"food", art:"", pos:"verb", ex:"Wat wil je bestellen?", exEn:"What do you want to order?" },
  { nl:"proeven", en:"to taste", level:"B1", theme:"food", art:"", pos:"verb", ex:"Wil je even proeven?", exEn:"Do you want to have a taste?" },
  { nl:"recept", en:"recipe", level:"B1", theme:"food", art:"het", pos:"noun", ex:"Een recept van mijn oma.", exEn:"A recipe from my grandma." },
  { nl:"gerecht", en:"dish", level:"B1", theme:"food", art:"het", pos:"noun", ex:"Een typisch Hollands gerecht.", exEn:"A typical Dutch dish." },

  // ================= HOME & HOUSEHOLD =================
  { nl:"huis", en:"house", level:"A1", theme:"home", art:"het", pos:"noun", ex:"Ons huis is klein.", exEn:"Our house is small." },
  { nl:"kamer", en:"room", level:"A1", theme:"home", art:"de", pos:"noun", ex:"Mijn kamer is boven.", exEn:"My room is upstairs." },
  { nl:"keuken", en:"kitchen", level:"A1", theme:"home", art:"de", pos:"noun", ex:"De keuken is nieuw.", exEn:"The kitchen is new." },
  { nl:"slaapkamer", en:"bedroom", level:"A1", theme:"home", art:"de", pos:"noun", ex:"Er zijn twee slaapkamers.", exEn:"There are two bedrooms." },
  { nl:"badkamer", en:"bathroom", level:"A1", theme:"home", art:"de", pos:"noun", ex:"De badkamer is beneden.", exEn:"The bathroom is downstairs." },
  { nl:"deur", en:"door", level:"A1", theme:"home", art:"de", pos:"noun", ex:"Doe de deur dicht.", exEn:"Close the door." },
  { nl:"raam", en:"window", level:"A1", theme:"home", art:"het", pos:"noun", ex:"Het raam staat open.", exEn:"The window is open." },
  { nl:"tafel", en:"table", level:"A1", theme:"home", art:"de", pos:"noun", ex:"Het eten staat op tafel.", exEn:"The food is on the table." },
  { nl:"stoel", en:"chair", level:"A1", theme:"home", art:"de", pos:"noun", ex:"Ga op de stoel zitten.", exEn:"Sit on the chair." },
  { nl:"bed", en:"bed", level:"A1", theme:"home", art:"het", pos:"noun", ex:"Ik ga naar bed.", exEn:"I'm going to bed." },
  { nl:"tuin", en:"garden", level:"A2", theme:"home", art:"de", pos:"noun", ex:"We eten in de tuin.", exEn:"We're eating in the garden." },
  { nl:"appartement", en:"apartment", level:"A2", theme:"home", art:"het", pos:"noun", ex:"Ik huur een appartement.", exEn:"I rent an apartment." },
  { nl:"huren", en:"to rent", level:"A2", theme:"home", art:"", pos:"verb", ex:"We huren dit huis.", exEn:"We rent this house." },
  { nl:"schoonmaken", en:"to clean", level:"A2", theme:"home", art:"", pos:"verb", ex:"Ik maak de keuken schoon.", exEn:"I'm cleaning the kitchen." },
  { nl:"opruimen", en:"to tidy up", level:"B1", theme:"home", art:"", pos:"verb", ex:"Ruim je kamer op!", exEn:"Tidy your room!" },
  { nl:"verhuizen", en:"to move (house)", level:"B1", theme:"home", art:"", pos:"verb", ex:"We verhuizen volgende maand.", exEn:"We're moving next month." },
  { nl:"gezellig", en:"cosy / convivial", level:"B1", theme:"home", art:"", pos:"adj", ex:"Wat een gezellig huis!", exEn:"What a cosy house!" },

  // ================= BODY & HEALTH =================
  { nl:"hoofd", en:"head", level:"A1", theme:"health", art:"het", pos:"noun", ex:"Ik heb pijn in mijn hoofd.", exEn:"I have a pain in my head." },
  { nl:"hand", en:"hand", level:"A1", theme:"health", art:"de", pos:"noun", ex:"Geef me je hand.", exEn:"Give me your hand." },
  { nl:"oog", en:"eye", level:"A1", theme:"health", art:"het", pos:"noun", ex:"Ze heeft blauwe ogen.", exEn:"She has blue eyes." },
  { nl:"been", en:"leg", level:"A1", theme:"health", art:"het", pos:"noun", ex:"Mijn been doet pijn.", exEn:"My leg hurts." },
  { nl:"buik", en:"belly / stomach", level:"A1", theme:"health", art:"de", pos:"noun", ex:"Ik heb buikpijn.", exEn:"I have a stomach ache." },
  { nl:"ziek", en:"sick / ill", level:"A2", theme:"health", art:"", pos:"adj", ex:"Ik ben ziek vandaag.", exEn:"I'm sick today." },
  { nl:"gezond", en:"healthy", level:"A2", theme:"health", art:"", pos:"adj", ex:"Zij leeft heel gezond.", exEn:"She lives very healthily." },
  { nl:"pijn", en:"pain", level:"A2", theme:"health", art:"de", pos:"noun", ex:"Ik heb pijn in mijn rug.", exEn:"I have pain in my back." },
  { nl:"dokter", en:"doctor", level:"A2", theme:"health", art:"de", pos:"noun", ex:"Ik ga naar de dokter.", exEn:"I'm going to the doctor." },
  { nl:"huisarts", en:"GP / family doctor", level:"A2", theme:"health", art:"de", pos:"noun", ex:"Bel de huisarts.", exEn:"Call the GP." },
  { nl:"ziekenhuis", en:"hospital", level:"A2", theme:"health", art:"het", pos:"noun", ex:"Hij ligt in het ziekenhuis.", exEn:"He's in hospital." },
  { nl:"medicijn", en:"medicine", level:"A2", theme:"health", art:"het", pos:"noun", ex:"Neem je medicijnen in.", exEn:"Take your medicine." },
  { nl:"koorts", en:"fever", level:"B1", theme:"health", art:"de", pos:"noun", ex:"Het kind heeft koorts.", exEn:"The child has a fever." },
  { nl:"gewond", en:"injured", level:"B1", theme:"health", art:"", pos:"adj", ex:"Niemand raakte gewond.", exEn:"Nobody was injured." },
  { nl:"herstellen", en:"to recover", level:"B2", theme:"health", art:"", pos:"verb", ex:"Hij herstelt goed.", exEn:"He is recovering well." },
  { nl:"behandeling", en:"treatment", level:"B2", theme:"health", art:"de", pos:"noun", ex:"De behandeling duurt lang.", exEn:"The treatment takes a long time." },

  // ================= CLOTHING & APPEARANCE =================
  { nl:"kleding", en:"clothing", level:"A2", theme:"clothing", art:"de", pos:"noun", ex:"Warme kleding is nodig.", exEn:"Warm clothing is needed." },
  { nl:"jas", en:"coat / jacket", level:"A1", theme:"clothing", art:"de", pos:"noun", ex:"Trek je jas aan.", exEn:"Put your coat on." },
  { nl:"broek", en:"trousers", level:"A1", theme:"clothing", art:"de", pos:"noun", ex:"Deze broek is te klein.", exEn:"These trousers are too small." },
  { nl:"schoen", en:"shoe", level:"A1", theme:"clothing", art:"de", pos:"noun", ex:"Mijn schoenen zijn nat.", exEn:"My shoes are wet." },
  { nl:"hemd", en:"shirt", level:"A2", theme:"clothing", art:"het", pos:"noun", ex:"Een wit hemd staat mooi.", exEn:"A white shirt looks nice." },
  { nl:"kleur", en:"colour", level:"A1", theme:"clothing", art:"de", pos:"noun", ex:"Welke kleur wil je?", exEn:"Which colour do you want?" },
  { nl:"rood", en:"red", level:"A1", theme:"clothing", art:"", pos:"adj", ex:"Een rode jas.", exEn:"A red coat." },
  { nl:"blauw", en:"blue", level:"A1", theme:"clothing", art:"", pos:"adj", ex:"De lucht is blauw.", exEn:"The sky is blue." },
  { nl:"zwart", en:"black", level:"A1", theme:"clothing", art:"", pos:"adj", ex:"Zwarte schoenen.", exEn:"Black shoes." },
  { nl:"maat", en:"size", level:"A2", theme:"clothing", art:"de", pos:"noun", ex:"Welke maat heeft u?", exEn:"What size are you?" },
  { nl:"passen", en:"to try on / fit", level:"A2", theme:"clothing", art:"", pos:"verb", ex:"Mag ik dit passen?", exEn:"May I try this on?" },
  { nl:"aantrekken", en:"to put on", level:"B1", theme:"clothing", art:"", pos:"verb", ex:"Ik trek een trui aan.", exEn:"I'll put on a sweater." },
  { nl:"uiterlijk", en:"appearance", level:"B2", theme:"clothing", art:"het", pos:"noun", ex:"Uiterlijk is niet alles.", exEn:"Appearance isn't everything." },

  // ================= TRAVEL & TRANSPORT =================
  { nl:"trein", en:"train", level:"A1", theme:"travel", art:"de", pos:"noun", ex:"De trein is te laat.", exEn:"The train is late." },
  { nl:"fiets", en:"bicycle", level:"A1", theme:"travel", art:"de", pos:"noun", ex:"Ik ga met de fiets.", exEn:"I'm going by bike." },
  { nl:"auto", en:"car", level:"A1", theme:"travel", art:"de", pos:"noun", ex:"De auto staat buiten.", exEn:"The car is outside." },
  { nl:"bus", en:"bus", level:"A1", theme:"travel", art:"de", pos:"noun", ex:"De bus komt zo.", exEn:"The bus is coming soon." },
  { nl:"vliegtuig", en:"aeroplane", level:"A2", theme:"travel", art:"het", pos:"noun", ex:"Het vliegtuig vertrekt om zes uur.", exEn:"The plane leaves at six." },
  { nl:"station", en:"station", level:"A2", theme:"travel", art:"het", pos:"noun", ex:"Het station is dichtbij.", exEn:"The station is nearby." },
  { nl:"kaartje", en:"ticket", level:"A2", theme:"travel", art:"het", pos:"noun", ex:"Waar koop ik een kaartje?", exEn:"Where do I buy a ticket?" },
  { nl:"perron", en:"platform", level:"A2", theme:"travel", art:"het", pos:"noun", ex:"De trein vertrekt van perron 4.", exEn:"The train leaves from platform 4." },
  { nl:"reizen", en:"to travel", level:"A2", theme:"travel", art:"", pos:"verb", ex:"Ik reis graag alleen.", exEn:"I like travelling alone." },
  { nl:"vertrekken", en:"to depart", level:"B1", theme:"travel", art:"", pos:"verb", ex:"We vertrekken vroeg.", exEn:"We depart early." },
  { nl:"aankomen", en:"to arrive", level:"B1", theme:"travel", art:"", pos:"verb", ex:"Hoe laat kom je aan?", exEn:"What time do you arrive?" },
  { nl:"overstappen", en:"to change / transfer", level:"B1", theme:"travel", art:"", pos:"verb", ex:"Je moet in Utrecht overstappen.", exEn:"You have to change in Utrecht." },
  { nl:"vertraging", en:"delay", level:"B1", theme:"travel", art:"de", pos:"noun", ex:"Er is vertraging op het spoor.", exEn:"There's a delay on the line." },
  { nl:"bestemming", en:"destination", level:"B2", theme:"travel", art:"de", pos:"noun", ex:"Wat is uw eindbestemming?", exEn:"What is your final destination?" },

  // ================= CITY & DIRECTIONS =================
  { nl:"stad", en:"city", level:"A1", theme:"city", art:"de", pos:"noun", ex:"Amsterdam is een mooie stad.", exEn:"Amsterdam is a beautiful city." },
  { nl:"straat", en:"street", level:"A1", theme:"city", art:"de", pos:"noun", ex:"Ik woon in deze straat.", exEn:"I live on this street." },
  { nl:"winkel", en:"shop", level:"A1", theme:"city", art:"de", pos:"noun", ex:"De winkel is gesloten.", exEn:"The shop is closed." },
  { nl:"markt", en:"market", level:"A1", theme:"city", art:"de", pos:"noun", ex:"Op zaterdag is er markt.", exEn:"There's a market on Saturday." },
  { nl:"links", en:"left", level:"A1", theme:"city", art:"", pos:"adv", ex:"Ga hier naar links.", exEn:"Go left here." },
  { nl:"rechts", en:"right", level:"A1", theme:"city", art:"", pos:"adv", ex:"De winkel is aan de rechterkant.", exEn:"The shop is on the right." },
  { nl:"rechtdoor", en:"straight ahead", level:"A2", theme:"city", art:"", pos:"adv", ex:"Loop rechtdoor tot het plein.", exEn:"Walk straight on to the square." },
  { nl:"dichtbij", en:"nearby", level:"A2", theme:"city", art:"", pos:"adj", ex:"Het is heel dichtbij.", exEn:"It's very close." },
  { nl:"ver", en:"far", level:"A2", theme:"city", art:"", pos:"adj", ex:"Is het nog ver?", exEn:"Is it still far?" },
  { nl:"plein", en:"square", level:"A2", theme:"city", art:"het", pos:"noun", ex:"We ontmoeten op het plein.", exEn:"We'll meet at the square." },
  { nl:"gebouw", en:"building", level:"A2", theme:"city", art:"het", pos:"noun", ex:"Dat gebouw is heel oud.", exEn:"That building is very old." },
  { nl:"brug", en:"bridge", level:"A2", theme:"city", art:"de", pos:"noun", ex:"Steek de brug over.", exEn:"Cross the bridge." },
  { nl:"hoek", en:"corner", level:"B1", theme:"city", art:"de", pos:"noun", ex:"De bakker zit om de hoek.", exEn:"The baker is around the corner." },
  { nl:"omgeving", en:"surroundings / area", level:"B1", theme:"city", art:"de", pos:"noun", ex:"De omgeving is rustig.", exEn:"The area is quiet." },
  { nl:"wijk", en:"neighbourhood / district", level:"B1", theme:"city", art:"de", pos:"noun", ex:"Het is een gezellige wijk.", exEn:"It's a pleasant neighbourhood." },

  // ================= SHOPPING & MONEY =================
  { nl:"geld", en:"money", level:"A1", theme:"shopping", art:"het", pos:"noun", ex:"Ik heb geen geld bij me.", exEn:"I have no money on me." },
  { nl:"euro", en:"euro", level:"A1", theme:"shopping", art:"de", pos:"noun", ex:"Dat is tien euro.", exEn:"That's ten euros." },
  { nl:"prijs", en:"price", level:"A2", theme:"shopping", art:"de", pos:"noun", ex:"Wat is de prijs?", exEn:"What's the price?" },
  { nl:"kopen", en:"to buy", level:"A1", theme:"shopping", art:"", pos:"verb", ex:"Ik wil een cadeau kopen.", exEn:"I want to buy a gift." },
  { nl:"betalen", en:"to pay", level:"A2", theme:"shopping", art:"", pos:"verb", ex:"Kan ik met pin betalen?", exEn:"Can I pay by card?" },
  { nl:"pinnen", en:"to pay by debit card", level:"A2", theme:"shopping", art:"", pos:"verb", ex:"Pinnen of contant?", exEn:"Card or cash?" },
  { nl:"duur", en:"expensive", level:"A2", theme:"shopping", art:"", pos:"adj", ex:"Dat is te duur.", exEn:"That's too expensive." },
  { nl:"goedkoop", en:"cheap", level:"A2", theme:"shopping", art:"", pos:"adj", ex:"Deze is goedkoop.", exEn:"This one is cheap." },
  { nl:"korting", en:"discount", level:"A2", theme:"shopping", art:"de", pos:"noun", ex:"Er is korting op alles.", exEn:"There's a discount on everything." },
  { nl:"gratis", en:"free (of charge)", level:"A2", theme:"shopping", art:"", pos:"adj", ex:"De koffie is gratis.", exEn:"The coffee is free." },
  { nl:"kassa", en:"checkout / till", level:"A2", theme:"shopping", art:"de", pos:"noun", ex:"Betaal bij de kassa.", exEn:"Pay at the till." },
  { nl:"bon", en:"receipt", level:"B1", theme:"shopping", art:"de", pos:"noun", ex:"Wilt u de bon?", exEn:"Would you like the receipt?" },
  { nl:"besparen", en:"to save (money)", level:"B2", theme:"shopping", art:"", pos:"verb", ex:"Zo bespaar je veel geld.", exEn:"That way you save a lot of money." },
  { nl:"uitgeven", en:"to spend", level:"B1", theme:"shopping", art:"", pos:"verb", ex:"Ze geeft te veel geld uit.", exEn:"She spends too much money." },

  // ================= WORK & CAREER =================
  { nl:"werken", en:"to work", level:"A1", theme:"work", art:"", pos:"verb", ex:"Zij werkt bij een bank.", exEn:"She works at a bank." },
  { nl:"baan", en:"job", level:"A2", theme:"work", art:"de", pos:"noun", ex:"Ik zoek een nieuwe baan.", exEn:"I'm looking for a new job." },
  { nl:"werk", en:"work", level:"A1", theme:"work", art:"het", pos:"noun", ex:"Ik ga naar mijn werk.", exEn:"I'm going to work." },
  { nl:"kantoor", en:"office", level:"A2", theme:"work", art:"het", pos:"noun", ex:"Het kantoor is in het centrum.", exEn:"The office is in the centre." },
  { nl:"baas", en:"boss", level:"A2", theme:"work", art:"de", pos:"noun", ex:"Mijn baas is streng.", exEn:"My boss is strict." },
  { nl:"salaris", en:"salary", level:"B1", theme:"work", art:"het", pos:"noun", ex:"Het salaris is goed.", exEn:"The salary is good." },
  { nl:"afspraak", en:"appointment", level:"A2", theme:"work", art:"de", pos:"noun", ex:"Ik heb een afspraak om drie uur.", exEn:"I have an appointment at three." },
  { nl:"vergadering", en:"meeting", level:"B1", theme:"work", art:"de", pos:"noun", ex:"De vergadering duurde te lang.", exEn:"The meeting lasted too long." },
  { nl:"ervaring", en:"experience", level:"B1", theme:"work", art:"de", pos:"noun", ex:"Ik heb veel ervaring met koken.", exEn:"I have a lot of experience with cooking." },
  { nl:"sollicitatie", en:"job application/interview", level:"B1", theme:"work", art:"de", pos:"noun", ex:"Mijn sollicitatie ging goed.", exEn:"My job interview went well." },
  { nl:"verantwoordelijk", en:"responsible", level:"B1", theme:"work", art:"", pos:"adj", ex:"Zij is verantwoordelijk voor het team.", exEn:"She is responsible for the team." },
  { nl:"werkgever", en:"employer", level:"B2", theme:"work", art:"de", pos:"noun", ex:"Een goede werkgever luistert.", exEn:"A good employer listens." },
  { nl:"werknemer", en:"employee", level:"B2", theme:"work", art:"de", pos:"noun", ex:"De werknemers staken.", exEn:"The employees are on strike." },
  { nl:"deadline", en:"deadline", level:"B1", theme:"work", art:"de", pos:"noun", ex:"We moeten de deadline halen.", exEn:"We have to meet the deadline." },
  { nl:"overwerken", en:"to work overtime", level:"B2", theme:"work", art:"", pos:"verb", ex:"Ik moet vanavond overwerken.", exEn:"I have to work overtime tonight." },

  // ================= EDUCATION & LEARNING =================
  { nl:"school", en:"school", level:"A1", theme:"education", art:"de", pos:"noun", ex:"De kinderen gaan naar school.", exEn:"The children go to school." },
  { nl:"leraar", en:"teacher (male)", level:"A1", theme:"education", art:"de", pos:"noun", ex:"De leraar legt het goed uit.", exEn:"The teacher explains it well." },
  { nl:"les", en:"lesson / class", level:"A1", theme:"education", art:"de", pos:"noun", ex:"De les begint om negen uur.", exEn:"The class begins at nine." },
  { nl:"boek", en:"book", level:"A1", theme:"education", art:"het", pos:"noun", ex:"Ik lees een goed boek.", exEn:"I'm reading a good book." },
  { nl:"woord", en:"word", level:"A1", theme:"education", art:"het", pos:"noun", ex:"Wat betekent dit woord?", exEn:"What does this word mean?" },
  { nl:"vraag", en:"question", level:"A1", theme:"education", art:"de", pos:"noun", ex:"Heb je een vraag?", exEn:"Do you have a question?" },
  { nl:"antwoord", en:"answer", level:"A2", theme:"education", art:"het", pos:"noun", ex:"Ik weet het antwoord niet.", exEn:"I don't know the answer." },
  { nl:"leren", en:"to learn / study", level:"A1", theme:"education", art:"", pos:"verb", ex:"Ik leer Nederlands.", exEn:"I'm learning Dutch." },
  { nl:"studeren", en:"to study (at uni)", level:"A2", theme:"education", art:"", pos:"verb", ex:"Ze studeert medicijnen.", exEn:"She studies medicine." },
  { nl:"herhalen", en:"to repeat", level:"A2", theme:"education", art:"", pos:"verb", ex:"Kunt u dat herhalen?", exEn:"Could you repeat that?" },
  { nl:"begrijpen", en:"to understand", level:"A2", theme:"education", art:"", pos:"verb", ex:"Ik begrijp het niet.", exEn:"I don't understand it." },
  { nl:"onthouden", en:"to remember", level:"A2", theme:"education", art:"", pos:"verb", ex:"Ik kan het niet onthouden.", exEn:"I can't remember it." },
  { nl:"oefenen", en:"to practise", level:"A2", theme:"education", art:"", pos:"verb", ex:"Je moet elke dag oefenen.", exEn:"You must practise every day." },
  { nl:"examen", en:"exam", level:"B1", theme:"education", art:"het", pos:"noun", ex:"Ik ben geslaagd voor mijn examen.", exEn:"I passed my exam." },
  { nl:"kennis (knowledge)", en:"knowledge", level:"B2", theme:"education", art:"de", pos:"noun", ex:"Zijn kennis is indrukwekkend.", exEn:"His knowledge is impressive." },

  // ================= NATURE, WEATHER & ENVIRONMENT =================
  { nl:"weer", en:"weather", level:"A1", theme:"nature", art:"het", pos:"noun", ex:"Het weer is slecht.", exEn:"The weather is bad." },
  { nl:"regen", en:"rain", level:"A2", theme:"nature", art:"de", pos:"noun", ex:"Er komt regen aan.", exEn:"Rain is coming." },
  { nl:"zon", en:"sun", level:"A1", theme:"nature", art:"de", pos:"noun", ex:"De zon schijnt.", exEn:"The sun is shining." },
  { nl:"wind", en:"wind", level:"A2", theme:"nature", art:"de", pos:"noun", ex:"Er staat veel wind.", exEn:"It's very windy." },
  { nl:"sneeuw", en:"snow", level:"A2", theme:"nature", art:"de", pos:"noun", ex:"Er ligt sneeuw op straat.", exEn:"There's snow on the street." },
  { nl:"koud", en:"cold", level:"A1", theme:"nature", art:"", pos:"adj", ex:"Het is koud buiten.", exEn:"It's cold outside." },
  { nl:"warm", en:"warm / hot", level:"A1", theme:"nature", art:"", pos:"adj", ex:"Wat is het warm vandaag!", exEn:"How warm it is today!" },
  { nl:"boom", en:"tree", level:"A1", theme:"nature", art:"de", pos:"noun", ex:"De boom verliest zijn bladeren.", exEn:"The tree is losing its leaves." },
  { nl:"bloem", en:"flower", level:"A1", theme:"nature", art:"de", pos:"noun", ex:"Nederland staat bekend om zijn bloemen.", exEn:"The Netherlands is known for its flowers." },
  { nl:"zee", en:"sea", level:"A2", theme:"nature", art:"de", pos:"noun", ex:"We wonen dicht bij de zee.", exEn:"We live close to the sea." },
  { nl:"natuur", en:"nature", level:"A2", theme:"nature", art:"de", pos:"noun", ex:"Ik geniet van de natuur.", exEn:"I enjoy nature." },
  { nl:"milieu", en:"environment", level:"B1", theme:"nature", art:"het", pos:"noun", ex:"We moeten het milieu beschermen.", exEn:"We must protect the environment." },
  { nl:"duurzaam", en:"sustainable", level:"B2", theme:"nature", art:"", pos:"adj", ex:"We kiezen voor duurzame energie.", exEn:"We choose sustainable energy." },
  { nl:"klimaat", en:"climate", level:"B2", theme:"nature", art:"het", pos:"noun", ex:"De klimaatverandering gaat snel.", exEn:"Climate change is happening fast." },
  { nl:"vervuiling", en:"pollution", level:"B2", theme:"nature", art:"de", pos:"noun", ex:"Vervuiling is een groot probleem.", exEn:"Pollution is a big problem." },

  // ================= ANIMALS =================
  { nl:"hond", en:"dog", level:"A1", theme:"animals", art:"de", pos:"noun", ex:"De hond blaft hard.", exEn:"The dog barks loudly." },
  { nl:"kat", en:"cat", level:"A1", theme:"animals", art:"de", pos:"noun", ex:"De kat slaapt de hele dag.", exEn:"The cat sleeps all day." },
  { nl:"vogel", en:"bird", level:"A1", theme:"animals", art:"de", pos:"noun", ex:"Een vogel zingt in de tuin.", exEn:"A bird is singing in the garden." },
  { nl:"paard", en:"horse", level:"A1", theme:"animals", art:"het", pos:"noun", ex:"Het paard rent in de wei.", exEn:"The horse runs in the meadow." },
  { nl:"koe", en:"cow", level:"A1", theme:"animals", art:"de", pos:"noun", ex:"De koeien staan in het weiland.", exEn:"The cows are in the field." },
  { nl:"huisdier", en:"pet", level:"A2", theme:"animals", art:"het", pos:"noun", ex:"Heb je huisdieren?", exEn:"Do you have pets?" },
  { nl:"dier", en:"animal", level:"A1", theme:"animals", art:"het", pos:"noun", ex:"Welk dier vind je leuk?", exEn:"Which animal do you like?" },
  { nl:"muis", en:"mouse", level:"A2", theme:"animals", art:"de", pos:"noun", ex:"Er zit een muis in huis.", exEn:"There's a mouse in the house." },
  { nl:"vlieg", en:"fly", level:"B1", theme:"animals", art:"de", pos:"noun", ex:"Er zoemt een vlieg.", exEn:"A fly is buzzing." },

  // ================= EMOTIONS & PERSONALITY =================
  { nl:"blij", en:"happy / glad", level:"A1", theme:"emotions", art:"", pos:"adj", ex:"Ik ben blij je te zien.", exEn:"I'm happy to see you." },
  { nl:"boos", en:"angry", level:"A2", theme:"emotions", art:"", pos:"adj", ex:"Ben je boos op mij?", exEn:"Are you angry with me?" },
  { nl:"bang", en:"afraid", level:"A2", theme:"emotions", art:"", pos:"adj", ex:"Ik ben bang in het donker.", exEn:"I'm afraid in the dark." },
  { nl:"verdrietig", en:"sad", level:"A2", theme:"emotions", art:"", pos:"adj", ex:"Ze is verdrietig vandaag.", exEn:"She is sad today." },
  { nl:"moe", en:"tired", level:"A1", theme:"emotions", art:"", pos:"adj", ex:"Ik ben heel moe.", exEn:"I'm very tired." },
  { nl:"trots", en:"proud", level:"B1", theme:"emotions", art:"", pos:"adj", ex:"Ik ben trots op jou.", exEn:"I'm proud of you." },
  { nl:"aardig", en:"kind / nice", level:"A2", theme:"emotions", art:"", pos:"adj", ex:"Wat een aardige man.", exEn:"What a kind man." },
  { nl:"vriendelijk", en:"friendly", level:"A2", theme:"emotions", art:"", pos:"adj", ex:"De ober is heel vriendelijk.", exEn:"The waiter is very friendly." },
  { nl:"eerlijk", en:"honest / fair", level:"B1", theme:"emotions", art:"", pos:"adj", ex:"Wees eerlijk tegen me.", exEn:"Be honest with me." },
  { nl:"geduldig", en:"patient", level:"B1", theme:"emotions", art:"", pos:"adj", ex:"Een leraar moet geduldig zijn.", exEn:"A teacher must be patient." },
  { nl:"zich voelen", en:"to feel", level:"B1", theme:"emotions", art:"", pos:"verb", ex:"Hoe voel je je vandaag?", exEn:"How do you feel today?" },
  { nl:"gedrag", en:"behaviour", level:"B2", theme:"emotions", art:"het", pos:"noun", ex:"Zijn gedrag verbaasde me.", exEn:"His behaviour surprised me." },
  { nl:"zelfvertrouwen", en:"self-confidence", level:"B2", theme:"emotions", art:"het", pos:"noun", ex:"Ze heeft veel zelfvertrouwen.", exEn:"She has a lot of self-confidence." },
  { nl:"koppig", en:"stubborn", level:"C1", theme:"emotions", art:"", pos:"adj", ex:"Hij is ontzettend koppig.", exEn:"He is terribly stubborn." },

  // ================= HOBBIES, SPORT & LEISURE =================
  { nl:"sport", en:"sport", level:"A1", theme:"hobbies", art:"de", pos:"noun", ex:"Welke sport doe je?", exEn:"Which sport do you do?" },
  { nl:"voetbal", en:"football", level:"A1", theme:"hobbies", art:"het", pos:"noun", ex:"Voetbal is populair hier.", exEn:"Football is popular here." },
  { nl:"muziek", en:"music", level:"A1", theme:"hobbies", art:"de", pos:"noun", ex:"Ik luister naar muziek.", exEn:"I listen to music." },
  { nl:"film", en:"film / movie", level:"A1", theme:"hobbies", art:"de", pos:"noun", ex:"We kijken een film.", exEn:"We're watching a film." },
  { nl:"lezen", en:"to read", level:"A1", theme:"hobbies", art:"", pos:"verb", ex:"Ik hou van lezen.", exEn:"I love reading." },
  { nl:"zwemmen", en:"to swim", level:"A1", theme:"hobbies", art:"", pos:"verb", ex:"In de zomer gaan we zwemmen.", exEn:"In summer we go swimming." },
  { nl:"dansen", en:"to dance", level:"A1", theme:"hobbies", art:"", pos:"verb", ex:"Zij danst heel goed.", exEn:"She dances very well." },
  { nl:"koken", en:"to cook", level:"A1", theme:"hobbies", art:"", pos:"verb", ex:"Ik kook graag Italiaans.", exEn:"I like cooking Italian food." },
  { nl:"tekenen", en:"to draw", level:"A2", theme:"hobbies", art:"", pos:"verb", ex:"Kinderen tekenen graag.", exEn:"Children like to draw." },
  { nl:"vrije tijd", en:"free time", level:"A2", theme:"hobbies", art:"de", pos:"noun", ex:"Wat doe je in je vrije tijd?", exEn:"What do you do in your free time?" },
  { nl:"wandelen", en:"to walk / hike", level:"A2", theme:"hobbies", art:"", pos:"verb", ex:"We gaan in het bos wandelen.", exEn:"We go hiking in the forest." },
  { nl:"verzamelen", en:"to collect", level:"B1", theme:"hobbies", art:"", pos:"verb", ex:"Hij verzamelt oude munten.", exEn:"He collects old coins." },
  { nl:"ontspannen", en:"to relax", level:"B1", theme:"hobbies", art:"", pos:"verb", ex:"In het weekend ontspan ik.", exEn:"At the weekend I relax." },

  // ================= TECHNOLOGY & MEDIA =================
  { nl:"telefoon", en:"phone", level:"A1", theme:"tech", art:"de", pos:"noun", ex:"Mijn telefoon is bijna leeg.", exEn:"My phone is almost dead." },
  { nl:"computer", en:"computer", level:"A1", theme:"tech", art:"de", pos:"noun", ex:"De computer is traag.", exEn:"The computer is slow." },
  { nl:"internet", en:"internet", level:"A2", theme:"tech", art:"het", pos:"noun", ex:"Is er hier internet?", exEn:"Is there internet here?" },
  { nl:"e-mail", en:"email", level:"A2", theme:"tech", art:"de", pos:"noun", ex:"Ik stuur je een e-mail.", exEn:"I'll send you an email." },
  { nl:"bestand", en:"file", level:"B1", theme:"tech", art:"het", pos:"noun", ex:"Kun je me het bestand sturen?", exEn:"Can you send me the file?" },
  { nl:"scherm", en:"screen", level:"A2", theme:"tech", art:"het", pos:"noun", ex:"Het scherm is kapot.", exEn:"The screen is broken." },
  { nl:"toetsenbord", en:"keyboard", level:"B1", theme:"tech", art:"het", pos:"noun", ex:"Dit toetsenbord is nieuw.", exEn:"This keyboard is new." },
  { nl:"downloaden", en:"to download", level:"A2", theme:"tech", art:"", pos:"verb", ex:"Ik download de app.", exEn:"I'm downloading the app." },
  { nl:"nieuws", en:"news", level:"A2", theme:"tech", art:"het", pos:"noun", ex:"Ik kijk elke avond het nieuws.", exEn:"I watch the news every evening." },
  { nl:"bericht", en:"message", level:"A2", theme:"tech", art:"het", pos:"noun", ex:"Ik kreeg een bericht van haar.", exEn:"I got a message from her." },
  { nl:"opslaan", en:"to save (a file)", level:"B1", theme:"tech", art:"", pos:"verb", ex:"Vergeet niet op te slaan.", exEn:"Don't forget to save." },
  { nl:"aansluiten", en:"to connect", level:"B2", theme:"tech", art:"", pos:"verb", ex:"Sluit de kabel aan.", exEn:"Connect the cable." },

  // ================= SOCIETY, POLITICS & NEWS =================
  { nl:"regering", en:"government", level:"B1", theme:"society", art:"de", pos:"noun", ex:"De regering heeft besloten.", exEn:"The government has decided." },
  { nl:"overheid", en:"authorities / state", level:"B2", theme:"society", art:"de", pos:"noun", ex:"De overheid grijpt in.", exEn:"The state intervenes." },
  { nl:"wet", en:"law", level:"B1", theme:"society", art:"de", pos:"noun", ex:"Dat is tegen de wet.", exEn:"That's against the law." },
  { nl:"maatregel", en:"measure", level:"B2", theme:"society", art:"de", pos:"noun", ex:"Strenge maatregelen zijn nodig.", exEn:"Strict measures are needed." },
  { nl:"beleid", en:"policy", level:"B2", theme:"society", art:"het", pos:"noun", ex:"Het beleid moet veranderen.", exEn:"The policy must change." },
  { nl:"burger", en:"citizen", level:"B2", theme:"society", art:"de", pos:"noun", ex:"Elke burger heeft rechten.", exEn:"Every citizen has rights." },
  { nl:"verkiezing", en:"election", level:"B2", theme:"society", art:"de", pos:"noun", ex:"De verkiezingen zijn in maart.", exEn:"The elections are in March." },
  { nl:"stemmen", en:"to vote", level:"B2", theme:"society", art:"", pos:"verb", ex:"Ga jij stemmen?", exEn:"Are you going to vote?" },
  { nl:"invloed", en:"influence", level:"B2", theme:"society", art:"de", pos:"noun", ex:"De media hebben veel invloed.", exEn:"The media have a lot of influence." },
  { nl:"ontwikkeling", en:"development", level:"B2", theme:"society", art:"de", pos:"noun", ex:"Een zorgwekkende ontwikkeling.", exEn:"A worrying development." },
  { nl:"gevolg", en:"consequence", level:"B2", theme:"society", art:"het", pos:"noun", ex:"Dat heeft grote gevolgen.", exEn:"That has major consequences." },
  { nl:"samenleving", en:"society", level:"C1", theme:"society", art:"de", pos:"noun", ex:"Een rechtvaardige samenleving.", exEn:"A just society." },
  { nl:"vooroordeel", en:"prejudice", level:"C1", theme:"society", art:"het", pos:"noun", ex:"We moeten vooroordelen bestrijden.", exEn:"We must fight prejudice." },
  { nl:"ongelijkheid", en:"inequality", level:"C1", theme:"society", art:"de", pos:"noun", ex:"Sociale ongelijkheid neemt toe.", exEn:"Social inequality is increasing." },

  // ================= BUSINESS & ECONOMY =================
  { nl:"bedrijf", en:"company", level:"B1", theme:"business", art:"het", pos:"noun", ex:"Ik werk voor een groot bedrijf.", exEn:"I work for a big company." },
  { nl:"klant", en:"customer", level:"B1", theme:"business", art:"de", pos:"noun", ex:"De klant heeft altijd gelijk.", exEn:"The customer is always right." },
  { nl:"markt (economy)", en:"market", level:"B2", theme:"business", art:"de", pos:"noun", ex:"De markt is onzeker.", exEn:"The market is uncertain." },
  { nl:"winst", en:"profit", level:"B2", theme:"business", art:"de", pos:"noun", ex:"Het bedrijf maakt winst.", exEn:"The company makes a profit." },
  { nl:"verlies", en:"loss", level:"B2", theme:"business", art:"het", pos:"noun", ex:"Ze leden een groot verlies.", exEn:"They suffered a big loss." },
  { nl:"omzet", en:"turnover / revenue", level:"B2", theme:"business", art:"de", pos:"noun", ex:"De omzet is gestegen.", exEn:"Turnover has risen." },
  { nl:"stijgen", en:"to rise", level:"B2", theme:"business", art:"", pos:"verb", ex:"De prijzen stijgen snel.", exEn:"Prices are rising fast." },
  { nl:"dalen", en:"to fall / drop", level:"B2", theme:"business", art:"", pos:"verb", ex:"De rente daalt.", exEn:"Interest rates are falling." },
  { nl:"onderhandelen", en:"to negotiate", level:"C1", theme:"business", art:"", pos:"verb", ex:"We onderhandelen over de prijs.", exEn:"We're negotiating the price." },
  { nl:"concurrentie", en:"competition", level:"C1", theme:"business", art:"de", pos:"noun", ex:"De concurrentie is hevig.", exEn:"The competition is fierce." },
  { nl:"investeren", en:"to invest", level:"C1", theme:"business", art:"", pos:"verb", ex:"We investeren in nieuwe machines.", exEn:"We're investing in new machines." },
  { nl:"begroting", en:"budget", level:"C1", theme:"business", art:"de", pos:"noun", ex:"De begroting is krap.", exEn:"The budget is tight." },
  { nl:"failliet", en:"bankrupt", level:"C1", theme:"business", art:"", pos:"adj", ex:"Het bedrijf ging failliet.", exEn:"The company went bankrupt." },

  // ================= ABSTRACT & ACADEMIC =================
  { nl:"mening", en:"opinion", level:"B1", theme:"abstract", art:"de", pos:"noun", ex:"Wat is jouw mening hierover?", exEn:"What's your opinion on this?" },
  { nl:"verschil", en:"difference", level:"B1", theme:"abstract", art:"het", pos:"noun", ex:"Er is een groot verschil.", exEn:"There is a big difference." },
  { nl:"voordeel", en:"advantage", level:"B1", theme:"abstract", art:"het", pos:"noun", ex:"Het grote voordeel is de prijs.", exEn:"The big advantage is the price." },
  { nl:"nadeel", en:"disadvantage", level:"B1", theme:"abstract", art:"het", pos:"noun", ex:"Het nadeel is de afstand.", exEn:"The disadvantage is the distance." },
  { nl:"oplossing", en:"solution", level:"B1", theme:"abstract", art:"de", pos:"noun", ex:"We zoeken een oplossing.", exEn:"We're looking for a solution." },
  { nl:"besluit", en:"decision", level:"B1", theme:"abstract", art:"het", pos:"noun", ex:"Dat is een moeilijk besluit.", exEn:"That's a difficult decision." },
  { nl:"reden", en:"reason", level:"B1", theme:"abstract", art:"de", pos:"noun", ex:"Wat is de reden hiervoor?", exEn:"What's the reason for this?" },
  { nl:"doel", en:"goal / aim", level:"B1", theme:"abstract", art:"het", pos:"noun", ex:"Wat is jouw doel?", exEn:"What's your goal?" },
  { nl:"bewustzijn", en:"awareness / consciousness", level:"B2", theme:"abstract", art:"het", pos:"noun", ex:"Het bewustzijn groeit.", exEn:"Awareness is growing." },
  { nl:"ingewikkeld", en:"complicated", level:"B2", theme:"abstract", art:"", pos:"adj", ex:"Het is ingewikkelder dan het lijkt.", exEn:"It's more complicated than it seems." },
  { nl:"redelijk", en:"reasonable / fairly", level:"B2", theme:"abstract", art:"", pos:"adj", ex:"Dat lijkt me redelijk.", exEn:"That seems reasonable to me." },
  { nl:"onderscheid", en:"distinction", level:"C1", theme:"abstract", art:"het", pos:"noun", ex:"Maak onderscheid tussen feit en mening.", exEn:"Distinguish between fact and opinion." },
  { nl:"veronderstelling", en:"assumption", level:"C1", theme:"abstract", art:"de", pos:"noun", ex:"Dat berust op een verkeerde veronderstelling.", exEn:"That rests on a wrong assumption." },
  { nl:"aanzienlijk", en:"considerable", level:"C1", theme:"abstract", art:"", pos:"adj", ex:"Een aanzienlijk deel is het eens.", exEn:"A considerable part agrees." },
  { nl:"nuance", en:"nuance", level:"C1", theme:"abstract", art:"de", pos:"noun", ex:"Dat vraagt om enige nuance.", exEn:"That calls for some nuance." },
  { nl:"opzicht", en:"respect / regard", level:"C1", theme:"abstract", art:"het", pos:"noun", ex:"In dat opzicht heb je gelijk.", exEn:"In that respect you're right." },
  { nl:"streven", en:"to strive / aspiration", level:"C1", theme:"abstract", art:"het", pos:"noun/verb", ex:"Wij streven naar kwaliteit.", exEn:"We strive for quality." },
  { nl:"vergezocht", en:"far-fetched", level:"C1", theme:"abstract", art:"", pos:"adj", ex:"Dat argument is nogal vergezocht.", exEn:"That argument is rather far-fetched." },
  { nl:"weloverwogen", en:"well-considered", level:"C1", theme:"abstract", art:"", pos:"adj", ex:"Een weloverwogen keuze.", exEn:"A well-considered choice." },
  { nl:"vooringenomenheid", en:"bias / prejudice", level:"C2", theme:"abstract", art:"de", pos:"noun", ex:"Zijn oordeel getuigt van vooringenomenheid.", exEn:"His judgement betrays bias." },
  { nl:"gelaagd", en:"layered / multi-faceted", level:"C2", theme:"abstract", art:"", pos:"adj", ex:"Een gelaagd betoog.", exEn:"A layered argument." },
  { nl:"onmiskenbaar", en:"unmistakable", level:"C2", theme:"abstract", art:"", pos:"adj", ex:"Een onmiskenbare vooruitgang.", exEn:"An unmistakable improvement." },
  { nl:"doorslaggevend", en:"decisive", level:"C2", theme:"abstract", art:"", pos:"adj", ex:"Dat was het doorslaggevende argument.", exEn:"That was the decisive argument." },

  // ================= CONNECTORS & DISCOURSE =================
  { nl:"en", en:"and", level:"A1", theme:"connectors", art:"", pos:"conj", ex:"Brood en kaas.", exEn:"Bread and cheese." },
  { nl:"maar", en:"but", level:"A1", theme:"connectors", art:"", pos:"conj", ex:"Klein maar fijn.", exEn:"Small but nice." },
  { nl:"want", en:"because (coordinating)", level:"A2", theme:"connectors", art:"", pos:"conj", ex:"Ik blijf thuis, want ik ben moe.", exEn:"I'm staying home, because I'm tired." },
  { nl:"omdat", en:"because (subordinating)", level:"A2", theme:"connectors", art:"", pos:"conj", ex:"Ik blijf thuis omdat ik moe ben.", exEn:"I'm staying home because I'm tired." },
  { nl:"dus", en:"so / therefore", level:"A2", theme:"connectors", art:"", pos:"conj", ex:"Het regent, dus we blijven binnen.", exEn:"It's raining, so we stay in." },
  { nl:"of", en:"or", level:"A1", theme:"connectors", art:"", pos:"conj", ex:"Koffie of thee?", exEn:"Coffee or tea?" },
  { nl:"toch", en:"still / after all (particle)", level:"B1", theme:"connectors", art:"", pos:"adv", ex:"Je komt toch wel?", exEn:"You're coming anyway, right?" },
  { nl:"hoewel", en:"although", level:"B1", theme:"connectors", art:"", pos:"conj", ex:"Hoewel het regent, gaan we.", exEn:"Although it's raining, we're going." },
  { nl:"terwijl", en:"while", level:"B1", theme:"connectors", art:"", pos:"conj", ex:"Ik lees terwijl zij kookt.", exEn:"I read while she cooks." },
  { nl:"bovendien", en:"moreover", level:"B1", theme:"connectors", art:"", pos:"adv", ex:"Bovendien is het goedkoper.", exEn:"Moreover, it's cheaper." },
  { nl:"echter", en:"however", level:"B2", theme:"connectors", art:"", pos:"adv", ex:"Dit is echter niet waar.", exEn:"This, however, is not true." },
  { nl:"desondanks", en:"nevertheless", level:"B2", theme:"connectors", art:"", pos:"adv", ex:"Desondanks bleef hij kalm.", exEn:"Nevertheless he stayed calm." },
  { nl:"daarentegen", en:"on the other hand", level:"B2", theme:"connectors", art:"", pos:"adv", ex:"Zij daarentegen was het oneens.", exEn:"She, on the other hand, disagreed." },
  { nl:"vervolgens", en:"subsequently", level:"B2", theme:"connectors", art:"", pos:"adv", ex:"Vervolgens vertrok hij.", exEn:"Subsequently he left." },
  { nl:"tenzij", en:"unless", level:"C1", theme:"connectors", art:"", pos:"conj", ex:"We gaan, tenzij het stormt.", exEn:"We're going, unless it storms." },
  { nl:"weliswaar", en:"admittedly", level:"C1", theme:"connectors", art:"", pos:"adv", ex:"Het is weliswaar duur, maar goed.", exEn:"It is admittedly expensive, but good." },
  { nl:"desalniettemin", en:"nonetheless", level:"C1", theme:"connectors", art:"", pos:"adv", ex:"Desalniettemin blijft hij optimistisch.", exEn:"Nonetheless he remains optimistic." },
  { nl:"immers", en:"after all (formal)", level:"C2", theme:"connectors", art:"", pos:"adv", ex:"Hij weet dat immers zelf ook.", exEn:"He knows that himself, after all." },
  { nl:"aangezien", en:"since / given that", level:"C1", theme:"connectors", art:"", pos:"conj", ex:"Aangezien het laat is, ga ik naar huis.", exEn:"Since it's late, I'm going home." },

  // ================= IDIOMS & EXPRESSIONS =================
  { nl:"de puntjes op de i zetten", en:"to dot the i's (be precise)", level:"C1", theme:"idioms", art:"", pos:"idiom", ex:"Laten we de puntjes op de i zetten.", exEn:"Let's put on the finishing touches." },
  { nl:"de kat uit de boom kijken", en:"to wait and see", level:"C1", theme:"idioms", art:"", pos:"idiom", ex:"Hij kijkt eerst de kat uit de boom.", exEn:"He first waits to see how things go." },
  { nl:"de spijker op de kop", en:"to hit the nail on the head", level:"C1", theme:"idioms", art:"", pos:"idiom", ex:"Dat is de spijker op de kop.", exEn:"That's spot on." },
  { nl:"nu komt de aap uit de mouw", en:"now the truth comes out", level:"C1", theme:"idioms", art:"", pos:"idiom", ex:"Aha, nu komt de aap uit de mouw!", exEn:"Aha, now the truth comes out!" },
  { nl:"ergens geen kaas van gegeten hebben", en:"to know nothing about sth", level:"C1", theme:"idioms", art:"", pos:"idiom", ex:"Ik heb daar geen kaas van gegeten.", exEn:"I know nothing about that." },
  { nl:"de knoop doorhakken", en:"to make the final decision", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Iemand moet de knoop doorhakken.", exEn:"Someone has to make the call." },
  { nl:"met de deur in huis vallen", en:"to get straight to the point", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Ik val maar met de deur in huis.", exEn:"I'll just get straight to the point." },
  { nl:"iets door de vingers zien", en:"to turn a blind eye", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"De docent zag de fout door de vingers.", exEn:"The teacher turned a blind eye to the mistake." },
  { nl:"de kar trekken", en:"to do the heavy lifting", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Zij trekt de kar in dit project.", exEn:"She does the heavy lifting on this project." },
  { nl:"het naadje van de kous willen weten", en:"to want every last detail", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Hij wil het naadje van de kous weten.", exEn:"He wants to know every last detail." },

  // ================= CORE VERBS =================
  { nl:"zijn", en:"to be", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Wij zijn thuis.", exEn:"We are home." },
  { nl:"hebben", en:"to have", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Ik heb honger.", exEn:"I'm hungry." },
  { nl:"gaan", en:"to go", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Waar ga je naartoe?", exEn:"Where are you going?" },
  { nl:"doen", en:"to do", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Wat doe je?", exEn:"What are you doing?" },
  { nl:"komen", en:"to come", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Kom je ook?", exEn:"Are you coming too?" },
  { nl:"zien", en:"to see", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Ik zie je morgen.", exEn:"I'll see you tomorrow." },
  { nl:"zeggen", en:"to say", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Wat zeg je?", exEn:"What are you saying?" },
  { nl:"weten", en:"to know (a fact)", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Ik weet het niet.", exEn:"I don't know." },
  { nl:"kennen", en:"to know (be familiar with)", level:"A2", theme:"verbs", art:"", pos:"verb", ex:"Ken je die film?", exEn:"Do you know that film?" },
  { nl:"maken", en:"to make", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Ik maak het eten klaar.", exEn:"I'm preparing the food." },
  { nl:"geven", en:"to give", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Geef me het zout, graag.", exEn:"Pass me the salt, please." },
  { nl:"nemen", en:"to take", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Ik neem de trein.", exEn:"I'll take the train." },
  { nl:"kunnen", en:"can / to be able to", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Ik kan het zelf doen.", exEn:"I can do it myself." },
  { nl:"moeten", en:"must / to have to", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Je moet nu gaan.", exEn:"You have to go now." },
  { nl:"willen", en:"to want", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Ik wil naar huis.", exEn:"I want to go home." },
  { nl:"mogen", en:"may / to be allowed", level:"A1", theme:"verbs", art:"", pos:"verb", ex:"Mag ik erlangs?", exEn:"May I get past?" },
  { nl:"vinden", en:"to find / think", level:"A2", theme:"verbs", art:"", pos:"verb", ex:"Wat vind je ervan?", exEn:"What do you think of it?" },
  { nl:"denken", en:"to think", level:"A2", theme:"verbs", art:"", pos:"verb", ex:"Ik denk van wel.", exEn:"I think so." },
  { nl:"proberen", en:"to try", level:"B1", theme:"verbs", art:"", pos:"verb", ex:"Ik zal het proberen.", exEn:"I'll try it." },
  { nl:"gebeuren", en:"to happen", level:"B1", theme:"verbs", art:"", pos:"verb", ex:"Wat is er gebeurd?", exEn:"What happened?" },
  { nl:"veranderen", en:"to change", level:"B1", theme:"verbs", art:"", pos:"verb", ex:"Er is veel veranderd.", exEn:"A lot has changed." },
  { nl:"verwachten", en:"to expect", level:"B1", theme:"verbs", art:"", pos:"verb", ex:"Ik had meer verwacht.", exEn:"I had expected more." },
  { nl:"benadrukken", en:"to emphasize", level:"B2", theme:"verbs", art:"", pos:"verb", ex:"Ik wil benadrukken dat het klopt.", exEn:"I want to emphasize that it's correct." },
  { nl:"beweren", en:"to claim", level:"B2", theme:"verbs", art:"", pos:"verb", ex:"Hij beweert dat het klopt.", exEn:"He claims that it's correct." },
  { nl:"bijdragen", en:"to contribute", level:"C1", theme:"verbs", art:"", pos:"verb", ex:"Iedereen draagt bij aan het project.", exEn:"Everyone contributes to the project." },
  { nl:"vergen", en:"to demand / require", level:"C2", theme:"verbs", art:"", pos:"verb", ex:"Dit vergt geduld en precisie.", exEn:"This requires patience and precision." },
  { nl:"nuanceren", en:"to nuance / qualify", level:"C2", theme:"verbs", art:"", pos:"verb", ex:"Ik wil die stelling nuanceren.", exEn:"I want to qualify that statement." },

  // ================= DEPTH: higher-register additions =================
  // society & politics
  { nl:"vluchteling", en:"refugee", level:"B2", theme:"society", art:"de", pos:"noun", ex:"De stad ving veel vluchtelingen op.", exEn:"The city took in many refugees." },
  { nl:"integratie", en:"integration", level:"B2", theme:"society", art:"de", pos:"noun", ex:"Integratie kost tijd en moeite.", exEn:"Integration takes time and effort." },
  { nl:"discriminatie", en:"discrimination", level:"B2", theme:"society", art:"de", pos:"noun", ex:"Discriminatie is bij wet verboden.", exEn:"Discrimination is prohibited by law." },
  { nl:"welvaart", en:"prosperity", level:"C1", theme:"society", art:"de", pos:"noun", ex:"De welvaart is ongelijk verdeeld.", exEn:"Prosperity is unevenly distributed." },
  { nl:"armoede", en:"poverty", level:"B2", theme:"society", art:"de", pos:"noun", ex:"Veel gezinnen leven in armoede.", exEn:"Many families live in poverty." },
  { nl:"wetgeving", en:"legislation", level:"C1", theme:"society", art:"de", pos:"noun", ex:"De nieuwe wetgeving gaat in januari in.", exEn:"The new legislation takes effect in January." },
  { nl:"grondwet", en:"constitution", level:"C1", theme:"society", art:"de", pos:"noun", ex:"Dat recht staat in de grondwet.", exEn:"That right is in the constitution." },
  { nl:"vrijheid", en:"freedom", level:"B2", theme:"society", art:"de", pos:"noun", ex:"Vrijheid van meningsuiting is fundamenteel.", exEn:"Freedom of speech is fundamental." },
  { nl:"verantwoording", en:"accountability", level:"C1", theme:"society", art:"de", pos:"noun", ex:"De minister moet verantwoording afleggen.", exEn:"The minister must account for it." },
  { nl:"draagvlak", en:"public support / buy-in", level:"C1", theme:"society", art:"het", pos:"noun", ex:"Voor dit plan is weinig draagvlak.", exEn:"There is little support for this plan." },
  // work & career
  { nl:"loopbaan", en:"career", level:"B2", theme:"work", art:"de", pos:"noun", ex:"Zij maakte snel carrière in haar loopbaan.", exEn:"She advanced quickly in her career." },
  { nl:"vaardigheid", en:"skill", level:"B2", theme:"work", art:"de", pos:"noun", ex:"Communicatie is een belangrijke vaardigheid.", exEn:"Communication is an important skill." },
  { nl:"deskundig", en:"expert / competent", level:"C1", theme:"work", art:"", pos:"adj", ex:"Zij gaf een deskundig advies.", exEn:"She gave expert advice." },
  { nl:"werkdruk", en:"workload / work pressure", level:"B2", theme:"work", art:"de", pos:"noun", ex:"De werkdruk is de laatste tijd hoog.", exEn:"The workload has been high lately." },
  { nl:"functioneren", en:"to function / perform", level:"C1", theme:"work", art:"", pos:"verb", ex:"Het team functioneert uitstekend.", exEn:"The team performs excellently." },
  // business & economy
  { nl:"rendement", en:"return / yield", level:"C1", theme:"business", art:"het", pos:"noun", ex:"Het rendement op de investering is laag.", exEn:"The return on the investment is low." },
  { nl:"aandeel", en:"share (stock)", level:"C1", theme:"business", art:"het", pos:"noun", ex:"De aandelen zijn in waarde gedaald.", exEn:"The shares have dropped in value." },
  { nl:"belasting", en:"tax", level:"B2", theme:"business", art:"de", pos:"noun", ex:"We betalen veel belasting.", exEn:"We pay a lot of tax." },
  { nl:"lening", en:"loan", level:"B2", theme:"business", art:"de", pos:"noun", ex:"Ze sloten een lening af voor het huis.", exEn:"They took out a loan for the house." },
  { nl:"consument", en:"consumer", level:"B2", theme:"business", art:"de", pos:"noun", ex:"De consument wordt kritischer.", exEn:"The consumer is becoming more critical." },
  { nl:"schuld", en:"debt / guilt", level:"B2", theme:"business", art:"de", pos:"noun", ex:"Het land heeft een hoge schuld.", exEn:"The country has a high debt." },
  // nature & environment
  { nl:"opwarming", en:"(global) warming", level:"B2", theme:"nature", art:"de", pos:"noun", ex:"De opwarming van de aarde versnelt.", exEn:"Global warming is accelerating." },
  { nl:"uitstoot", en:"emissions", level:"B2", theme:"nature", art:"de", pos:"noun", ex:"De uitstoot van CO2 moet omlaag.", exEn:"CO2 emissions must come down." },
  { nl:"hernieuwbaar", en:"renewable", level:"C1", theme:"nature", art:"", pos:"adj", ex:"Wind is een hernieuwbare energiebron.", exEn:"Wind is a renewable energy source." },
  { nl:"grondstof", en:"raw material", level:"C1", theme:"nature", art:"de", pos:"noun", ex:"Grondstoffen worden schaarser.", exEn:"Raw materials are becoming scarcer." },
  { nl:"ecosysteem", en:"ecosystem", level:"C1", theme:"nature", art:"het", pos:"noun", ex:"Het hele ecosysteem raakt verstoord.", exEn:"The whole ecosystem gets disrupted." },
  // technology & media
  { nl:"kunstmatige intelligentie", en:"artificial intelligence", level:"B2", theme:"tech", art:"de", pos:"noun", ex:"Kunstmatige intelligentie verandert de arbeidsmarkt.", exEn:"AI is changing the job market." },
  { nl:"gegevens", en:"data", level:"B2", theme:"tech", art:"de", pos:"noun", ex:"Je gegevens worden opgeslagen.", exEn:"Your data is stored." },
  { nl:"privacy", en:"privacy", level:"B2", theme:"tech", art:"de", pos:"noun", ex:"Privacy is een grondrecht.", exEn:"Privacy is a fundamental right." },
  { nl:"algoritme", en:"algorithm", level:"C1", theme:"tech", art:"het", pos:"noun", ex:"Het algoritme bepaalt wat je ziet.", exEn:"The algorithm decides what you see." },
  { nl:"toepassing", en:"application / use", level:"C1", theme:"tech", art:"de", pos:"noun", ex:"Deze technologie heeft veel toepassingen.", exEn:"This technology has many applications." },
  // emotions & personality (nuanced)
  { nl:"verontwaardigd", en:"indignant", level:"C1", theme:"emotions", art:"", pos:"adj", ex:"Ze was verontwaardigd over de opmerking.", exEn:"She was indignant at the remark." },
  { nl:"onverschillig", en:"indifferent", level:"C1", theme:"emotions", art:"", pos:"adj", ex:"Hij bleef onverschillig onder de kritiek.", exEn:"He remained indifferent to the criticism." },
  { nl:"terughoudend", en:"reticent / reserved", level:"C1", theme:"emotions", art:"", pos:"adj", ex:"Ze is terughoudend met complimenten.", exEn:"She is reserved with compliments." },
  { nl:"beheerst", en:"composed / controlled", level:"C2", theme:"emotions", art:"", pos:"adj", ex:"Hij reageerde opvallend beheerst.", exEn:"He reacted strikingly composedly." },
  // abstract & academic (argumentation)
  { nl:"stelling", en:"proposition / thesis", level:"C1", theme:"abstract", art:"de", pos:"noun", ex:"Ik verdedig de volgende stelling.", exEn:"I defend the following proposition." },
  { nl:"aanname", en:"assumption", level:"C1", theme:"abstract", art:"de", pos:"noun", ex:"Die aanname klopt niet.", exEn:"That assumption is incorrect." },
  { nl:"tegenstelling", en:"contrast / opposition", level:"C1", theme:"abstract", art:"de", pos:"noun", ex:"In tegenstelling tot jou denk ik van wel.", exEn:"Unlike you, I think so." },
  { nl:"verband", en:"connection / link", level:"B2", theme:"abstract", art:"het", pos:"noun", ex:"Er is een duidelijk verband tussen beide.", exEn:"There is a clear link between the two." },
  { nl:"oorzaak", en:"cause", level:"B2", theme:"abstract", art:"de", pos:"noun", ex:"De oorzaak is nog onbekend.", exEn:"The cause is still unknown." },
  { nl:"gevolgtrekking", en:"inference / conclusion", level:"C2", theme:"abstract", art:"de", pos:"noun", ex:"Dat is een voorbarige gevolgtrekking.", exEn:"That is a premature inference." },
  { nl:"kwestie", en:"matter / issue", level:"B2", theme:"abstract", art:"de", pos:"noun", ex:"Dat is een gevoelige kwestie.", exEn:"That is a sensitive matter." },
  { nl:"dubbelzinnig", en:"ambiguous", level:"C1", theme:"abstract", art:"", pos:"adj", ex:"Zijn antwoord was dubbelzinnig.", exEn:"His answer was ambiguous." },
  { nl:"impliciet", en:"implicit", level:"C2", theme:"abstract", art:"", pos:"adj", ex:"Die kritiek zat er impliciet in.", exEn:"That criticism was implicit in it." },
  { nl:"expliciet", en:"explicit", level:"C1", theme:"abstract", art:"", pos:"adj", ex:"Wees expliciet over je verwachtingen.", exEn:"Be explicit about your expectations." },
  { nl:"drogreden", en:"fallacy", level:"C2", theme:"abstract", art:"de", pos:"noun", ex:"Dat is een klassieke drogreden.", exEn:"That is a classic fallacy." },
  { nl:"premisse", en:"premise", level:"C2", theme:"abstract", art:"de", pos:"noun", ex:"De redenering rust op een zwakke premisse.", exEn:"The reasoning rests on a weak premise." },
  { nl:"ontoereikend", en:"inadequate", level:"C2", theme:"abstract", art:"", pos:"adj", ex:"De maatregelen bleken ontoereikend.", exEn:"The measures proved inadequate." },
  // idioms (more)
  { nl:"de dans ontspringen", en:"to have a narrow escape", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Deze keer is hij de dans ontsprongen.", exEn:"This time he had a narrow escape." },
  { nl:"om de hete brij heen draaien", en:"to beat around the bush", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Draai niet om de hete brij heen.", exEn:"Don't beat around the bush." },
  { nl:"een koekje van eigen deeg", en:"a taste of one's own medicine", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Dat was een koekje van eigen deeg.", exEn:"That was a taste of his own medicine." },
  { nl:"dweilen met de kraan open", en:"a futile effort", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Zonder beleid is het dweilen met de kraan open.", exEn:"Without policy it's a futile effort." },
  { nl:"als puntje bij paaltje komt", en:"when push comes to shove", level:"C2", theme:"idioms", art:"", pos:"idiom", ex:"Als puntje bij paaltje komt, helpt hij toch.", exEn:"When push comes to shove, he helps after all." },
];

/* Grammar lessons. tip = teacher's key takeaway. body = HTML.
   quiz = [{q, options[], answer index, explain}]. */
const GRAMMAR = [
  {
    id:"g-articles", level:"A1", title:"de or het? The two articles", theme:"greetings",
    tip:"Never learn a Dutch noun without its article. Store 'het huis', not 'huis' — the article is part of the word.",
    body:`<p>Every Dutch noun uses <b>de</b> or <b>het</b> ("the"). There is no simple rule, so learn the article <i>with</i> each noun.</p>
    <ul>
      <li><b>de</b> — about 75% of nouns, all plurals, most people. <span class="ex">de man, de vrouw, de fiets, de huizen</span></li>
      <li><b>het</b> — diminutives (-je), most languages, many neuter nouns. <span class="ex">het huis, het kind, het meisje, het Nederlands</span></li>
    </ul>
    <p>The indefinite article is always <b>een</b> ("a/an"): <span class="ex">een man, een huis</span>.</p>`,
    quiz:[
      { q:"___ kind speelt buiten.", options:["De","Het","Een de"], answer:1, explain:"'Kind' is a het-word: het kind." },
      { q:"Which noun takes 'het'?", options:["fiets","meisje","vrouw"], answer:1, explain:"Diminutives ending in -je are always het: het meisje." },
      { q:"Plural nouns always take…", options:["het","de","een"], answer:1, explain:"All plurals use 'de': de huizen, de kinderen." },
    ]
  },
  {
    id:"g-pronouns", level:"A1", title:"Personal & possessive pronouns", theme:"people",
    tip:"Dutch has stressed and unstressed pronouns (jij/je, zij/ze). Use the short ones in normal speech; save the long ones for emphasis.",
    body:`<p>Subject pronouns: <span class="ex">ik, jij/je, hij, zij/ze, het, wij/we, jullie, zij/ze</span>. Formal 'you' is <b>u</b>.</p>
    <p>Possessives ("my, your…"): <span class="ex">mijn, jouw/je, zijn, haar, ons/onze, jullie, hun</span>.</p>
    <ul>
      <li><span class="ex"><b>Mijn</b> broer en <b>zijn</b> vriendin.</span> (My brother and his girlfriend.)</li>
      <li><b>ons</b> vs <b>onze</b>: use <b>ons</b> before het-words, <b>onze</b> before de-words. <span class="ex">ons huis, onze auto</span></li>
    </ul>`,
    quiz:[
      { q:"___ auto is nieuw. (our)", options:["Ons","Onze","Onzer"], answer:1, explain:"'auto' is a de-word → onze auto." },
      { q:"___ huis is groot. (our)", options:["Onze","Ons","Wij"], answer:1, explain:"'huis' is a het-word → ons huis." },
      { q:"Formal 'you' is…", options:["jij","u","jullie"], answer:1, explain:"'u' is the polite/formal singular you." },
    ]
  },
  {
    id:"g-present", level:"A1", title:"Present tense conjugation", theme:"verbs",
    tip:"The rule is short: ik = stem, jij/hij/zij = stem+t, plural = infinitive. Learn those three shapes and you can conjugate almost any verb.",
    body:`<p>Take the stem (infinitive minus <b>-en</b>) and add endings:</p>
    <ul>
      <li><b>ik</b> → stem: <span class="ex">ik werk</span></li>
      <li><b>jij/hij/zij</b> → stem + <b>t</b>: <span class="ex">jij werkt, hij werkt</span></li>
      <li><b>wij/jullie/zij (pl)</b> → full infinitive: <span class="ex">wij werken</span></li>
    </ul>
    <p>Note: in a question with inversion, <b>je</b> loses the -t: <span class="ex">Werk je vandaag?</span></p>`,
    quiz:[
      { q:"Hij ___ (wonen) in Utrecht.", options:["woon","woont","wonen"], answer:1, explain:"hij/zij/het → stem + t: woont." },
      { q:"___ je koffie? (drinken)", options:["Drinkt","Drink","Drinken"], answer:1, explain:"With inversion 'je', drop the -t: 'Drink je?'" },
    ]
  },
  {
    id:"g-wordorder", level:"A1", title:"Verb in second position (V2)", theme:"connectors",
    tip:"Count to the verb: in a main clause it is ALWAYS the second 'building block'. If you front a time word, the subject jumps behind the verb.",
    body:`<p>In a Dutch main clause, the <b>finite verb is always the second element</b>. The first slot can be the subject, a time word, or an object — but the verb stays in slot two.</p>
    <ul>
      <li><span class="ex">Ik <b>ga</b> morgen naar huis.</span> (I go home tomorrow.)</li>
      <li><span class="ex">Morgen <b>ga</b> ik naar huis.</span> — time first, then verb, <i>then</i> subject (inversion).</li>
    </ul>
    <p>When something other than the subject comes first, subject and verb <b>swap</b>. This is called inversion.</p>`,
    quiz:[
      { q:"Reorder: (vandaag / ik / werk / niet)", options:["Vandaag ik werk niet.","Vandaag werk ik niet.","Ik vandaag werk niet."], answer:1, explain:"Time word first → verb second → subject: 'Vandaag werk ik niet.'" },
      { q:"Which is correct?", options:["Morgen ik ga weg.","Morgen ga ik weg."], answer:1, explain:"After a fronted element, subject and verb invert." },
    ]
  },
  {
    id:"g-questions", level:"A1", title:"Asking questions", theme:"education",
    tip:"Yes/no questions just put the verb first. For open questions, start with a question word — the verb still comes right after it.",
    body:`<p><b>Yes/no questions</b>: put the verb first. <span class="ex">Woon je hier? Heb je tijd?</span></p>
    <p><b>Open questions</b> start with a question word, then the verb:</p>
    <ul>
      <li><b>wie</b> (who), <b>wat</b> (what), <b>waar</b> (where), <b>wanneer</b> (when)</li>
      <li><b>waarom</b> (why), <b>hoe</b> (how), <b>welke</b> (which), <b>hoeveel</b> (how many)</li>
    </ul>
    <p><span class="ex"><b>Waar</b> woon je? <b>Hoeveel</b> kost het?</span></p>`,
    quiz:[
      { q:"'Where do you live?' =", options:["Waar jij woont?","Waar woon je?","Je woont waar?"], answer:1, explain:"Question word + verb + subject: 'Waar woon je?'" },
      { q:"Make a yes/no question: (je / hebt / tijd)", options:["Heb je tijd?","Je hebt tijd?","Tijd heb je?"], answer:0, explain:"Yes/no questions start with the verb: 'Heb je tijd?'" },
    ]
  },
  {
    id:"g-perfect", level:"A2", title:"The perfect tense (voltooid verleden)", theme:"verbs",
    tip:"This is THE past tense for speaking. The 't kofschip trick decides -t or -d: if the stem ends in one of those consonants, use -t.",
    body:`<p>The perfect is the everyday past tense in speech: <b>hebben/zijn + past participle</b>, participle at the end.</p>
    <ul>
      <li>Regular participle: <b>ge</b> + stem + <b>t/d</b>. <span class="ex">gewerkt, gehoord</span></li>
      <li>Use the <b>'t kofschip</b> rule: if the stem ends in t,k,f,s,ch,p → add <b>-t</b>, otherwise <b>-d</b>.</li>
      <li>Movement / change-of-state verbs take <b>zijn</b>: <span class="ex">Ik <b>ben</b> gegaan, hij <b>is</b> gevallen.</span></li>
    </ul>
    <p><span class="ex">Ik <b>heb</b> een boek <b>gelezen</b>.</span> (I have read a book.)</p>`,
    quiz:[
      { q:"Ik heb hard ___ (werken).", options:["gewerkt","gewerkd","werkte"], answer:0, explain:"Stem 'werk' ends in k → 't kofschip → -t: gewerkt." },
      { q:"Zij ___ naar Parijs gegaan.", options:["heeft","is","hebben"], answer:1, explain:"'Gaan' is movement → auxiliary 'zijn': zij is gegaan." },
      { q:"Wij hebben het ___ (horen).", options:["gehoord","gehoort","hoorden"], answer:0, explain:"Stem 'hoor' ends in r (voiced) → -d: gehoord." },
    ]
  },
  {
    id:"g-imperfect", level:"A2", title:"Simple past (onvoltooid verleden)", theme:"verbs",
    tip:"You'll mostly meet this in writing and stories. Memorise the big irregulars first — was/waren and had/hadden appear everywhere.",
    body:`<p>Used mainly in writing and for descriptions. Regular verbs:</p>
    <ul>
      <li>Singular: stem + <b>-te</b> or <b>-de</b> (same 't kofschip rule). <span class="ex">werkte, hoorde</span></li>
      <li>Plural: add <b>-n</b>. <span class="ex">werkten, hoorden</span></li>
    </ul>
    <p>Key irregulars to memorise: <span class="ex">zijn → was/waren, hebben → had/hadden, gaan → ging/gingen, zien → zag/zagen.</span></p>`,
    quiz:[
      { q:"Vroeger ___ ik in Gouda. (wonen)", options:["woonde","woonte","gewoond"], answer:0, explain:"Stem 'woon' ends in n (voiced) → -de: woonde." },
      { q:"Gisteren ___ het koud. (zijn)", options:["was","waren","is"], answer:0, explain:"Singular past of zijn = was." },
    ]
  },
  {
    id:"g-modal", level:"A2", title:"Modal verbs & the verb-final rule", theme:"verbs",
    tip:"A modal verb always sends its partner verb to the very end as a plain infinitive. Say the modal, hold the second verb till last.",
    body:`<p>Modals (<b>kunnen, moeten, mogen, willen, zullen</b>) send the main verb to the <b>end</b> as an infinitive.</p>
    <ul>
      <li><span class="ex">Ik <b>kan</b> je morgen <b>helpen</b>.</span> (I can help you tomorrow.)</li>
      <li><span class="ex">Je <b>moet</b> nu <b>gaan</b>.</span> (You must go now.)</li>
    </ul>
    <p>Same happens in subordinate clauses — verbs cluster at the end.</p>`,
    quiz:[
      { q:"Reorder: (ik / zwemmen / kan / goed)", options:["Ik kan goed zwemmen.","Ik zwemmen kan goed.","Ik kan zwemmen goed."], answer:0, explain:"Modal 'kan' in slot 2, infinitive 'zwemmen' at the end." },
      { q:"Wil je iets ___ ?", options:["drinkt","drinken","gedronken"], answer:1, explain:"After a modal, use the bare infinitive: drinken." },
    ]
  },
  {
    id:"g-adjectives", level:"A2", title:"Adjective endings", theme:"clothing",
    tip:"The default is to add -e. The ONE exception: drop it before a singular het-word that has 'een' (or no article). 'een klein huis', but 'het kleine huis'.",
    body:`<p>Adjectives before a noun usually take <b>-e</b>: <span class="ex">de grote man, een mooie dag, koude dagen</span>.</p>
    <p>The exception — <b>no -e</b> — is a singular <b>het</b>-word with <b>een</b> / no article:</p>
    <ul>
      <li><span class="ex">een <b>klein</b> huis</span> (het-word, indefinite → no -e)</li>
      <li><span class="ex">het <b>kleine</b> huis</span> (definite → -e comes back)</li>
      <li><span class="ex">een <b>grote</b> stad</span> (de-word → always -e)</li>
    </ul>`,
    quiz:[
      { q:"een ___ huis (klein)", options:["kleine","klein","kleinen"], answer:1, explain:"Singular het-word with 'een' → no ending: een klein huis." },
      { q:"het ___ huis (klein)", options:["klein","kleine","kleiner"], answer:1, explain:"Definite (het) → add -e: het kleine huis." },
      { q:"een ___ stad (mooi)", options:["mooi","mooie","mooien"], answer:1, explain:"'stad' is a de-word → always -e: een mooie stad." },
    ]
  },
  {
    id:"g-comparative", level:"A2", title:"Comparatives & superlatives", theme:"shopping",
    tip:"Add -er to compare, -st for the best. 'dan' means 'than'; 'het …st' is the superlative form. Only 'goed' and 'veel' are truly irregular.",
    body:`<p>Comparative = adjective + <b>-er</b>; superlative = <b>het</b> + adjective + <b>-st</b>.</p>
    <ul>
      <li><span class="ex">goedkoop → goedkoper → het goedkoopst</span></li>
      <li><span class="ex">Deze is <b>duurder dan</b> die.</span> ('than' = dan)</li>
      <li>Irregular: <span class="ex">goed → beter → best</span>, <span class="ex">veel → meer → meest</span>.</li>
    </ul>`,
    quiz:[
      { q:"Deze auto is ___ dan die. (duur)", options:["duurder","duurer","meer duur"], answer:0, explain:"Comparative of duur = duurder; 'than' = dan." },
      { q:"'good → better' =", options:["goeder","beter","meer goed"], answer:1, explain:"'goed' is irregular: goed → beter → best." },
    ]
  },
  {
    id:"g-subclause", level:"B1", title:"Subordinate clauses: verb to the end", theme:"connectors",
    tip:"When you hear omdat, dat, als, terwijl — brace yourself: the verb is coming at the very end. This one rule is the biggest 'tell' of good Dutch.",
    body:`<p>Conjunctions like <b>omdat, dat, als, terwijl, hoewel, of</b> push the verb to the <b>very end</b> of the clause.</p>
    <ul>
      <li><span class="ex">Ik blijf thuis <b>omdat</b> ik ziek <b>ben</b>.</span></li>
      <li><span class="ex">Hij zegt <b>dat</b> hij morgen <b>komt</b>.</span></li>
    </ul>
    <p>Contrast with coordinating conjunctions (<b>en, maar, want, of, dus</b>) which keep normal V2 order.</p>`,
    quiz:[
      { q:"Ik weet dat hij gelijk ___.", options:["heeft","hij heeft","heeft hij"], answer:0, explain:"In a 'dat'-clause the verb goes last: '...dat hij gelijk heeft.'" },
      { q:"Which conjunction keeps normal word order?", options:["omdat","want","terwijl"], answer:1, explain:"'want' is coordinating → no verb-final; 'omdat/terwijl' are subordinating." },
    ]
  },
  {
    id:"g-separable", level:"B1", title:"Separable verbs", theme:"travel",
    tip:"Separable verbs split in a main clause: the prefix flies to the end. In the perfect, 'ge' sneaks INSIDE: op-ge-beld.",
    body:`<p>Many verbs have a prefix that <b>splits off</b> in a main clause and moves to the end: <b>opbellen, meenemen, aankomen, afspreken</b>.</p>
    <ul>
      <li><span class="ex">Ik <b>bel</b> je morgen <b>op</b>.</span> (I'll call you tomorrow.)</li>
      <li>In the perfect, <b>ge</b> sits between prefix and stem: <span class="ex">Ik heb je <b>opgebeld</b>.</span></li>
      <li>In a subclause they rejoin: <span class="ex">...dat ik je <b>opbel</b>.</span></li>
    </ul>`,
    quiz:[
      { q:"Ik ___ mijn zus ___ . (meenemen)", options:["neem … mee","meeneem … Ø","neem mee …"], answer:0, explain:"Prefix 'mee' splits to the end: 'Ik neem mijn zus mee.'" },
      { q:"Perfect of 'aankomen' (I arrived): Ik ben…", options:["aangekomen","geaankomen","aankomen"], answer:0, explain:"ge goes inside: aan-ge-komen → aangekomen." },
    ]
  },
  {
    id:"g-future", level:"B1", title:"Talking about the future", theme:"time",
    tip:"Dutch often uses the present tense for the future when a time word makes it clear. Use 'gaan' for plans and 'zullen' for predictions/promises.",
    body:`<p>Three easy ways to express the future:</p>
    <ul>
      <li><b>Present + time word</b> (most common): <span class="ex">Morgen <b>werk</b> ik thuis.</span></li>
      <li><b>gaan + infinitive</b> (plans/intentions): <span class="ex">Ik <b>ga</b> een huis <b>kopen</b>.</span></li>
      <li><b>zullen + infinitive</b> (predictions/promises): <span class="ex">Het <b>zal</b> morgen <b>regenen</b>.</span></li>
    </ul>`,
    quiz:[
      { q:"Plan: 'I'm going to study.' =", options:["Ik zal studeren.","Ik ga studeren.","Ik studeer geweest."], answer:1, explain:"'gaan + infinitive' expresses an intention/plan." },
      { q:"Prediction: 'It will rain.' =", options:["Het zal regenen.","Het gaat geregend.","Het regende."], answer:0, explain:"'zullen + infinitive' expresses a prediction." },
    ]
  },
  {
    id:"g-reflexive", level:"B1", title:"Reflexive verbs (zich)", theme:"emotions",
    tip:"Some verbs need a 'self' pronoun that changes with the subject: me, je, zich, ons. 'Ik voel me…' — never forget the me.",
    body:`<p>Reflexive verbs take a pronoun that refers back to the subject: <b>me, je, zich, ons, je, zich</b>.</p>
    <ul>
      <li><span class="ex">Ik voel <b>me</b> goed.</span> / <span class="ex">Hij voelt <b>zich</b> ziek.</span></li>
      <li>Common ones: <span class="ex">zich voelen, zich vergissen, zich herinneren, zich haasten.</span></li>
    </ul>`,
    quiz:[
      { q:"Hij voelt ___ niet lekker.", options:["me","zich","je"], answer:1, explain:"3rd person reflexive = zich: hij voelt zich." },
      { q:"Ik vergis ___ soms.", options:["me","zich","ons"], answer:0, explain:"1st person singular reflexive = me." },
    ]
  },
  {
    id:"g-er", level:"B2", title:"The many uses of 'er'", theme:"abstract",
    tip:"'er' is the hardest little word in Dutch. When a preposition refers to a THING (not a person), you can't say 'over het' — you fuse them: erover, erop, ermee.",
    body:`<p><b>er</b> is one of the trickiest Dutch words. Main uses:</p>
    <ul>
      <li><b>Existential</b> ("there is/are"): <span class="ex">Er staat iemand voor de deur.</span></li>
      <li><b>With numbers/quantities</b>: <span class="ex">Hoeveel wil je? — Ik wil er drie.</span></li>
      <li><b>Prepositional (er + prep)</b> replacing a thing: <span class="ex">Ik denk <b>eraan</b>.</span> (I think about it.)</li>
      <li><b>Passive/location filler</b>: <span class="ex">Er wordt veel gepraat.</span></li>
    </ul>`,
    quiz:[
      { q:"'I'm waiting for it' = Ik wacht ___.", options:["erop","op het","het op"], answer:0, explain:"wachten op → thing becomes er + op = erop." },
      { q:"Choose: ___ zijn veel mensen hier.", options:["Het","Er","Die"], answer:1, explain:"Existential 'there are' → 'Er zijn veel mensen'." },
    ]
  },
  {
    id:"g-passive", level:"B2", title:"The passive voice", theme:"society",
    tip:"'worden' = the action is happening; 'zijn' = the action is finished. Add the doer with 'door'.",
    body:`<p>Dutch has two passives:</p>
    <ul>
      <li><b>worden</b>-passive (process, "is being done"): <span class="ex">Het huis <b>wordt</b> geverfd.</span></li>
      <li><b>zijn</b>-passive (result, "has been done"): <span class="ex">Het huis <b>is</b> geverfd.</span></li>
    </ul>
    <p>The agent is added with <b>door</b>: <span class="ex">De brief wordt <b>door</b> Jan geschreven.</span></p>`,
    quiz:[
      { q:"'The letter is being written': De brief ___ geschreven.", options:["is","wordt","heeft"], answer:1, explain:"Ongoing process → worden-passive: wordt geschreven." },
      { q:"Add the agent 'by the manager':", options:["met de manager","door de manager","van de manager"], answer:1, explain:"Passive agent = 'door' + agent." },
    ]
  },
  {
    id:"g-conditional", level:"B2", title:"Conditional & 'zou'", theme:"abstract",
    tip:"'zou' is your politeness and hypothesis word. 'Zou je…?' softens any request; 'Als ik… zou ik…' builds an unreal 'if'.",
    body:`<p><b>zou/zouden</b> forms the conditional ("would").</p>
    <ul>
      <li><span class="ex">Ik <b>zou</b> graag willen komen.</span> (I would like to come.)</li>
      <li>Unreal condition: <span class="ex"><b>Als</b> ik rijk <b>was</b>, <b>zou</b> ik reizen.</span></li>
      <li>Polite requests: <span class="ex">Zou je me kunnen helpen?</span></li>
    </ul>`,
    quiz:[
      { q:"'I would do it' = Ik ___ het doen.", options:["zal","zou","word"], answer:1, explain:"Conditional 'would' = zou." },
      { q:"Als ik tijd ___, zou ik komen.", options:["heb","had","heeft"], answer:1, explain:"Unreal condition uses past tense 'had'." },
    ]
  },
  {
    id:"g-relative", level:"C1", title:"Relative clauses: die, dat, wat, wie", theme:"abstract",
    tip:"The relative pronoun copies the noun's gender: de-word → die, het-word → dat. After 'alles/iets/niets' it becomes 'wat'.",
    body:`<p>Relative pronouns agree with the noun's gender/number:</p>
    <ul>
      <li><b>die</b> — de-words & plurals: <span class="ex">de man <b>die</b> daar staat</span></li>
      <li><b>dat</b> — het-words: <span class="ex">het boek <b>dat</b> ik las</span></li>
      <li><b>wat</b> — after 'alles, iets, niets, het mooiste', or a whole clause: <span class="ex">alles <b>wat</b> ik weet</span></li>
      <li>With a preposition + person → <b>wie</b>: <span class="ex">de vrouw met <b>wie</b> ik sprak</span>. With a thing → <b>waar + prep</b>: <span class="ex">de stoel <b>waarop</b> ik zit</span>.</li>
    </ul>`,
    quiz:[
      { q:"Het huis ___ we kochten is oud.", options:["die","dat","wat"], answer:1, explain:"'huis' is a het-word → relative 'dat'." },
      { q:"De collega met ___ ik werk.", options:["die","wie","wat"], answer:1, explain:"Preposition + person → 'wie': met wie." },
      { q:"Alles ___ hij zei, was waar.", options:["dat","die","wat"], answer:2, explain:"After 'alles' use 'wat'." },
    ]
  },
  {
    id:"g-woordvolgorde", level:"C1", title:"Middle-field order: time–manner–place", theme:"connectors",
    tip:"When several elements pile up in the middle, the natural order is Time → Manner → Place. Say WHEN, then HOW, then WHERE.",
    body:`<p>In the "middle field", elements follow a tendency of <b>Time → Manner → Place</b> (TMP), and pronoun objects come early.</p>
    <ul>
      <li><span class="ex">Ik ga <u>morgen</u> <u>met de trein</u> <u>naar Den Haag</u>.</span> (time–manner–place)</li>
      <li><b>niet</b> generally goes late, but before the place/complement it negates: <span class="ex">Ik ga vandaag <b>niet</b> naar kantoor.</span></li>
      <li><b>geen</b> negates an indefinite noun: <span class="ex">Ik heb <b>geen</b> tijd.</span></li>
    </ul>`,
    quiz:[
      { q:"Best order: I'm cycling to work today.", options:["Ik fiets naar mijn werk vandaag.","Ik fiets vandaag naar mijn werk.","Ik vandaag fiets naar werk."], answer:1, explain:"Time ('vandaag') before place ('naar mijn werk')." },
      { q:"'I have no money' =", options:["Ik heb niet geld.","Ik heb geen geld.","Ik heb geld niet."], answer:1, explain:"Indefinite noun negated by 'geen'." },
    ]
  },
  {
    id:"g-register", level:"C2", title:"Register, particles & idiomatic precision", theme:"idioms",
    tip:"At C2, grammar is solved — the game is register. Match your words to the setting: 'desalniettemin' in an essay, 'toch maar' with friends.",
    body:`<p>At C2 the challenge is <b>register and nuance</b>, not rules. Master:</p>
    <ul>
      <li><b>Modal particles</b> that colour a sentence: <span class="ex">Doe maar rustig. / Kom nou toch. / Dat is nu eenmaal zo.</span></li>
      <li><b>Formal connectors</b> for writing: <span class="ex">immers, weliswaar, desalniettemin, zulks, dienaangaande.</span></li>
      <li><b>Idioms</b> used naturally: <span class="ex">de knoop doorhakken, ergens de hand aan houden.</span></li>
      <li><b>Nominalisation</b> for formal tone: <span class="ex">na afronding van het project</span> instead of <span class="ex">nadat het project af is</span>.</li>
    </ul>`,
    quiz:[
      { q:"Which is the most formal 'nevertheless'?", options:["toch maar","desalniettemin","gewoon"], answer:1, explain:"'desalniettemin' belongs to formal written register." },
      { q:"'to make the decision' idiom:", options:["de knoop doorhakken","de kat uit de boom kijken","de plank misslaan"], answer:0, explain:"'de knoop doorhakken' = to make the decisive call." },
    ]
  },
  {
    id:"g-diminutive", level:"A2", title:"Diminutives (-je) and why they matter", theme:"food",
    tip:"Add -je to make something small, cute, or casual. Every diminutive becomes a HET-word, whatever the original article was.",
    body:`<p>Dutch loves diminutives. The basic ending is <b>-je</b>, with variants (<b>-tje, -etje, -pje, -kje</b>) depending on the sound before it.</p>
    <ul>
      <li><span class="ex">het huis → het <b>huisje</b>, de man → het <b>mannetje</b>, de bloem → het <b>bloemetje</b></span></li>
      <li>They soften a request: <span class="ex">Een <b>momentje</b>! / Zullen we een <b>bakkie</b> doen?</span></li>
      <li>Crucially, a diminutive is <b>always het</b> and its plural adds <b>-s</b>: <span class="ex">de huisjes</span>.</li>
    </ul>`,
    quiz:[
      { q:"The diminutive of 'huis' takes which article?", options:["de","het","een de"], answer:1, explain:"All diminutives are het-words: het huisje." },
      { q:"'A little moment' =", options:["een momentje","een momentetje","een momentkje"], answer:0, explain:"moment → momentje." },
    ]
  },
  {
    id:"g-omte", level:"B1", title:"Purpose: om … te + infinitive", theme:"education",
    tip:"To say 'in order to', wrap the goal in 'om … te'. The 'te' sits right before the infinitive at the end of the clause.",
    body:`<p><b>om … te + infinitive</b> expresses purpose ("in order to").</p>
    <ul>
      <li><span class="ex">Ik leer Nederlands <b>om</b> in Amsterdam <b>te</b> werken.</span> (…in order to work in Amsterdam.)</li>
      <li>With a separable verb, <b>te</b> goes inside: <span class="ex">…<b>om</b> je <b>op te</b> bellen.</span></li>
      <li>Plain <b>te + infinitive</b> also follows many verbs: <span class="ex">Ik probeer <b>te</b> komen. Ze hoopt <b>te</b> slagen.</span></li>
    </ul>`,
    quiz:[
      { q:"'I'm going to town to shop' = Ik ga naar de stad ___ winkelen.", options:["om te","te om","voor te"], answer:0, explain:"Purpose = om … te: 'om te winkelen'." },
      { q:"Separable 'opbellen': …om je ___.", options:["op te bellen","te opbellen","op bellen te"], answer:0, explain:"'te' slots inside a separable verb: op te bellen." },
    ]
  },
  {
    id:"g-prepositions", level:"B2", title:"Fixed verb + preposition combinations", theme:"abstract",
    tip:"Dutch verbs bind to specific prepositions that rarely match English. Learn 'wachten OP', 'denken AAN', 'houden VAN' as whole units.",
    body:`<p>Many verbs demand a fixed preposition — memorise them together, because they seldom translate literally.</p>
    <ul>
      <li><span class="ex">wachten <b>op</b></span> (to wait for), <span class="ex">denken <b>aan</b></span> (to think of), <span class="ex">houden <b>van</b></span> (to love)</li>
      <li><span class="ex">zich ergeren <b>aan</b></span> (to be annoyed by), <span class="ex">deelnemen <b>aan</b></span> (to take part in)</li>
      <li>When the object is a thing, the preposition fuses with <b>er/waar</b>: <span class="ex">Ik wacht <b>erop</b>. Waar denk je <b>aan</b>?</span></li>
    </ul>`,
    quiz:[
      { q:"'I'm waiting for the bus' = Ik wacht ___ de bus.", options:["voor","op","aan"], answer:1, explain:"wachten binds to 'op': wachten op de bus." },
      { q:"'She loves music' = Ze houdt ___ muziek.", options:["van","over","aan"], answer:0, explain:"houden van = to love." },
    ]
  },
  {
    id:"g-reported", level:"C1", title:"Indirect (reported) speech", theme:"society",
    tip:"When you report what someone said, open with 'dat' — and remember: after 'dat', the verb drops to the end of the clause.",
    body:`<p>To report speech, embed it in a <b>dat</b>-clause; the verb then moves to the end.</p>
    <ul>
      <li>Direct: <span class="ex">Hij zei: "Ik <b>kom</b> morgen."</span></li>
      <li>Indirect: <span class="ex">Hij zei <b>dat</b> hij morgen <b>kwam</b>.</span> (tense often shifts back)</li>
      <li>Reported questions use the question word or <b>of</b> ("whether"): <span class="ex">Ze vroeg <b>of</b> ik tijd <b>had</b>.</span></li>
    </ul>`,
    quiz:[
      { q:"Report it: 'Hij zei dat hij ziek ___.'", options:["is","was","zijn"], answer:1, explain:"Reported speech shifts back and the verb goes last: '…dat hij ziek was.'" },
      { q:"'She asked whether I was coming' = Ze vroeg ___ ik kwam.", options:["dat","of","als"], answer:1, explain:"Reported yes/no question uses 'of' (whether)." },
    ]
  },
];

/* Sentence bank for translation & dictation, tagged by theme + level. */
const SENTENCES = [
  { level:"A1", theme:"food", nl:"Ik heb honger.", en:"I am hungry." },
  { level:"A1", theme:"travel", nl:"Waar is het station?", en:"Where is the station?" },
  { level:"A1", theme:"shopping", nl:"Hoeveel kost dit?", en:"How much does this cost?" },
  { level:"A1", theme:"education", nl:"Ik spreek een beetje Nederlands.", en:"I speak a little Dutch." },
  { level:"A1", theme:"greetings", nl:"Hoe gaat het met je?", en:"How are you?" },
  { level:"A1", theme:"people", nl:"Dit is mijn vriendin.", en:"This is my girlfriend." },
  { level:"A2", theme:"time", nl:"Gisteren ben ik naar de markt geweest.", en:"Yesterday I went to the market." },
  { level:"A2", theme:"education", nl:"Kun je dat alsjeblieft herhalen?", en:"Can you please repeat that?" },
  { level:"A2", theme:"time", nl:"Ik moet morgen vroeg opstaan.", en:"I have to get up early tomorrow." },
  { level:"A2", theme:"city", nl:"Ga bij het stoplicht linksaf.", en:"Turn left at the traffic light." },
  { level:"A2", theme:"food", nl:"Mag ik de rekening, alstublieft?", en:"May I have the bill, please?" },
  { level:"B1", theme:"connectors", nl:"Hoewel het regende, zijn we gaan wandelen.", en:"Although it was raining, we went for a walk." },
  { level:"B1", theme:"abstract", nl:"Ik ben het niet helemaal met je eens.", en:"I don't entirely agree with you." },
  { level:"B1", theme:"education", nl:"Zou je me kunnen vertellen hoe dit werkt?", en:"Could you tell me how this works?" },
  { level:"B1", theme:"work", nl:"Ik heb volgende week een sollicitatiegesprek.", en:"I have a job interview next week." },
  { level:"B2", theme:"society", nl:"De maatregelen hebben grote gevolgen voor het milieu.", en:"The measures have major consequences for the environment." },
  { level:"B2", theme:"business", nl:"De omzet is met tien procent gestegen.", en:"Turnover has risen by ten percent." },
  { level:"B2", theme:"society", nl:"Er wordt beweerd dat de kosten zullen toenemen.", en:"It is claimed that the costs will increase." },
  { level:"B2", theme:"abstract", nl:"In tegenstelling tot vorig jaar is de vraag afgenomen.", en:"In contrast to last year, demand has decreased." },
  { level:"C1", theme:"abstract", nl:"We moeten onderscheid maken tussen oorzaak en gevolg.", en:"We must distinguish between cause and effect." },
  { level:"C1", theme:"abstract", nl:"Dat argument berust op een verkeerde veronderstelling.", en:"That argument rests on a mistaken assumption." },
  { level:"C1", theme:"connectors", nl:"Aangezien het laat is, gaan we naar huis.", en:"Since it's late, we're going home." },
  { level:"C2", theme:"abstract", nl:"Zijn betoog was weliswaar gelaagd, maar geenszins overtuigend.", en:"His argument was admittedly layered, but by no means convincing." },
  { level:"C2", theme:"idioms", nl:"Uiteindelijk moest iemand de knoop doorhakken.", en:"In the end, someone had to make the final call." },
  { level:"C2", theme:"emotions", nl:"Schoorvoetend gaf hij toe dat hij ongelijk had.", en:"Reluctantly he admitted that he was wrong." },
];

/* Reading passages — graded texts A2→C2 with a teacher intro, glossary and
   comprehension questions. Extended reading is the single biggest driver of
   progress toward B2/C1/C2, so each level steps up in length and register.
   text = array of paragraphs (Dutch). glossary = key words. questions = quiz. */
const READINGS = [
  {
    id:"r-amsterdam", level:"A2", theme:"travel", title:"Een dag in Amsterdam", titleEn:"A day in Amsterdam",
    intro:"A gentle first text. Don't translate every word — read for the gist and let the story pull you along. Then use the glossary and read it a second time.",
    text:[
      "Vandaag ga ik met de trein naar Amsterdam. Ik sta vroeg op en neem een kop koffie. Om acht uur vertrekt mijn trein vanaf het station. De reis duurt ongeveer een half uur.",
      "In Amsterdam loop ik eerst naar een museum. Het is niet ver van het Centraal Station. Onderweg zie ik veel fietsen en grachten. Amsterdam is een drukke maar mooie stad.",
      "'s Middags eet ik een broodje in een klein café. Daarna koop ik een cadeau voor mijn moeder. Rond vijf uur ben ik moe, dus ik ga terug naar het station. In de trein naar huis lees ik een boek. Het was een leuke dag."
    ],
    glossary:[
      { nl:"onderweg", en:"on the way" }, { nl:"gracht", en:"canal" },
      { nl:"druk", en:"busy" }, { nl:"broodje", en:"(bread) roll, sandwich" },
      { nl:"cadeau", en:"gift" }, { nl:"terug", en:"back" }
    ],
    questions:[
      { q:"How does the narrator travel to Amsterdam?", options:["By bike","By train","By car"], answer:1, explain:"'Ik ga met de trein naar Amsterdam.'" },
      { q:"How long does the journey take?", options:["About half an hour","Two hours","Five hours"], answer:0, explain:"'De reis duurt ongeveer een half uur.'" },
      { q:"What does the narrator buy?", options:["A book","A gift for their mother","Nothing"], answer:1, explain:"'Daarna koop ik een cadeau voor mijn moeder.'" }
    ]
  },
  {
    id:"r-markt", level:"B1", theme:"shopping", title:"Op de markt", titleEn:"At the market",
    intro:"Notice how the writer links sentences with small words — 'daarna', 'voordat', 'dus'. Spotting these connectors is a B1 reading skill; underline them as you go.",
    text:[
      "Elke zaterdag ga ik naar de markt in mijn buurt. De markt begint om negen uur en duurt tot een uur of vijf. Ik vind het er altijd gezellig.",
      "Bij de eerste kraam koop ik groente en fruit. De verkoper kent mij inmiddels en geeft me soms een extra appel. Verse producten zijn op de markt vaak goedkoper dan in de supermarkt.",
      "Daarna loop ik naar de kaaskraam. De geur van oude kaas hangt in de lucht. Ik mag altijd eerst proeven voordat ik iets koop. Vandaag neem ik een stuk belegen kaas en wat olijven.",
      "Voordat ik naar huis ga, drink ik nog een kop koffie. Met volle tassen fiets ik tevreden terug."
    ],
    glossary:[
      { nl:"kraam", en:"stall" }, { nl:"verkoper", en:"seller" }, { nl:"vers", en:"fresh" },
      { nl:"geur", en:"smell" }, { nl:"belegen", en:"matured (cheese)" }, { nl:"tevreden", en:"satisfied" }
    ],
    questions:[
      { q:"When does the market close?", options:["At nine","Around five","At midnight"], answer:1, explain:"'…duurt tot een uur of vijf.'" },
      { q:"Why does the seller give an extra apple?", options:["By mistake","Because he knows the narrator","Because it's rotten"], answer:1, explain:"'De verkoper kent mij inmiddels…'" },
      { q:"Can the narrator taste the cheese first?", options:["Yes, always","No, never","Only after paying"], answer:0, explain:"'Ik mag altijd eerst proeven…'" }
    ]
  },
  {
    id:"r-werk", level:"B1", theme:"work", title:"Werken in Nederland", titleEn:"Working in the Netherlands",
    intro:"A cultural text — useful if you plan to work here. Watch for the topic sentence of each paragraph; Dutch non-fiction states its point early, then explains.",
    text:[
      "Nederland staat bekend om zijn goede balans tussen werk en privéleven. Veel mensen werken parttime, ook mannen. Op woensdag of vrijdag zijn kantoren daarom vaak rustiger.",
      "Nederlanders zijn op het werk vrij direct. Ze zeggen meestal gewoon wat ze denken, ook tegen hun baas. Voor buitenlanders lijkt dit soms onbeleefd, maar het is niet zo bedoeld. Eerlijkheid wordt juist gewaardeerd.",
      "Beslissingen worden vaak samen genomen. Dit heet 'overleggen'. Iedereen mag zijn mening geven, en pas daarna neemt men een besluit. Dat kost tijd, maar zorgt voor draagvlak. Wie in Nederland wil werken, moet dus wennen aan overleg en directheid."
    ],
    glossary:[
      { nl:"privéleven", en:"private life" }, { nl:"direct", en:"direct, blunt" },
      { nl:"onbeleefd", en:"impolite" }, { nl:"overleggen", en:"to consult, deliberate" },
      { nl:"draagvlak", en:"support, buy-in" }, { nl:"wennen aan", en:"to get used to" }
    ],
    questions:[
      { q:"Why are offices quieter on some weekdays?", options:["Many people work part-time","Public holidays","Frequent strikes"], answer:0, explain:"'Veel mensen werken parttime… daarom vaak rustiger.'" },
      { q:"How do Dutch people tend to communicate at work?", options:["Indirectly","Directly and honestly","They avoid talking"], answer:1, explain:"'Nederlanders zijn op het werk vrij direct… Eerlijkheid wordt gewaardeerd.'" },
      { q:"What is 'overleggen'?", options:["The boss decides alone","Deciding together after everyone gives an opinion","Working overtime"], answer:1, explain:"'Iedereen mag zijn mening geven, en pas daarna neemt men een besluit.'" }
    ]
  },
  {
    id:"r-woningnood", level:"B2", theme:"society", title:"De woningnood", titleEn:"The housing shortage",
    intro:"Now the register rises: a news-style analysis with cause and effect. Track the argument — problem, causes, response, outlook. This is exactly the structure the state exams test.",
    text:[
      "In veel Nederlandse steden is het bijna onmogelijk om een betaalbare woning te vinden. De vraag naar huizen is veel groter dan het aanbod. Vooral jongeren en starters komen moeilijk aan een huis.",
      "De oorzaken zijn divers. Er worden te weinig nieuwe woningen gebouwd, de bevolking groeit, en de huizenprijzen stijgen al jaren. Bovendien kopen beleggers woningen op om ze duur te verhuren.",
      "De overheid probeert in te grijpen met nieuwe maatregelen, zoals het bouwen van meer huurwoningen en strengere regels voor beleggers. Toch is er geen snelle oplossing. Deskundigen verwachten dat de woningnood nog jaren zal duren. Voor veel mensen betekent dit langer wachten, of noodgedwongen buiten de stad gaan wonen."
    ],
    glossary:[
      { nl:"woningnood", en:"housing shortage" }, { nl:"betaalbaar", en:"affordable" },
      { nl:"het aanbod", en:"supply" }, { nl:"belegger", en:"investor" },
      { nl:"ingrijpen", en:"to intervene" }, { nl:"noodgedwongen", en:"forced by necessity" }
    ],
    questions:[
      { q:"What is the core cause of the shortage?", options:["Demand far exceeds supply","Too many homes are built","Nobody wants to buy"], answer:0, explain:"'De vraag naar huizen is veel groter dan het aanbod.'" },
      { q:"What do investors do, according to the text?", options:["Build affordable homes","Buy homes to rent out expensively","Lower prices"], answer:1, explain:"'…beleggers woningen op om ze duur te verhuren.'" },
      { q:"What do experts expect?", options:["A quick fix","The shortage to last for years","Prices to crash"], answer:1, explain:"'…verwachten dat de woningnood nog jaren zal duren.'" }
    ]
  },
  {
    id:"r-privacy", level:"B2", theme:"tech", title:"Digitale privacy", titleEn:"Digital privacy",
    intro:"An opinion piece. The writer has a clear stance — find it, then notice how each paragraph supports it. Ask yourself: where does description end and argument begin?",
    text:[
      "Elke dag laten we online sporen na. Websites volgen ons gedrag met cookies, apps vragen toegang tot onze locatie, en sociale media weten vaak meer over ons dan onze eigen familie. Veel mensen accepteren dit zonder er lang bij stil te staan.",
      "Toch is privacy geen luxe, maar een recht. Wie zijn gegevens zomaar weggeeft, verliest een deel van zijn vrijheid. Bedrijven verdienen immers geld met die informatie, en niet altijd op een eerlijke manier.",
      "Gelukkig groeit het bewustzijn. Er komen strengere wetten, zoals de Europese privacywetgeving, en steeds meer mensen beschermen hun gegevens bewust. Volledige controle is een illusie, maar wie oplet, kan zijn digitale sporen in elk geval beperken."
    ],
    glossary:[
      { nl:"sporen nalaten", en:"to leave traces" }, { nl:"gedrag", en:"behaviour" },
      { nl:"toegang", en:"access" }, { nl:"de gegevens", en:"data" },
      { nl:"het bewustzijn", en:"awareness" }, { nl:"beperken", en:"to limit" }
    ],
    questions:[
      { q:"What does the author consider privacy to be?", options:["A luxury","A right","Unimportant"], answer:1, explain:"'Toch is privacy geen luxe, maar een recht.'" },
      { q:"Why do companies want our data?", options:["To protect us","They make money from it","To delete it"], answer:1, explain:"'Bedrijven verdienen immers geld met die informatie.'" },
      { q:"Is total control of your data possible, per the text?", options:["Yes, easily","No, but you can limit your traces","Only for companies"], answer:1, explain:"'Volledige controle is een illusie, maar wie oplet, kan… beperken.'" }
    ]
  },
  {
    id:"r-technologie", level:"C1", theme:"abstract", title:"De keerzijde van technologie", titleEn:"The flip side of technology",
    intro:"A balanced argumentative essay. Master the 'enerzijds… anderzijds…' structure here — being able to weigh two sides in Dutch is a defining C1 skill, in reading and in writing.",
    text:[
      "Technologie wordt vaak voorgesteld als een onvermijdelijke vooruitgang. Smartphones, sociale media en kunstmatige intelligentie hebben ons leven ontegenzeglijk gemakkelijker gemaakt. Toch verdient dit optimisme enige nuance.",
      "Enerzijds vergroot technologie onze mogelijkheden: we communiceren wereldwijd, werken efficiënter en hebben kennis binnen handbereik. Anderzijds brengt diezelfde technologie nieuwe problemen met zich mee. Onze aandacht wordt voortdurend afgeleid, privacy staat onder druk, en algoritmes bepalen in toenemende mate wat we zien en denken.",
      "Het is dan ook te simpel om technologie louter als zegen of als vloek te bestempelen. De werkelijke vraag is niet óf we technologie gebruiken, maar hóe. Wie er kritisch en bewust mee omgaat, plukt de vruchten zonder zich te laten beheersen."
    ],
    glossary:[
      { nl:"onvermijdelijk", en:"inevitable" }, { nl:"ontegenzeglijk", en:"undeniably" },
      { nl:"binnen handbereik", en:"within reach" }, { nl:"afleiden", en:"to distract" },
      { nl:"louter", en:"merely" }, { nl:"de vruchten plukken", en:"to reap the benefits" }
    ],
    questions:[
      { q:"What is the author's overall stance?", options:["Purely positive","Purely negative","Nuanced — it depends on how we use it"], answer:2, explain:"'De werkelijke vraag is niet óf we technologie gebruiken, maar hóe.'" },
      { q:"Which downside is mentioned?", options:["Devices are too cheap","Attention is distracted and privacy is under pressure","Communication is slower"], answer:1, explain:"'Onze aandacht wordt voortdurend afgeleid, privacy staat onder druk…'" },
      { q:"'Enerzijds… anderzijds…' signals that the writer is…", options:["telling a story","weighing two sides","giving instructions"], answer:1, explain:"It introduces a balanced 'on the one hand… on the other hand…' contrast." }
    ]
  },
  {
    id:"r-duurzaam", level:"C2", theme:"abstract", title:"Duurzaamheid: meer dan een modewoord", titleEn:"Sustainability: more than a buzzword",
    intro:"A polished opinion column with irony and idiom. At C2 you read between the lines — catch the writer's scepticism and the force of the closing metaphor.",
    text:[
      "'Duurzaam' is uitgegroeid tot een van de meest gebruikte — en meest uitgeholde — woorden van deze tijd. Bedrijven strooien er gretig mee, want een groen imago verkoopt. Maar achter de fraaie leuzen gaat lang niet altijd een oprechte overtuiging schuil.",
      "Ware duurzaamheid vergt meer dan een recyclebare verpakking of een enkele geplante boom. Ze vraagt om structurele keuzes die op korte termijn geld kosten en pas op lange termijn lonen — precies het soort keuzes waar zowel bedrijven als consumenten voor terugdeinzen.",
      "Wie werkelijk verandering wil, moet verder kijken dan symboolpolitiek. Niet het etiket, maar de daadwerkelijke impact zou de maatstaf moeten zijn. Zolang duurzaamheid vooral een verkoopargument blijft, dweilen we met de kraan open."
    ],
    glossary:[
      { nl:"uitgehold", en:"hollowed out" }, { nl:"de leuze", en:"slogan" },
      { nl:"schuilgaan", en:"to be hidden" }, { nl:"terugdeinzen", en:"to shrink back" },
      { nl:"symboolpolitiek", en:"tokenism, symbolic politics" }, { nl:"de maatstaf", en:"the yardstick" },
      { nl:"dweilen met de kraan open", en:"a futile effort (mopping with the tap running)" }
    ],
    questions:[
      { q:"How does the author view companies' use of 'duurzaam'?", options:["Always sincere","Often a marketing image","Legally required"], answer:1, explain:"'…een groen imago verkoopt. Maar achter de fraaie leuzen gaat lang niet altijd een oprechte overtuiging schuil.'" },
      { q:"What does true sustainability require, per the text?", options:["Recyclable packaging","Planting one tree","Structural, long-term choices"], answer:2, explain:"'Ze vraagt om structurele keuzes die… pas op lange termijn lonen.'" },
      { q:"The closing idiom implies current efforts are…", options:["effective","futile","inexpensive"], answer:1, explain:"'Dweilen met de kraan open' = a pointless, futile effort." }
    ]
  }
];

window.DUTCH = { LEVELS, THEMES, VOCAB, GRAMMAR, SENTENCES, READINGS };
