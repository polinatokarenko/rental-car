import axios from "axios";

export const runtime = "nodejs";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const nextServer = axios.create({
  baseURL,
});

export default nextServer;