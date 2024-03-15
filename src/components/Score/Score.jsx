import "./Score.css"
export const Score = ({ score }) => {
    return (
        <>
            <div className="score-board">
                <div className="score-name">現在のスコア</div>
                    <div className="score">{score}
                    <span>p</span>
                    </div>
                    
            </div>
        </>
    )
}