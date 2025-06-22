'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  LineController,
} from 'chart.js';
import { CalendarIcon } from 'lucide-react';

Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  LineController
);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

const usersData = [40000, 43000, 46000, 48000, 45000, 43000, 51000];
const blogsData = [44000, 40000, 45000, 50000, 41000, 38000, 40000];

export function PerformanceChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartInstance = Chart.getChart(chartRef.current);
    if (chartInstance) {
      chartInstance.destroy();
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [
          {
            label: 'Users',
            data: usersData,
            borderColor: '#4ade80',
            backgroundColor: '#4ade80',
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#4ade80',
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
          {
            label: 'Blogs',
            data: blogsData,
            borderColor: '#facc15',
            backgroundColor: '#facc15',
            tension: 0.4,
            borderWidth: 3,
            pointBackgroundColor: '#fff',
            pointBorderColor: '#facc15',
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
            min: 30000,
            max: 60000,
            ticks: {
              stepSize: 10000,
              callback: (value) =>
                value
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  .replace(',000', 'k'),
              display: true,
            },
            grid: {
              color: '#e5e7eb',
              lineWidth: 1,
            },
            border: {
              display: false,
            },
          },
          x: {
            ticks: {
              display: true,
            },
            grid: {
              color: '#e5e7eb',
              lineWidth: 1,
            },
            border: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US').format(
                    context.parsed.y
                  );
                }
                return label;
              },
            },
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
      },
    });
  }, []);

  return (
    <Card className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm h-full ">
      <CardHeader className="pb-2 pt-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Performance</CardTitle>
        <div className="flex items-center text-sm text-gray-500">
          <span>Last 7 month</span>
          <CalendarIcon className="ml-2 h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-30%)]">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
            <span className="text-sm">Users</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
            <span className="text-sm">Blogs</span>
          </div>
        </div>
        <div className="h-[calc(100%-30%)] w-[100%]">
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
}
