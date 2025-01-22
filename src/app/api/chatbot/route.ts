import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// University context from README
const universityContext = `
Orange Field University Information:
- We are a modern university offering various academic programs
- Key Features:
  * Course Management: View and enroll in available courses
  * Academic Progress Tracking: Monitor GPA and completed credits
  * Student Portal Features: Course enrollment, academic progress tracking, GPA updates
- Available Services:
  * Course enrollment system
  * Academic progress tracking
  * GPA and credits monitoring
  * Student portal access
- Programs and Departments:
  * Computer Science
  * Business Administration
  * Engineering
- Student Services:
  * Course registration
  * Academic advising
  * Progress tracking
  * Profile management
- Enrollment Process:
  1. Create an account
  2. Login with email and password
  3. View available courses
  4. Enroll in desired courses
  5. Track progress through profile page
`;

// Dev mode context
const devModePrompt = `You are now a general AI assistant, similar to ChatGPT. You will:
1. Respond to any topic or question without being restricted to university matters
2. Be helpful, informative, and engaging
3. Use plain text responses (no markdown or formatting)
4. Draw from your broad knowledge base to provide accurate information
5. Start your responses with "[DEV]" to indicate you're in unrestricted mode
6. Be conversational and natural in your responses
7. Maintain appropriate boundaries while being more flexible in topics

Current request: `;

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Missing GOOGLE_GEMINI_API_KEY in environment variables');
    return NextResponse.json(
      { error: 'Chatbot service is not properly configured' },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const isDevMode = message.toLowerCase().includes('devmodearcher');
    const cleanedMessage = isDevMode ? message.replace(/devmodearcher/gi, '').trim() : message;
    
    const systemPrompt = isDevMode 
      ? `${devModePrompt}${cleanedMessage}`
      : `You are a helpful university assistant for Orange Field University. 
        Respond in plain text only, no formatting or special characters.
        Keep responses focused on university-related topics.
        Be concise and direct.
        Use this university context for accurate responses: ${universityContext}
        
        If asked about topics unrelated to university matters, politely redirect the conversation to university-related topics.
        
        User question: ${message}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: systemPrompt }]
            }],
            safetySettings: isDevMode ? [] : [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ],
            generationConfig: {
              temperature: isDevMode ? 0.9 : 0.7,
              topK: isDevMode ? 50 : 40,
              topP: isDevMode ? 0.97 : 0.95,
              maxOutputTokens: isDevMode ? 2048 : 1024,
              stopSequences: ["Markdown", "```", "#", "==", "--"]
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "I apologize, but I couldn't generate a response.";

      return NextResponse.json({ reply });
    } catch (error) {
      console.error('Gemini API error:', error);
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(req: Request) {
  const origin = headers().get('origin') || '';
  
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 