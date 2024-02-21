<script>
	import MapTable from '../components/MapTable.svelte';
	import { database, selectedEntry } from '../lib/Database.js';
	import { invoke } from '@tauri-apps/api/tauri';
	import 'font-awesome/css/font-awesome.min.css';
	import '../app.scss';

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

<div id='page-body' class='container'>
{#if loaded}
		<div class='columns'>
			<div id='table-column' class='column col-9'>
				<MapTable selectedId={selectedId} />
			</div>
			{#if selectedId}
				<div class='column col-3'>
					<div style='max-height: 50%'>
						{#if img}
							<img alt='{`Preview screenshot for ${selectedName}`}' style='max-width: 100%'
									 src='data:image/jpeg;base64, {img}' />
						{:else }

							<i class='fa fa-pulse fa-spinner fa-3x' />

						{/if}
						<div>{@html (selectedDescription || "")}</div>
					</div>
					<div id='action-buttons'>
						<button id='install-button'>Install</button>
						<select id='map-select'></select>
						<button id='play'>Play map</button>
					</div>
				</div>

			{/if}
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