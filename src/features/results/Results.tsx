import React, { useEffect, useState } from 'react';
import { inferScan } from '../../../engine';
import { analyzePatterns } from '@/engine/patternEngine';
import { BodyInsight, BodyLog, BodySession, InferenceOutput, ScanInput } from '@/types';
import ResultsCareCard from './components/ResultsCareCard';
import ResultsDisclaimer from './components/ResultsDisclaimer';
import ResultsInsightsSection from './components/ResultsInsightsSection';
import ResultsLoading from './components/ResultsLoading';
import ResultsMapCard from './components/ResultsMapCard';
import ResultsSummaryCard from './components/ResultsSummaryCard';
import ResultsTopBar from './components/ResultsTopBar';

interface ResultsProps {
  data: ScanInput;
  onRestart: () => void;
  onEditScan: () => void;
  onBackToProfile: () => void;
}

const Results: React.FC<ResultsProps> = ({ data, onRestart, onEditScan, onBackToProfile }) => {
  const [result, setResult] = useState<InferenceOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<BodyInsight[]>([]);

  useEffect(() => {
    const processInference = async () => {
      setLoading(true);

      const historyStr = localStorage.getItem('somascan_history') || '[]';
      const history: BodySession[] = JSON.parse(historyStr);

      const currentSession: BodySession = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        parts: Object.keys(data.bodyData) as BodySession['parts'],
        intensity:
          (Object.values(data.bodyData) as (BodyLog | undefined)[]).reduce(
            (acc, curr) => acc + (curr?.intensity || 0),
            0
          ) / (Object.keys(data.bodyData).length || 1),
        context: {
          sleep: data.contextTags.includes('poor_sleep') ? 'poor' : 'good',
          stress: data.contextTags.includes('stress') ? 'high' : 'low',
        },
      };

      const updatedHistory = [...history, currentSession].slice(-10);
      localStorage.setItem('somascan_history', JSON.stringify(updatedHistory));

      const output = await inferScan(data);
      const patternInsights = analyzePatterns(updatedHistory);

      setResult(output);
      setInsights(patternInsights);
      setLoading(false);
    };

    processInference();
  }, [data]);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-graphite-dark">
      <ResultsTopBar onEditScan={onEditScan} onRestart={onRestart} onBackToProfile={onBackToProfile} />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        {loading || !result ? (
          <ResultsLoading />
        ) : (
          <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
            <div className="space-y-5">
              <ResultsMapCard data={data.bodyData} />
              <ResultsDisclaimer shouldSeekCare={result.shouldSeekCare} />
            </div>

            <div className="space-y-5">
              <ResultsSummaryCard result={result} />
              <ResultsCareCard result={result} />
              <ResultsInsightsSection insights={insights} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Results;
