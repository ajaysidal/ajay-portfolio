import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: "http://localhost:4001/graphql", token: "ec395e26b7df37429193c34e59e66830e4074d6e", queries,  });
export default client;
  