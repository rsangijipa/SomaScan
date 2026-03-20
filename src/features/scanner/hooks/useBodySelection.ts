import { useEffect, useState } from 'react';
import { BodyData, BodyPartId, BodyLog, Severity, SensationType } from '@/types';
import { bodyPartLabels } from '../config';

export function useBodySelection(data: BodyData, onSave: (nextData: BodyData) => void) {
  const [selectedPart, setSelectedPart] = useState<BodyPartId | null>(null);
  const [tempSensation, setTempSensation] = useState<SensationType | null>(null);
  const [tempIntensity, setTempIntensity] = useState<Severity>(3);

  useEffect(() => {
    if (!selectedPart) {
      setTempSensation(null);
      setTempIntensity(3);
      return;
    }

    const existing = data[selectedPart];
    if (existing) {
      setTempSensation(existing.sensation);
      setTempIntensity(existing.intensity);
      return;
    }

    setTempSensation(null);
    setTempIntensity(3);
  }, [selectedPart, data]);

  const saveSelection = () => {
    if (!selectedPart || !tempSensation) {
      return;
    }

    const nextData: BodyData = {
      ...data,
      [selectedPart]: {
        id: selectedPart,
        label: bodyPartLabels[selectedPart] || selectedPart,
        sensation: tempSensation,
        intensity: tempIntensity,
      } as BodyLog,
    };

    onSave(nextData);
    setSelectedPart(null);
  };

  const clearSelection = () => {
    if (!selectedPart) {
      return;
    }

    const nextData = { ...data };
    delete nextData[selectedPart];
    onSave(nextData);
    setSelectedPart(null);
  };

  return {
    selectedPart,
    setSelectedPart,
    tempSensation,
    setTempSensation,
    tempIntensity,
    setTempIntensity,
    saveSelection,
    clearSelection,
  };
}
