// Generate quizzes programmatically
const TOPICS = {
  "osint":"OSINT",
  "malware":"Malware",
  "wan":"WAN",
  "soc":"SOC",
  "python-cyber":"Python Cyber"
};

function makeQuestions(topic){
  const questions = [];
  for(let i=1;i<=20;i++){
    questions.push({
      q: `${TOPICS[topic]} - pytanie ${i}`,
      opts: ['Opcja A','Opcja B','Opcja C','Opcja D'],
      correct: i%4
    });
  }
  return questions;
}

const QUIZZES = {};
Object.keys(TOPICS).forEach(t=>{
  QUIZZES[`${t}-easy`] = { title: `${TOPICS[t]} - Easy`, level:'easy', questions: makeQuestions(t).slice(0,8) };
  QUIZZES[`${t}-medium`] = { title: `${TOPICS[t]} - Medium`, level:'medium', questions: makeQuestions(t).slice(0,14) };
  QUIZZES[`${t}-hard`] = { title: `${TOPICS[t]} - Hard`, level:'hard', questions: makeQuestions(t).slice(0,20) };
});

export { QUIZZES };
