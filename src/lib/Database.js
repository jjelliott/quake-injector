import { invoke } from '@tauri-apps/api/tauri';
import { writable } from 'svelte/store';

let db = [];

async function loadDb() {
	db = await invoke('get_db');
	console.log(db);
}

export const getDb = async () => {
	if (!db) {
		await loadDb();
	}
	return db;
};

export const database = writable([]);
loadDb().then(() => {
	console.log(db)
	db.sort((a, b) => a.author.localeCompare(b.author))
	database.set(db);
});

export const selectedEntry = writable();