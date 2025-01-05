import Image from "next/image";
import Link from "next/link";

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  stats: PokemonStat[];
  types: PokemonType[];
}

async function getPokemonData(name: string): Promise<PokemonData> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.json();
}

export default async function PokemonPage({
  params,
}: {
  params: { name: string };
}) {
  const pokemon: PokemonData = await getPokemonData(params.name);

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to list
      </Link>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon.name}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-xl font-semibold mb-2">Stats</h2>
            <ul>
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="mb-1">
                  <span className="capitalize">{stat.stat.name}:</span>{" "}
                  {stat.base_stat}
                </li>
              ))}
            </ul>
            <h2 className="text-xl font-semibold mt-4 mb-2">Types</h2>
            <ul className="flex gap-2">
              {pokemon.types.map((type) => (
                <li
                  key={type.type.name}
                  className="bg-gray-200 px-2 py-1 rounded capitalize"
                >
                  {type.type.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
