import React, { useState, useEffect, useRef } from 'react';
import styles from './ChatInterface.module.css';
const API_URL = "https://back-fa7w.onrender.com";

const ChatInterface = ({ initialOutput, estudoData, onMessagesChange, onCronogramaUpdate }) => {
  const [currentCronograma, setCurrentCronograma] = useState(initialOutput);
  const messageAreaRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setCurrentCronograma(initialOutput);
  }, [initialOutput]);

  const getInitialMessages = () => {
    // ... (sua lógica de mensagens iniciais, pode ser ajustada)
    const messages = [];
    // ... (restante do código)
    if (initialOutput) {
       messages.push({
         role: 'assistant',
         content: initialOutput, // Adiciona o cronograma inicial como uma mensagem
         timestamp: new Date(),
       });
    }
    return messages;
  };

  const [messages, setMessages] = useState(getInitialMessages);

  // ... (outros useEffects)

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // ... (criação da mensagem do usuário)
    
    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mensagem: userMessage.content,
          // O problema está aqui. Use o estado 'currentCronograma'
          // que sempre terá o valor mais recente.
          cronograma_inicial: currentCronograma || '',
        }),
      });


      const data = await response.json();
      const assistantMessage = {
        role: 'assistant',
        content: data.resposta,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentCronograma(data.resposta); // Atualiza o estado com o novo cronograma
      
      // Se houver uma função para passar o cronograma para o pai, chame-a
      if (onCronogramaUpdate) {
        onCronogramaUpdate(data.resposta);
      }

    } catch (error) {
      // ... (lógica de erro)
    }
  };

  return (
    <div className={styles.chatInterface}>
      <div className={styles.messageArea} ref={messageAreaRef}>
        {messages.map((msg, index) => {
          const showDateSeparator =
            index === 0 ||
            new Date(messages[index - 1].timestamp).toDateString() !==
              new Date(msg.timestamp).toDateString();

          return (
            <React.Fragment key={index}>
              {showDateSeparator && (
                <div className={styles.dateSeparator}>
                  <span>
                    {new Date(msg.timestamp).toLocaleDateString('pt-BR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
              <div className={`${styles.message} ${styles[msg.role]}`}>
                <p>{msg.content}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <form onSubmit={handleSendMessage} className={styles.inputArea}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={styles.messageInput}
        />
        <button type="submit" className={styles.sendButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
              fill="white"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
