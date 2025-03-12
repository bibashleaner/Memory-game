import '../Styles/ScoreBoard.css'

export const ScoreBoard = ({score, bestScore}) => {
    return (
        <div className="scoreboard">
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
        </div>
    );
}