import React, {useState, useEffect, useReducer} from 'react';

const App = () => {

    const [post,setPost] = useState("") //insee code
    const [response, setResponse] = useState(post) //ville
    const [responseIRIS, setResponseIRIS] = useState(post) //iris

    const handleSubmit = e => {
        e.preventDefault();
        setResponse(post);
        setResponseIRIS(post);
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
            <InfoVille id={response}/>
            <IRIS id={responseIRIS}/>
        </div>
    )
}

const IRIS = ({id}) => {
    const [data,setData] =useState([])

    useEffect(
        async () => {
            // 2. Use a template string to set the URL:
            const response = await fetch(`https://ws.poligma.com/no-php-api/entretien/communes/${id}/iris_disponibles/annee/2017`);
            const body = await response.json();
            console.log(body)
            if (body.status === 500){
                if(body.response !== null){
                    await setData([{"libelle":"Erreur interne","numero":"Erreur interne"}])
                }
                else{
                    await setData([{"libelle":"Code invalide","numero":"Code invalide"}])
                }
            }
            else {
                await setData(body)
            }
        },[id]);


    return (
        <ul>
            {data.map(post => (
                <li key={post.libelle}>{post.libelle} {post.numero}</li>
            ))}
        </ul>
    );
}


const InfoVille = ({id}) => {
    const [data,setData] =useState([])

    useEffect(
        async () => {
            // 2. Use a template string to set the URL:
            const response = await fetch(`https://ws.poligma.com/no-php-api/entretien/communes/${id}/variables/poplegale/annee/2017`);
            const body = await response.json();
            console.log(body)
            if (body.status === 500){
                if(body.response !== null){
                    await setData([{"libelle":"Erreur interne","value":"Erreur interne"}])
                }
                else{
                    await setData([{"libelle":"Code invalide","value":"Code invalide"}])
                }
            }
            else {
                await setData(body)
            }
        },[id]);


    return (
        <ul>
            {data.map(post => (
                <li key={post.libelle}>Nom : {post.libelle}, Nb habitants: {post.value}</li>
            ))}
        </ul>
    );

}
export default App;
