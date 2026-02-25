// Core UI Management
let currentSection = 'dashboard';
let terminalVisible = true;
let sidebarCollapsed = false;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    setSection('dashboard');
    addLogEntry('Auto-Psych v3.0.0 initialized', 'success');
    addLogEntry('Connected to control plane', 'info');
    startMetricsCollection();
});

function initializeEventListeners() {
    // Sidebar collapse
    document.getElementById('collapseSidebar').addEventListener('click', toggleSidebar);
    document.getElementById('menuToggle').addEventListener('click', toggleMobileSidebar);
    
    // Global search
    document.getElementById('globalSearch').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(e.target.value);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

function handleKeyboardShortcuts(e) {
    // Cmd/Ctrl + K for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('globalSearch').focus();
    }
    
    // Cmd/Ctrl + B for builder
    if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setSection('builder');
    }
    
    // Cmd/Ctrl + D for dashboard
    if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        setSection('dashboard');
    }
    
    // Cmd/Ctrl + ` for terminal
    if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault();
        toggleTerminal();
    }
}

function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    document.getElementById('sidebar').classList.toggle('collapsed');
    document.querySelector('.collapse-btn i').classList.toggle('fa-chevron-left');
    document.querySelector('.collapse-btn i').classList.toggle('fa-chevron-right');
}

function toggleMobileSidebar() {
    document.getElementById('sidebar').classList.toggle('show');
}

function toggleTerminal() {
    terminalVisible = !terminalVisible;
    const terminal = document.getElementById('terminalPanel');
    const chevron = terminal.querySelector('.fa-chevron-down');
    
    if (terminalVisible) {
        terminal.style.height = '280px';
        chevron.classList.remove('fa-chevron-up');
        chevron.classList.add('fa-chevron-down');
    } else {
        terminal.style.height = '40px';
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-up');
    }
}

function setSection(section) {
    currentSection = section;
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(`nav-${section}`)?.classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        builder: 'Build Pipeline',
        launcher: 'Service Launcher',
        docker: 'Container Management',
        kubernetes: 'Kubernetes Cluster',
        ci: 'CI/CD Pipelines',
        metrics: 'System Metrics',
        logs: 'Log Analytics',
        alerts: 'Alert Center'
    };
    
    document.getElementById('page-title').textContent = titles[section] || 'Dashboard';
    
    // Update context
    const contexts = {
        dashboard: 'overview · last 24h',
        builder: 'active builds · 3 running',
        launcher: 'service orchestration',
        docker: 'container health · 4 running',
        kubernetes: 'cluster: production · 8 nodes',
        ci: 'pipeline status · 2 in progress',
        metrics: 'real-time monitoring',
        logs: 'recent events · 1,234 logs',
        alerts: 'active alerts · 3 critical'
    };
    
    document.getElementById('pageContext').textContent = contexts[section] || '';
    
    // Load section content
    loadSectionContent(section);
    addLogEntry(`Navigated to ${titles[section]}`, 'info');
}

function loadSectionContent(section) {
    const contentArea = document.getElementById('content');
    
    switch(section) {
        case 'dashboard':
            contentArea.innerHTML = getDashboardHTML();
            initializeDashboardCharts();
            break;
        case 'builder':
            contentArea.innerHTML = getBuilderHTML();
            break;
        case 'launcher':
            contentArea.innerHTML = getLauncherHTML();
            break;
        case 'docker':
            contentArea.innerHTML = getDockerHTML();
            startContainerMonitoring();
            break;
        case 'kubernetes':
            contentArea.innerHTML = getKubernetesHTML();
            break;
        case 'ci':
            contentArea.innerHTML = getCIHTML();
            break;
        case 'metrics':
            contentArea.innerHTML = getMetricsHTML();
            initializeMetricsCharts();
            break;
        case 'logs':
            contentArea.innerHTML = getLogsHTML();
            break;
        case 'alerts':
            contentArea.innerHTML = getAlertsHTML();
            break;
    }
}

// Dashboard HTML
function getDashboardHTML() {
    return `
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Total Builds</h3>
                    <div class="stat-icon">
                        <i class="fas fa-code-branch"></i>
                    </div>
                </div>
                <div class="stat-value">2,847</div>
                <div class="stat-trend">
                    <span class="trend-up"><i class="fas fa-arrow-up"></i> 12.3%</span>
                    <span>vs last week</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Active Containers</h3>
                    <div class="stat-icon">
                        <i class="fas fa-cubes"></i>
                    </div>
                </div>
                <div class="stat-value">18</div>
                <div class="stat-trend">
                    <span class="trend-up"><i class="fas fa-arrow-up"></i> 4</span>
                    <span>new since yesterday</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Success Rate</h3>
                    <div class="stat-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="stat-value">99.2%</div>
                <div class="stat-trend">
                    <span class="trend-up"><i class="fas fa-arrow-up"></i> 0.8%</span>
                    <span>above target</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Avg Response Time</h3>
                    <div class="stat-icon">
                        <i class="fas fa-clock"></i>
                    </div>
                </div>
                <div class="stat-value">124ms</div>
                <div class="stat-trend">
                    <span class="trend-down"><i class="fas fa-arrow-down"></i> 12ms</span>
                    <span>improvement</span>
                </div>
            </div>
        </div>

        <div class="charts-section">
            <div class="chart-card">
                <div class="chart-header">
                    <h3>Build Activity</h3>
                    <div class="chart-actions">
                        <button class="chart-action">Day</button>
                        <button class="chart-action active">Week</button>
                        <button class="chart-action">Month</button>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="buildChart"></canvas>
                </div>
            </div>
            
            <div class="chart-card">
                <div class="chart-header">
                    <h3>Resource Usage</h3>
                    <div class="chart-actions">
                        <button class="chart-action">CPU</button>
                        <button class="chart-action active">Memory</button>
                        <button class="chart-action">Network</button>
                    </div>
                </div>
                <div class="chart-container">
                    <canvas id="resourceChart"></canvas>
                </div>
            </div>
        </div>

        <div class="activity-list">
            <div class="activity-header">
                <h3>Recent Activity</h3>
                <button class="chart-action">View All</button>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon success">
                    <i class="fas fa-check"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">Build #2847 completed successfully</div>
                    <div class="activity-meta">
                        <span>main · frontend-app</span>
                        <span class="activity-badge">2m 34s</span>
                    </div>
                </div>
                <span class="log-timestamp">2 min ago</span>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon info">
                    <i class="fas fa-rocket"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">Deployed to production</div>
                    <div class="activity-meta">
                        <span>v2.1.0 · api-server</span>
                        <span class="activity-badge">3 replicas</span>
                    </div>
                </div>
                <span class="log-timestamp">15 min ago</span>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon warning">
                    <i class="fas fa-exclamation"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">High memory usage detected</div>
                    <div class="activity-meta">
                        <span>container: redis-cache</span>
                        <span class="activity-badge">92% used</span>
                    </div>
                </div>
                <span class="log-timestamp">1 hour ago</span>
            </div>
            
            <div class="activity-item">
                <div class="activity-icon success">
                    <i class="fas fa-sync-alt"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-title">Auto-scaling triggered</div>
                    <div class="activity-meta">
                        <span>web-service · 2 → 4 pods</span>
                        <span class="activity-badge">success</span>
                    </div>
                </div>
                <span class="log-timestamp">2 hours ago</span>
            </div>
        </div>
    `;
}

// Log management
function addLogEntry(message, type = 'info') {
    const logOutput = document.getElementById('log-output');
    if (!logOutput) return;
    
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const logLine = document.createElement('div');
    logLine.className = `log-line ${type}`;
    logLine.innerHTML = `
        <span class="log-timestamp">${timestamp}</span>
        <span class="log-level">${type.toUpperCase()}</span>
        <span class="log-message">${message}</span>
    `;
    
    logOutput.appendChild(logLine);
    logOutput.scrollTop = logOutput.scrollHeight;
}

function clearLogs() {
    const logOutput = document.getElementById('log-output');
    if (logOutput) {
        logOutput.innerHTML = '';
        addLogEntry('Logs cleared', 'info');
    }
}

function exportLogs() {
    const logOutput = document.getElementById('log-output');
    if (!logOutput) return;
    
    const logs = Array.from(logOutput.children)
        .map(line => line.textContent)
        .join('\n');
    
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autopsych-logs-${new Date().toISOString()}.log`;
    a.click();
    
    addLogEntry(`Exported ${logOutput.children.length} log entries`, 'success');
}

// Search functionality
function performSearch(query) {
    if (!query.trim()) return;
    addLogEntry(`Searching for: "${query}"`, 'info');
    // Implement search logic here
}

// Modal management
function toggleQuickActions() {
    document.getElementById('quickActionsModal').classList.toggle('show');
}

function closeModal() {
    document.getElementById('quickActionsModal').classList.remove('show');
}

// Theme management
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('.action-btn .fa-moon');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    addLogEntry('Theme toggled', 'info');
}

// Notifications
function toggleNotifications() {
    addLogEntry('Opening notifications panel', 'info');
    // Implement notifications panel
}

// Metrics collection simulation
function startMetricsCollection() {
    setInterval(() => {
        updateSystemMetrics();
    }, 5000);
}

function updateSystemMetrics() {
    const cpuMetric = document.querySelector('.metric:nth-child(1) .metric-value');
    const memMetric = document.querySelector('.metric:nth-child(2) .metric-value');
    
    if (cpuMetric && memMetric) {
        const cpu = (20 + Math.random() * 15).toFixed(1);
        const mem = (3.5 + Math.random() * 2).toFixed(1);
        
        cpuMetric.textContent = `${cpu}%`;
        memMetric.textContent = `${mem}GB`;
    }
}

// Container monitoring
function startContainerMonitoring() {
    // Simulate container status updates
    setInterval(() => {
        addLogEntry('Container health check completed', 'info');
    }, 30000);
}

// Initialize charts (requires Chart.js library)
function initializeDashboardCharts() {
    if (typeof Chart === 'undefined') {
        // Load Chart.js dynamically if not present
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = createCharts;
        document.head.appendChild(script);
    } else {
        createCharts();
    }
}

function createCharts() {
    // Build activity chart
    const buildCtx = document.getElementById('buildChart')?.getContext('2d');
    if (buildCtx) {
        new Chart(buildCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Builds',
                    data: [65, 72, 68, 85, 94, 78, 82],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
    
    // Resource usage chart
    const resourceCtx = document.getElementById('resourceChart')?.getContext('2d');
    if (resourceCtx) {
        new Chart(resourceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Used', 'Available'],
                datasets: [{
                    data: [4.2, 11.8],
                    backgroundColor: ['#6366f1', '#e2e8f0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}