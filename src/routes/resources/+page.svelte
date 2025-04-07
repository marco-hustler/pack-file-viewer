<script lang="ts">
    import { onMount } from 'svelte';
    import PackTable from '$lib/components/table/PackTable.svelte';
    import type { PackFileInterface } from '$lib/types/index.ts';

    const columns = [
        { label: 'Titolo', field: 'title' },
        { label: 'Descrizione', field: 'description' },
        { label: 'Categoria', field: 'category' },
        { label: 'Lingua', field: 'language' },
        { label: 'Fornitore', field: 'provider' },
        { label: 'Ruoli', field: 'roles' },
        { label: 'File', field: 'fileUrl' }
    ];
    let rows: PackFileInterface[] = [];

    onMount(async () => {
        try {
            const res = await fetch('/api/files');
            const data = await res.json();
            rows = data;
        } catch (error) {
            console.error('Errore nel recupero dei file:', error);
        }
    });
</script>

<PackTable {columns} {rows} on:upload={() => console.log('Apro modale')} />