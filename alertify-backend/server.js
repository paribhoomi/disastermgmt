const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with MongoDB/PostgreSQL in production)
const users = [];

// Helper function to find user by email
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

// ✅ ROOT ROUTE
app.get('/', (req, res) => {
  res.json({ 
    message: 'ALERTIFY Backend API is running!',
    endpoints: {
      signup: 'POST /api/signup',
      login: 'POST /api/login',
      getUser: 'GET /api/users/:email',
      updateUser: 'PUT /api/users/:email'
    }
  });
});

// ✅ SIGNUP ENDPOINT
app.post('/api/signup', async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, password } = req.body;

    // Validation
    if (!firstName || !lastName || !mobileNumber || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      firstName,
      lastName,
      mobileNumber,
      email,
      password: hashedPassword,
      bloodGroup: '',
      location: '',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    console.log('✅ User registered:', email);
    res.status(201).json({ 
      message: 'Signup successful!',
      user: {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// ✅ LOGIN ENDPOINT
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log('✅ User logged in:', email);
    res.json({ 
      message: 'Login successful!',
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ✅ GET USER PROFILE
app.get('/api/users/:email', (req, res) => {
  try {
    const { email } = req.params;

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = user;
    
    console.log('✅ User profile fetched:', email);
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error fetching user' });
  }
});

// ✅ UPDATE USER PROFILE
app.put('/api/users/:email', (req, res) => {
  try {
    const { email } = req.params;
    const { firstName, lastName, mobileNumber, bloodGroup, location } = req.body;

    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    users[userIndex] = {
      ...users[userIndex],
      firstName: firstName || users[userIndex].firstName,
      lastName: lastName || users[userIndex].lastName,
      mobileNumber: mobileNumber || users[userIndex].mobileNumber,
      bloodGroup: bloodGroup || users[userIndex].bloodGroup,
      location: location || users[userIndex].location,
      updatedAt: new Date().toISOString()
    };

    console.log('✅ User profile updated:', email);
    res.json({ 
      message: 'Profile updated successfully!',
      user: {
        firstName: users[userIndex].firstName,
        lastName: users[userIndex].lastName,
        email: users[userIndex].email
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error updating profile' });
  }
});

// ✅ DELETE USER (optional)
app.delete('/api/users/:email', (req, res) => {
  try {
    const { email } = req.params;
    
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    
    console.log('✅ User deleted:', email);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error deleting user' });
  }
});

// ✅ GET ALL USERS (for debugging - remove in production)
app.get('/api/users', (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user);
  res.json({ 
    count: users.length,
    users: usersWithoutPasswords 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ALERTIFY Backend running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/`);
});