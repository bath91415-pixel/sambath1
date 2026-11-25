const screens = [...document.querySelectorAll(".screen")];
function showScreen(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
}
document.querySelectorAll("[data-go]").forEach(btn=>btn.addEventListener("click",()=>showScreen(btn.dataset.go)));

const questions=[
  "Do I make you smile?",
  "Am I someone special to you?",
  "Will you let me spoil you with kindness?",
  "Do you know how precious you are to me?"
];
let questionIndex=0;
const questionText=document.getElementById("questionText");
const questionCount=document.getElementById("questionCount");
const progressBar=document.getElementById("progressBar");
const meterFill=document.getElementById("meterFill");
const score=document.getElementById("score");
const quizMessage=document.getElementById("quizMessage");

function renderQuestion(){
  questionText.textContent=questions[questionIndex];
  questionCount.textContent=`Question ${questionIndex+1} of ${questions.length}`;
  progressBar.style.width=`${((questionIndex+1)/questions.length)*100}%`;
}
document.querySelectorAll(".answer").forEach(button=>button.addEventListener("click",()=>{
  const percent=Math.round(((questionIndex+1)/questions.length)*100);
  meterFill.style.width=`${percent}%`;
  score.textContent=`${percent}%`;
  quizMessage.textContent=["Aww, that's sweet! ♡","My heart is smiling! 💗","You're doing amazing, princess!","I knew you'd pass! 💞"][questionIndex];
  questionIndex++;
  if(questionIndex<questions.length){
    setTimeout(renderQuestion,450);
  }else{
    setTimeout(()=>showScreen("passed"),650);
  }
}));
const giftOpened=new Set();
document.querySelectorAll("[data-gift]").forEach(gift=>gift.addEventListener("click",()=>{
  const type=gift.dataset.gift;
  giftOpened.add(type);
  gift.querySelector("span").textContent="💝";
  if(type==="bouquet") showScreen("bouquet");
  if(type==="letter") showScreen("letter");
  if(type==="promise") showScreen("promise");
  document.getElementById("giftHint").textContent=`${giftOpened.size} of 3 surprises opened. ♡`;
}));
