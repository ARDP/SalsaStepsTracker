'use client';
import { useEffect, useState } from 'react';

type Step = {
  id: string;
  title: string;
  description?: string;
  difficulty: string;
  videoUrl?: string;
};

export default function StepsPage() {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/steps')
      .then(res => res.json())
      .then(data => {
        setSteps(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading steps...</p>;

  return (
    <div>
      <h2>Salsa Steps (REST)</h2>
      {steps.map(step => (
        <div key={step.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
          <h3>{step.title} - <small>{step.difficulty}</small></h3>
          {step.description && <p>{step.description}</p>}
          {step.videoUrl && <a href={step.videoUrl} target="_blank">Watch Video</a>}
        </div>
      ))}
    </div>
  );
}