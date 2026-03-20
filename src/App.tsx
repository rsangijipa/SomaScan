import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Fingerprint, MoveRight } from 'lucide-react';
import AvatarWelcomePicker from '@/avatar/AvatarWelcomePicker';
import { AvatarProfile } from '@/avatar/avatarTypes';
import BackgroundBlobs from '@/components/BackgroundBlobs';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Results from '@/features/results/Results';
import { scannerSteps } from '@/features/scanner/config';
import Scanner from '@/features/scanner/Scanner';
import { AppStep, ScanInput } from '@/types';

const emptyScanInput: ScanInput = { bodyData: {}, contextTags: [] };

const App: React.FC = () => {
  const [appStep, setAppStep] = useState<AppStep>('intro');
  const [avatarProfile, setAvatarProfile] = useState<AvatarProfile | null>(null);
  const [scanInput, setScanInput] = useState<ScanInput>(emptyScanInput);

  const stepIndex = useMemo(
    () => scannerSteps.findIndex((step) => step.id === appStep) + 1,
    [appStep]
  );

  const handleStart = () => setAppStep('picker');

  const handlePickerConfirm = (profile: AvatarProfile) => {
    setAvatarProfile(profile);
    setScanInput((current) => ({
      ...current,
      sexProfile: profile.sexProfile,
      avatarVariant: profile.avatarVariant,
    }));
    setAppStep('scanning');
  };

  const handleScanComplete = (input: ScanInput) => {
    setScanInput(input);
    setAppStep('results');
  };

  const handleBackToIntro = () => setAppStep('intro');
  const handleBackToPicker = () => setAppStep('picker');
  const handleBackToScanner = () => setAppStep('scanning');

  const handleRestart = () => {
    setScanInput(emptyScanInput);
    setAvatarProfile(null);
    setAppStep('intro');
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-paper selection:bg-accent-petrol/20 selection:text-white">
      <BackgroundBlobs />

      {appStep === 'intro' ? (
        <>
          <header className="absolute top-0 z-40 w-full">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/75 shadow-sm backdrop-blur-md">
                  <Fingerprint className="h-6 w-6 text-stone-900" />
                </div>
                <div>
                  <h1 className="font-serif text-3xl italic tracking-tight text-stone-900">SomaScan</h1>
                  <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-stone-400">
                    Deep Somatic Intelligence
                  </p>
                </div>
              </div>

              <div className="hidden rounded-full border border-white/70 bg-white/78 px-4 py-2 text-[11px] font-medium text-text-secondary shadow-sm backdrop-blur-md sm:block">
                Jornada {stepIndex} de {scannerSteps.length}
              </div>
            </div>
          </header>

          <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-24 text-center lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="mx-auto max-w-5xl"
              >
                <Badge className="px-5 py-2 text-[10px]">
                  Reflexos • Versao 3.0
                </Badge>
                <h2 className="type-display mt-8">
                  Pura <br />
                  <span className="font-light italic text-stone-400">Percepcao.</span>
                </h2>
                <p className="type-body mx-auto mt-8 max-w-2xl text-text-secondary sm:text-[1.08rem]">
                  Escute o que o corpo diz sob a superficie do silencio. Um mapeamento privado, visual e orientado por sinais locais.
                </p>
                <Button
                  onClick={handleStart}
                  variant="primary"
                  size="lg"
                  className="mt-10 min-w-[220px]"
                >
                  Comecar jornada
                  <MoveRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      ) : null}

      {appStep === 'picker' ? (
        <AvatarWelcomePicker
          initialProfile={avatarProfile}
          onConfirm={handlePickerConfirm}
          onBack={handleBackToIntro}
        />
      ) : null}

      {appStep === 'scanning' && avatarProfile ? (
        <Scanner
          initialInput={scanInput}
          onComplete={handleScanComplete}
          profile={avatarProfile}
          onBack={handleBackToPicker}
        />
      ) : null}

      {appStep === 'results' ? (
        <Results
          data={scanInput}
          onRestart={handleRestart}
          onEditScan={handleBackToScanner}
          onBackToProfile={handleBackToPicker}
        />
      ) : null}
    </div>
  );
};

export default App;
