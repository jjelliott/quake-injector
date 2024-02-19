<script>
	import { selectedEntry } from '$lib/Database.js';
	export let entry;
	export let selected;
</script>
<tr data-map-id='${entry.id}' class='{selected ? "selected" : ""}' on:click={()=>{selectedEntry.set(entry); console.log("changed selected entry")}}>
	<td>{entry.title}</td>
	<td style='max-width: 10%'>{entry.author}</td>
	<td>{entry.date}</td>
	<td style='max-width: 10%'>{entry.tags.join(", ")}</td>
</tr>

<style>
		td{
				margin: 3px;
				padding: 3px;
		}
		tr.selected > td{
        border-color: darkblue;
		}
	tr.selected {
			background: darkblue;
			color: whitesmoke;
	}
</style>