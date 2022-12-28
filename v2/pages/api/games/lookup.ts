// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export const apiBaseUrl = process.env.BGATLAS_URL;
export const clientId = process.env.BGATLAS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // look up and return game data
  /**
     * First, check against the Supabase database. (TODO)
     * If nothing is found, query the Board Game Atlas API
     */
  // todo: require name query parameter
  const bgAtlasRes = await fetch(`${apiBaseUrl}/search?client_id=${clientId}&name=${req.query.name}`)
  const { games } = await bgAtlasRes.json();
  const gameData = games.map(game => (
    // mutate the data from BG Atlas
    // todo: include slug (i.e. handle)?
    {
      name: game.name,
      bgAtlasId: game.id,
      minPlayers: game.min_players,
      maxPlayers: game.max_players,
      minPlaytime: game.min_playtime,
      maxPlaytime: game.max_playtime,
      image: game.image_url,
    }
  ));
  res.status(200).json(gameData);
}
