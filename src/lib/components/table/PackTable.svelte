<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    export let columns: { label: string; field: string }[] = [];
    export let rows: any[] = [];

    let searchTerm = '';
    const dispatch = createEventDispatcher();

    let filteredRows = [];

    $: filteredRows = rows.filter(row =>
        Object.values(row).some(value =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
</script>

<div class="table-container">
    <div class="table-header">
        <div class="table-header__left">
            <h2 class="table-title">📊 Resources</h2>
        </div>

        <div class="table-header__right">
            <input
                    type="text"
                    placeholder="Search..."
                    bind:value={searchTerm}
                    class="search-input"
            />
            <button class="upload-button" on:click={() => dispatch('upload')}>Upload</button>
        </div>
    </div>

    <div class="table-wrapper">
        <table>
            <thead>
            <tr>
                {#each columns as column}
                    <th>{column.label}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each filteredRows as row}
                <tr>
                    {#each columns as column}
                        <td>
                            {#if column.field === 'fileUrl'}
                                <a
                                        href={row[column.field]}
                                        target="_blank"
                                        class="file-link"
                                >View File</a>
                            {:else if Array.isArray(row[column.field])}
                                {row[column.field].join(', ')}
                            {:else}
                                {row[column.field]}
                            {/if}
                        </td>
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .table-container {
        background-color: white;
        padding: 1.5rem 2rem;
        margin: 2rem 5rem;
        max-width: 100%;
        border-radius: 0.75rem;
        box-shadow: 0 0 8px rgba(0,0,0,0.1);
    }

    .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .table-wrapper {
        overflow-x: auto;
        margin-top: 1.5rem;
    }

    .table-title {
        font-size: 1.25rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .search-input {
        padding: 0.5rem 1rem;
        border: 1px solid var(--color-gray-300);
        border-radius: 0.5rem;
        font-size: 0.95rem;
        min-width: 200px;
    }

    .upload-button {
        background-color: var(--color-primary);
        color: white;
        padding: 0.5rem 1.25rem;
        font-weight: 500;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: background 0.2s ease;
    }

    .upload-button:hover {
        background-color: #ea640e;
    }

    .table-wrapper {
        overflow-x: auto;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th {
        text-align: left;
        padding: 0.75rem;
        font-weight: 600;
        border-bottom: 1px solid var(--color-gray-200);
    }

    td {
        padding: 0.75rem;
        font-size: 0.95rem;
        color: var(--color-gray-700);
        border-bottom: 1px solid var(--color-gray-100);
        white-space: nowrap;
    }

    .file-link {
        color: var(--color-primary);
        text-decoration: underline;
        font-weight: 500;
        cursor: pointer;
    }
</style>