<script lang="ts">
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    export let columns: { label: string; field: string }[] = [];
    export let rows: any[] = [];

    export let title: string = 'Resources';

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
            <h2 class="table-title">
                <svg class="chart-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6v14m4-10v10m4-6v6m4-2v2m4-14v14" />
                </svg>
                {title}
            </h2>
        </div>

        <div class="table-header__right">
            <button class="refresh-button" on:click={() => dispatch('refresh')} aria-label="Refresh table">
                <svg class="refresh-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="20" height="20">
                    <path d="M256 48V0L192 64l64 64V80c88.2 0 160 71.8 160 160s-71.8 160-160 160S96 328.2 96 240H48c0 114.9 93.1 208 208 208s208-93.1 208-208S370.9 48 256 48z"/>
                </svg>
            </button>
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
                <th>Delete</th>
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
                                        class="file-link"
                                        on:click|preventDefault={() => dispatch('view', { url: row[column.field] })}
                                >View File</a>
                            {:else if Array.isArray(row[column.field])}
                                {row[column.field].join(', ')}
                            {:else}
                                {row[column.field]}
                            {/if}
                        </td>
                    {/each}
                    <td>
                        <button class="delete-button" on:click={() => dispatch('delete', row.id)} aria-label="Delete">
                            <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </td>
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
        max-height: 80vh;
        overflow-y: auto;
        overflow-x: auto;
        margin-top: 1.5rem;
    }

    .table-title {
        font-size: 1.25rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-gray-800);
    }

    .chart-icon {
        stroke: var(--color-primary);
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

    thead {
        text-align: left;
        padding: 0.75rem;
        font-weight: 600;
        border-bottom: 1px solid var(--color-gray-200);
        background-color: #f9fafb;
    }

    th:first-child {
        border-top-left-radius: 10px;
    }

    th:last-child {
        border-top-right-radius: 10px;
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

    .refresh-button {
        background: transparent;
        border: 1px solid var(--color-gray-300);
        padding: 0.45rem;
        border-radius: 0.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-gray-500);
        transition: all 0.2s ease;
    }

    .refresh-button:hover {
        background-color: var(--color-gray-100);
        color: var(--color-gray-700);
    }

    .refresh-icon {
        transition: transform 0.3s ease;
    }

    .refresh-button:active .refresh-icon {
        transform: rotate(360deg);
    }

    .table-header__right{
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }

    .delete-button {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
    }

    .delete-icon {
        stroke: red;
        transition: transform 0.2s ease;
    }

    .delete-button:hover .delete-icon {
        transform: scale(1.1);
    }
</style>