<script>
    export let title = "";
    export let hidden = true;
</script>
<div class="frame">
    <div class="banner" on:click={() => hidden = !hidden}>
        <h3>{title}</h3>
    </div>
    <div class="content" class:hidden>
        <slot />
    </div>
</div>

<style>
    div {
        border-radius: 5px;
    }

    .banner {
        background: #000000;
        width: 100%;
        padding: 20px;
        cursor: pointer;
    }
    .content {
        padding: 20px;
    }
    .hidden {
        display: none;
    }
</style>