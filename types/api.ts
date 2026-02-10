/**
 * Types pour l'API PandaScore
 */

export interface Team {
  id: number;
  acronym: string;
  image_url: string;
  location: string;
  modified_at: string;
  name: string;
  slug: string;
  current_videogame?: VideoGame | null;
}

export interface Opponent {
  opponent: Team;
  type: 'Team';
}

export interface VideoGame {
  id: number;
  name: string;
  slug: string;
}

export interface League {
  id: number;
  image_url: string;
  modified_at: string;
  name: string;
  slug: string;
  url: string | null;
}

export interface Serie {
  begin_at: string;
  end_at: string | null;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: string;
  season: string | null;
  slug: string;
  winner_id: number | null;
  winner_type: string | null;
  year: number;
}

export interface Tournament {
  begin_at: string;
  end_at: string | null;
  id: number;
  league_id: number;
  live_supported: boolean;
  modified_at: string;
  name: string;
  prizepool: string | null;
  serie_id: number;
  slug: string;
  tier: string;
  winner_id: number | null;
  winner_type: string | null;
}

export interface Stream {
  embed_url: string;
  language: string;
  main: boolean;
  official: boolean;
  raw_url: string;
}

export type MatchStatus = 'not_started' | 'running' | 'finished' | 'canceled' | 'postponed';

export interface Match {
  begin_at: string;
  detailed_stats: boolean;
  draw: boolean;
  end_at: string | null;
  forfeit: boolean;
  game_advantage: number | null;
  id: number;
  league: League;
  league_id: number;
  live: {
    opens_at: string | null;
    supported: boolean;
    url: string | null;
  };
  match_type: string;
  modified_at: string;
  name: string;
  number_of_games: number;
  opponents: Opponent[];
  original_scheduled_at: string;
  rescheduled: boolean;
  results?: Array<{ score: number }>;
  scheduled_at: string;
  serie: Serie;
  serie_id: number;
  slug: string;
  status: MatchStatus;
  streams_list: Stream[];
  tournament: Tournament;
  tournament_id: number;
  videogame: VideoGame;
  videogame_version: {
    current: boolean;
    name: string;
  } | null;
  winner: {
    id: number;
    type: string;
    slug?: string;
  } | null;
  winner_id: number | null;
  winner_type: string | null;
}

export interface Player {
  age: number | null;
  birthday: string | null;
  first_name: string;
  id: number;
  image_url: string;
  last_name: string;
  modified_at: string;
  name: string;
  nationality: string;
  role: string | null;
  slug: string;
}

export interface Standing {
  rank: number;
  team: Team;
  wins: number;
  losses: number;
}

// Types pour les réponses de cache
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

// Types pour les paramètres d'API
export interface MatchQueryParams {
  'filter[status]'?: MatchStatus;
  sort?: string;
  per_page?: number | string;
}

// Types pour les équipes stockées localement
export interface StoredTeam {
  id: number;
  teamName: string;
  displayedName?: string;
  backgroundColor: string;
  secondColor: string;
  eventColor: string;
  eventTextColor: string;
  slugs?: string[];
  disableSlugs?: string[];
  image_url: string;
  notificate?: boolean;
  country?: string;
}
