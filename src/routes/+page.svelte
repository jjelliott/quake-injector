<script>
	import MapTable from '../components/MapTable.svelte';
	import { database, selectedEntry } from '../lib/Database.js';
	import 'font-awesome/css/font-awesome.min.css';
	import '../app.scss';
	import MapDisplay from '../components/MapDisplay.svelte';

	$: loaded = false;

	$: selectedId = null;

	selectedEntry.subscribe(entry => {
		if (entry) {
			selectedId = entry.id;
		}
	});
	database.subscribe(db => {
		loaded = db != null;
	});


</script>

<div id='page-body' class='container'>
	{#if loaded}
		<div class='columns'>
			<div id='table-column' class='column col-9'>
				<MapTable selectedId={selectedId} />
			</div>
			<div class='column col-3'>
				<MapDisplay />
			</div>
		</div>

	{:else }
		<div class='text-center'>
			<i class='fa fa-pulse fa-3x fa-spinner'></i>
			<p>Loading database...</p>
		</div>
	{/if}
</div>
<style>
    #page-body {
        /*display: flex;*/
        overflow: hidden;
        height: 100vh;
    }

    #table-column {
        /*max-width: 75%;*/
        max-height: 100vh;
        overflow-y: scroll;
    }
</style>