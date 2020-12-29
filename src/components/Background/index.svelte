<script>
    import variator from './Variator.js';

    const redAlpha = variator(12, 100);
    const greenAlpha = variator(0, 100);
    const blueAlpha = variator(184, 100);
    
    const redBeta = variator(255, 100);
    const greenBeta = variator(235, 100);
    const blueBeta = variator(57, 100);

    const redCharlie = variator(0, 100);
    const greenCharlie = variator(195, 100);
    const blueCharlie = variator(255, 100);

    const redDelta = variator(255, 100);
    const greenDelta = variator(217, 100);
    const blueDelta = variator(0, 100);
</script>

{@html `
<style>
    html, body {
        background-image: 
            -webkit-radial-gradient(80% 10%, circle, rgb(${$redAlpha}, ${$greenAlpha}, ${$blueAlpha}), transparent), 
            -webkit-radial-gradient(80% 50%, circle, rgb(${$redBeta}, ${$greenBeta}, ${$blueBeta}), transparent), 
            -webkit-radial-gradient(20% 80%, 40em 40em, rgb(${$redCharlie}, ${$greenCharlie}, ${$blueCharlie}), transparent), 
            -webkit-radial-gradient(10% 10%, circle, rgb(${$redDelta}, ${$greenDelta}, ${$blueDelta}), transparent)
    }
</style>
`
}