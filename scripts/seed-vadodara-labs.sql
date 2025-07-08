-- Insert Vadodara laboratories data
INSERT INTO labs (name, address, city, state, pincode, phone, email, latitude, longitude, operating_hours, services) VALUES

-- Vadodara Labs Data
('Grace Laboratory', '67 Silver Coin Complex, Lalbaug Road, Makarpura', 'Vadodara', 'Gujarat', '390009', '+91-265-2234567', 'grace@lab.com', 22.3072, 73.1812, '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "7:00-18:00", "sunday": "8:00-16:00"}', ARRAY['Blood Tests', 'Urine Tests', 'Pathology']),

('Makarpura Diagnostics & Research', 'Indulal Yagnik Road, GIDC Industrial Area, Makarpura', 'Vadodara', 'Gujarat', '390009', '+91-265-2345678', 'makarpura@diagnostics.com', 22.3072, 73.1812, '{"monday": "6:00-21:00", "tuesday": "6:00-21:00", "wednesday": "6:00-21:00", "thursday": "6:00-21:00", "friday": "6:00-21:00", "saturday": "6:00-19:00", "sunday": "7:00-18:00"}', ARRAY['Blood Tests', 'Radiology', 'CT Scan', 'MRI']),

('Dr. Rakesh N Shah', 'Patel Pen Center Gali, Raopura', 'Vadodara', 'Gujarat', '390001', '+91-265-2456789', 'drrakesh@clinic.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Blood Tests', 'Consultation', 'General Medicine']),

('Shubh Aarogyam Pvt Ltd', 'Gurukul Avenue', 'Vadodara', 'Gujarat', '390002', '+91-265-2567890', 'shubh@aarogyam.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'Health Checkups', 'Preventive Care']),

('SRL Diagnostics Vadodara', '43/A, Sampatrao Colony, Alkapuri', 'Vadodara', 'Gujarat', '390007', '+91-265-2678901', 'vadodara@srl.com', 22.3072, 73.1812, '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-22:00", "saturday": "6:00-20:00", "sunday": "7:00-19:00"}', ARRAY['Blood Tests', 'Molecular Diagnostics', 'Pathology', 'Radiology']),

('Param Imaging Centre', '1st Floor, Sunrise Complex, Waghodia Road', 'Vadodara', 'Gujarat', '390019', '+91-265-2789012', 'param@imaging.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['CT Scan', 'MRI', 'X-Ray', 'Ultrasound']),

('Sterling Accuris Diagnostics', 'Memories House, Sampatrao, Alkapuri', 'Vadodara', 'Gujarat', '390007', '+91-265-2890123', 'sterling@accuris.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'Biochemistry', 'Microbiology', 'Pathology']),

('Sneh Hospital', 'Fortune Complex, Sun Pharma Road, Atladara', 'Vadodara', 'Gujarat', '390012', '+91-265-2901234', 'sneh@hospital.com', 22.3072, 73.1812, '{"monday": "24:00", "tuesday": "24:00", "wednesday": "24:00", "thursday": "24:00", "friday": "24:00", "saturday": "24:00", "sunday": "24:00"}', ARRAY['Emergency Care', 'Blood Tests', 'Surgery', 'ICU']),

('Apollo Clinic Vadodara', 'Cosmic Enclave, Sama Road', 'Vadodara', 'Gujarat', '390008', '+91-265-3012345', 'vadodara@apollo.com', 22.3072, 73.1812, '{"monday": "8:00-22:00", "tuesday": "8:00-22:00", "wednesday": "8:00-22:00", "thursday": "8:00-22:00", "friday": "8:00-22:00", "saturday": "8:00-20:00", "sunday": "9:00-19:00"}', ARRAY['Blood Tests', 'Health Checkups', 'Consultation', 'Pharmacy']),

('Divine Lab Fateganj', 'Mangalkirti Apartment, Fateganj', 'Vadodara', 'Gujarat', '390002', '+91-265-3123456', 'divine@fateganj.com', 22.3072, 73.1812, '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "7:00-18:00", "sunday": "8:00-17:00"}', ARRAY['Blood Tests', 'Urine Tests', 'Pathology']),

('Baroda Heart Institute & Research', '44, Haribhakti Colony, Old Padra Road', 'Vadodara', 'Gujarat', '390015', '+91-265-3234567', 'baroda@heart.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Cardiology', 'ECG', 'Echo', 'Stress Test']),

('Baroda Imaging Center', 'Sangita Apartment, RC Dutt Road, Alkapuri', 'Vadodara', 'Gujarat', '390007', '+91-265-3345678', 'baroda@imaging.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['CT Scan', 'MRI', 'X-Ray', 'Mammography']),

('Raneshwar Multispeciality Hospital', 'Parshawnagar Society, Vasna Road', 'Vadodara', 'Gujarat', '390015', '+91-265-3456789', 'raneshwar@hospital.com', 22.3072, 73.1812, '{"monday": "24:00", "tuesday": "24:00", "wednesday": "24:00", "thursday": "24:00", "friday": "24:00", "saturday": "24:00", "sunday": "24:00"}', ARRAY['Emergency Care', 'Surgery', 'Blood Tests', 'ICU']),

('Dr. Tiwaris Diagnostic Centre', '256, Swaminarayan Nagar, Kadamnagar Road, Nizampura', 'Vadodara', 'Gujarat', '390002', '+91-265-3567890', 'tiwari@diagnostic.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'Pathology', 'Biochemistry']),

('Metropolis Healthcare Vadodara', '101, Soho Complex, Malhar Cross Road, Old Padra Road', 'Vadodara', 'Gujarat', '390015', '+91-265-3678901', 'vadodara@metropolis.com', 22.3072, 73.1812, '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-22:00", "saturday": "6:00-20:00", "sunday": "7:00-19:00"}', ARRAY['Blood Tests', 'Molecular Diagnostics', 'Genetics', 'Pathology']),

('Paramount Diagnostic & Research', 'Paramount Complex, Gotri Road', 'Vadodara', 'Gujarat', '390021', '+91-265-3789012', 'paramount@diagnostic.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'Research', 'Clinical Trials']),

('Pratham Microbiology Laboratory', '102 Mangaldhara Complex, Alkapuri', 'Vadodara', 'Gujarat', '390007', '+91-265-3890123', 'pratham@micro.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Microbiology', 'Culture Tests', 'Sensitivity Tests']),

('Dr. Lal PathLabs Jetalpur', 'Capri House 2, Sudha Nagar, Jetalpur Road', 'Vadodara', 'Gujarat', '390005', '+91-265-3901234', 'jetalpur@lal.com', 22.3072, 73.1812, '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-22:00", "saturday": "6:00-20:00", "sunday": "7:00-19:00"}', ARRAY['Blood Tests', 'Pathology', 'Radiology', 'Home Collection']),

('Shri K K Patel Nidan Kendra', 'Sayaji Ganj', 'Vadodara', 'Gujarat', '390005', '+91-265-4012345', 'kkpatel@nidan.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Blood Tests', 'Diagnostic Services']),

('Divine Lab Old Padra', 'Anannya Complex, Old Padra Road, Akshar Chowk', 'Vadodara', 'Gujarat', '390015', '+91-265-4123456', 'divine@oldpadra.com', 22.3072, 73.1812, '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "7:00-18:00", "sunday": "8:00-17:00"}', ARRAY['Blood Tests', 'Urine Tests', 'Pathology']),

('Icure Cardio Diagnostic Center', 'Acharya Nursing Home, Arunanchal Road, Gorva', 'Vadodara', 'Gujarat', '390016', '+91-265-4234567', 'icure@cardio.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Cardiology', 'ECG', 'Echo', 'Holter Monitoring']),

('Sanya GIC Imaging Pvt Ltd', 'Trauma Centre, SSG General Hospital, Sayaji Ganj', 'Vadodara', 'Gujarat', '390005', '+91-265-4345678', 'sanya@gic.com', 22.3072, 73.1812, '{"monday": "24:00", "tuesday": "24:00", "wednesday": "24:00", "thursday": "24:00", "friday": "24:00", "saturday": "24:00", "sunday": "24:00"}', ARRAY['CT Scan', 'MRI', 'X-Ray', 'Emergency Imaging']),

('Royal Diagnostic & Health Care', 'Vishwas Colony, Vadiwadi, Haripura', 'Vadodara', 'Gujarat', '390006', '+91-265-4456789', 'royal@diagnostic.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'Health Checkups', 'Preventive Care']),

('Ambe''s Advanced Clinical Laboratory', 'Pratham Plaza, Akota Garden Char Rasta, Akota', 'Vadodara', 'Gujarat', '390020', '+91-265-4567890', 'ambe@clinical.com', 22.3072, 73.1812, '{"monday": "6:00-21:00", "tuesday": "6:00-21:00", "wednesday": "6:00-21:00", "thursday": "6:00-21:00", "friday": "6:00-21:00", "saturday": "6:00-19:00", "sunday": "7:00-18:00"}', ARRAY['Blood Tests', 'Advanced Diagnostics', 'Clinical Chemistry']),

('Shital Diagnostic Clinic', 'Anandvan Complex, Subhanpura Main Road, Subhanpura', 'Vadodara', 'Gujarat', '390023', '+91-265-4678901', 'shital@diagnostic.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Blood Tests', 'Diagnostic Services']),

('Amins Pathology Referral Laboratory', 'Sanstha Vasahat, Pratap Road, Raopura', 'Vadodara', 'Gujarat', '390001', '+91-265-4789012', 'amins@pathology.com', 22.3072, 73.1812, '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "7:00-18:00", "sunday": "8:00-17:00"}', ARRAY['Pathology', 'Histopathology', 'Cytology']),

('Labopath Diagnostics', 'Sunrise Complex, Manjalpur', 'Vadodara', 'Gujarat', '390011', '+91-265-4890123', 'labopath@diagnostics.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'Pathology', 'Laboratory Services']),

('Baroda Imaging Centre Padra', 'Bhadralok Tower, Old Padra Road', 'Vadodara', 'Gujarat', '390015', '+91-265-4901234', 'padra@imaging.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['CT Scan', 'MRI', 'X-Ray', 'Ultrasound']),

('Vip Diagnostic Lab', 'Pacific Plaza, VIP Road, Karelibaug', 'Vadodara', 'Gujarat', '390018', '+91-265-5012345', 'vip@diagnostic.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'VIP Services', 'Executive Health']),

('Alakh Lab', 'Siddharth Patel Square, Old Padra Main Road', 'Vadodara', 'Gujarat', '390015', '+91-265-5123456', 'alakh@lab.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Blood Tests', 'Laboratory Services']),

('Dr. Purandares Day & Night Lab', 'Sainath Tower, Kharivav Road, Dandia Bazar', 'Vadodara', 'Gujarat', '390001', '+91-265-5234567', 'purandare@lab.com', 22.3072, 73.1812, '{"monday": "24:00", "tuesday": "24:00", "wednesday": "24:00", "thursday": "24:00", "friday": "24:00", "saturday": "24:00", "sunday": "24:00"}', ARRAY['Blood Tests', '24x7 Services', 'Emergency Lab']),

('SIDDHI ICU & Multispeciality Hospital', 'Near Fire Station, Dandia Bazar', 'Vadodara', 'Gujarat', '390001', '+91-265-5345678', 'siddhi@hospital.com', 22.3072, 73.1812, '{"monday": "24:00", "tuesday": "24:00", "wednesday": "24:00", "thursday": "24:00", "friday": "24:00", "saturday": "24:00", "sunday": "24:00"}', ARRAY['ICU', 'Emergency Care', 'Blood Tests', 'Surgery']),

('Dr. Lal PathLabs Makarpura', 'Silver Rock Complex, Main Road, Makarpura', 'Vadodara', 'Gujarat', '390009', '+91-265-5456789', 'makarpura@lal.com', 22.3072, 73.1812, '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-22:00", "saturday": "6:00-20:00", "sunday": "7:00-19:00"}', ARRAY['Blood Tests', 'Pathology', 'Radiology', 'Home Collection']),

('Sanidhya Clinic', 'Silver House, Akota', 'Vadodara', 'Gujarat', '390020', '+91-265-5567890', 'sanidhya@clinic.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Blood Tests', 'Consultation', 'General Medicine']),

('Wellness Diagnostic Centre', 'Indiabulls Megamall, Jetalpur Road', 'Vadodara', 'Gujarat', '390005', '+91-265-5678901', 'wellness@diagnostic.com', 22.3072, 73.1812, '{"monday": "10:00-22:00", "tuesday": "10:00-22:00", "wednesday": "10:00-22:00", "thursday": "10:00-22:00", "friday": "10:00-22:00", "saturday": "10:00-22:00", "sunday": "10:00-21:00"}', ARRAY['Blood Tests', 'Health Checkups', 'Wellness Programs']),

('Phoenix Diagnostic Lab', 'Shreeji Complex, Dabhoi Sinor Road, Dabhoi', 'Vadodara', 'Gujarat', '391110', '+91-265-5789012', 'phoenix@diagnostic.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Blood Tests', 'Diagnostic Services']),

('Ami Lab', 'Arpan Complex, Delux Char Rasta, Nizampura', 'Vadodara', 'Gujarat', '390002', '+91-265-5890123', 'ami@lab.com', 22.3072, 73.1812, '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "7:00-18:00", "sunday": "8:00-17:00"}', ARRAY['Blood Tests', 'Laboratory Services']),

('Om Imaging Centre', 'Shree Sai Avenue, Yogi Society, Waghodia Road', 'Vadodara', 'Gujarat', '390019', '+91-265-5901234', 'om@imaging.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['CT Scan', 'MRI', 'X-Ray', 'Ultrasound']),

('Snaap Oral Diagnosis & Radiology', 'Trivia, Natubhai Circle, Race Course Road', 'Vadodara', 'Gujarat', '390007', '+91-265-6012345', 'snaap@oral.com', 22.3072, 73.1812, '{"monday": "9:00-19:00", "tuesday": "9:00-19:00", "wednesday": "9:00-19:00", "thursday": "9:00-19:00", "friday": "9:00-19:00", "saturday": "9:00-17:00", "sunday": "10:00-16:00"}', ARRAY['Oral Radiology', 'Dental X-Ray', 'OPG']),

('Aster Diagnostics & Research Centre', 'Nandigram Society, Sindhvai Mata Road, Manjalpur', 'Vadodara', 'Gujarat', '390011', '+91-265-6123456', 'aster@diagnostics.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'Research', 'Advanced Diagnostics']),

('Dr. Lal PathLabs Ajwa', 'Saraswati Apartment, New VIP Road, Ajwa Road', 'Vadodara', 'Gujarat', '390019', '+91-265-6234567', 'ajwa@lal.com', 22.3072, 73.1812, '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-22:00", "saturday": "6:00-20:00", "sunday": "7:00-19:00"}', ARRAY['Blood Tests', 'Pathology', 'Radiology', 'Home Collection']),

('Arogyam Microcare Pvt Ltd', 'Dandia Bazar', 'Vadodara', 'Gujarat', '390001', '+91-265-6345678', 'arogyam@microcare.com', 22.3072, 73.1812, '{"monday": "8:00-20:00", "tuesday": "8:00-20:00", "wednesday": "8:00-20:00", "thursday": "8:00-20:00", "friday": "8:00-20:00", "saturday": "8:00-18:00", "sunday": "9:00-17:00"}', ARRAY['Blood Tests', 'Microbiology', 'Pathology']),

('Divine Lab Chhani', 'Eshanti Sira, Ramakaka Dairy Road, Chhani', 'Vadodara', 'Gujarat', '390024', '+91-265-6456789', 'divine@chhani.com', 22.3072, 73.1812, '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "7:00-18:00", "sunday": "8:00-17:00"}', ARRAY['Blood Tests', 'Urine Tests', 'Pathology']),

('Thyrocare Main Branch', 'RAMVE PLAZA, Kharivav Road, Dandia Bazar', 'Vadodara', 'Gujarat', '390001', '+91-265-6567890', 'vadodara@thyrocare.com', 22.3072, 73.1812, '{"monday": "6:00-21:00", "tuesday": "6:00-21:00", "wednesday": "6:00-21:00", "thursday": "6:00-21:00", "friday": "6:00-21:00", "saturday": "6:00-19:00", "sunday": "7:00-18:00"}', ARRAY['Thyroid Tests', 'Hormone Tests', 'Blood Tests', 'Home Collection']),

('Krishna Laboratory', 'Padmini Complex, Waghodia Road', 'Vadodara', 'Gujarat', '390019', '+91-265-6678901', 'krishna@lab.com', 22.3072, 73.1812, '{"monday": "7:00-20:00", "tuesday": "7:00-20:00", "wednesday": "7:00-20:00", "thursday": "7:00-20:00", "friday": "7:00-20:00", "saturday": "7:00-18:00", "sunday": "8:00-17:00"}', ARRAY['Blood Tests', 'Laboratory Services']),

('Dr. Lal Pathlabs Vasna', 'Yajman Complex, Vasna Road', 'Vadodara', 'Gujarat', '390015', '+91-265-6789012', 'vasna@lal.com', 22.3072, 73.1812, '{"monday": "6:00-22:00", "tuesday": "6:00-22:00", "wednesday": "6:00-22:00", "thursday": "6:00-22:00", "friday": "6:00-22:00", "saturday": "6:00-20:00", "sunday": "7:00-19:00"}', ARRAY['Blood Tests', 'Pathology', 'Radiology', 'Home Collection']),

('Unipath Speciality Laboratory LLP', 'Platinum Complex, Akota', 'Vadodara', 'Gujarat', '390020', '+91-265-6890123', 'unipath@speciality.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Speciality Tests', 'Advanced Diagnostics', 'Blood Tests']),

('Shree Hospital & Maternity Home', 'Rajratan Complex, Vasna Road', 'Vadodara', 'Gujarat', '390015', '+91-265-6901234', 'shree@hospital.com', 22.3072, 73.1812, '{"monday": "24:00", "tuesday": "24:00", "wednesday": "24:00", "thursday": "24:00", "friday": "24:00", "saturday": "24:00", "sunday": "24:00"}', ARRAY['Maternity Care', 'Blood Tests', 'Gynecology', 'Pediatrics']),

('Thyrocare Aarogyam Centre', 'Meera Society, Ajwa Road', 'Vadodara', 'Gujarat', '390019', '+91-265-7012345', 'aarogyam@thyrocare.com', 22.3072, 73.1812, '{"monday": "6:00-21:00", "tuesday": "6:00-21:00", "wednesday": "6:00-21:00", "thursday": "6:00-21:00", "friday": "6:00-21:00", "saturday": "6:00-19:00", "sunday": "7:00-18:00"}', ARRAY['Thyroid Tests', 'Hormone Tests', 'Health Packages', 'Home Collection']),

('Akar Diagnostic Lab', 'Avishkar Complex, Old Padra Road', 'Vadodara', 'Gujarat', '390015', '+91-265-7123456', 'akar@diagnostic.com', 22.3072, 73.1812, '{"monday": "7:00-21:00", "tuesday": "7:00-21:00", "wednesday": "7:00-21:00", "thursday": "7:00-21:00", "friday": "7:00-21:00", "saturday": "7:00-19:00", "sunday": "8:00-18:00"}', ARRAY['Blood Tests', 'Diagnostic Services', 'Pathology']);

-- Update the demo data to include Vadodara labs
UPDATE labs SET 
  latitude = 22.3072 + (RANDOM() - 0.5) * 0.1,
  longitude = 73.1812 + (RANDOM() - 0.5) * 0.1
WHERE city = 'Vadodara';
