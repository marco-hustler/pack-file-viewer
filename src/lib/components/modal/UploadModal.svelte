<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';

    export let apiEndpoint: string;

    const dispatch = createEventDispatcher();
    let title = '';
    let description = '';
    let category = '';
    let language = '';
    let provider = '';
    let roles: string[] = [];
    let file: File | null = null;

    const categories = ['Leadership', 'Managing Complexity'];
    const languages = ['en', 'it', 'es'];
    const providers = ['Skilla', 'Linkedin', 'Pack', 'Mentor'];
    const availableRoles = ['Mentor/Coach', 'Mentee/Coachee', 'Mentee/Coachee', 'Mentee/Coachee', 'Mentee/Coachee', 'Mentee/Coachee', 'Mentee/Coachee', 'Mentee/Coachee'];

    let openRoles = false;

    let errors = {
        title: '',
        description: '',
        category: '',
        language: '',
        provider: '',
        file: '',
        roles: ''
    };

    async function handleSubmit() {
        errors = {
            title: title ? '' : 'Title is required',
            description: description ? '' : '* Description is required',
            category: category ? '' : '* Category is required',
            language: language ? '' : '* Language is required',
            provider: provider ? '' : '* Provider is required',
            file: file ? '' : '* File is required',
            roles: roles.length > 0 ? '' : '* At least one role is required'
        };

        const hasErrors = Object.values(errors).some(e => e !== '');
        if (hasErrors) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('language', language);
        formData.append('provider', provider);
        roles.forEach(r => formData.append('roles', r));
        if (file) formData.append('file', file);

        const res = await fetch(apiEndpoint, {
            method: 'POST',
            body: formData
        });

        if (res.ok) {
            dispatch('close');
            dispatch('success', { message: '✅ File inserito con successo!' });
        } else {
            dispatch('error', { message: '❌ Opss, qualcosa è andato storto' });
        }
    }

</script>

<div class="modal-backdrop">
    <div class="modal">
        <div class="modal-header">
            <h2>Upload Resource</h2>
            <button on:click={() => dispatch('close')}>✕</button>
        </div>

        <div class="modal-body">
            <input type="text" placeholder="Title*" bind:value={title} maxlength="200" />
            {#if errors.title}
                <p class="error-message">{errors.title}</p>
            {/if}

            <input type="text" placeholder="Description*" bind:value={description} maxlength="1000" />
            {#if errors.description}
                <p class="error-message">{errors.description}</p>
            {/if}

            <select bind:value={category}>
                <option disabled value="">Category*</option>
                {#each categories as c}
                    <option>{c}</option>
                {/each}
            </select>
            {#if errors.category}
                <p class="error-message">{errors.category}</p>
            {/if}


            <select bind:value={language}>
                <option disabled value="">Language*</option>
                {#each languages as l}
                    <option>{l}</option>
                {/each}
            </select>
            {#if errors.language}
                <p class="error-message">{errors.language}</p>
            {/if}

            <select bind:value={provider}>
                <option disabled value="">Provider*</option>
                {#each providers as p}
                    <option>{p}</option>
                {/each}
            </select>
            {#if errors.provider}
                <p class="error-message">{errors.provider}</p>
            {/if}

            <div class="custom-multiselect" tabindex="0" on:click={() => openRoles = !openRoles} on:focusout={() => openRoles = false}>
                <span class="placeholder">
                    {roles.length > 0 ? roles.join(', ') : 'Roles'}
                </span>
                <div class="options" class:show={openRoles}>
                    {#each availableRoles as role}
                        <div class="option" on:click|stopPropagation={() => {
                                if (roles.includes(role)) {
                                    roles = roles.filter(r => r !== role);
                                } else {
                                    roles = [...roles, role];
                                }
                            }}>
                            <input type="checkbox" checked={roles.includes(role)} />
                            {role}
                        </div>
                    {/each}
                </div>
            </div>
            {#if errors.roles}
                <p class="error-message">{errors.roles}</p>
            {/if}

            <div class="file-upload">
                <input type="file" id="fileInput" on:change={(e) => file = e.target.files[0]} />
            </div>
            {#if errors.file}
                <p class="error-message">{errors.file}</p>
            {/if}
        </div>

        <div class="modal-footer">
            <button class="upload" on:click={handleSubmit}>Upload</button>
        </div>
    </div>
</div>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    }

    .modal {
        background: white;
        border-radius: 10px;
        width: 50%;
        padding: 2rem;
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        font-size: 1.2rem;
        margin-bottom: 1rem;
    }

    .modal-body input,
    .modal-body select {
        width: 100%;
        padding: 0.6rem;
        margin-bottom: 1rem;
        border: 1px solid var(--color-gray-300);
        border-radius: 0.5rem;
    }

    .file-upload input[type="file"] {
        width: 100%;
    }

    .modal-footer {
        display: flex;
        justify-content: center;
    }

    .upload {
        background-color: var(--color-primary);
        color: white;
        padding: 0.6rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .upload:hover {
        background-color: #ea640e;
    }

    .custom-multiselect {
        border: 1px solid var(--color-gray-300);
        border-radius: 0.5rem;
        padding: 0.6rem;
        margin-bottom: 1rem;
        position: relative;
        background: white;
        cursor: pointer;
    }

    .placeholder {
        color: #6b7280;
    }

    .options {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid var(--color-gray-300);
        border-radius: 0.5rem;
        margin-top: 0.25rem;
        z-index: 10;
        display: none;
        max-height: 200px;
        overflow-y: auto;
    }

    .options.show {
        display: flex;
    }

    .option {
        padding: 0.5rem 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        justify-content: flex-start;
        text-align: left;
    }

    .option input[type="checkbox"] {
        margin: 0;
    }

    .option:hover {
        background-color: #f9fafb;
    }

    .error-message {
        color: red;
        font-size: 0.85rem;
        margin-top: -0.5rem;
        margin-bottom: 0.5rem;
    }

</style>