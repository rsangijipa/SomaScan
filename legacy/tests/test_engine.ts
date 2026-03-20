import { inferScan } from './engine/index';
import { ScanInput } from './types';
import * as fs from 'fs';

async function runTests() {
  const logFile = 'd:/_ARQUIVOS DISCO C/Downloads/somascan/test_results.log';
  const log = (msg: string) => {
    console.log(msg);
    fs.appendFileSync(logFile, msg + '\n');
  };

  if (fs.existsSync(logFile)) fs.unlinkSync(logFile);

  log('--- SomaScan Local Engine Test Suite ---\n');

  // Test Case 1: Muscular Tension (Neck, Shoulder, Intensity 4)
  const case1: ScanInput = {
    bodyData: {
      neck: { id: 'neck', label: 'Pescoço', sensation: 'stiffness', intensity: 4 },
      rightArm: { id: 'rightArm', label: 'Braço Direito', sensation: 'tension', intensity: 3 },
    },
    contextTags: ['poor_posture', 'computer_use'],
    sexProfile: 'male',
  };

  // Test Case 2: Stress/Anxiety (Chest Pressure, Abdomen Heat)
  const case2: ScanInput = {
    bodyData: {
      chest: { id: 'chest', label: 'Peito', sensation: 'pressure', intensity: 3 },
      abdomen: { id: 'abdomen', label: 'Abdômen', sensation: 'heat', intensity: 3 },
    },
    contextTags: ['stress', 'anxiety', 'palpitations'],
    sexProfile: 'female',
  };

  // Test Case 3: Red Flag (Chest Pain + Radiating Pain)
  const case3: ScanInput = {
    bodyData: {
      chest: { id: 'chest', label: 'Peito', sensation: 'pain', intensity: 5 },
    },
    contextTags: ['radiating_pain'], // New check we fixed
    sexProfile: 'male',
  };

  const results = [
    { name: 'Case 1: Muscular Tension', input: case1 },
    { name: 'Case 2: Stress/Anxiety', input: case2 },
    { name: 'Case 3: Red Flag (Cardiac Alert)', input: case3 },
  ];

  for (const test of results) {
    log(`Testing [${test.name}]...`);
    try {
      const output = await inferScan(test.input);
      log(`Top Cause: ${output.topCauses[0]?.title} (${Math.round(output.topCauses[0]?.probability * 100)}%)`);
      log(`Confidence: ${output.topCauses[0]?.confidence}%`);
      log(`Red Flags: ${output.redFlags.length > 0 ? output.redFlags.join(', ') : 'None'}`);
      log(`Summary: ${output.explanationSummary}\n`);
    } catch (e) {
      log(`Error in [${test.name}]: ${e}`);
    }
  }
}

runTests().catch(console.error);
