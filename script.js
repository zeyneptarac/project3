// Sorular ve cevaplar
const questions = [
	{
		question: "Soru 1: Java'nın yaratıcısı kimdir?",
		answers: [
			{ text: "James Gosling", correct: true },
			{ text: "Linus Torvalds", correct: false },
			{ text: "Bill Gates", correct: false },
			{ text: "Steve Jobs", correct: false },
			{ text: "Larry Page", correct: false }
		]
	},
	{
		question: "Soru 2: Java hangi yıl piyasaya sürülmüştür?",
		answers: [
			{ text: "1990", correct: false },
			{ text: "1991", correct: true },
			{ text: "1992", correct: false },
			{ text: "1993", correct: false },
			{ text: "1994", correct: false }
		]
	},
	{
		question: "Soru 3: Java platformu hangi dili kullanarak yazılmıştır?",
		answers: [
			{ text: "C", correct: true },
			{ text: "C++", correct: false },
			{ text: "Smalltalk", correct: false },
			{ text: "Ada", correct: false },
			{ text: "Assembly", correct: false }
		]
	},
	{
		question: "Soru 4: Java'nın en önemli özelliklerinden biri nedir?",
		answers: [
			{ text: "Nesne yönelimli programlama", correct: false },
			{ text: "Çoklu platform desteği", correct: false },
			{ text: "Garbage collection", correct: true },
			{ text: "Yüksek performans", correct: false },
			{ text: "Veri tabanı desteği", correct: false }
		]
	},
	{
		question: "Soru 5: Java uygulamaları hangi formatta derlenir?",
		answers: [
			{ text: ".exe", correct: false },
			{ text: ".jar", correct: true },
			{ text: ".dll", correct: false },
			{ text: ".py", correct: false },
			{ text: ".bat", correct: false }
		]
	},
	{
		question: "Soru 6: Java'nın sürüm numaralandırması nasıldır?",
		answers: [
			{ text: "MAJOR.MINOR.PATCH", correct: false },
			{ text: "VERSION.BUILD.REVISION", correct: false },
			{ text: "X.Y.Z", correct: true },
			{ text: "A.B.C.D", correct: false },
			{ text: "1.0.0.0", correct: false }
		]
	},
	{
		question: "Soru 7: Java uygulamalarının çalıştırılması için hangi program gerekir?",
		answers: [
			{ text: "Eclipse", correct: true },
			{ text: "NetBeans", correct: false },
			{ text: "IntelliJ IDEA", correct: false },
			{ text: "Visual Studio", correct: false },
			{ text: "Android Studio", correct: false }
		]
	},
	{
		question: "Soru 8: Java'da sınıflar nasıl organize edilir?",
		answers: [
			{ text: "Dosya tarihine göre", correct: false },
			{ text: "Dosya boyutuna göre", correct: false },
			{ text: " Alfabetik sıraya göre", correct: false },
			{ text: "Sınıf hiyerarşisine göre", correct: true },
			{ text: "Özelleştirilebilir sıraya göre", correct: false }
		]
	},
	{
		question: "Soru 9: Java'da final anahtar kelimesi ne anlama gelir?",
		answers: [
			{ text: "Değiştirilemez değer", correct: true },
			{ text: "Fonksiyon", correct: false },
			{ text: "Değiştirilebilir değer", correct: false },
			{ text: "Global değişken", correct: false },
			{ text: "Yerel değişken", correct: false }
		]
	},
	{
		question: "Soru 10: Java'da kullanılan en popüler veri tabanı sistemi hangisidir?",
		answers: [
			{ text: " MySQL", correct: false },
			{ text: "Oracle", correct: true },
			{ text: "Microsoft SQL Server", correct: false },
			{ text: "PostgreSQL", correct: false },
			{ text: "MongoDB", correct: false }
		]
	}
];

// Kullanıcı adı ve şifre
const username = "kullanici";
const password = "sifre";

// Kullanıcının quizi tamamlaması için verilen süre (saniye cinsinden)
const quizTime = 2400;

// HTML elementleri
const quizForm = document.getElementById("quiz-form");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const loginForm = document.getElementById("login-form");
const login = document.getElementById("login");
const loginMessage = document.getElementById("login-message");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");

// Kullanıcının quizi tamamlaması için kalan süre (saniye cinsinden)
let remainingTime = quizTime;

// Login formu gönderildiğinde
loginForm.addEventListener("submit", e => {
	e.preventDefault();
	const enteredUsername = e.target.username.value;
	const enteredPassword = e.target.password.value;
	if (enteredUsername === username && enteredPassword === password) {
// Kullanıcı adı ve şifre doğruysa, login formunu gizle ve quizi göster
login.style.display = "none";
quiz.style.display = "block";
	// Quiz sorularını ve seçeneklerini göster
	displayQuestions();
	
	// Quiz zamanlayıcını başlat
	startTimer();
} else {
	// Kullanıcı adı veya şifre yanlışsa, hata mesajı göster
	loginMessage.innerHTML = "Kullanıcı adı veya şifre yanlış. Lütfen tekrar deneyin.";
}
});

// Quiz sorularını ve seçeneklerini gösteren fonksiyon
function displayQuestions() {
  const output = [];
  questions.forEach((question, index) => {
    const answers = [];
    question.answers.forEach(answer => {
      answers.push(
        `<label><input type="radio" name="question${index}" value="${answer.correct}"> ${answer.text}</label>`
      );
    });
    output.push(
      `<div class="question"><h2>${question.question}</h2><div class="answers">${answers.join("")}</div></div>`
    );
  });
  quizForm.innerHTML = output.join("");
}


// Quizi tamamladıktan sonra sonuçları gösteren fonksiyon
function showResults() {
// Quiz formunu gizle ve sonuçları göster
quiz.style.display = "none";
results.style.display = "block";
// Doğru cevap sayısını hesapla
const answerContainers = quizForm.querySelectorAll(".answers");
let numCorrect = 0;
questions.forEach((question, index) => {
	const answerContainer = answerContainers[index];
	const selector = `input[name=question${index}]:checked`;
	const userAnswer = (answerContainer.querySelector(selector) || {}).value;
	if (userAnswer === "true") {
		numCorrect++;
	}
});

// Sonuçları göster
results.innerHTML = `Doğru sayısı: ${numCorrect} / ${questions.length}`;
}

// Quiz zamanlayıcını başlatan fonksiyon
function startTimer() {
const countdown = setInterval(() => {
// Kalan süreyi dakika ve saniye olarak hesapla ve ekrana yazdır
const minutes = Math.floor(remainingTime / 60);
const seconds = remainingTime % 60;
minutesDisplay.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
secondsDisplay.innerHTML = seconds < 10 ? `0${seconds}` : seconds;

	// Kalan süreyi azalt
	remainingTime--;
	
	// Süre dolduysa quizi tamamla ve sonuçları göster
	if (remainingTime < 0) {
		clearInterval(countdown);
		showResults();
	}
}, 1000);
}


function fetchData() {
	fetch('http://example.com/api/resource')
	  .then(response => response.json())
	  .then(data => console.log(data));
  }
  

  