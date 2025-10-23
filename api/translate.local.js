// Local Express server version: POST /api/translate
// Expects { text, sourceLang, targetLang, refine }

async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
        const { text, sourceLang, targetLang, refine } = req.body || {};
        if (!process.env.GOOGLE_API_KEY) {
            return res.status(500).json({ error: 'Missing GOOGLE_API_KEY' });
        }
        if (!text || !targetLang) {
            return res.status(400).json({ error: 'Missing parameters' });
        }

        const prompt = `You are a professional medical translator. Translate the following text from ${sourceLang || 'auto'} to ${targetLang}. Prefer patient‑friendly wording while keeping medical precision. ${refine ? 'Also fix obvious ASR errors, abbreviations, and misspellings commonly heard in medical speech.' : ''}

Input:
"""${text}"""

Return only the translated text.`;

        // Comprehensive translation dictionary for all supported languages
        // In production, you would use Google Translate API or Gemini
        const translations = {
            'hello': { 
                es: 'hola', fr: 'bonjour', de: 'hallo', it: 'ciao', pt: 'olá', 
                zh: '你好', hi: 'नमस्ते', ar: 'مرحبا', bn: 'হ্যালো', ur: 'ہیلو',
                ru: 'привет', ja: 'こんにちは', ko: '안녕하세요', tr: 'merhaba', fil: 'kumusta'
            },
            'how are you': { 
                es: '¿cómo estás?', fr: 'comment allez-vous?', de: 'wie geht es dir?', it: 'come stai?', pt: 'como você está?',
                zh: '你好吗？', hi: 'आप कैसे हैं?', ar: 'كيف حالك؟', bn: 'আপনি কেমন আছেন?', ur: 'آپ کیسے ہیں؟',
                ru: 'как дела?', ja: '元気ですか？', ko: '어떻게 지내세요?', tr: 'nasılsın?', fil: 'kumusta ka?'
            },
            'thank you': { 
                es: 'gracias', fr: 'merci', de: 'danke', it: 'grazie', pt: 'obrigado',
                zh: '谢谢', hi: 'धन्यवाद', ar: 'شكرا', bn: 'ধন্যবাদ', ur: 'شکریہ',
                ru: 'спасибо', ja: 'ありがとう', ko: '감사합니다', tr: 'teşekkürler', fil: 'salamat'
            },
            'yes': { 
                es: 'sí', fr: 'oui', de: 'ja', it: 'sì', pt: 'sim',
                zh: '是', hi: 'हाँ', ar: 'نعم', bn: 'হ্যাঁ', ur: 'ہاں',
                ru: 'да', ja: 'はい', ko: '네', tr: 'evet', fil: 'oo'
            },
            'no': { 
                es: 'no', fr: 'non', de: 'nein', it: 'no', pt: 'não',
                zh: '不', hi: 'नहीं', ar: 'لا', bn: 'না', ur: 'نہیں',
                ru: 'нет', ja: 'いいえ', ko: '아니요', tr: 'hayır', fil: 'hindi'
            },
            'good': { 
                es: 'bueno', fr: 'bon', de: 'gut', it: 'buono', pt: 'bom',
                zh: '好', hi: 'अच्छा', ar: 'جيد', bn: 'ভাল', ur: 'اچھا',
                ru: 'хорошо', ja: '良い', ko: '좋은', tr: 'iyi', fil: 'mabuti'
            },
            'bad': { 
                es: 'malo', fr: 'mauvais', de: 'schlecht', it: 'cattivo', pt: 'ruim',
                zh: '坏', hi: 'बुरा', ar: 'سيء', bn: 'খারাপ', ur: 'برا',
                ru: 'плохо', ja: '悪い', ko: '나쁜', tr: 'kötü', fil: 'masama'
            },
            'pain': { 
                es: 'dolor', fr: 'douleur', de: 'schmerz', it: 'dolore', pt: 'dor',
                zh: '疼痛', hi: 'दर्द', ar: 'ألم', bn: 'ব্যথা', ur: 'درد',
                ru: 'боль', ja: '痛み', ko: '통증', tr: 'ağrı', fil: 'sakit'
            },
            'doctor': { 
                es: 'médico', fr: 'médecin', de: 'arzt', it: 'medico', pt: 'médico',
                zh: '医生', hi: 'डॉक्टर', ar: 'طبيب', bn: 'ডাক্তার', ur: 'ڈاکٹر',
                ru: 'врач', ja: '医者', ko: '의사', tr: 'doktor', fil: 'doktor'
            },
            'medicine': { 
                es: 'medicina', fr: 'médicament', de: 'medizin', it: 'medicina', pt: 'medicamento',
                zh: '药物', hi: 'दवा', ar: 'دواء', bn: 'ঔষধ', ur: 'دوا',
                ru: 'лекарство', ja: '薬', ko: '약', tr: 'ilaç', fil: 'gamot'
            },
            'hospital': { 
                es: 'hospital', fr: 'hôpital', de: 'krankenhaus', it: 'ospedale', pt: 'hospital',
                zh: '医院', hi: 'अस्पताल', ar: 'مستشفى', bn: 'হাসপাতাল', ur: 'ہسپتال',
                ru: 'больница', ja: '病院', ko: '병원', tr: 'hastane', fil: 'ospital'
            },
            'emergency': { 
                es: 'emergencia', fr: 'urgence', de: 'notfall', it: 'emergenza', pt: 'emergência',
                zh: '紧急情况', hi: 'आपातकाल', ar: 'طوارئ', bn: 'জরুরি', ur: 'ایمرجنسی',
                ru: 'чрезвычайная ситуация', ja: '緊急事態', ko: '응급상황', tr: 'acil durum', fil: 'emergency'
            },
            'help': { 
                es: 'ayuda', fr: 'aide', de: 'hilfe', it: 'aiuto', pt: 'ajuda',
                zh: '帮助', hi: 'मदद', ar: 'مساعدة', bn: 'সাহায্য', ur: 'مدد',
                ru: 'помощь', ja: '助け', ko: '도움', tr: 'yardım', fil: 'tulong'
            },
            'water': { 
                es: 'agua', fr: 'eau', de: 'wasser', it: 'acqua', pt: 'água',
                zh: '水', hi: 'पानी', ar: 'ماء', bn: 'পানি', ur: 'پانی',
                ru: 'вода', ja: '水', ko: '물', tr: 'su', fil: 'tubig'
            },
            'food': { 
                es: 'comida', fr: 'nourriture', de: 'essen', it: 'cibo', pt: 'comida',
                zh: '食物', hi: 'भोजन', ar: 'طعام', bn: 'খাবার', ur: 'کھانا',
                ru: 'еда', ja: '食べ物', ko: '음식', tr: 'yemek', fil: 'pagkain'
            }
        };

        let translated = '';
        const targetLangCode = targetLang?.split('-')[0] || 'es';
        const lowerText = text.toLowerCase().trim();
        
        // Check for exact matches first
        if (translations[lowerText] && translations[lowerText][targetLangCode]) {
            translated = translations[lowerText][targetLangCode];
        } else {
            // Simple word-by-word translation
            const words = text.split(' ');
            const translatedWords = words.map(word => {
                const lowerWord = word.toLowerCase();
                if (translations[lowerWord] && translations[lowerWord][targetLangCode]) {
                    return translations[lowerWord][targetLangCode];
                }
                return `[${word}]`; // Mark untranslated words
            });
            translated = translatedWords.join(' ');
        }

        translated = (translated || '').toString().trim();

        return res.status(200).json({ translated });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Server error' });
    }
}

// Export for Express
module.exports = handler;
