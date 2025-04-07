<script lang="ts">
    import { page } from '$app/stores'

    // Ottieni il path corrente
    $: pathname = $page.url.pathname

    const menu = [
        { name: 'Dashboard', path: '/' },
        { name: 'Users', path: '/users' },
        { name: 'Programs', path: '/programs' },
        { name: 'Resources', path: '/resources' },
        { name: 'Events', path: '/events' }
    ]
</script>

<nav class="header">
    <div class="header__left">
        <img src="/assets/logos/logo.png" alt="Logo" class="header__logo" />
    </div>

    <ul class="header__nav">
        {#each menu as item}
            <li>
                <a
                        href={item.path}
                        class="header__item {item.path === pathname ? 'active' : ''}"
                >
                    {item.name}
                </a>
            </li>
        {/each}
    </ul>

    <div class="header__right">
        <img src="/assets/flags/us.svg" alt="Language" class="header__flag" />
        <img src="/assets/avatars/user.jpg" alt="Avatar" class="header__avatar" />
    </div>
</nav>

<style>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 2rem;
        margin: 0 2rem;
        background-color: var(--color-white);
        border-bottom: 1px solid var(--color-gray-300);
        flex-wrap: wrap;
        gap: 1rem;
        font-family: var(--font-base);
    }

    .header__logo {
        height: auto;
        max-height: 3rem;
        width: auto;
        max-width: 100%;
    }

    .header__nav {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        list-style: none;
        color: var(--color-gray-500);
        justify-content: center;
        flex: 1;
        min-width: 200px;
    }

    .header__item {
        cursor: pointer;
        padding-bottom: 0.25rem;
        transition: color 0.2s ease;
        white-space: nowrap;
        font-size: 1.2rem;
        font-weight: 600;
    }

    .header__item.active {
        color: var(--color-primary);
        border-bottom: 2px solid var(--color-primary);
    }

    .header__right {
        display: flex;
        gap: 1.5rem;
        align-items: center;
    }

    .header__flag {
        width: auto;
        height: 1.5rem;
    }

    .header__avatar {
        width: 3rem;
        height: 3rem;
        border-radius: 9999px;
        border: 2px solid var(--color-primary);
        object-fit: cover;
    }

    @media (max-width: 768px) {
        .header {
            padding: 0.75rem 1rem;
        }

        .header__nav {
            justify-content: center;
            font-size: 0.875rem;
            gap: 1rem;
        }

        .header__right {
            order: -1;
            width: 100%;
            justify-content: flex-end;
        }
    }

    @media (max-width: 480px) {
        .header__nav {
            flex-direction: column;
            align-items: center;
        }

        .header__right {
            justify-content: center;
        }
    }
</style>