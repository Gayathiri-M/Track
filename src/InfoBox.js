import './InfoBox.css';

const InfoBox = ({title, cases, total, isCases, isRecovered, isDeaths, active, ...props}) => {
    return ( 
            <div className="stats card py-0 ">
                <div onClick={props.onClick}>   
                    <div className={`infoBox ${active && 'infoBox-selected'} ${isCases && 'infoBox-tange'} ${isRecovered && 'infoBox-green'} ${isDeaths && 'infoBox-red'} card-body`}>
                        <h4 className="infoBox-title text text-dark small onClick={props.onClick}">{title}</h4>
                        <h6
                        className={`infoBox-cases 
                            ${active && 'infoBox-selected' && isCases && 'infoBox-tange-count'} 
                            ${active && 'infoBox-selected' && isRecovered && 'infoBox-green-count'} 
                            ${active && 'infoBox-selected' && isDeaths && 'infoBox-red-count'}
                            text-grey`}>
                                <strong>{cases}</strong>
                            </h6>
                        <h4 className="infoBox-total text text-dark small">{total} total</h4>
                    </div>
                </div>
            </div>
     );
}
 
export default InfoBox;