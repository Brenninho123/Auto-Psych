// Main application initialization and core functionality
console.log('Auto-Psych Dashboard v2.1.0 initialized');

// Add any additional core functionality here
window.addEventListener('error', function(e) {
    console.error('Runtime error:', e.error);
    if (typeof addLogEntry === 'function') {
        addLogEntry(`Error: ${e.error.message}`, 'error');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + B for Builder
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSection('builder');
    }
    // Ctrl/Cmd + D for Dashboard
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        setSection('dashboard');
    }
    // Ctrl/Cmd + L for Launcher
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        setSection('launcher');
    }
});