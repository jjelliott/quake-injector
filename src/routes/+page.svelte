<script>
	import MapTable from '../components/MapTable.svelte';
	import { database, selectedEntry } from '../lib/Database.js';
	import { invoke } from '@tauri-apps/api/tauri';
	import 'font-awesome/css/font-awesome.min.css';
	import '../app.scss'

	$: loaded = false;

	$: selectedDescription = null;
	$: selectedName = null;
	$: selectedId = null;
	$: img = null;
	selectedEntry.subscribe(entry => {
		if (entry) {
			img = null;
			selectedId = entry.id;
			selectedName = entry.title;
			selectedDescription = entry.description;
			invoke('get_image', { mapId: selectedId }).then(imgReturn => img = imgReturn);
		}
	});
	database.subscribe(db => {
		loaded = db != null;
	});


</script>
{#if loaded}
	<div id='page-body'>
		<div id='table-column'>
			<MapTable selectedId={selectedId} />
		</div>
		{#if selectedId}
			<div style='max-width: 25%;'>
				<div style='max-height: 50%'>
					{#if img}
						<img alt='{`Preview screenshot for ${selectedName}`}' style='max-width: 100%'
								 src='data:image/jpeg;base64, {img}' />
					{:else }

							<i class='fa fa-pulse fa-spinner fa-3x' />

					{/if}
					<div>{@html (selectedDescription || "")}</div>
				</div>
			</div>

		{/if}
	</div>
{:else }
	<i class='fa fa-pulse fa-spinner'></i>
	<p>Loading database...</p>
{/if}

<style>
    #page-body {
        display: flex;
        overflow: hidden;
        height: 100vh;
    }

    #table-column {
        max-width: 75%;
        overflow-y: scroll;
    }
</style>