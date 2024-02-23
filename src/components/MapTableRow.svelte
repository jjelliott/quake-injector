<script>
	import { selectedEntry } from '$lib/Database.js';

	export let entry;
	export let selected;
</script>
<tr data-map-id='${entry.id}' class='{selected ? "selected" : ""}'
		on:click={()=>{selectedEntry.set(entry); console.log("changed selected entry")}}>
	<td>{entry.title}</td>
	<td style='max-width: 10%'>{entry.author}</td>
	<td>Quaddicted</td> <!-- TODO: implement other sources -->
	<td>{entry.date}</td>
	<td style='max-width: 10%'>{entry.tags.join(", ")}</td>
</tr>

<style>
    td {
        /*margin: 3px;*/
        padding: 3px;
    }

    tr.selected > td {
        border-color: whitesmoke;
    }

    tr.selected {
        /*border-color: whitesmoke;*/
        background: darkblue;
        color: whitesmoke;
    }

    tr {
        border: gray 1px solid;
    }

    tr > td {
        border: gray 1px solid;
    }
</style>