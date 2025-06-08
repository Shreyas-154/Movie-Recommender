import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const API_KEY = "a804fa09"; // Your OMDb API Key
const API_URL = "https://www.omdbapi.com/";

export default function MovieSearchApp() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setMovies([]);
    try {
      const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error);
      }
    } catch (err) {
      setError("Something went wrong. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <motion.h1 
        className="text-4xl font-bold mb-6" 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
      >
        Movie Search App
      </motion.h1>
      <div className="flex gap-2 w-full max-w-lg">
        <Input
          className="flex-1 text-black"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={fetchMovies} disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Search"}
        </Button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movies.map((movie) => (
          <motion.div 
            key={movie.imdbID} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-gray-800 shadow-lg overflow-hidden">
              <img 
                src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} 
                alt={movie.Title} 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold">{movie.Title}</h2>
                <p className="text-gray-400">Year: {movie.Year}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
