"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import { API_ENDPOINTS } from '@/app/config/api';
import { useEffect, useState } from 'react';
import { LeaderboardEntry } from '@/db/schema';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function LeaderboardChart({leaderboardId, userId}: {leaderboardId: string, userId: string | undefined}) {
    const [labels, setLabels] = useState<string[]>([]);
    const [winrates, setWinrates] = useState<number[]>([]);
    
    useEffect(() => {
    async function fetchUserEntries() {
        const response = await fetch(`${API_ENDPOINTS.LEADERBOARDS}/${leaderboardId}/entries/${userId}`);
        const data: { data: LeaderboardEntry[] } = await response.json();
    

        const monthly: Record<string, { wins: number; losses: number }> = {};

        data.data.forEach((entry) => {
        if (!entry.entry_date) return;
          const d = new Date(entry.entry_date);
          if (isNaN(d.getTime())) return; 

          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          if (!monthly[key]) monthly[key] = { wins: 0, losses: 0 };

          
          if (entry.winner_id === userId) monthly[key].wins++;
          else if (entry.loser_id === userId) monthly[key].losses++;
        });

        const keys = Object.keys(monthly).sort();
        const newLabels = keys;
        const newWinrates = keys.map((k) => {
          const { wins, losses } = monthly[k];
          const total = wins + losses;
          return total === 0 ? 0 : Math.round((wins / total) * 100);
        });
        
        setLabels(newLabels);
        setWinrates(newWinrates);
    }

    fetchUserEntries();
    }, [leaderboardId, userId]);

    

    const options = {
        responsive: true,
        scales: {
        y: {
            min: 0,
            max: 100,
            ticks: {
            callback: (value: number | string) => value + "%",
            },
        },
        },
    };

      const data = {
        labels: labels,
        datasets: [
        {
            label: "Winrate (%)",
            data: winrates,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderWidth: 3,
            tension: 0.3,
            pointRadius: 5,
            clip: false,
        },
        ],
    };
    

    return (
        <div className='mb-16'>
            {/* Kommenterer bort TS error. Grunnen til det er at typescript ønsker at boolean skal være 0/1, men chart.js tar bare imot true/false */}
            {/*@ts-ignore*/}
            <Line options={options} data={data}/>
        </div>
)

}