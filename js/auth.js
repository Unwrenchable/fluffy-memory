// User Authentication System
// Provides login, signup, session management, and progress tracking

class AuthenticationSystem {
    constructor() {
        this.currentUser = null;
        this.storageKey = 'medhelper_users';
        this.sessionKey = 'medhelper_session';
        this.init();
    }

    // Initialize authentication system
    init() {
        // Check for existing session
        const session = this.getSession();
        if (session && session.userId) {
            const user = this.getUserById(session.userId);
            if (user) {
                this.currentUser = user;
                this.updateLastLogin();
            } else {
                // Invalid session, clear it
                this.clearSession();
            }
        }
    }

    // Get all users from localStorage
    getAllUsers() {
        const usersJson = localStorage.getItem(this.storageKey);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    // Save all users to localStorage
    saveAllUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    // Get user by ID
    getUserById(userId) {
        const users = this.getAllUsers();
        return users.find(u => u.id === userId);
    }

    // Get user by email
    getUserByEmail(email) {
        const users = this.getAllUsers();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    // Sign up new user
    signup(email, password, name) {
        // Validate inputs
        if (!email || !password || !name) {
            return { success: false, error: 'All fields are required' };
        }

        if (!this.isValidEmail(email)) {
            return { success: false, error: 'Invalid email address' };
        }

        if (password.length < 6) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }

        // Check if user already exists
        if (this.getUserByEmail(email)) {
            return { success: false, error: 'An account with this email already exists' };
        }

        // Create new user
        const users = this.getAllUsers();
        const newUser = {
            id: this.generateUserId(),
            email: email,
            password: this.hashPassword(password), // Simple hash for demo
            name: name,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            progress: {},
            documents: [],
            preferences: {
                emailNotifications: true,
                saveProgress: true
            }
        };

        users.push(newUser);
        this.saveAllUsers(users);

        // Auto login after signup
        this.currentUser = newUser;
        this.createSession(newUser.id);

        return { success: true, user: this.sanitizeUser(newUser) };
    }

    // Login user
    login(email, password) {
        // Validate inputs
        if (!email || !password) {
            return { success: false, error: 'Email and password are required' };
        }

        // Find user
        const user = this.getUserByEmail(email);
        if (!user) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Verify password
        if (this.hashPassword(password) !== user.password) {
            return { success: false, error: 'Invalid email or password' };
        }

        // Login successful
        this.currentUser = user;
        this.updateLastLogin();
        this.createSession(user.id);

        return { success: true, user: this.sanitizeUser(user) };
    }

    // Logout user
    logout() {
        this.currentUser = null;
        this.clearSession();
        return { success: true };
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user (sanitized)
    getCurrentUser() {
        return this.currentUser ? this.sanitizeUser(this.currentUser) : null;
    }

    // Update user progress
    saveProgress(progressData) {
        if (!this.isLoggedIn()) {
            return { success: false, error: 'User not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) {
            return { success: false, error: 'User not found' };
        }

        // Update progress
        users[userIndex].progress = {
            ...users[userIndex].progress,
            ...progressData,
            lastUpdated: new Date().toISOString()
        };

        this.saveAllUsers(users);
        this.currentUser = users[userIndex];

        return { success: true };
    }

    // Get user progress
    getProgress() {
        if (!this.isLoggedIn()) {
            return null;
        }
        return this.currentUser.progress || {};
    }

    // Save document to user's library
    saveDocument(document) {
        if (!this.isLoggedIn()) {
            return { success: false, error: 'User not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) {
            return { success: false, error: 'User not found' };
        }

        // Add document to user's library
        if (!users[userIndex].documents) {
            users[userIndex].documents = [];
        }

        const documentWithMeta = {
            ...document,
            id: this.generateDocumentId(),
            savedAt: new Date().toISOString()
        };

        users[userIndex].documents.push(documentWithMeta);
        this.saveAllUsers(users);
        this.currentUser = users[userIndex];

        return { success: true, document: documentWithMeta };
    }

    // Get user's saved documents
    getSavedDocuments() {
        if (!this.isLoggedIn()) {
            return [];
        }
        return this.currentUser.documents || [];
    }

    // Delete saved document
    deleteDocument(documentId) {
        if (!this.isLoggedIn()) {
            return { success: false, error: 'User not logged in' };
        }

        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex === -1) {
            return { success: false, error: 'User not found' };
        }

        users[userIndex].documents = users[userIndex].documents.filter(d => d.id !== documentId);
        this.saveAllUsers(users);
        this.currentUser = users[userIndex];

        return { success: true };
    }

    // Helper: Create session
    createSession(userId) {
        const session = {
            userId: userId,
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days
        };
        sessionStorage.setItem(this.sessionKey, JSON.stringify(session));
    }

    // Helper: Get session
    getSession() {
        const sessionJson = sessionStorage.getItem(this.sessionKey);
        if (!sessionJson) return null;
        
        const session = JSON.parse(sessionJson);
        
        // Check if session expired
        if (new Date(session.expiresAt) < new Date()) {
            this.clearSession();
            return null;
        }
        
        return session;
    }

    // Helper: Clear session
    clearSession() {
        sessionStorage.removeItem(this.sessionKey);
    }

    // Helper: Update last login time
    updateLastLogin() {
        const users = this.getAllUsers();
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        
        if (userIndex !== -1) {
            users[userIndex].lastLogin = new Date().toISOString();
            this.saveAllUsers(users);
        }
    }

    // Helper: Validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper: Simple password hashing (for demo purposes only)
    // WARNING: This is NOT secure for production use!
    // In production, use a proper backend with bcrypt or similar secure hashing
    hashPassword(password) {
        // This is a simple hash for demonstration only
        // DO NOT use this in production - passwords can be easily extracted from localStorage
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'hash_' + hash.toString(36);
    }

    // Helper: Generate unique user ID
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
    }

    // Helper: Generate unique document ID
    generateDocumentId() {
        return 'doc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 11);
    }

    // Helper: Remove sensitive data from user object
    sanitizeUser(user) {
        const { password, ...sanitized } = user;
        return sanitized;
    }
}

// Initialize global authentication system
if (typeof window !== 'undefined') {
    window.authSystem = new AuthenticationSystem();
}
