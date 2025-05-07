import { GitHubFollowerUser, type GitHubUser } from "./types";

export async function getFollowers({
  username,
  page = 1,
}: {
  username: string;
  page: number;
}) {
  const response = await fetch(
    `https://api.github.com/users/${username}/followers?per_page=100&page=${page}`,
    {
      headers: {
        Authorization: `token ${process.env.GH_TOKEN}`,
      },
    },
  );
  const data = (await response.json()) as GitHubFollowerUser[];
  return data;
}

export async function getUser({ username }: { username: string }) {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token ${process.env.GH_TOKEN}`,
    },
  });
  const data = (await response.json()) as GitHubUser;
  return data;
}
