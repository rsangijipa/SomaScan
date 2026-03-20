import { useState, useCallback } from 'react';
import { BodyPartId, Severity, GuidedResponse } from '../types';
import { getGuidedResponse } from '../engine/bodyResponseEngine';

export function useGuidedResponse() {
  const [activeResponse, setActiveResponse] = useState<GuidedResponse | null>(null);

  const triggerResponse = useCallback((part: BodyPartId, intensity: Severity) => {
    const response = getGuidedResponse(part, intensity);
    setActiveResponse(response);
  }, []);

  const clearResponse = useCallback(() => {
    setActiveResponse(null);
  }, []);

  return {
    activeResponse,
    triggerResponse,
    clearResponse
  };
}
