import PokemonList from "@/components/PokemonList";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonApiResponse {
  results: PokemonListItem[];
}

export default async function Home() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data: PokemonApiResponse = await response.json();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Pokemon List</h1>
      <PokemonList pokemons={data.results} />
    </main>
  );
}
