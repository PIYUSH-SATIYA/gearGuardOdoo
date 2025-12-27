// This file initializes the database connection on app startup
import { connectToDatabase } from "./index";

let isConnected = false;

export async function initializeDatabase() {
    if (isConnected) {
        return;
    }

    try {
        await connectToDatabase();
        isConnected = true;
    } catch (error) {
        console.error("Database initialization failed");
        throw error;
    }
}

export function isDatabaseConnected() {
    return isConnected;
}
