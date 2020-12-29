<script>
    import PlayerPage from './Player.svelte';
    import AdminPage from './Admin.svelte';
    const dest = window.location.pathname.toLowerCase();
</script>

{#if dest === '/admin'}
    <AdminPage />
{:else if dest === '/'}
    <p>This link is not valid, please speak to Adam</p>
{:else}
    <PlayerPage name={dest.substring(1)} />
{/if}