const exchanger = document.getElementById("exchanger");
if (exchanger) {
    exchanger.setAttribute('sandbox', 'allow-same-origin');
}

console.log('iframe modifier', exchanger);