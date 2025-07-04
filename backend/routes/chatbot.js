const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>]/g, '').trim().slice(0, 500); 
};

const getConversationContext = (chatHistory = []) => {
    if (chatHistory.length === 0) return '';
    
    const recentMessages = chatHistory.slice(-4); 
    return recentMessages.map(msg => 
        `${msg.isBot ? 'Assistant' : 'User'}: ${msg.text}`
    ).join('\n') + '\n\n';
};

router.post('/chat', async (req, res) => {
    try {
        const { message, chatHistory } = req.body;

        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Message is required and must be a non-empty string'
            });
        }

        const sanitizedMessage = sanitizeInput(message);
        
        if (sanitizedMessage.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'Invalid message content'
            });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('Gemini API key not found in environment variables');
            return res.status(500).json({
                success: false,
                error: 'Chatbot service is currently unavailable'
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const conversationContext = getConversationContext(chatHistory);
        const prompt = `You are a specialized AI travel assistant with expert knowledge about Prayagraj (Allahabad) and Kumbh Mela. You provide up-to-date, friendly, and detailed tourist information with special focus on:

**PRAYAGRAJ SPECIALTIES:**
- Triveni Sangam (confluence of Ganga, Yamuna, and mythical Saraswati rivers)
- Kumbh Mela arrangements and spiritual significance
- Historical sites: Allahabad Fort, Anand Bhavan, Khusro Bagh
- Local culture, food, and traditions
- Best times to visit and seasonal considerations
- Transportation and accommodation options
- Religious and cultural etiquette

**KUMBH MELA EXPERTISE:**
- Festival dates, types (Purna Kumbh, Ardh Kumbh, Maha Kumbh)
- Sacred bathing rituals and auspicious dates
- Accommodation during Kumbh (tent cities, dharamshalas)
- Crowd management and safety tips
- Spiritual significance and mythology
- Photography guidelines and cultural sensitivity
- Essential items to carry
- Navigation in the Mela area

Always prioritize Prayagraj and Kumbh Mela information when relevant. For other destinations, provide general travel advice but suggest how Prayagraj compares or connects to the query.

${conversationContext ? 'Previous conversation context:\n' + conversationContext : ''}Current question: ${sanitizedMessage}

Provide a helpful, informative response (under 350 words) with practical tips. If the question is about Prayagraj or Kumbh Mela, be especially detailed and include local insights.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            success: true,
            response: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chatbot error:', error);
        
        if (error.message?.includes('API_KEY') || error.message?.includes('authentication')) {
            return res.status(500).json({
                success: false,
                error: 'Chatbot authentication failed'
            });
        }
        
        if (error.message?.includes('quota') || error.message?.includes('limit') || error.message?.includes('429')) {
            return res.status(429).json({
                success: false,
                error: 'Chatbot service is temporarily unavailable due to high demand'
            });
        }

        if (error.message?.includes('SAFETY')) {
            return res.status(400).json({
                success: false,
                error: 'I can only help with travel-related questions. Please ask about destinations, attractions, or travel tips.'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Sorry, I encountered an error while processing your request. Please try again.'
        });
    }
});

router.post('/suggestions', async (req, res) => {
    try {
        const { location, interests } = req.body;

        if (!location || typeof location !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Location is required'
            });
        }

        const sanitizedLocation = sanitizeInput(location);
        const sanitizedInterests = interests ? sanitizeInput(interests) : '';

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'Service unavailable'
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const isPrayagraj = sanitizedLocation.toLowerCase().includes('prayagraj') || 
                           sanitizedLocation.toLowerCase().includes('allahabad') ||
                           sanitizedLocation.toLowerCase().includes('kumbh');

        let prompt;
        if (isPrayagraj) {
            prompt = `As a Prayagraj tourism expert, provide 5 specific recommendations for ${sanitizedLocation}. ${sanitizedInterests ? 'The traveler is interested in: ' + sanitizedInterests + '.' : ''} 

Focus on Prayagraj's unique attractions:
- Triveni Sangam and sacred bathing ghats
- Historical monuments (Allahabad Fort, Anand Bhavan, Khusro Bagh)
- Kumbh Mela sites and spiritual experiences
- Local markets and cultural sites
- Traditional food and cultural experiences

Format as JSON array with:
- name: attraction/activity name
- description: brief description highlighting Prayagraj's significance (max 60 words)
- tip: practical local tip for visitors

Prioritize spiritually and historically significant sites.`;
        } else {
            prompt = `As a travel expert specializing in Indian destinations (with expertise in Prayagraj), provide 5 specific travel suggestions for ${sanitizedLocation}. ${sanitizedInterests ? 'The traveler is interested in: ' + sanitizedInterests + '.' : ''} 

If relevant, mention connections to Prayagraj or similar spiritual/historical significance.

Format your response as a JSON array with each suggestion having:
- name: attraction/activity name
- description: brief description (max 50 words)
- tip: one practical tip

Keep suggestions diverse and interesting.`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            success: true,
            suggestions: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Suggestions error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to generate suggestions at the moment'
        });
    }
});

router.post('/kumbh-info', async (req, res) => {
    try {
        const { query } = req.body;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({
                success: false,
                error: 'Query is required'
            });
        }

        const sanitizedQuery = sanitizeInput(query);

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'Service unavailable'
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `As a Kumbh Mela expert and Prayagraj tourism specialist, provide detailed information about: ${sanitizedQuery}

Focus on:
- Historical and spiritual significance
- Practical travel information
- Cultural insights and traditions
- Safety and logistical tips
- Dates, schedules, and events
- Accommodation and transportation
- Religious etiquette and customs
- Local food and shopping

Provide comprehensive yet concise information (under 400 words) with actionable advice for visitors.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            success: true,
            information: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Kumbh info error:', error);
        res.status(500).json({
            success: false,
            error: 'Unable to retrieve Kumbh Mela information at the moment'
        });
    }
});

router.get('/status', (req, res) => {
    const isConfigured = !!process.env.GEMINI_API_KEY;
    
    res.json({
        success: true,
        status: isConfigured ? 'ready' : 'not_configured',
        message: isConfigured ? 'Prayagraj Travel Assistant is ready to help!' : 'Chatbot is not configured',
        version: '1.0.0',
        specialization: 'Prayagraj (Allahabad) and Kumbh Mela',
        features: [
            'prayagraj_tourism', 
            'kumbh_mela_expertise', 
            'triveni_sangam_guidance',
            'spiritual_travel_assistance',
            'local_cultural_insights',
            'conversation_context', 
            'travel_suggestions'
        ]
    });
});

module.exports = router;
