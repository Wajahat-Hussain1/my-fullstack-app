// netlify/functions/api.js
import { getDatabase } from "@netlify/database";

export default async (req, context) => {
    const db = getDatabase();

    try {
        // Fetch users from the Netlify Database
        const users = await db.sql`SELECT * FROM users`;
        return new Response(JSON.stringify(users), {
            headers: { "Content-Type": "application/json" },
            status: 200
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        });
    }
};

export const config = {
    path: "/api"
};