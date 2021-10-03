import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { useState , useEffect} from 'react';
import numeral from 'numeral';

import InfoBox from './InfoBox';
import MapData from './MapData';
import CaseChart from './CaseChart';
import { prettyPrint, sortData } from './util';
import LineGraph from './LineGraph';




function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo]= useState({});
  const [chartData, setChartData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState("cases");


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then((data => {
      setCountryInfo(data);
    }));
  },[]);

  useEffect(() => {
    //This will run once
    const getData = async() => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value:country.countryInfo.iso3
          }
        
        ));

        const sortedData = sortData(data);
        
        setChartData(sortedData);

        setMapCountries(data);

        setCountries(countries); 
      });
    };

    getData();
  
  },[]);

  const onCountryChange = async(event) => {
    const countryCode = event.target.value;

    //if country code is worldwide
    //if country code is any other country

    const query = countryCode === 'worldwide' 
      ? 'https://disease.sh/v3/covid-19/all' 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    //fetch exact url
    await fetch(query)
    .then((response) => response.json())
    .then(data => {
      //set exact coutrycode & all data of the coutry as country info
      console.log(data);
      
      setCountry(countryCode);
      setCountryInfo(data);

      const {
        countryInfo: { lat, long },
      } = data;
      setMapCenter({ lat, lng: long });
      setMapZoom(4);
    });
  };

  return (
    <div className="app">

      <div className="app-up">
    
        <div className="app-left">
          {/**header*/}
          <div className="header">
            <h1>
              Track Covid
            </h1>
            <div className="dropdown">
              <select type="button" className="drop dropdown-toggle \" data-toggle="dropdown" value={country} onChange={onCountryChange}>

                <option className="dropdown-item" value="Worldwide">Worldwide</option>
          
                {
                  countries.map(country =>(
                    <option className="dropdown-item" value={country.value}>{country.name}</option>
                  ))
                }
              </select>
            </div>
          
            {/**Nav bar*/}
          </div>
                
          <div className="info">

            {/**cases */}
            <InfoBox 
              isCases
              active={caseType==="cases"}
              onClick = {(e)=> setCaseType('cases')}
              title={"Confirmed"} 
              cases={prettyPrint(countryInfo.todayCases)} 
              total={numeral(countryInfo.cases).format("0,0")}
              />
            {/**Recovered */}
            <InfoBox 
              isRecovered
              active={caseType==="recovered"}
              onClick = {(e) => setCaseType('recovered')}
              title={"Recovered"} 
              cases={prettyPrint(countryInfo.todayRecovered)} 
              total={numeral(countryInfo.recovered).format("0,0")}/>
            {/**Deaths */}
            <InfoBox 
              isDeaths
              active={caseType==="deaths"}
              onClick = {(e) => setCaseType('deaths')}
              title={"Deaths"} 
              cases={prettyPrint(countryInfo.todayDeaths)} 
              total={numeral(countryInfo.deaths).format("0,0")}/>

          </div>
      
          {/**Map */}
          <MapData
            caseType={caseType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        
        </div>
        
        <div className="gt-container card chart app-right">
          <div className="table-container card-body">
            {/**Rank table*/}
            <h3>Live Cases By Country</h3>
            <CaseChart chart={chartData}/>
          </div>
          <div className="graph-container">
            
            <LineGraph caseType={caseType}/>
          </div>
        </div>

      </div>
      <br />
      <br />
      <br />
      <div className="footer">
          <p>&copy; - <i>SUDO Creations</i>  2021</p>
      </div>
    
    </div>
  );
}

export default App;
