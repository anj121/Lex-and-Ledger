const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const Service = require('../models/Service');
const Admin = require('../models/Admin');

// Sample services data
const sampleServices = [
  {
    name: 'Company Registration',
    description: 'Complete company registration services including name approval, incorporation, and compliance setup.',
    category: 'Company Formation',
    price: '₹15,000 - ₹25,000',
    duration: '7-15 business days',
    features: 'Name approval, MOA & AOA drafting, Digital signature, PAN & TAN registration',
    requirements: 'Director details, Registered office address, Business activity description',
    faq: 'Q: How long does it take? A: 7-15 business days. Q: What documents are needed? A: Director PAN, Aadhaar, address proof, and business plan.',
    status: 'active'
  },
  {
    name: 'GST Registration',
    description: 'Professional GST registration services for businesses with expert guidance and documentation support.',
    category: 'Tax Services',
    price: '₹2,000 - ₹5,000',
    duration: '3-7 business days',
    features: 'GST registration, HSN code classification, Return filing setup, Compliance guidance',
    requirements: 'Business registration, PAN card, Bank account details, Business address proof',
    faq: 'Q: Is GST mandatory? A: Yes, for businesses with turnover above ₹20 lakhs. Q: What is the validity? A: GST registration is permanent unless cancelled.',
    status: 'active'
  },
  {
    name: 'Trademark Registration',
    description: 'Secure your brand with comprehensive trademark registration services including search, filing, and monitoring.',
    category: 'Legal Services',
    price: '₹8,000 - ₹15,000',
    duration: '6-12 months',
    features: 'Trademark search, Application filing, Response to objections, Registration certificate',
    requirements: 'Brand name/logo, Business description, Class of goods/services, Applicant details',
    faq: 'Q: How long is trademark valid? A: 10 years, renewable. Q: Can I register multiple classes? A: Yes, additional fees apply for each class.',
    status: 'active'
  },
  {
    name: 'Annual Compliance Package',
    description: 'Complete annual compliance services including ROC filing, tax returns, and statutory compliance.',
    category: 'Compliance',
    price: '₹25,000 - ₹50,000',
    duration: 'Ongoing (Annual)',
    features: 'ROC filing, Tax returns, Audit reports, Compliance monitoring, Expert consultation',
    requirements: 'Financial statements, Previous year returns, Business documents, Bank statements',
    faq: 'Q: What is included? A: ROC filing, tax returns, audit reports, and compliance monitoring. Q: When is it due? A: Various deadlines throughout the year.',
    status: 'active'
  },
  {
    name: 'Business Plan Development',
    description: 'Professional business plan development with financial projections, market analysis, and investor-ready documentation.',
    category: 'Consultation',
    price: '₹15,000 - ₹30,000',
    duration: '10-15 business days',
    features: 'Market analysis, Financial projections, Risk assessment, Investor presentation, Executive summary',
    requirements: 'Business concept, Market research data, Financial information, Growth plans',
    faq: 'Q: What format is provided? A: Professional PDF and PowerPoint presentation. Q: Is revision included? A: Yes, up to 2 revisions included.',
    status: 'active'
  },
  {
    name: 'Legal Documentation',
    description: 'Comprehensive legal documentation services including contracts, agreements, and compliance documents.',
    category: 'Documentation',
    price: '₹5,000 - ₹20,000',
    duration: '3-7 business days',
    features: 'Contract drafting, Agreement templates, Legal review, Compliance documents, Expert consultation',
    requirements: 'Business details, Contract requirements, Legal specifications, Party information',
    faq: 'Q: What types of documents? A: Contracts, agreements, policies, and compliance documents. Q: Is legal review included? A: Yes, all documents are legally reviewed.',
    status: 'active'
  },
  {
    name: 'Financial Planning Consultation',
    description: 'Expert financial planning services for business growth, investment strategies, and wealth management.',
    category: 'Financial Planning',
    price: '₹10,000 - ₹25,000',
    duration: '5-10 business days',
    features: 'Financial analysis, Investment strategies, Tax planning, Risk assessment, Growth planning',
    requirements: 'Financial statements, Investment goals, Risk tolerance, Business objectives',
    faq: 'Q: What is included? A: Financial analysis, investment strategies, and tax planning. Q: Is follow-up included? A: Yes, 3 months of follow-up consultation included.',
    status: 'active'
  },
  {
    name: 'Startup Legal Package',
    description: 'Comprehensive legal package for startups including incorporation, compliance, and ongoing legal support.',
    category: 'Company Formation',
    price: '₹30,000 - ₹50,000',
    duration: '15-30 business days',
    features: 'Company registration, Legal documentation, Compliance setup, Ongoing support, Expert consultation',
    requirements: 'Startup details, Business plan, Founder information, Investment details',
    faq: 'Q: What is included? A: Company registration, legal docs, compliance setup, and ongoing support. Q: Is it suitable for all startups? A: Yes, customized for different business models.',
    status: 'active'
  }
];

// Sample admin data
const sampleAdmins = [
  {
    username: 'admin',
    email: 'admin@lexledger.com',
    password: 'admin123',
    role: 'super-admin',
    isActive: true
  },
  {
    username: 'manager',
    email: 'manager@lexledger.com',
    password: 'manager123',
    role: 'admin',
    isActive: true
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await Service.deleteMany({});
    await Admin.deleteMany({});

    // Create admin users
    console.log('👤 Creating admin users...');
    const createdAdmins = [];
    for (const adminData of sampleAdmins) {
      const admin = new Admin(adminData);
      await admin.save();
      createdAdmins.push(admin);
      console.log(`✅ Created admin: ${admin.username}`);
    }

    // Create services
    console.log('📋 Creating services...');
    const createdServices = [];
    for (const serviceData of sampleServices) {
      const service = new Service({
        ...serviceData,
        createdBy: createdAdmins[0]._id // Assign to first admin
      });
      await service.save();
      createdServices.push(service);
      console.log(`✅ Created service: ${service.name}`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log(`📊 Created ${createdAdmins.length} admin users`);
    console.log(`📊 Created ${createdServices.length} services`);
    console.log('\n📝 Login credentials:');
    console.log('Super Admin: admin / admin123');
    console.log('Admin: manager / manager123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
    process.exit(0);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
