function handleClick(e){
    
    localStorage.setItem('clickSearcg', JSON.stringify({e}))
    
    window.location.href =  `/SearchResults.html` 
}