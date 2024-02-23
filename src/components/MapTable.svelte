<script>
	export let selectedId;
	import MapTableRow from './MapTableRow.svelte';
	import { database } from '../lib/Database.js';

	let db_value = [];
	database.subscribe(db => {
		console.log(db);
		db_value = db;
	});

</script>
<table style='width: 100%; border-collapse: collapse'>
	<thead>
		<tr>
			<th>Name</th>
			<th style='max-width: 10%'>Author(s)</th>
			<th>Source</th>
			<th>Release Date</th>
			<th style='max-width: 10%'>Tags</th>
		</tr>
	</thead>
	<tbody>
		{#each db_value as entry}
			<MapTableRow entry={entry} selected={selectedId && selectedId === entry.id} />

		{/each}
	</tbody>

</table>