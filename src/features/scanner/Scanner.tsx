import React, { useEffect, useMemo, useState } from 'react';
import { AvatarProfile } from '@/avatar/avatarTypes';
import { useGuidedResponse } from '@/hooks/useGuidedResponse';
import { BodyData, BodyLog, ContextTag, ScanInput } from '@/types';
import ContextTagModal from './components/ContextTagModal';
import ScannerInfoRail from './components/ScannerInfoRail';
import ScannerInspector from './components/ScannerInspector';
import ScannerStage from './components/ScannerStage';
import ScannerTopBar from './components/ScannerTopBar';
import { useBodySelection } from './hooks/useBodySelection';

interface ScannerProps {
  initialInput: ScanInput;
  onComplete: (data: ScanInput) => void;
  profile: AvatarProfile;
  onBack: () => void;
}

const Scanner: React.FC<ScannerProps> = ({ initialInput, onComplete, profile, onBack }) => {
  const [data, setData] = useState<BodyData>(initialInput.bodyData || {});
  const [contextTags, setContextTags] = useState<ContextTag[]>(initialInput.contextTags || []);
  const [side, setSide] = useState<'front' | 'back'>('front');
  const [showContextSelector, setShowContextSelector] = useState(false);

  useEffect(() => {
    setData(initialInput.bodyData || {});
    setContextTags(initialInput.contextTags || []);
  }, [initialInput]);

  const { activeResponse, triggerResponse, clearResponse } = useGuidedResponse();
  const {
    selectedPart,
    setSelectedPart,
    tempSensation,
    setTempSensation,
    tempIntensity,
    setTempIntensity,
    saveSelection,
    clearSelection,
  } = useBodySelection(data, setData);

  const bodyLogs = useMemo(() => Object.values(data).filter(Boolean) as BodyLog[], [data]);
  const hasData = bodyLogs.length > 0;

  const handleSavePart = () => {
    if (selectedPart) {
      triggerResponse(selectedPart, tempIntensity, contextTags);
    }
    saveSelection();
  };

  const handleFinalize = () => {
    onComplete({
      ...initialInput,
      bodyData: data,
      contextTags,
      sexProfile: profile.sexProfile,
      avatarVariant: profile.avatarVariant,
    });
  };

  const toggleContextTag = (tag: ContextTag) => {
    setContextTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-paper text-graphite-dark">
      <ScannerTopBar
        completedCount={bodyLogs.length}
        canContinue={hasData}
        onBack={onBack}
        onContinue={handleFinalize}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-6 xl:flex-row">
        <ScannerInfoRail
          data={bodyLogs}
          contextTags={contextTags}
          onOpenContext={() => setShowContextSelector(true)}
        />

        <ScannerStage
          data={data}
          selectedPart={selectedPart}
          side={side}
          onSelectPart={(part) => {
            clearResponse();
            setSelectedPart(part);
          }}
          onSideChange={setSide}
        />

        <ScannerInspector
          selectedPart={selectedPart}
          tempSensation={tempSensation}
          tempIntensity={tempIntensity}
          activeResponse={activeResponse}
          onClose={() => setSelectedPart(null)}
          onSelectSensation={setTempSensation}
          onChangeIntensity={setTempIntensity}
          onClear={clearSelection}
          onSave={handleSavePart}
          onCloseResponse={clearResponse}
        />
      </main>

      {showContextSelector ? (
        <ContextTagModal
          contextTags={contextTags}
          onToggle={toggleContextTag}
          onClose={() => setShowContextSelector(false)}
        />
      ) : null}
    </div>
  );
};

export default Scanner;
