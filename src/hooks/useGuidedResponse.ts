import { useState, useCallback } from 'react';
import { BodyPartId, ContextTag, Severity, GuidedResponse } from '@/types';
import { getGuidedResponse } from '@/engine/bodyResponseEngine';

export function useGuidedResponse() {
  const [activeResponse, setActiveResponse] = useState<GuidedResponse | null>(null);

  const triggerResponse = useCallback((part: BodyPartId, intensity: Severity, contextTags: ContextTag[] = []) => {
    const response = getGuidedResponse(part, intensity, contextTags);
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
