// src/hooks/useLimitText.js
import { useState, useEffect } from "react";

const useLimitText = (text, limit) => {
  const [limitedText, setLimitedText] = useState("");

  useEffect(() => {
    if (text.length > limit) {
      setLimitedText(`${text.substring(0, limit)}...`);
    } else {
      setLimitedText(text);
    }
  }, [text, limit]);

  return limitedText;
};

export default useLimitText;
