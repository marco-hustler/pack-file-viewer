<script lang="ts">
    export let error;
    export let status;
</script>

<svelte:head>
    <title>{status} - Pagina non trovata</title>
</svelte:head>

<div class="error-page">
    <img src="/assets/404_page_illustrations.svg" alt="Errore" class="error-image" />

    <h1>{status}</h1>
    <h1>{status === 404 ? 'Opss.. La pagina che stai cercando non esiste.' : 'Opss.. La pagina che stai cercando non esiste. :('}</h1>
    <a href="/resources">Torna alla tab Resources</a>
</div>

<style>
    .error-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 3rem 1rem;
        gap: 1rem;
    }

    .error-image {
        max-width: 50%;
        height: auto;
    }

    h1 {
        font-size: 2rem;
        color: var(--color-gray-900, #f97316);
    }

    p {
        color: #6b7280;
    }

    a {
        margin-top: 1rem;
        text-decoration: underline;
        color: var(--color-primary, #f97316);
        font-weight: 500;
    }
</style>