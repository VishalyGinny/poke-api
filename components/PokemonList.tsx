'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Pokemon {
  name: string
  url: string
}

export default function PokemonList({ pokemons }: { pokemons: Pokemon[] }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon"
        className="w-full p-2 mb-4 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPokemons.map((pokemon) => (
          <li key={pokemon.name} className="bg-white p-4 rounded shadow">
            <Link href={`/pokemon/${pokemon.name}`} className="text-blue-500 hover:underline">
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


