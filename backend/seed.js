const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Incident = require('./models/Incident');

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    await User.deleteMany();
    await Incident.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedReporterPassword = await bcrypt.hash('password123', salt);
    const hashedResolverPassword = await bcrypt.hash('password123', salt);

    const users = await User.create([
      {
        name: 'John Reporter',
        email: 'reporter@example.com',
        password: hashedReporterPassword,
        role: 'REPORTER',
      },
      {
        name: 'Jane Resolver',
        email: 'resolver@example.com',
        password: hashedResolverPassword,
        role: 'RESOLVER',
      },
    ]);

    const reporter = users[0];

    await Incident.create([
      {
        title: 'Server Down',
        description: 'Main production server is not responding.',
        priority: 'CRITICAL',
        status: 'OPEN',
        createdBy: reporter._id,
      },
      {
        title: 'Login page layout issue',
        description: 'The login button is misaligned on mobile.',
        priority: 'LOW',
        status: 'IN_PROGRESS',
        createdBy: reporter._id,
      },
    ]);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
