<script lang="ts">
    import { onMount } from 'svelte';
    import PackTable from '$lib/components/table/PackTable.svelte';
    import UploadModal from '$lib/components/modal/UploadModal.svelte';
    import FileModal from '$lib/components/modal/FileModal.svelte';
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
    let showModal = false;
    let successMessage = '';
    let errorMessage = '';

    let selectedFileUrl: string | null = null;
    let showFileModal = false;

    function handleViewFile(event) {
        selectedFileUrl = event.detail.url;
        showFileModal = true;
    }

    async function loadFiles() {
        try {
            const res = await fetch('/api/files');
            const data = await res.json();
            rows = data;
        } catch (error) {
            console.error('Errore nel recupero dei file:', error);
        }
    }

    function handleUploadSuccess() {
        showModal = false;
        successMessage = 'File inserito con successo!';
        loadFiles();
        setTimeout(() => successMessage = '', 4000);
    }

    onMount(loadFiles);
</script>

<PackTable {columns} {rows} on:upload={() => showModal = true} on:refresh={loadFiles}  on:view={handleViewFile}/>

{#if showModal}
    <UploadModal
        apiEndpoint="/api/files/upload"
        on:close={() => showModal = false}
        on:success={(e) => {
            successMessage = e.detail.message;
            errorMessage = '';
            showModal = false;
            setTimeout(() => successMessage = '', 3000);
        }}

        on:error={(e) => {
            errorMessage = e.detail.message;
            successMessage = '';
            setTimeout(() => errorMessage = '', 3000);
        }}
    />
{/if}


{#if successMessage}
    <div class="banner success">{successMessage}</div>
{:else if errorMessage}
    <div class="banner error">{errorMessage}</div>
{/if}

{#if showFileModal && selectedFileUrl}
    <FileModal fileUrl={selectedFileUrl} onClose={() => showFileModal = false} />
{/if}

<style>
    .banner {
        position: fixed;
        top: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        background-color: #dcfce7;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        font-weight: 500;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        z-index: 1000;
        transition: opacity 0.3s ease;
    }

    .banner.success {
        background-color: #d1fae5;
        color: #065f46;
    }

    .banner.error {
        background-color: #fee2e2;
        color: #b91c1c;
    }
</style>