import { useEffect, useState } from "react"

export const Pokemon = () => {

    const [pokemonData, setpokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");



    const Api = "https://pokeapi.co/api/v2/pokemon/?limit=151";

    const fetchPokemonData = async () => {

        try {

            const ApiResponse = await fetch(Api);
            const responseData = await ApiResponse.json();

            const resultsDetails = responseData.results.map(async (element) => {

                const fetchApi = await fetch(element.url);
                const data = await fetchApi.json();

                return data;

            });
            const responseResults = await Promise.all(resultsDetails);
            setpokemonData(responseResults);
            setLoading(false);

        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPokemonData();
    }, []);



    const SearchData = pokemonData.filter((currentElement) =>
        currentElement.name.toLowerCase().includes(search.toLowerCase())
    );


    if (loading) {
        return <>
            <div class="spinner"></div>


        </>
    }




    return <>

        <h2 className="pokeTittle">Pokémon World: Gotta Know 'Em All!</h2>
        <div className="SearchBox">

            <input className="userInput" placeholder="Search Pokemon" value={search} onChange={(e) => { setSearch(e.target.value) }}></input>
        </div>

        <div className={SearchData.length == 0 ? "dataNotFound" : "pokemonContainer"}>
            {SearchData.length == 0 ?
                (<div className="data-not-found">Data Not Found</div>) :
                (SearchData.map((element) => (
                    <div className="pokemonBox" key={element.id}>
                        <img src={element.sprites.other["official-artwork"].front_default} alt="" />
                        <p className="pokemonName">{element.name} </p>
                        <div className="pokemonType">
                            <p>{element.types.map((current) => current.type.name).join(",")}</p>
                        </div>
                    </div>
                )))
            }
        </div>

    </>


}