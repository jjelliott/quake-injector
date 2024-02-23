<script>


	import { selectedEntry } from '$lib/Database.js';
	import { invoke } from '@tauri-apps/api/tauri';


	$: selected = null;
	$: img = null;
	$: imgLoading = true;
	selectedEntry.subscribe(entry => {
		if (entry) {
			img = null;
			imgLoading = true;
			selected = entry;
			invoke('get_image', { mapId: selected.id }).then(imgReturn => {
				imgLoading = false;
				return img = imgReturn;
			});
		}
	});
</script>

{#if selected}
	<div>
		{#if !imgLoading}
			{#if img}
			<img alt='{`Preview screenshot for ${selected.title}`}' style='max-width: 100%'
					 src='data:image/jpeg;base64, {img}' />
				{:else}
				<p>No preview available</p>
				{/if }
		{:else }

			<i class='fa fa-pulse fa-spinner fa-3x' />

		{/if}
	</div>

	<div
		style="max-height: 20%; overflow-y: scroll;margin:5px 0 5px 0;background: whitesmoke">{@html (selected.description || "")}</div>
	<div id='action-buttons'>
		<button id='install-button' disabled class="btn btn-block">Install</button>

		<div class="input-group">
			<select id='map-select' class="form-select" disabled></select>
			<button class="btn input-group-btn" id='play' disabled>Play map</button>
		</div>
	</div>
{:else}
	<p>No map selected</p>
{/if}