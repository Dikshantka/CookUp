/**
 * ====================================================================
 * DEMO LOGIN FUNCTIONALITY
 * Client-side demo for Vercel deployment
 * Note: This is for demonstration only - not secure for production
 * ====================================================================
 */

// Demo user accounts for testing
const demoUsers = [
    {
        username: 'admin',
        password: 'admin123',
        isAdmin: true,
        name: 'Administrator'
    },
    {
        username: 'demo',
        password: 'demo123',
        isAdmin: false,
        name: 'Demo User'
    },
    {
        username: 'chef',
        password: 'chef123',
        isAdmin: false,
        name: 'Chef Demo'
    }
];

/**
 * Handle demo login
 */
function handleDemoLogin(username, password) {
    // Find user in demo accounts
    const user = demoUsers.find(u => 
        u.username === username && u.password === password
    );
    
    if (user) {
        // Store user session in localStorage for demo
        localStorage.setItem('cookup_demo_user', JSON.stringify({
            username: user.username,
            name: user.name,
            isAdmin: user.isAdmin,
            loginTime: new Date().toISOString()
        }));
        
        // Redirect based on user type
        if (user.isAdmin) {
            showSuccessMessage('Admin login successful! Redirecting to dashboard...');
            setTimeout(() => {
                window.location.href = 'admin_demo.html';
            }, 1500);
        } else {
            showSuccessMessage('Login successful! Redirecting to recipes...');
            setTimeout(() => {
                window.location.href = 'recipes.html';
            }, 1500);
        }
        return true;
    } else {
        showErrorMessage('Invalid username or password! Try: demo/demo123 or admin/admin123');
        return false;
    }
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return localStorage.getItem('cookup_demo_user') !== null;
}

/**
 * Get current user
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('cookup_demo_user');
    return userStr ? JSON.parse(userStr) : null;
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('cookup_demo_user');
    showSuccessMessage('Logged out successfully!');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    showMessage(message, 'error');
}

/**
 * Show message with styling
 */
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.demo-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `demo-message ${type}`;
    messageDiv.innerHTML = message;
    
    // Style the message
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' : 'background: linear-gradient(135deg, #f44336, #d32f2f);'}
    `;
    
    // Add to page
    document.body.appendChild(messageDiv);
    
    // Animate in
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(0)';
        messageDiv.style.opacity = '1';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        messageDiv.style.transform = 'translateX(100%)';
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 4000);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleDemoLogin,
        isLoggedIn,
        getCurrentUser,
        logout,
        showSuccessMessage,
        showErrorMessage
    };
}
