<script lang="ts">
    import { getFileTypeFromUrl } from '$lib/utils/fileUtils';

    export let fileUrl: string;
    export let onClose: () => void;

    const fileType = getFileTypeFromUrl(fileUrl);

    async function forceDownloadFile(url: string, filename = 'file') {
        try {
            const response = await fetch(url);
            const blob = await response.blob();

            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Errore durante il download del file:', error);
        }
    }
</script>

<div class="modal-backdrop" on:click={onClose}>
    <div class="modal" on:click|stopPropagation>
        <div class="modal-header">
            <h2>Anteprima file</h2>
            <div class="modal-header__actions">
                <button on:click={() => forceDownloadFile(fileUrl, 'download')} aria-label="Scarica file" class="download-icon">
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                    >
                        <path d="M3 14.25V16h14v-1.75H3zm6.75-10v6.44L7.67 8.26l-1.17 1.18 4 4 4-4-1.17-1.18-2.08 2.43V4.25H9.75z" />
                    </svg>
                </button>
                <button on:click={onClose} class="download-icon">✕</button>
            </div>
        </div>

        <div class="modal-content">
            {#if fileType === 'image'}
                <img src={fileUrl} alt="Preview" />
            {:else if fileType === 'pdf'}
                <iframe src={fileUrl} width="100%" height="600px"></iframe>
            {:else if fileType === 'video'}
                <video src={fileUrl} controls width="100%" />
            {:else if fileType === 'text'}
                <iframe src={fileUrl} width="100%" height="600px"></iframe>
            {:else if fileType === 'slides'}
                <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`}
                        width="100%"
                        height="600px"
                        style="border: none;"
                ></iframe>
            {:else}
                <p>Anteprima non disponibile per questo tipo di file.</p>
                <a href={fileUrl} target="_blank" rel="noopener" class="download-link">Scarica il file</a>
            {/if}
        </div>
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }
    .modal {
        background: white;
        padding: 2rem;
        border-radius: 0.5rem;
        max-width: 80%;
        width: 100%;
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    .modal-content {
        max-height: 80vh;
        overflow: auto;
    }
    img {
        max-width: 100%;
        height: auto;
    }
    a.download-link {
        color: var(--color-primary);
        text-decoration: underline;
        font-weight: 500;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    a.download-link:hover {
        color: #ea640e;
    }

    .modal-header__actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .download-icon {
        color: var(--color-gray-600);
        transition: color 0.2s ease;
    }

    .download-icon:hover {
        color: var(--color-primary);
    }

    .download-icon svg {
        display: block;
    }
</style>