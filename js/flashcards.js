// Programmatic generator: 200 flashcards per topic
const topics = {
  "osint": "OSINT — Open Source Intelligence",
  "malware": "Analiza Malware",
  "wan": "Sieci WAN",
  "soc": "SOC Analyst",
  "python-cyber": "Python dla Cyber"
};

const REAL_FLASHCARDS = [];
Object.entries(topics).forEach(([k,title])=>{
  for(let i=1;i<=200;i++){
    REAL_FLASHCARDS.push({topic:k, q:`[${title}] Pytanie ${i}`, a:`Przykładowa odpowiedź dla ${title} #${i}`});
  }
});

export { REAL_FLASHCARDS };
