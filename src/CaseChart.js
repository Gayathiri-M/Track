import numeral from "numeral";
import React from "react";
import './Case.css';

function CaseChart({chart}) {
   
    return (
        <div className="case">
            {chart.map(({country, cases}) => (
                <table className="table table-striped">
                    <tr>
                        {/**Emmet tr>td*2 */}
                        <td className="col-3">{country}</td>
                        <td className="col-1 justify-content-left">{numeral(cases).format("0,0")}</td>
                    </tr>
                </table>
            ))}
        </div>
        );
}
 
export default CaseChart;