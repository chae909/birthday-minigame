import React, { useState } from 'react';
import OpenAI from 'openai';
import styles from '../styles/OpenAIChat.module.css'; // Import CSS module

const OpenAIChat = () => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // API call logic will be added in the next step
    if (!apiKey) {
      setError('Please enter your OpenAI API Key.');
      return;
    }
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setError('');
    setIsLoading(true);
    setResponse('AI 응답을 기다리는 중...'); // "Waiting for AI response..."

    const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });
      setResponse(completion.choices[0]?.message?.content || 'No response from AI.');
    } catch (err) {
      console.error('OpenAI API error:', err);
      setError(err.message || 'Failed to fetch response from OpenAI.');
      setResponse(''); // Clear previous response on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>OpenAI Chat</h2>
      <div className={styles.inputGroup}>
        <label htmlFor="apiKey" className={styles.label}>OpenAI API Key:</label>
        <input
          type="password"
          id="apiKey"
          className={styles.input}
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="OpenAI API 키를 입력하세요" // "Enter your OpenAI API Key"
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="prompt" className={styles.label}>Prompt:</label>
        <textarea
          id="prompt"
          className={styles.textarea}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="AI에게 물어볼 내용을 입력하세요" // "Enter what you want to ask the AI"
        />
      </div>
      <button onClick={handleSubmit} disabled={isLoading} className={styles.button}>
        {isLoading ? '전송 중...' : 'AI에게 물어보기'} {/* "Sending..." / "Ask AI" */}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.responseArea}>
        <strong>AI Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default OpenAIChat;
