import React from 'react'


export default function PokemonList({pokemon}) {
  return (
    <div>
      {pokemon.map(p =>(
        <h3 key={p}><li>{p}</li></h3>
      ))}
    </div>
  )
}

