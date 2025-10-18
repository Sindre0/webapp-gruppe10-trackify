  type LeaderboardProps = {
        title: string;       
        csvData: string;     
};

export default function Leaderboard({ title, csvData }: LeaderboardProps) {
    return (
        <div>
            <h1>{title}</h1>
            <p>Replace with graph drawer func.</p>
        </div>
    );
}