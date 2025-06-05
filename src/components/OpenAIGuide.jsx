import React, { useState, useEffect, useContext } from 'react';
import OpenAI from 'openai';
import styles from '../styles/OpenAIGuide.module.css';
import { GameContext } from '../contexts/GameContext.jsx'; // Path to GameContext

// API Key is now read from environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const OpenAIGuide = () => {
  const [guidance, setGuidance] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { currentStage } = useContext(GameContext); // Consuming GameContext

  const fetchGuidanceForContext = async (gamePrompt) => {
    // Updated API key check
    if (!OPENAI_API_KEY) {
      setError("OpenAI API 키가 .env 파일에 설정되지 않았습니다. VITE_OPENAI_API_KEY를 확인해주세요."); // "OpenAI API Key not set in .env file. Please check VITE_OPENAI_API_KEY."
      setGuidance('');
      return;
    }

    const openai = new OpenAI({ apiKey: OPENAI_API_KEY, dangerouslyAllowBrowser: true });
    setError('');
    setIsLoading(true);
    // Set a more specific loading message if possible, or keep generic
    setGuidance(`스테이지 ${currentStage}에 대한 가이드를 생성 중입니다...`);

    try {
      const prompt = gamePrompt || `현재 게임 스테이지 ${currentStage}에 대한 규칙이나 힌트를 설명해줘.`; // Default prompt using currentStage

      const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });
      setGuidance(completion.choices[0]?.message?.content || 'AI로부터 가이드 내용을 받지 못했습니다.');
    } catch (err) {
      console.error('OpenAI API error:', err);
      setError(err.message || 'OpenAI에서 가이드 내용을 가져오는데 실패했습니다.');
      setGuidance(''); // Clear guidance on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch guidance when currentStage changes and is a valid stage number
    if (currentStage && currentStage > 0) {
      let stageSpecificPrompt = "";
      switch (currentStage) {
        case 1:
          stageSpecificPrompt = "생일 케이크 만들기 게임의 규칙과 첫 번째 힌트를 알려줘."; // "Tell me the rules and a first hint for the Birthday Cake Making game."
          break;
        case 2:
          stageSpecificPrompt = "선물 찾기 게임의 규칙과 첫 번째 힌트를 알려줘."; // "Tell me the rules and a first hint for the Gift Hunt game."
          break;
        default:
          stageSpecificPrompt = `현재 게임 스테이지 ${currentStage}에 대한 일반적인 설명을 해줘.`; // "Provide a general description for the current game stage ${currentStage}."
      }
      fetchGuidanceForContext(stageSpecificPrompt);
    } else {
      // Optionally, clear guidance or set a default message if not in a specific stage
      setGuidance("게임 스테이지가 시작되면 AI 가이드가 여기에 표시됩니다.");
      setError(''); // Clear any previous errors
    }
  }, [currentStage]); // Dependency array includes currentStage

  return (
    <div className={styles.container}>
      <h4>AI 게임 가이드 (스테이지: {currentStage || '없음'})</h4> {/* Display current stage */}
      {error && <p className={styles.error}>{error}</p>}
      {isLoading && <p>{guidance || "로딩 중..."}</p>} {/* Show guidance as loading message if available */}
      {!isLoading && guidance && !error && (
        <div className={styles.responseArea}>
          <strong>AI 가이드:</strong>
          <p>{guidance}</p>
        </div>
      )}
      {/* Message when no specific guidance is loaded (e.g., before game starts) */}
      {!isLoading && !guidance && !error && currentStage === 0 && (
         <p>게임이 시작되면 AI 가이드가 여기에 표시됩니다.</p>
      )}
    </div>
  );
};

export default OpenAIGuide;
