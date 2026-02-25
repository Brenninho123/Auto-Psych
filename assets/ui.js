// UI Management and Dynamic Content
let currentSection = 'dashboard';

// Navigation
function setSection(section) {
    currentSection = section;
    
    // Update active button
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`nav-${section}`).classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        builder: 'Build Configuration',
        launcher: 'Application Launcher',
        docker: 'Docker Management',
        ci: 'CI/CD Pipeline'
    };
    document.getElementById('page-title').textContent = titles[section];
    
    // Load section content
    loadSectionContent(section);
    
    // Add log entry
    addLogEntry(`Navigated to ${titles[section]}`, 'info');
}

// Load content for each section
function loadSectionContent(section) {
    const contentArea = document.getElementById('content');
    
    switch(section) {
        case 'dashboard':
            contentArea.innerHTML = getDashboardHTML();
            break;
        case 'builder':
            contentArea.innerHTML = getBuilderHTML();
            break;
        case 'launcher':
            contentArea.innerHTML = getLauncherHTML();
            break;
        case 'docker':
            contentArea.innerHTML = getDockerHTML();
            break;
        case 'ci':
            contentArea.innerHTML = getCIHTML();
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
                    <i class="fas fa-code-branch"></i>
                </div>
                <div class="stat-value">156</div>
                <div class="stat-change positive">↑ 12% from last week</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Active Containers</h3>
                    <i class="fas fa-cubes"></i>
                </div>
                <div class="stat-value">8</div>
                <div class="stat-change">4 running, 4 stopped</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Success Rate</h3>
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-value">98.5%</div>
                <div class="stat-change positive">↑ 2.3%</div>
            </div>
            
            <div class="stat-card">
                <div class="stat-card-header">
                    <h3>Avg Build Time</h3>
                    <i class="fas fa-clock"></i>
                </div>
                <div class="stat-value">2.4m</div>
                <div class="stat-change negative">↓ 0.3m</div>
            </div>
        </div>
        
        <div style="background: white; border-radius: 16px; padding: 24px; border: 1px solid var(--border-color);">
            <h3 style="margin-bottom: 16px;">Recent Activity</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color);">
                    <span><i class="fas fa-check-circle" style="color: var(--secondary-color);"></i> Build #156 completed</span>
                    <span style="color: var(--text-secondary);">2 minutes ago</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px; border-bottom: 1px solid var(--border-color);">
                    <span><i class="fas fa-play-circle" style="color: var(--primary-color);"></i> Container web-app started</span>
                    <span style="color: var(--text-secondary);">15 minutes ago</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 8px;">
                    <span><i class="fas fa-sync-alt" style="color: var(--warning-color);"></i> CI/CD pipeline triggered</span>
                    <span style="color: var(--text-secondary);">1 hour ago</span>
                </div>
            </div>
        </div>
    `;
}

// Builder HTML
function getBuilderHTML() {
    return `
        <div class="builder-container">
            <h3 style="margin-bottom: 20px;">Build Configuration</h3>
            
            <div class="builder-config">
                <div class="config-group">
                    <label>Repository URL</label>
                    <input type="text" placeholder="https://github.com/user/repo.git" value="https://github.com/autopsych/core.git">
                </div>
                
                <div class="config-group">
                    <label>Branch</label>
                    <select>
                        <option>main</option>
                        <option>develop</option>
                        <option>feature/new-ui</option>
                    </select>
                </div>
                
                <div class="config-group">
                    <label>Build Command</label>
                    <input type="text" value="npm run build">
                </div>
                
                <div class="config-group">
                    <label>Environment Variables</label>
                    <textarea rows="4">NODE_ENV=production
API_KEY=${'${API_KEY}'}
DATABASE_URL=${'${DATABASE_URL}'}</textarea>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button class="primary-btn" onclick="startBuild()">
                    <i class="fas fa-play"></i> Start Build
                </button>
                <button class="secondary-btn" onclick="saveConfig()">
                    <i class="fas fa-save"></i> Save Configuration
                </button>
            </div>
        </div>
    `;
}

// Launcher HTML
function getLauncherHTML() {
    return `
        <div class="builder-container">
            <h3 style="margin-bottom: 20px;">Application Launcher</h3>
            
            <div class="builder-config">
                <div class="config-group">
                    <label>Application</label>
                    <select id="app-select" onchange="updateAppConfig()">
                        <option>Web Frontend</option>
                        <option>API Server</option>
                        <option>Database</option>
                        <option>Cache Service</option>
                    </select>
                </div>
                
                <div class="config-group">
                    <label>Version</label>
                    <select>
                        <option>latest</option>
                        <option>2.1.0</option>
                        <option>2.0.5</option>
                        <option>1.9.8</option>
                    </select>
                </div>
                
                <div class="config-group">
                    <label>Port Mapping</label>
                    <input type="text" value="3000:3000">
                </div>
                
                <div class="config-group">
                    <label>Resources</label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <input type="text" placeholder="CPU cores" value="2">
                        <input type="text" placeholder="Memory (MB)" value="1024">
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button class="primary-btn" onclick="launchApplication()">
                    <i class="fas fa-play"></i> Launch Application
                </button>
                <button class="secondary-btn" onclick="stopApplication()">
                    <i class="fas fa-stop"></i> Stop
                </button>
            </div>
        </div>
    `;
}

// Docker HTML
function getDockerHTML() {
    return `
        <div class="builder-container">
            <h3 style="margin-bottom: 20px;">Docker Management</h3>
            
            <div class="docker-stats">
                <div class="stat-card" style="padding: 16px;">
                    <h4>Images</h4>
                    <div style="font-size: 28px; font-weight: 600;">24</div>
                </div>
                <div class="stat-card" style="padding: 16px;">
                    <h4>Containers</h4>
                    <div style="font-size: 28px; font-weight: 600;">8</div>
                </div>
                <div class="stat-card" style="padding: 16px;">
                    <h4>Volumes</h4>
                    <div style="font-size: 28px; font-weight: 600;">12</div>
                </div>
                <div class="stat-card" style="padding: 16px;">
                    <h4>Networks</h4>
                    <div style="font-size: 28px; font-weight: 600;">5</div>
                </div>
            </div>
            
            <div class="container-list">
                <h4 style="margin-bottom: 16px;">Running Containers</h4>
                
                <div class="container-item">
                    <div>
                        <i class="fas fa-cube" style="color: var(--primary-color); margin-right: 8px;"></i>
                        web-frontend
                    </div>
                    <div>
                        <span class="container-status running">running</span>
                        <span style="margin-left: 12px; color: var(--text-secondary);">2 days</span>
                    </div>
                </div>
                
                <div class="container-item">
                    <div>
                        <i class="fas fa-cube" style="color: var(--primary-color); margin-right: 8px;"></i>
                        api-server
                    </div>
                    <div>
                        <span class="container-status running">running</span>
                        <span style="margin-left: 12px; color: var(--text-secondary);">5 days</span>
                    </div>
                </div>
                
                <div class="container-item">
                    <div>
                        <i class="fas fa-cube" style="color: var(--primary-color); margin-right: 8px;"></i>
                        postgres-db
                    </div>
                    <div>
                        <span class="container-status running">running</span>
                        <span style="margin-left: 12px; color: var(--text-secondary);">7 days</span>
                    </div>
                </div>
                
                <div class="container-item">
                    <div>
                        <i class="fas fa-cube" style="color: var(--text-secondary); margin-right: 8px;"></i>
                        redis-cache
                    </div>
                    <div>
                        <span class="container-status" style="background: #fee2e2; color: #991b1b;">stopped</span>
                        <span style="margin-left: 12px; color: var(--text-secondary);">1 hour</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button class="primary-btn" onclick="refreshContainers()">
                    <i class="fas fa-sync-alt"></i> Refresh
                </button>
                <button class="secondary-btn" onclick="pruneSystem()">
                    <i class="fas fa-trash-alt"></i> Prune System
                </button>
            </div>
        </div>
    `;
}

// CI/CD HTML
function getCIHTML() {
    return `
        <div class="builder-container">
            <h3 style="margin-bottom: 20px;">CI/CD Pipeline</h3>
            
            <div style="margin-bottom: 24px;">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
                    <span class="container-status running" style="background: var(--primary-color); color: white;">Pipeline Active</span>
                    <span>Last run: 5 minutes ago</span>
                </div>
                
                <div style="background: #f8fafc; border-radius: 8px; padding: 16px;">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <i class="fas fa-check-circle" style="color: var(--secondary-color);"></i>
                        <span>Checkout code</span>
                        <span style="margin-left: auto; color: var(--text-secondary);">2s</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <i class="fas fa-check-circle" style="color: var(--secondary-color);"></i>
                        <span>Install dependencies</span>
                        <span style="margin-left: auto; color: var(--text-secondary);">45s</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
                        <i class="fas fa-check-circle" style="color: var(--secondary-color);"></i>
                        <span>Run tests</span>
                        <span style="margin-left: auto; color: var(--text-secondary);">1m 20s</span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <i class="fas fa-spinner fa-pulse" style="color: var(--primary-color);"></i>
                        <span>Build Docker image</span>
                        <span style="margin-left: auto; color: var(--text-secondary);">In progress...</span>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px;">
                <button class="primary-btn" onclick="triggerPipeline()">
                    <i class="fas fa-play"></i> Trigger Pipeline
                </button>
                <button class="secondary-btn" onclick="viewHistory()">
                    <i class="fas fa-history"></i> View History
                </button>
            </div>
        </div>
    `;
}

// Log management
function addLogEntry(message, type = 'info') {
    const logOutput = document.getElementById('log-output');
    if (!logOutput) return;
    
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
    
    logOutput.appendChild(logEntry);
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
    
    const logs = logOutput.innerText;
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autopsych-logs-${new Date().toISOString()}.txt`;
    a.click();
    
    addLogEntry('Logs exported successfully', 'success');
}

// Action functions
function startBuild() {
    addLogEntry('Build started...', 'info');
    setTimeout(() => {
        addLogEntry('Build completed successfully!', 'success');
    }, 2000);
}

function launchApplication() {
    const app = document.getElementById('app-select')?.value || 'Application';
    addLogEntry(`Launching ${app}...`, 'info');
    setTimeout(() => {
        addLogEntry(`${app} started successfully on port 3000`, 'success');
    }, 1500);
}

function stopApplication() {
    addLogEntry('Stopping application...', 'warning');
    setTimeout(() => {
        addLogEntry('Application stopped', 'info');
    }, 1000);
}

function refreshContainers() {
    addLogEntry('Refreshing container list...', 'info');
    setTimeout(() => {
        addLogEntry('Container list updated', 'success');
    }, 800);
}

function pruneSystem() {
    addLogEntry('Starting system prune...', 'warning');
    setTimeout(() => {
        addLogEntry('System prune completed. 2.5GB freed', 'success');
    }, 3000);
}

function triggerPipeline() {
    addLogEntry('CI/CD pipeline triggered', 'info');
    setTimeout(() => {
        addLogEntry('Pipeline execution started', 'info');
    }, 500);
}

function saveConfig() {
    addLogEntry('Configuration saved', 'success');
}

function refreshData() {
    addLogEntry('Refreshing data...', 'info');
    setTimeout(() => {
        addLogEntry('Data refreshed successfully', 'success');
    }, 1000);
}

function toggleNotifications() {
    addLogEntry('Notifications panel toggled', 'info');
}

function updateAppConfig() {
    const app = document.getElementById('app-select')?.value;
    addLogEntry(`Loading configuration for ${app}...`, 'info');
}

function viewHistory() {
    addLogEntry('Loading pipeline history...', 'info');
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    // Set initial section
    setSection('dashboard');
    
    // Add initial log entries
    addLogEntry('Auto-Psych Dashboard initialized', 'success');
    addLogEntry('System ready', 'info');
    addLogEntry('Connected to Docker daemon', 'success');
});