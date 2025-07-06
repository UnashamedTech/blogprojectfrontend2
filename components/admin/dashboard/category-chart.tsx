'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { Dot } from 'lucide-react';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

interface CategoryData {
  name: string;
  count: number;
  color: string;
}

const categories: CategoryData[] = [
  { name: 'Faith', count: 71, color: '#4ade80' },
  { name: 'Onboarding', count: 27, color: '#facc15' },
  { name: 'Offboarding', count: 23, color: '#3b82f6' },
];

export function CategoryChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const totalBlogs = categories.reduce(
    (sum, category) => sum + category.count,
    0
  );

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartInstance = Chart.getChart(chartRef.current);
    if (chartInstance) {
      chartInstance.destroy();
    }

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: categories.map((category) => category.count),
            backgroundColor: categories.map((category) => category.color),
            borderWidth: 0,
            hoverOffset: 5,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: '70%',
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context: TooltipItem<'doughnut'>) => {
                const value = context.raw as number;
                const percentage = Math.round((value / totalBlogs) * 100);
                return `${value} (${percentage}%)`;
              },
            },
          },
        },
      } as ChartOptions<'doughnut'>,
    });
  }, [totalBlogs]);

  return (
    <Card className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative flex justify-center mb-4">
          <canvas ref={chartRef} height={120} width={120} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="text-2xl font-bold">{totalBlogs}</div>
            <div className="text-xs text-gray-500">Total Blog</div>
          </div>
        </div>

        <div className="space-y-2">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <Dot className="h-6 w-6" style={{ color: category.color }} />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {category.name}
                </span>
              </div>
              <span className="font-medium">{category.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
