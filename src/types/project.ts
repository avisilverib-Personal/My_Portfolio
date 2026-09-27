export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  gradient: string;
  sort_order: number;
  created_at: string;
};

export type ProjectInput = {
  title: string;
  description: string;
  tags: string[];
  live_url: string;
  repo_url: string;
  gradient: string;
  sort_order: number;
};
