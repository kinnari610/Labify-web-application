-- Clear existing data
DELETE FROM payments;
DELETE FROM appointments;
DELETE FROM test_packages;
DELETE FROM labs;

-- Insert test packages with UUIDs
INSERT INTO test_packages (id, name, description, price, original_price, category, tests_included, created_at, updated_at) VALUES
(gen_random_uuid(), 'Complete Health Checkup', 'Comprehensive health assessment including blood tests, urine analysis, and vital checks with 50+ parameters', 1999, 4500, 'Health Checkup', ARRAY['Blood Sugar', 'Cholesterol', 'Liver Function', 'Kidney Function', 'CBC', 'Urine Analysis'], NOW(), NOW()),
(gen_random_uuid(), 'Diabetes Care Package', 'Complete diabetes monitoring with HbA1c, fasting glucose, and comprehensive metabolic panel', 1299, 2800, 'Diabetes', ARRAY['HbA1c', 'Fasting Glucose', 'Post Meal Glucose', 'Insulin', 'Lipid Profile'], NOW(), NOW()),
(gen_random_uuid(), 'Heart Health Screening', 'Complete cardiac assessment including lipid profile, ECG, and cardiac risk markers', 1599, 3200, 'Cardiology', ARRAY['ECG', 'Lipid Profile', 'Troponin', 'CRP', 'Homocysteine'], NOW(), NOW()),
(gen_random_uuid(), 'Blood Test Package', 'Essential blood tests for general health monitoring', 2000, 2000, 'General', ARRAY['CBC', 'Blood Sugar', 'Cholesterol', 'Liver Function'], NOW(), NOW()),
(gen_random_uuid(), 'Home Collection Package', 'Convenient home sample collection service', 500, 500, 'Service', ARRAY['Home Visit', 'Sample Collection'], NOW(), NOW()),
(gen_random_uuid(), 'Comprehensive Health Screening', 'Full body checkup with advanced screening', 5000, 5000, 'Health Checkup', ARRAY['Full Body Scan', 'Doctor Consultation', 'Health Report', '50+ Tests'], NOW(), NOW());

-- Insert labs
INSERT INTO labs (id, name, address, city, state, pincode, services, phone, email, latitude, longitude, created_at, updated_at) VALUES
(gen_random_uuid(), 'Grace Laboratory', '67 Silver Coin Complex, Lalbaug Road, Makarpura', 'Vadodara', 'Gujarat', '390010', ARRAY['Blood Tests', 'Urine Tests', 'Pathology', 'Biochemistry'], '+91-265-2234567', 'grace@lab.com', 22.3072, 73.1812, NOW(), NOW()),
(gen_random_uuid(), 'Makarpura Diagnostics & Research', 'Indulal Yagnik Road, GIDC Industrial Area, Makarpura', 'Vadodara', 'Gujarat', '390010', ARRAY['Blood Tests', 'Radiology', 'CT Scan', 'MRI', 'Research'], '+91-265-2345678', 'makarpura@diag.com', 22.3082, 73.1822, NOW(), NOW()),
(gen_random_uuid(), 'SRL Diagnostics', '43/A, Sampatrao Colony, Alkapuri', 'Vadodara', 'Gujarat', '390007', ARRAY['Blood Tests', 'Molecular Diagnostics', 'Pathology', 'Radiology', 'Home Collection'], '+91-265-2678901', 'srl@diag.com', 22.3062, 73.1882, NOW(), NOW()),
(gen_random_uuid(), 'Param Imaging Centre', '1st Floor, Sunrise Complex, Waghodia Road', 'Vadodara', 'Gujarat', '390019', ARRAY['CT Scan', 'MRI', 'X-Ray', 'Ultrasound', 'Mammography'], '+91-265-2789012', 'param@imaging.com', 22.2982, 73.1742, NOW(), NOW()),
(gen_random_uuid(), 'Apollo Clinic', 'Cosmic Enclave, Sama Road', 'Vadodara', 'Gujarat', '390008', ARRAY['Blood Tests', 'Health Checkups', 'Consultation', 'Pharmacy'], '+91-265-3012345', 'apollo@clinic.com', 22.3152, 73.1902, NOW(), NOW()),
(gen_random_uuid(), 'Baroda Heart Institute & Research', '44, Haribhakti Colony, Old Padra Road', 'Vadodara', 'Gujarat', '390015', ARRAY['Cardiology', 'ECG', 'Echo', 'Stress Test', 'Heart Surgery'], '+91-265-3234567', 'bhardc@heart.com', 22.3142, 73.1852, NOW(), NOW()),
(gen_random_uuid(), 'Metropolis Healthcare Ltd', '101, Soho Complex, Malhar Cross Road, Old Padra Road', 'Vadodara', 'Gujarat', '390015', ARRAY['Blood Tests', 'Molecular Diagnostics', 'Genetics', 'Pathology', 'Home Collection'], '+91-265-3678901', 'metro@health.com', 22.3132, 73.1832, NOW(), NOW()),
(gen_random_uuid(), 'Dr. Lal PathLabs Jetalpur', 'Capri House 2, Sudha Nagar, Jetalpur Road', 'Vadodara', 'Gujarat', '390021', ARRAY['Blood Tests', 'Pathology', 'Radiology', 'Home Collection'], '+91-265-3901234', 'drlal@path.com', 22.3192, 73.1772, NOW(), NOW()),
(gen_random_uuid(), 'Thyrocare Main Branch', 'RAMVE PLAZA, Kharivav Road, Dandia Bazar', 'Vadodara', 'Gujarat', '390001', ARRAY['Thyroid Tests', 'Hormone Tests', 'Blood Tests', 'Home Collection'], '+91-265-6567890', 'thyrocare@main.com', 22.3002, 73.1652, NOW(), NOW()),
(gen_random_uuid(), 'Wellness Diagnostic Centre', 'Indiabulls Megamall, Jetalpur Road', 'Vadodara', 'Gujarat', '390021', ARRAY['Blood Tests', 'Health Checkups', 'Wellness Programs'], '+91-265-5678901', 'wellness@diag.com', 22.3182, 73.1762, NOW(), NOW());
