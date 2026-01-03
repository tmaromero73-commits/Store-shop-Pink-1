
import React, { useState, useRef, useEffect } from 'react';
// Fix: Always use import {GoogleGenAI} from "@google/genai"; as per guidelines
import { GoogleGenAI } from "@google/genai";

interface Message {
    role: 'user' | 'model';
    text: string;
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m1-9l2-2 2 2m-2 4v6m2-6l2 2-2 2M15 3l2 2-2 2m-2-4v4m2 4l2 2-2 2m-8 4h12" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const AsistenteIAPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages, isProcessing]);

    const handleSendMessage = async (messageText: string) => {
        if (!messageText.trim() || isProcessing) return;
        
        const userMessage: Message = { role: 'user', text: messageText };
        // Capture current messages to reconstruct history before updating local state
        const previousMessages = [...messages];
        
        // We add the user message and an empty model message to the UI state immediately
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
        setInput('');
        setIsProcessing(true);
        setError(null);

        try {
            // Fix: Initializing GoogleGenAI right before the API call using the required named parameter
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            
            // Reconstructing history from previous messages for context
            const history = previousMessages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            // Fix: Initializing the chat with system instruction in the config
            const chat = ai.chats.create({
                model: 'gemini-3-flash-preview',
                history: history,
                config: {
                    systemInstruction: 'Eres un asistente de belleza personal y experto de la tienda online "Vellaperfumeria". Tu misión es doble: 1) Ayudar a los clientes a encontrar productos perfectos del catálogo de Oriflame. 2) Recibir y agradecer cualquier SUGERENCIA o feedback que tengan para la tienda. Sé amable, servicial y utiliza un tono cercano, "rosa" y positivo. Si preguntan por productos, ofrece recomendaciones personalizadas. Si dan una sugerencia, agradécela efusivamente y diles que se tendrá en cuenta para mejorar. Bajo ninguna circunstancia menciones marcas de la competencia. Céntrate exclusivamente en Vellaperfumeria.',
                },
            });

            // Fix: Initiating streaming message
            const responseStream = await chat.sendMessageStream({ message: messageText });

            for await (const chunk of responseStream) {
                // Fix: Accessing .text as a property directly as per GenerateContentResponse guidelines
                const chunkText = chunk.text;
                if (chunkText) {
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastIndex = newMessages.length - 1;
                        if (lastIndex >= 0) {
                            newMessages[lastIndex] = {
                                ...newMessages[lastIndex],
                                text: newMessages[lastIndex].text + chunkText
                            };
                        }
                        return newMessages;
                    });
                }
            }
        } catch (e) {
            console.error("Error sending message to Gemini:", e);
            const errorMessage = "Lo siento, ha ocurrido un error de conexión. Por favor, inténtalo de nuevo.";
            setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage) lastMessage.text = errorMessage;
                return newMessages;
            });
            setError("Error de comunicación con la IA.");
        } finally {
            setIsProcessing(false);
        }
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(input);
    };

    const examplePrompts = [
        "Quiero hacer una sugerencia para la web",
        "Recomiéndame un perfume dulce",
        "¿Qué tenéis para piel seca?",
        "Busco un regalo de Navidad por menos de 20€",
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-140px)] flex flex-col">
            <div className="text-center mb-6 flex-shrink-0">
                <img src="https://i0.wp.com/vellaperfumeria.com/wp-content/uploads/2025/06/1000003724-removebg-preview.png" alt="Logo de Vellaperfumeria" className="w-auto h-16 mx-auto mb-2" />
                <h1 className="text-2xl md:text-3xl font-extrabold text-brand-primary tracking-tight">Asistente & Buzón de Sugerencias</h1>
                <p className="mt-1 text-sm text-gray-600">Pregúntanos lo que quieras o déjanos tu opinión para mejorar.</p>
            </div>

            <div className="flex-grow bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-pink-100 flex flex-col overflow-hidden w-full max-w-3xl mx-auto relative">
                {/* Messages Area */}
                <div ref={chatContainerRef} className="flex-grow p-4 md:p-6 overflow-y-auto space-y-6 scroll-smooth">
                    {messages.length === 0 && !isProcessing && (
                         <div className="flex items-start gap-4 animate-fade-in-up">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center border border-pink-200">
                                <SparklesIcon />
                            </div>
                            <div className="max-w-[85%] p-5 rounded-2xl bg-white/60 border border-pink-100 text-gray-800 rounded-tl-none shadow-sm">
                                <p className="font-medium text-lg mb-2 text-pink-700">¡Hola! 💖</p>
                                <p>Soy tu asistente virtual de <b>Vellaperfumeria</b>.</p>
                                <p className="mt-2">Estoy aquí para recomendarte los mejores productos de belleza o para <b>escuchar tus sugerencias</b>. ¿En qué puedo ayudarte hoy?</p>
                            </div>
                        </div>
                    )}

                    {messages.map((msg, index) => {
                        const isLastMessage = index === messages.length - 1;
                        return (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                 {msg.role === 'model' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-100 border border-pink-200 flex items-center justify-center mt-1">
                                        <SparklesIcon />
                                    </div>
                                )}
                                <div className={`max-w-[85%] px-5 py-3 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed ${
                                    msg.role === 'user' 
                                    ? 'bg-gradient-to-r from-gray-800 to-black text-white rounded-tr-none' 
                                    : 'bg-white border border-pink-100 text-gray-800 rounded-tl-none'
                                }`}>
                                     {isProcessing && isLastMessage && msg.text === '' ? (
                                         <div className="flex items-center space-x-1.5 py-1">
                                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                            <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                        </div>
                                    ) : (
                                         <p className="whitespace-pre-wrap">{msg.text}</p>
                                    )}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mt-1">
                                        <UserIcon />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                    
                    {error && (
                         <div className="flex justify-center">
                            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-100">
                                {error}
                            </div>
                        </div>
                    )}
                </div>

                {/* Suggestions / Quick Prompts */}
                {messages.length === 0 && !isProcessing && (
                    <div className="p-4 pt-0 text-center">
                        <div className="flex flex-wrap justify-center gap-2">
                            {examplePrompts.map(prompt => (
                                <button
                                    key={prompt}
                                    onClick={() => handleSendMessage(prompt)}
                                    className="bg-white border border-pink-200 text-pink-700 hover:bg-pink-50 text-xs md:text-sm px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Input Area */}
                <div className="p-4 bg-white/90 backdrop-blur-sm border-t border-pink-100">
                    <form onSubmit={handleFormSubmit} className="flex items-center gap-2 relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe tu mensaje o sugerencia..."
                            aria-label="Escribe tu mensaje"
                            className="flex-grow pl-5 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:bg-white transition-all shadow-inner text-gray-800 placeholder-gray-400"
                            disabled={isProcessing}
                        />
                        <button 
                            type="submit" 
                            disabled={isProcessing || !input.trim()}
                            className="absolute right-2 p-2 bg-black text-white rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-md transform active:scale-95"
                            aria-label="Enviar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
            
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default AsistenteIAPage;
