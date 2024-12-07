export const shouldForwardProp = <CustomProps extends Record<string, any>>(
  props: Array<keyof CustomProps>,
  prop: PropertyKey
): boolean => !props.includes(prop as string);

export function capitalizeFirstLetter(value:string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

// src/services/api.js
import axios from 'axios';

const API_URL = 'your-api-endpoint';

export const analyzeSkinWithAPI = async (imageData:any) => {
  try {
    const formData = new FormData();
    formData.append('image', imageData);

    const response = await axios.post(`${API_URL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const saveAnalysis = (results:any) => {
  const analyses = JSON.parse(localStorage.getItem('skinAnalyses') || '[]');
  analyses.push({
    date: new Date().toISOString(),
    results,
  });
  localStorage.setItem('skinAnalyses', JSON.stringify(analyses));
};