const btn = document.querySelector('#fetch-btn')
async function logFiles () {
    const res = await fetch('http://localhost:3000/uploads/')
    console.log(res.body)
    
}
btn.addEventListener('click', (logFiles))
