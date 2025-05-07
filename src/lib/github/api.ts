import { GitHubFollowerUser, type GitHubUser } from "./types";

export async function getFollowers({ username }: { username: string }) {
  const allFollowers: GitHubFollowerUser[] = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/followers?per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `token ${process.env.GH_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API error: ${response.status} ${response.statusText}`,
      );
    }

    const data = (await response.json()) as GitHubFollowerUser[];

    if (data.length === 0) break;

    allFollowers.push(...data);
    page++;
  }

  return allFollowers;
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
