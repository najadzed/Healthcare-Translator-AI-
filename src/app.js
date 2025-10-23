import { languages } from './languages.js';

const inputLangEl = document.getElementById('inputLang');
const outputLangEl = document.getElementById('outputLang');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const speakBtn = document.getElementById('speakBtn');
const sttStatusEl = document.getElementById('sttStatus');
const refineToggle = document.getElementById('refineToggle');
const originalTextEl = document.getElementById('originalText');
const translatedTextEl = document.getElementById('translatedText');
const envWarningEl = document.getElementById('envWarning');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const synth = window.speechSynthesis;

let recognition;
let isRecognizing = false;
let capturedText = '';
let lastTranslatedText = '';
let ttsVoices = [];

function populateLanguages() {
	for (const { label, code } of languages) {
		const opt1 = document.createElement('option');
		opt1.value = code;
		opt1.textContent = label;
		inputLangEl.appendChild(opt1);

		const opt2 = document.createElement('option');
		opt2.value = code;
		opt2.textContent = label;
		outputLangEl.appendChild(opt2);
	}
	inputLangEl.value = 'en-US';
	outputLangEl.value = 'es-ES';
}

function setSttStatus(status) {
	sttStatusEl.textContent = status;
	sttStatusEl.className = `status ${status.toLowerCase()}`;
}

function ensureEnv() {
	fetch('/api/health').then(async (r) => {
		const ok = r.ok;
		envWarningEl.hidden = ok;
	}).catch(() => {
		envWarningEl.hidden = false;
	});
}

function startRecognition() {
	if (!SpeechRecognition) {
		alert('Speech recognition not supported in this browser. Try Chrome.');
		return;
	}
	if (isRecognizing) return;
	recognition = new SpeechRecognition();
	recognition.lang = inputLangEl.value;
	recognition.continuous = true;
	recognition.interimResults = true;
	recognition.maxAlternatives = 1;

	capturedText = '';
	originalTextEl.textContent = '';
	translatedTextEl.textContent = '';
	setSttStatus('Listening');
	startBtn.disabled = true;
	stopBtn.disabled = false;

	recognition.onresult = async (event) => {
		let interim = '';
		for (let i = event.resultIndex; i < event.results.length; i++) {
			const res = event.results[i];
			if (res.isFinal) {
				capturedText += res[0].transcript + ' ';
			} else {
				interim += res[0].transcript;
			}
		}
		originalTextEl.textContent = capturedText + (interim ? `(${interim})` : '');
		const sourceText = capturedText.trim();
		if (sourceText) {
			translateText(sourceText, inputLangEl.value, outputLangEl.value, refineToggle.checked)
				.then((translated) => {
					lastTranslatedText = translated;
					translatedTextEl.textContent = translated;
					speakBtn.disabled = translated.length === 0;
				})
				.catch(() => {});
		}
	};

	recognition.onerror = (e) => {
		setSttStatus('Error');
		console.error('STT error', e);
	};

	recognition.onend = () => {
		isRecognizing = false;
		setSttStatus('Idle');
		startBtn.disabled = false;
		stopBtn.disabled = true;
	};

	recognition.start();
	isRecognizing = true;
}

function stopRecognition() {
	if (recognition && isRecognizing) {
		recognition.stop();
	}
}

async function translateText(text, sourceLang, targetLang, refine) {
	const res = await fetch('/api/translate', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text, sourceLang, targetLang, refine })
	});
	if (!res.ok) throw new Error('Translation failed');
	const data = await res.json();
	return data.translated || '';
}

function loadVoices() {
	ttsVoices = synth.getVoices();
}

function speak(text, langCode) {
	if (!text) return;
	if (synth.speaking) synth.cancel();
	const utter = new SpeechSynthesisUtterance(text);
	utter.lang = langCode;
	const match = ttsVoices.find(v => v.lang === langCode) || ttsVoices.find(v => v.lang.startsWith(langCode.split('-')[0]));
	if (match) utter.voice = match;
	synth.speak(utter);
}

startBtn.addEventListener('click', startRecognition);
stopBtn.addEventListener('click', stopRecognition);
speakBtn.addEventListener('click', () => speak(lastTranslatedText, outputLangEl.value));

window.addEventListener('load', () => {
	populateLanguages();
	ensureEnv();
	loadVoices();
});
if (typeof speechSynthesis !== 'undefined') {
	speechSynthesis.onvoiceschanged = loadVoices;
}


