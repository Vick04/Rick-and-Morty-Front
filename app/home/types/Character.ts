interface Location {
  name: string;
  url: string;
}

type CharacterStatus = "Alive" | "Dead" | "unknown";
type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};
