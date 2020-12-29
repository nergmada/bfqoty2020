<script>
    import {player} from 'lib/store';
    $: bankTier = 0;
    $: amBanker = false;
    $: bankTotal = 0;
    
    $player.addListener('bank-tier', tier => {
        console.log(`Received new bank tier ${tier}`)
        bankTier = tier;
    });
    $player.addListener('new-banker', name => {
        amBanker = $player.getName() == name;
    })
    $player.addListener('bank-total', total => {
        bankTotal = total;
    })
</script>

<div class="frame">
    <h2>Bank of Corona</h2>
    <h3>Total ${bankTotal}</h3>
    <div class="tier3">
        <h3>Tier 3</h3>
        <p class:active={bankTier == 11}>$32,000</p>
        <p class:active={bankTier == 10}>$16,000</p>
        <p class:active={bankTier == 9}>$8,000</p>
        <p class:active={bankTier == 8}>$4,000</p>
    </div>
    <div class="tier2">
        <h3>Tier 2</h3>
        <p class:active={bankTier == 7}>$2,000</p>
        <p class:active={bankTier == 6}>$1,000</p>
        <p class:active={bankTier == 5}>$500</p>
        <p class:active={bankTier == 4}>$250</p>
    </div>
    <div class="tier1">
        <h3>Tier 1</h3>
        <p class:active={bankTier == 3}>$125</p>
        <p class:active={bankTier == 2}>$50</p>
        <p class:active={bankTier == 1}>$25</p>
        <p class:active={bankTier == 0}>$0</p>
    </div>
    {#if amBanker}
        <div style="text-align: center;">
            <button disabled={bankTier == 0} on:click={() => $player.bank()}>Lockdown</button>
        </div>
    {/if}
</div>

<style>
    h3, h2 {
        margin: 0;
        margin-bottom: 5px;
    }
    p {
        border-radius: 5px;
        background: #ffffff6c;
        color: #000;
        padding: 5px;
        margin: 3px;
    }
    .frame {
        padding: 20px;
        border-radius: 5px;
        background: #0000006c;
    }
    .tier1 {
        background: #0a771c;
        border-radius: 5px;
        padding: 5px;
    }
    .tier2 {
        background: #f8a100;
        border-radius: 5px;
        padding: 5px;
    }
    .tier3 {
        background: #f80000;
        border-radius: 5px;
        padding: 5px;
    }
    .active {
        background: #fff;
    }
    button {
        background: #fff;
        color: #000;
        border-radius: 0;
        outline: none;
        border: 1px solid #000;
        cursor: pointer;
        font-size: 20px;
    }
</style>