//nuevo, topico containers 
document.getElementById('theme-toggle')?.addEventListener('change', function() {
    const newTheme = this.checked ? 'dark' : 'light';
    fetch('/theme', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ theme: newTheme }),
    }).then(() => {
        document.body.className = newTheme;
    });
});