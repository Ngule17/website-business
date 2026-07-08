/* data.js — Dutch curriculum: levels, vocabulary, grammar, sentences.
   All content is plain data so the app engine stays generic and the
   curriculum can grow without touching the logic. */

const LEVELS = [
  { id: "A1", name: "A1 — Beginner",       blurb: "Survival Dutch: greetings, numbers, everyday words." },
  { id: "A2", name: "A2 — Elementary",     blurb: "Daily life, past tense, simple opinions." },
  { id: "B1", name: "B1 — Intermediate",   blurb: "Hold conversations, express plans, connect ideas." },
  { id: "B2", name: "B2 — Upper-intermed.",blurb: "Abstract topics, nuance, spoken & written fluency." },
  { id: "C1", name: "C1 — Advanced",       blurb: "Idioms, register, complex argumentation." },
  { id: "C2", name: "C2 — Mastery",        blurb: "Near-native precision, formal & literary Dutch." },
];

/* Vocabulary. Fields:
   nl (Dutch), en (English), level, theme,
   art (het/de for nouns, "" otherwise),
   pos (part of speech), ex (Dutch example), exEn (English of example). */
const VOCAB = [
  // ---------------- A1 ----------------
  { nl:"hallo", en:"hello", level:"A1", theme:"Greetings", art:"", pos:"interj", ex:"Hallo, hoe gaat het?", exEn:"Hello, how are you?" },
  { nl:"dag", en:"hi / bye", level:"A1", theme:"Greetings", art:"de", pos:"noun", ex:"Dag! Tot morgen.", exEn:"Bye! See you tomorrow." },
  { nl:"goedemorgen", en:"good morning", level:"A1", theme:"Greetings", art:"", pos:"interj", ex:"Goedemorgen allemaal.", exEn:"Good morning everyone." },
  { nl:"alsjeblieft", en:"please / here you go", level:"A1", theme:"Greetings", art:"", pos:"interj", ex:"Een koffie, alsjeblieft.", exEn:"A coffee, please." },
  { nl:"dank je wel", en:"thank you", level:"A1", theme:"Greetings", art:"", pos:"phrase", ex:"Dank je wel voor je hulp.", exEn:"Thank you for your help." },
  { nl:"ja", en:"yes", level:"A1", theme:"Basics", art:"", pos:"adv", ex:"Ja, dat klopt.", exEn:"Yes, that's right." },
  { nl:"nee", en:"no", level:"A1", theme:"Basics", art:"", pos:"adv", ex:"Nee, dank je.", exEn:"No, thank you." },
  { nl:"water", en:"water", level:"A1", theme:"Food & Drink", art:"het", pos:"noun", ex:"Mag ik een glas water?", exEn:"May I have a glass of water?" },
  { nl:"brood", en:"bread", level:"A1", theme:"Food & Drink", art:"het", pos:"noun", ex:"Ik eet brood met kaas.", exEn:"I eat bread with cheese." },
  { nl:"kaas", en:"cheese", level:"A1", theme:"Food & Drink", art:"de", pos:"noun", ex:"Nederlandse kaas is lekker.", exEn:"Dutch cheese is tasty." },
  { nl:"koffie", en:"coffee", level:"A1", theme:"Food & Drink", art:"de", pos:"noun", ex:"Ik drink graag koffie.", exEn:"I like drinking coffee." },
  { nl:"huis", en:"house", level:"A1", theme:"Home", art:"het", pos:"noun", ex:"Ons huis is klein.", exEn:"Our house is small." },
  { nl:"vrouw", en:"woman / wife", level:"A1", theme:"People", art:"de", pos:"noun", ex:"De vrouw leest een boek.", exEn:"The woman is reading a book." },
  { nl:"man", en:"man / husband", level:"A1", theme:"People", art:"de", pos:"noun", ex:"Die man werkt hier.", exEn:"That man works here." },
  { nl:"kind", en:"child", level:"A1", theme:"People", art:"het", pos:"noun", ex:"Het kind speelt buiten.", exEn:"The child plays outside." },
  { nl:"vriend", en:"friend", level:"A1", theme:"People", art:"de", pos:"noun", ex:"Hij is mijn beste vriend.", exEn:"He is my best friend." },
  { nl:"dag (day)", en:"day", level:"A1", theme:"Time", art:"de", pos:"noun", ex:"Een mooie dag vandaag.", exEn:"A nice day today." },
  { nl:"vandaag", en:"today", level:"A1", theme:"Time", art:"", pos:"adv", ex:"Vandaag regent het.", exEn:"Today it's raining." },
  { nl:"morgen", en:"tomorrow / morning", level:"A1", theme:"Time", art:"", pos:"adv", ex:"Tot morgen!", exEn:"Until tomorrow!" },
  { nl:"nu", en:"now", level:"A1", theme:"Time", art:"", pos:"adv", ex:"We gaan nu weg.", exEn:"We're leaving now." },
  { nl:"groot", en:"big", level:"A1", theme:"Adjectives", art:"", pos:"adj", ex:"Een grote stad.", exEn:"A big city." },
  { nl:"klein", en:"small", level:"A1", theme:"Adjectives", art:"", pos:"adj", ex:"Een klein probleem.", exEn:"A small problem." },
  { nl:"goed", en:"good / well", level:"A1", theme:"Adjectives", art:"", pos:"adj", ex:"Het gaat goed.", exEn:"It's going well." },
  { nl:"mooi", en:"beautiful / nice", level:"A1", theme:"Adjectives", art:"", pos:"adj", ex:"Wat een mooi weer.", exEn:"What nice weather." },
  { nl:"een", en:"one / a", level:"A1", theme:"Numbers", art:"", pos:"num", ex:"Ik heb een vraag.", exEn:"I have a question." },
  { nl:"twee", en:"two", level:"A1", theme:"Numbers", art:"", pos:"num", ex:"Twee koffie, graag.", exEn:"Two coffees, please." },
  { nl:"drie", en:"three", level:"A1", theme:"Numbers", art:"", pos:"num", ex:"Ik heb drie broers.", exEn:"I have three brothers." },
  { nl:"gaan", en:"to go", level:"A1", theme:"Verbs", art:"", pos:"verb", ex:"Waar ga je naartoe?", exEn:"Where are you going?" },
  { nl:"hebben", en:"to have", level:"A1", theme:"Verbs", art:"", pos:"verb", ex:"Ik heb honger.", exEn:"I'm hungry." },
  { nl:"zijn", en:"to be", level:"A1", theme:"Verbs", art:"", pos:"verb", ex:"Wij zijn thuis.", exEn:"We are home." },
  { nl:"eten", en:"to eat", level:"A1", theme:"Verbs", art:"", pos:"verb", ex:"We eten om zes uur.", exEn:"We eat at six." },
  { nl:"drinken", en:"to drink", level:"A1", theme:"Verbs", art:"", pos:"verb", ex:"Wat wil je drinken?", exEn:"What do you want to drink?" },
  { nl:"wonen", en:"to live (reside)", level:"A1", theme:"Verbs", art:"", pos:"verb", ex:"Ik woon in Amsterdam.", exEn:"I live in Amsterdam." },

  // ---------------- A2 ----------------
  { nl:"werken", en:"to work", level:"A2", theme:"Work", art:"", pos:"verb", ex:"Zij werkt bij een bank.", exEn:"She works at a bank." },
  { nl:"baan", en:"job", level:"A2", theme:"Work", art:"de", pos:"noun", ex:"Ik zoek een nieuwe baan.", exEn:"I'm looking for a new job." },
  { nl:"afspraak", en:"appointment", level:"A2", theme:"Work", art:"de", pos:"noun", ex:"Ik heb een afspraak om drie uur.", exEn:"I have an appointment at three." },
  { nl:"trein", en:"train", level:"A2", theme:"Travel", art:"de", pos:"noun", ex:"De trein is te laat.", exEn:"The train is late." },
  { nl:"fiets", en:"bicycle", level:"A2", theme:"Travel", art:"de", pos:"noun", ex:"Ik ga met de fiets.", exEn:"I'm going by bike." },
  { nl:"station", en:"station", level:"A2", theme:"Travel", art:"het", pos:"noun", ex:"Het station is dichtbij.", exEn:"The station is nearby." },
  { nl:"kaartje", en:"ticket", level:"A2", theme:"Travel", art:"het", pos:"noun", ex:"Waar koop ik een kaartje?", exEn:"Where do I buy a ticket?" },
  { nl:"weer", en:"weather", level:"A2", theme:"Weather", art:"het", pos:"noun", ex:"Het weer is slecht.", exEn:"The weather is bad." },
  { nl:"regen", en:"rain", level:"A2", theme:"Weather", art:"de", pos:"noun", ex:"Er komt regen aan.", exEn:"Rain is coming." },
  { nl:"zon", en:"sun", level:"A2", theme:"Weather", art:"de", pos:"noun", ex:"De zon schijnt.", exEn:"The sun is shining." },
  { nl:"winkel", en:"shop", level:"A2", theme:"Shopping", art:"de", pos:"noun", ex:"De winkel is gesloten.", exEn:"The shop is closed." },
  { nl:"geld", en:"money", level:"A2", theme:"Shopping", art:"het", pos:"noun", ex:"Ik heb geen geld bij me.", exEn:"I have no money on me." },
  { nl:"betalen", en:"to pay", level:"A2", theme:"Shopping", art:"", pos:"verb", ex:"Kan ik met pin betalen?", exEn:"Can I pay by card?" },
  { nl:"kopen", en:"to buy", level:"A2", theme:"Shopping", art:"", pos:"verb", ex:"Ik wil een cadeau kopen.", exEn:"I want to buy a gift." },
  { nl:"duur", en:"expensive", level:"A2", theme:"Shopping", art:"", pos:"adj", ex:"Dat is te duur.", exEn:"That's too expensive." },
  { nl:"goedkoop", en:"cheap", level:"A2", theme:"Shopping", art:"", pos:"adj", ex:"Deze is goedkoop.", exEn:"This one is cheap." },
  { nl:"ziek", en:"sick", level:"A2", theme:"Health", art:"", pos:"adj", ex:"Ik ben ziek vandaag.", exEn:"I'm sick today." },
  { nl:"dokter", en:"doctor", level:"A2", theme:"Health", art:"de", pos:"noun", ex:"Ik ga naar de dokter.", exEn:"I'm going to the doctor." },
  { nl:"pijn", en:"pain", level:"A2", theme:"Health", art:"de", pos:"noun", ex:"Ik heb pijn in mijn rug.", exEn:"I have pain in my back." },
  { nl:"gisteren", en:"yesterday", level:"A2", theme:"Time", art:"", pos:"adv", ex:"Gisteren was ik moe.", exEn:"Yesterday I was tired." },
  { nl:"altijd", en:"always", level:"A2", theme:"Time", art:"", pos:"adv", ex:"Hij is altijd te laat.", exEn:"He's always late." },
  { nl:"soms", en:"sometimes", level:"A2", theme:"Time", art:"", pos:"adv", ex:"Soms kook ik zelf.", exEn:"Sometimes I cook myself." },
  { nl:"beginnen", en:"to begin", level:"A2", theme:"Verbs", art:"", pos:"verb", ex:"De les begint om negen uur.", exEn:"The class begins at nine." },
  { nl:"denken", en:"to think", level:"A2", theme:"Verbs", art:"", pos:"verb", ex:"Ik denk van wel.", exEn:"I think so." },
  { nl:"vragen", en:"to ask", level:"A2", theme:"Verbs", art:"", pos:"verb", ex:"Mag ik iets vragen?", exEn:"May I ask something?" },
  { nl:"begrijpen", en:"to understand", level:"A2", theme:"Verbs", art:"", pos:"verb", ex:"Ik begrijp het niet.", exEn:"I don't understand it." },
  { nl:"onthouden", en:"to remember", level:"A2", theme:"Verbs", art:"", pos:"verb", ex:"Ik kan het niet onthouden.", exEn:"I can't remember it." },

  // ---------------- B1 ----------------
  { nl:"ervaring", en:"experience", level:"B1", theme:"Work", art:"de", pos:"noun", ex:"Ik heb veel ervaring met koken.", exEn:"I have a lot of experience with cooking." },
  { nl:"sollicitatie", en:"job application/interview", level:"B1", theme:"Work", art:"de", pos:"noun", ex:"Mijn sollicitatie ging goed.", exEn:"My job interview went well." },
  { nl:"vergadering", en:"meeting", level:"B1", theme:"Work", art:"de", pos:"noun", ex:"De vergadering duurde te lang.", exEn:"The meeting lasted too long." },
  { nl:"verantwoordelijk", en:"responsible", level:"B1", theme:"Work", art:"", pos:"adj", ex:"Zij is verantwoordelijk voor het team.", exEn:"She is responsible for the team." },
  { nl:"besluit", en:"decision", level:"B1", theme:"Abstract", art:"het", pos:"noun", ex:"Dat is een moeilijk besluit.", exEn:"That's a difficult decision." },
  { nl:"mening", en:"opinion", level:"B1", theme:"Abstract", art:"de", pos:"noun", ex:"Wat is jouw mening hierover?", exEn:"What's your opinion on this?" },
  { nl:"verschil", en:"difference", level:"B1", theme:"Abstract", art:"het", pos:"noun", ex:"Er is een groot verschil.", exEn:"There is a big difference." },
  { nl:"voordeel", en:"advantage", level:"B1", theme:"Abstract", art:"het", pos:"noun", ex:"Het grote voordeel is de prijs.", exEn:"The big advantage is the price." },
  { nl:"nadeel", en:"disadvantage", level:"B1", theme:"Abstract", art:"het", pos:"noun", ex:"Het nadeel is de afstand.", exEn:"The disadvantage is the distance." },
  { nl:"oplossing", en:"solution", level:"B1", theme:"Abstract", art:"de", pos:"noun", ex:"We zoeken een oplossing.", exEn:"We're looking for a solution." },
  { nl:"gebeuren", en:"to happen", level:"B1", theme:"Verbs", art:"", pos:"verb", ex:"Wat is er gebeurd?", exEn:"What happened?" },
  { nl:"proberen", en:"to try", level:"B1", theme:"Verbs", art:"", pos:"verb", ex:"Ik zal het proberen.", exEn:"I'll try it." },
  { nl:"verwachten", en:"to expect", level:"B1", theme:"Verbs", art:"", pos:"verb", ex:"Ik had meer verwacht.", exEn:"I had expected more." },
  { nl:"veranderen", en:"to change", level:"B1", theme:"Verbs", art:"", pos:"verb", ex:"Er is veel veranderd.", exEn:"A lot has changed." },
  { nl:"voorstellen", en:"to suggest / introduce", level:"B1", theme:"Verbs", art:"", pos:"verb", ex:"Mag ik mezelf voorstellen?", exEn:"May I introduce myself?" },
  { nl:"toch", en:"still / after all (modal particle)", level:"B1", theme:"Particles", art:"", pos:"adv", ex:"Je komt toch wel?", exEn:"You're coming anyway, right?" },
  { nl:"eigenlijk", en:"actually", level:"B1", theme:"Particles", art:"", pos:"adv", ex:"Ik weet het eigenlijk niet.", exEn:"I don't actually know." },
  { nl:"misschien", en:"maybe", level:"B1", theme:"Particles", art:"", pos:"adv", ex:"Misschien komt hij later.", exEn:"Maybe he'll come later." },
  { nl:"bovendien", en:"moreover", level:"B1", theme:"Connectors", art:"", pos:"adv", ex:"Bovendien is het goedkoper.", exEn:"Moreover, it's cheaper." },
  { nl:"hoewel", en:"although", level:"B1", theme:"Connectors", art:"", pos:"conj", ex:"Hoewel het regent, gaan we.", exEn:"Although it's raining, we're going." },
  { nl:"terwijl", en:"while", level:"B1", theme:"Connectors", art:"", pos:"conj", ex:"Ik lees terwijl zij kookt.", exEn:"I read while she cooks." },
  { nl:"omgeving", en:"surroundings / area", level:"B1", theme:"Environment", art:"de", pos:"noun", ex:"De omgeving is rustig.", exEn:"The area is quiet." },
  { nl:"gezond", en:"healthy", level:"B1", theme:"Health", art:"", pos:"adj", ex:"Zij leeft heel gezond.", exEn:"She lives very healthily." },

  // ---------------- B2 ----------------
  { nl:"invloed", en:"influence", level:"B2", theme:"Society", art:"de", pos:"noun", ex:"De media hebben veel invloed.", exEn:"The media have a lot of influence." },
  { nl:"ontwikkeling", en:"development", level:"B2", theme:"Society", art:"de", pos:"noun", ex:"Een zorgwekkende ontwikkeling.", exEn:"A worrying development." },
  { nl:"gevolg", en:"consequence", level:"B2", theme:"Society", art:"het", pos:"noun", ex:"Dat heeft grote gevolgen.", exEn:"That has major consequences." },
  { nl:"toename", en:"increase", level:"B2", theme:"Society", art:"de", pos:"noun", ex:"Er is een toename van klachten.", exEn:"There's an increase in complaints." },
  { nl:"beleid", en:"policy", level:"B2", theme:"Politics", art:"het", pos:"noun", ex:"Het beleid moet veranderen.", exEn:"The policy must change." },
  { nl:"overheid", en:"government", level:"B2", theme:"Politics", art:"de", pos:"noun", ex:"De overheid grijpt in.", exEn:"The government intervenes." },
  { nl:"maatregel", en:"measure", level:"B2", theme:"Politics", art:"de", pos:"noun", ex:"Strenge maatregelen zijn nodig.", exEn:"Strict measures are needed." },
  { nl:"duurzaam", en:"sustainable", level:"B2", theme:"Environment", art:"", pos:"adj", ex:"We kiezen voor duurzame energie.", exEn:"We choose sustainable energy." },
  { nl:"bewustzijn", en:"awareness / consciousness", level:"B2", theme:"Abstract", art:"het", pos:"noun", ex:"Het bewustzijn groeit.", exEn:"Awareness is growing." },
  { nl:"redelijk", en:"reasonable / fairly", level:"B2", theme:"Abstract", art:"", pos:"adj", ex:"Dat lijkt me redelijk.", exEn:"That seems reasonable to me." },
  { nl:"ingewikkeld", en:"complicated", level:"B2", theme:"Abstract", art:"", pos:"adj", ex:"Het is ingewikkelder dan het lijkt.", exEn:"It's more complicated than it seems." },
  { nl:"benadrukken", en:"to emphasize", level:"B2", theme:"Verbs", art:"", pos:"verb", ex:"Ik wil benadrukken dat...", exEn:"I want to emphasize that..." },
  { nl:"beïnvloeden", en:"to influence", level:"B2", theme:"Verbs", art:"", pos:"verb", ex:"Reclame beïnvloedt ons gedrag.", exEn:"Advertising influences our behaviour." },
  { nl:"beweren", en:"to claim", level:"B2", theme:"Verbs", art:"", pos:"verb", ex:"Hij beweert dat het klopt.", exEn:"He claims that it's correct." },
  { nl:"toenemen", en:"to increase", level:"B2", theme:"Verbs", art:"", pos:"verb", ex:"De kosten nemen toe.", exEn:"The costs are increasing." },
  { nl:"afnemen", en:"to decrease", level:"B2", theme:"Verbs", art:"", pos:"verb", ex:"De belangstelling neemt af.", exEn:"The interest is decreasing." },
  { nl:"desondanks", en:"nevertheless", level:"B2", theme:"Connectors", art:"", pos:"adv", ex:"Desondanks bleef hij kalm.", exEn:"Nevertheless he stayed calm." },
  { nl:"daarentegen", en:"on the other hand", level:"B2", theme:"Connectors", art:"", pos:"adv", ex:"Zij daarentegen was het oneens.", exEn:"She, on the other hand, disagreed." },
  { nl:"vervolgens", en:"subsequently", level:"B2", theme:"Connectors", art:"", pos:"adv", ex:"Vervolgens vertrok hij.", exEn:"Subsequently he left." },
  { nl:"nauwelijks", en:"hardly", level:"B2", theme:"Adverbs", art:"", pos:"adv", ex:"Ik heb nauwelijks geslapen.", exEn:"I've hardly slept." },

  // ---------------- C1 ----------------
  { nl:"streven", en:"to strive / aspiration", level:"C1", theme:"Abstract", art:"het", pos:"noun/verb", ex:"Wij streven naar kwaliteit.", exEn:"We strive for quality." },
  { nl:"onderscheid", en:"distinction", level:"C1", theme:"Abstract", art:"het", pos:"noun", ex:"Maak onderscheid tussen feit en mening.", exEn:"Distinguish between fact and opinion." },
  { nl:"veronderstelling", en:"assumption", level:"C1", theme:"Abstract", art:"de", pos:"noun", ex:"Dat berust op een verkeerde veronderstelling.", exEn:"That rests on a wrong assumption." },
  { nl:"aanzienlijk", en:"considerable", level:"C1", theme:"Abstract", art:"", pos:"adj", ex:"Een aanzienlijk deel is het eens.", exEn:"A considerable part agrees." },
  { nl:"weliswaar", en:"admittedly / it is true that", level:"C1", theme:"Connectors", art:"", pos:"adv", ex:"Het is weliswaar duur, maar goed.", exEn:"It is admittedly expensive, but good." },
  { nl:"desalniettemin", en:"nonetheless", level:"C1", theme:"Connectors", art:"", pos:"adv", ex:"Desalniettemin blijft hij optimistisch.", exEn:"Nonetheless he remains optimistic." },
  { nl:"tenzij", en:"unless", level:"C1", theme:"Connectors", art:"", pos:"conj", ex:"We gaan, tenzij het stormt.", exEn:"We're going, unless it storms." },
  { nl:"opzicht", en:"respect / regard", level:"C1", theme:"Abstract", art:"het", pos:"noun", ex:"In dat opzicht heb je gelijk.", exEn:"In that respect you're right." },
  { nl:"nuance", en:"nuance", level:"C1", theme:"Abstract", art:"de", pos:"noun", ex:"Dat vraagt om enige nuance.", exEn:"That calls for some nuance." },
  { nl:"belemmeren", en:"to hinder", level:"C1", theme:"Verbs", art:"", pos:"verb", ex:"Regels belemmeren de vooruitgang.", exEn:"Rules hinder progress." },
  { nl:"bijdragen", en:"to contribute", level:"C1", theme:"Verbs", art:"", pos:"verb", ex:"Iedereen draagt bij aan het project.", exEn:"Everyone contributes to the project." },
  { nl:"achterhalen", en:"to find out / trace", level:"C1", theme:"Verbs", art:"", pos:"verb", ex:"We proberen de oorzaak te achterhalen.", exEn:"We try to trace the cause." },
  { nl:"toeschrijven", en:"to attribute", level:"C1", theme:"Verbs", art:"", pos:"verb", ex:"Het succes is toe te schrijven aan het team.", exEn:"The success is attributable to the team." },
  { nl:"vergezocht", en:"far-fetched", level:"C1", theme:"Abstract", art:"", pos:"adj", ex:"Dat argument is nogal vergezocht.", exEn:"That argument is rather far-fetched." },
  { nl:"weloverwogen", en:"well-considered", level:"C1", theme:"Abstract", art:"", pos:"adj", ex:"Een weloverwogen keuze.", exEn:"A well-considered choice." },
  { nl:"de puntjes op de i zetten", en:"to dot the i's (be precise)", level:"C1", theme:"Idioms", art:"", pos:"idiom", ex:"Laten we de puntjes op de i zetten.", exEn:"Let's put the finishing touches on it." },
  { nl:"de kat uit de boom kijken", en:"to wait and see", level:"C1", theme:"Idioms", art:"", pos:"idiom", ex:"Hij kijkt eerst de kat uit de boom.", exEn:"He first waits to see how things go." },

  // ---------------- C2 ----------------
  { nl:"vooringenomenheid", en:"bias / prejudice", level:"C2", theme:"Abstract", art:"de", pos:"noun", ex:"Zijn oordeel getuigt van vooringenomenheid.", exEn:"His judgement betrays bias." },
  { nl:"gelaagd", en:"layered / multi-faceted", level:"C2", theme:"Abstract", art:"", pos:"adj", ex:"Een gelaagd betoog.", exEn:"A layered argument." },
  { nl:"onmiskenbaar", en:"unmistakable", level:"C2", theme:"Abstract", art:"", pos:"adj", ex:"Een onmiskenbare vooruitgang.", exEn:"An unmistakable improvement." },
  { nl:"vergankelijk", en:"transient / perishable", level:"C2", theme:"Literary", art:"", pos:"adj", ex:"Roem is vergankelijk.", exEn:"Fame is fleeting." },
  { nl:"weemoed", en:"melancholy / wistfulness", level:"C2", theme:"Literary", art:"de", pos:"noun", ex:"Een gevoel van weemoed overviel hem.", exEn:"A feeling of melancholy came over him." },
  { nl:"gaandeweg", en:"gradually / as one goes", level:"C2", theme:"Adverbs", art:"", pos:"adv", ex:"Gaandeweg werd alles duidelijk.", exEn:"Gradually everything became clear." },
  { nl:"immers", en:"after all (formal)", level:"C2", theme:"Connectors", art:"", pos:"adv", ex:"Hij weet dat immers zelf ook.", exEn:"He knows that himself, after all." },
  { nl:"geenszins", en:"by no means", level:"C2", theme:"Adverbs", art:"", pos:"adv", ex:"Dat is geenszins mijn bedoeling.", exEn:"That is by no means my intention." },
  { nl:"ontegenzeglijk", en:"indisputably", level:"C2", theme:"Adverbs", art:"", pos:"adv", ex:"Zij is ontegenzeglijk de beste.", exEn:"She is indisputably the best." },
  { nl:"schoorvoetend", en:"reluctantly", level:"C2", theme:"Adverbs", art:"", pos:"adv", ex:"Schoorvoetend stemde hij toe.", exEn:"Reluctantly he agreed." },
  { nl:"doorslaggevend", en:"decisive", level:"C2", theme:"Abstract", art:"", pos:"adj", ex:"Dat was het doorslaggevende argument.", exEn:"That was the decisive argument." },
  { nl:"vergen", en:"to demand / require", level:"C2", theme:"Verbs", art:"", pos:"verb", ex:"Dit vergt geduld en precisie.", exEn:"This requires patience and precision." },
  { nl:"ontlokken", en:"to elicit", level:"C2", theme:"Verbs", art:"", pos:"verb", ex:"De opmerking ontlokte gelach.", exEn:"The remark elicited laughter." },
  { nl:"nuanceren", en:"to nuance / qualify", level:"C2", theme:"Verbs", art:"", pos:"verb", ex:"Ik wil die stelling nuanceren.", exEn:"I want to qualify that statement." },
  { nl:"de knoop doorhakken", en:"to make the final decision", level:"C2", theme:"Idioms", art:"", pos:"idiom", ex:"Iemand moet de knoop doorhakken.", exEn:"Someone has to make the call." },
  { nl:"met de deur in huis vallen", en:"to get straight to the point", level:"C2", theme:"Idioms", art:"", pos:"idiom", ex:"Ik val maar met de deur in huis.", exEn:"I'll just get straight to the point." },
  { nl:"iets door de vingers zien", en:"to turn a blind eye", level:"C2", theme:"Idioms", art:"", pos:"idiom", ex:"De docent zag de fout door de vingers.", exEn:"The teacher turned a blind eye to the mistake." },
];

/* Grammar lessons. body is HTML. quiz: array of {q, options[], answer index, explain}. */
const GRAMMAR = [
  {
    id:"g-articles", level:"A1", title:"de or het? The two articles",
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
    id:"g-wordorder", level:"A1", title:"Verb in second position (V2)",
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
    id:"g-present", level:"A1", title:"Present tense conjugation",
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
    id:"g-perfect", level:"A2", title:"The perfect tense (voltooid verleden)",
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
    id:"g-imperfect", level:"A2", title:"Simple past (onvoltooid verleden)",
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
    id:"g-modal", level:"A2", title:"Modal verbs & the verb-final rule",
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
    id:"g-subclause", level:"B1", title:"Subordinate clauses: verb to the end",
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
    id:"g-separable", level:"B1", title:"Separable verbs",
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
    id:"g-er", level:"B2", title:"The many uses of 'er'",
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
    id:"g-passive", level:"B2", title:"The passive voice",
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
    id:"g-conditional", level:"B2", title:"Conditional & 'zou'",
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
    id:"g-relative", level:"C1", title:"Relative clauses: die, dat, wat, wie",
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
    id:"g-woordvolgorde", level:"C1", title:"Middle-field order: time–manner–place & negation",
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
    id:"g-register", level:"C2", title:"Register, particles & idiomatic precision",
    body:`<p>At C2 the challenge is <b>register and nuance</b>, not rules. Master:</p>
    <ul>
      <li><b>Modal particles</b> that colour a sentence: <span class="ex">Doe maar rustig. / Kom nou toch. / Dat is nu eenmaal zo.</span></li>
      <li><b>Formal connectors</b> for writing: <span class="ex">immers, weliswaar, desalniettemin, zulks, dienaangaande.</span></li>
      <li><b>Idioms</b> used naturally: <span class="ex">de knoop doorhakken, ergens de hand aan houden, het naadje van de kous willen weten.</span></li>
      <li><b>Nominalisation</b> for formal tone: <span class="ex">na afronding van het project</span> instead of <span class="ex">nadat het project af is</span>.</li>
    </ul>`,
    quiz:[
      { q:"Which is the most formal 'nevertheless'?", options:["toch maar","desalniettemin","gewoon"], answer:1, explain:"'desalniettemin' belongs to formal written register." },
      { q:"'to make the decision' idiom:", options:["de knoop doorhakken","de kat uit de boom kijken","de plank misslaan"], answer:0, explain:"'de knoop doorhakken' = to make the decisive call." },
    ]
  },
];

/* Sentence bank for translation & dictation practice (EN <-> NL). */
const SENTENCES = [
  { level:"A1", nl:"Ik heb honger.", en:"I am hungry." },
  { level:"A1", nl:"Waar is het station?", en:"Where is the station?" },
  { level:"A1", nl:"Hoeveel kost dit?", en:"How much does this cost?" },
  { level:"A1", nl:"Ik spreek een beetje Nederlands.", en:"I speak a little Dutch." },
  { level:"A2", nl:"Gisteren ben ik naar de markt geweest.", en:"Yesterday I went to the market." },
  { level:"A2", nl:"Kun je dat alsjeblieft herhalen?", en:"Can you please repeat that?" },
  { level:"A2", nl:"Ik moet morgen vroeg opstaan.", en:"I have to get up early tomorrow." },
  { level:"B1", nl:"Hoewel het regende, zijn we gaan wandelen.", en:"Although it was raining, we went for a walk." },
  { level:"B1", nl:"Ik ben het niet helemaal met je eens.", en:"I don't entirely agree with you." },
  { level:"B1", nl:"Zou je me kunnen vertellen hoe dit werkt?", en:"Could you tell me how this works?" },
  { level:"B2", nl:"De maatregelen hebben grote gevolgen voor het milieu.", en:"The measures have major consequences for the environment." },
  { level:"B2", nl:"Er wordt beweerd dat de kosten zullen toenemen.", en:"It is claimed that the costs will increase." },
  { level:"B2", nl:"In tegenstelling tot vorig jaar is de vraag afgenomen.", en:"In contrast to last year, demand has decreased." },
  { level:"C1", nl:"We moeten onderscheid maken tussen oorzaak en gevolg.", en:"We must distinguish between cause and effect." },
  { level:"C1", nl:"Dat argument berust op een verkeerde veronderstelling.", en:"That argument rests on a mistaken assumption." },
  { level:"C1", nl:"In dat opzicht valt er nog wel wat te nuanceren.", en:"In that respect there is still room for nuance." },
  { level:"C2", nl:"Zijn betoog was weliswaar gelaagd, maar geenszins overtuigend.", en:"His argument was admittedly layered, but by no means convincing." },
  { level:"C2", nl:"Uiteindelijk moest iemand de knoop doorhakken.", en:"In the end, someone had to make the final call." },
  { level:"C2", nl:"Schoorvoetend gaf hij toe dat hij ongelijk had.", en:"Reluctantly he admitted that he was wrong." },
];

window.DUTCH = { LEVELS, VOCAB, GRAMMAR, SENTENCES };
