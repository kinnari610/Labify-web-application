-- Clear existing data
DELETE FROM test_packages;
DELETE FROM labs;

-- Insert test packages
INSERT INTO test_packages (id, name, description, price, original_price, category, tests_included, created_at, updated_at) VALUES
('pkg1', 'Full Body Checkup Premium', 'Comprehensive health assessment with 50+ tests', 360, 600, 'Health Checkup', ARRAY['CBC', 'Liver Function', 'Kidney Function', 'Thyroid Profile', 'Blood Sugar', 'Cholesterol'], NOW(), NOW()),
('pkg2', 'Diabetes Care Package', 'Complete diabetes monitoring and management', 450, 750, 'Diabetes', ARRAY['Fasting Blood Sugar', 'PP Blood Sugar', 'HbA1c', 'Lipid Profile', 'Kidney Function'], NOW(), NOW()),
('pkg3', 'Heart Health Package', 'Comprehensive cardiac assessment', 850, 1200, 'Cardiology', ARRAY['Lipid Profile', 'ECG', 'Troponin', 'Heart Rate', 'Blood Pressure'], NOW(), NOW()),
('pkg4', 'Women Care Package', 'Specialized health checkup for women', 650, 900, 'Women Health', ARRAY['CBC', 'Thyroid Profile', 'Hormone Profile', 'Pregnancy Test'], NOW(), NOW()),
('pkg5', 'Thyroid Profile Complete', 'Complete thyroid function assessment', 320, 450, 'Hormonal', ARRAY['T3', 'T4', 'TSH', 'TPO Antibody'], NOW(), NOW());

-- Insert labs
INSERT INTO labs (id, name, address, city, state, pincode, services, phone, email, latitude, longitude, created_at, updated_at) VALUES
('lab1', 'Grace Laboratory', '67 Silver Coin Complex, Lalbaug Road, Makarpura', 'Vadodara', 'Gujarat', '390010', ARRAY['Blood Tests', 'Urine Tests', 'Pathology', 'Biochemistry'], '+91-265-2234567', 'grace@lab.com', 22.3072, 73.1812, NOW(), NOW()),
('lab2', 'Makarpura Diagnostics & Research', 'Indulal Yagnik Road, GIDC Industrial Area, Makarpura', 'Vadodara', 'Gujarat', '390010', ARRAY['Blood Tests', 'Radiology', 'CT Scan', 'MRI', 'Research'], '+91-265-2345678', 'makarpura@diag.com', 22.3082, 73.1822, NOW(), NOW()),
('lab3', 'SRL Diagnostics', '43/A, Sampatrao Colony, Alkapuri', 'Vadodara', 'Gujarat', '390007', ARRAY['Blood Tests', 'Molecular Diagnostics', 'Pathology', 'Radiology', 'Home Collection'], '+91-265-2678901', 'srl@diag.com', 22.3062, 73.1882, NOW(), NOW()),
('lab4', 'Param Imaging Centre', '1st Floor, Sunrise Complex, Waghodia Road', 'Vadodara', 'Gujarat', '390019', ARRAY['CT Scan', 'MRI', 'X-Ray', 'Ultrasound', 'Mammography'], '+91-265-2789012', 'param@imaging.com', 22.2982, 73.1742, NOW(), NOW()),
('lab5', 'Apollo Clinic', 'Cosmic Enclave, Sama Road', 'Vadodara', 'Gujarat', '390008', ARRAY['Blood Tests', 'Health Checkups', 'Consultation', 'Pharmacy'], '+91-265-3012345', 'apollo@clinic.com', 22.3152, 73.1902, NOW(), NOW()),
('lab6', 'Baroda Heart Institute & Research', '44, Haribhakti Colony, Old Padra Road', 'Vadodara', 'Gujarat', '390015', ARRAY['Cardiology', 'ECG', 'Echo', 'Stress Test', 'Heart Surgery'], '+91-265-3234567', 'bhardc@heart.com', 22.3142, 73.1852, NOW(), NOW()),
('lab7', 'Metropolis Healthcare Ltd', '101, Soho Complex, Malhar Cross Road, Old Padra Road', 'Vadodara', 'Gujarat', '390015', ARRAY['Blood Tests', 'Molecular Diagnostics', 'Genetics', 'Pathology', 'Home Collection'], '+91-265-3678901', 'metro@health.com', 22.3132, 73.1832, NOW(), NOW()),
('lab8', 'Dr. Lal PathLabs Jetalpur', 'Capri House 2, Sudha Nagar, Jetalpur Road', 'Vadodara', 'Gujarat', '390021', ARRAY['Blood Tests', 'Pathology', 'Radiology', 'Home Collection'], '+91-265-3901234', 'drlal@path.com', 22.3192, 73.1772, NOW(), NOW()),
('lab9', 'Thyrocare Main Branch', 'RAMVE PLAZA, Kharivav Road, Dandia Bazar', 'Vadodara', 'Gujarat', '390001', ARRAY['Thyroid Tests', 'Hormone Tests', 'Blood Tests', 'Home Collection'], '+91-265-6567890', 'thyrocare@main.com', 22.3002, 73.1652, NOW(), NOW()),
('lab10', 'Wellness Diagnostic Centre', 'Indiabulls Megamall, Jetalpur Road', 'Vadodara', 'Gujarat', '390021', ARRAY['Blood Tests', 'Health Checkups', 'Wellness Programs'], '+91-265-5678901', 'wellness@diag.com', 22.3182, 73.1762, NOW(), NOW());
