import "./Turn.css"

export const Turn = ({ turn }) => {

    return (
        <>
            <div className="turn-board">段追加まであと
                <div className="turn-number">{turn}
                    <span>ターン</span>
                </div>
            </div>
        </>
    )

}