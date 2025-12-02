import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export default function LeaderboardChart() {
    const labels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const winrates = [40, 55, 75, 55, 80, 90, 70, 85, 95, 100, 90, 95];
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