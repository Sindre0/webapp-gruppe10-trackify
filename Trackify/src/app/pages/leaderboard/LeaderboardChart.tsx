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

    // Use the API to fetch the users entries and calculate winrates
    useEffect(() => {
    async function fetchUserEntries() {
        const response = await fetch(`${API_ENDPOINTS.LEADERBOARDS}/${leaderboardId}/entries/${userId}`);
        const data: { data: LeaderboardEntry[] } = await response.json();
        console.log(data.data);
        
         

        

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
        },
        ],
    };
    

    return (
        <div className='mb-16'>
            <Line options={options} data={data}/>
        </div>
)

}