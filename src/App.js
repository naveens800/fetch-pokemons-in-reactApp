import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import axios from "axios";
import Pagination from "./Pagination";

function App() {
  // pokemons 
  const [pokemon, setPokemon] = useState([]);
  //  current page
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  //  next page
  const [nextPageUrl, setNextPageUrl] = useState();
  //  prev page
  const [prevPageUrl, setPrevPageUrl] = useState();
  //  loading screen
  const [loading, setLoading] = useState(true);
  
  // use effect return data fetched throgh axios
  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      });

    return () => cancel();
  }, [currentPageUrl]);

  //event handler for next page button
  const gotoNextPage = () => setCurrentPageUrl(nextPageUrl);
  //event handler for prev page button
  const gotoPrevPage = () => setCurrentPageUrl(prevPageUrl);

  // returns loading screen
  if (loading) return "Loading...";

  return (
    <> 
      <PokemonList pokemon={pokemon} />
      <Pagination
        // if there is next page load the next page button
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        // if there is prev page load the prev page button
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </>
  );
}

export default App;
