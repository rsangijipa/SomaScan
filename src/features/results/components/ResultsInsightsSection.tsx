import React from 'react';
import InsightCard from '@/components/InsightCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { BodyInsight } from '@/types';

interface ResultsInsightsSectionProps {
  insights: BodyInsight[];
}

const ResultsInsightsSection: React.FC<ResultsInsightsSectionProps> = ({ insights }) => {
  if (insights.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <SectionHeader overline="Historico local" title="Tendencias observadas nas ultimas sessoes" />

      <div className="grid gap-4 md:grid-cols-2">
        {insights.map((insight, index) => (
          <InsightCard key={`${insight.type}-${index}`} insight={insight} />
        ))}
      </div>
    </section>
  );
};

export default ResultsInsightsSection;
