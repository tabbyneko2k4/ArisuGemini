// src/utils.js
export function parseGeminiResponse(responseText) {
    // Loại bỏ dấu nháy ngược và tiền tố "```json" (nếu có)
    const cleanedResponseText = responseText.replace(/```json\n/g, '').replace(/```/g, '');
  
    try {
      const jsonObject = JSON.parse(cleanedResponseText);
      if (typeof jsonObject === 'object' && jsonObject !== null && jsonObject.hasOwnProperty('text') && Array.isArray(jsonObject.text)) {
        return jsonObject;
      } else {
        console.error('Invalid JSON format:', jsonObject);
        return null;
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null;
    }
  }