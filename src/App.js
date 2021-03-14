import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect, useReducer} from 'react';

const App = () => {


  const [responseIRIS, setResponseIRIS] = useState("") //iris
  const [response, setResponse] = useState("") //ville
  const [post,setPost] = useState("") //insee code



  const handleSubmit = async e => {
    e.preventDefault();
    const callApi = async () => {
      const response = await fetch(`https://ws.poligma.com/no-php-api/entretien/communes/${post}/variables/poplegale/annee/2017`);
      const body = await response.json();
      console.log(body)
      if (body.status === 500){
        if(body.response !== null){
          await setResponse("")
          await setResponse(<InfoVille data={{"libelle":"Erreur interne","value":"Erreur interne"}}/>)
        }
        else{
          await setResponse("")
          await setResponse(<InfoVille data={{"libelle":"Code invalide","value":"Code invalide"}}/>)
        }
      }
      else {

        await setResponse("")
        await setResponse(body.map(u => <InfoVille data={u}/>))
      }
    };

    const callApi2 = async () => {
      const response = await fetch(`https://ws.poligma.com/no-php-api/entretien/communes/${post}/iris_disponibles/annee/2017`);
      const body = await response.json();
      console.log(body)
      if (body.status === 500){
        if(body.response !== null){
          await setResponseIRIS("")
          await setResponseIRIS(<IRIS iris={{"libelle":"Erreur interne","numero":"Erreur interne"}}/>)
        }
        else{
          await setResponseIRIS("")
          await setResponseIRIS( <IRIS iris={{"libelle":"Code invalide","numero":"Code invalide"}}/>)
        }
      }
      else {
        await setResponseIRIS("")
        await setResponseIRIS(body.map(u => <IRIS iris={u}/>));
      }
    }
    const test = async () => {
      try {
        await callApi()
        await callApi2()
      }
      catch (e) {
        console.log(e)
      }
    }

    await test()



  };


  return (
      <div>
        <form onSubmit={handleSubmit}>
          <p>
            <strong>Code insee:</strong>
          </p>
          <input
              type="text"
              value={post}
              onChange={e => setPost(e.target.value )}
          />
          <button type="submit">Submit</button>
        </form>
        <div>{response}</div>
        <div>
        {responseIRIS}
        </div>
      </div>
  )
}


const IRIS = (props) => {
  const [iris,setIris] = useState(props.iris)

  // useEffect(() => {
  //   setIris(props.iris)
  // },[setIris]);

  return (
      <div>
        <p>{iris.libelle} {iris.numero}</p>
      </div>
  )
}

const InfoVille = (props) => {
  const [data,setData] =useState(props.data)
  //const [data,setData] = useReducer()

  // useEffect(() => {
  //   setData(props.data)
  // },[setData]);

  return(
      <div>
        <p>Nom de la ville : {data.libelle}</p>
        <p>Nombre d'habitants: {data.value}</p>
      </div>
  )

}
export default App;
