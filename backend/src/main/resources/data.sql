-- Insert airports
INSERT INTO airport (code, name, country, city) VALUES
('JFK', 'John F. Kennedy International Airport', 'United States', 'New York'),
('LHR', 'Heathrow Airport', 'United Kingdom', 'London'),
('DXB', 'Dubai International Airport', 'United Arab Emirates', 'Dubai'),
('HND', 'Tokyo Haneda Airport', 'Japan', 'Tokyo'),
('SYD', 'Sydney Kingsford Smith Airport', 'Australia', 'Sydney'),
('CDG', 'Charles de Gaulle Airport', 'France', 'Paris'),
('ATL', 'Hartsfield-Jackson Atlanta International Airport', 'United States', 'Atlanta'),
('SIN', 'Singapore Changi Airport', 'Singapore', 'Singapore'),
('YYZ', 'Toronto Pearson International Airport', 'Canada', 'Toronto'),
('FRA', 'Frankfurt Airport', 'Germany', 'Frankfurt'),
('MAD', 'Adolfo Suárez Madrid–Barajas Airport', 'Spain', 'Madrid'),
('AMS', 'Amsterdam Schiphol Airport', 'Netherlands', 'Amsterdam'),
('GRU', 'São Paulo/Guarulhos International Airport', 'Brazil', 'São Paulo'),
('CPT', 'Cape Town International Airport', 'South Africa', 'Cape Town'),
('DOH', 'Hamad International Airport', 'Qatar', 'Doha'),
('ICN', 'Incheon International Airport', 'South Korea', 'Seoul'),
('MEX', 'Mexico City International Airport', 'Mexico', 'Mexico City'),
('DEL', 'Indira Gandhi International Airport', 'India', 'New Delhi'),
('MEL', 'Melbourne Airport', 'Australia', 'Melbourne'),
('WAW', 'Warsaw Chopin Airport', 'Poland', 'Warsaw');

-- Insert flights
INSERT INTO flight (flight_number, origin_id, destination_id, departure_time, arrival_time, airline, price) VALUES
-- Flights from JFK
('WL100', 1, 2, '2025-01-20 08:00:00', '2025-01-20 16:00:00', 'American Airlines', 450.00),
('WL101', 1, 3, '2025-01-21 09:00:00', '2025-01-21 19:00:00', 'British Airways', 650.00),
('WL102', 1, 6, '2025-01-22 07:00:00', '2025-01-22 15:00:00', 'Delta Air Lines', 550.00),
('WL103', 1, 12, '2025-01-23 06:30:00', '2025-01-23 14:30:00', 'Air France', 480.00),

-- Flights from LHR
('WL104', 2, 1, '2025-01-24 09:00:00', '2025-01-24 17:00:00', 'British Airways', 750.00),
('WL105', 2, 10, '2025-01-25 11:00:00', '2025-01-25 20:00:00', 'Air Canada', 700.00),
('WL106', 2, 15, '2025-01-26 13:00:00', '2025-01-26 23:00:00', 'Virgin Atlantic', 800.00),

-- Flights from DXB
('WL107', 3, 4, '2025-01-27 18:00:00', '2025-01-28 02:00:00', 'Emirates', 600.00),
('WL108', 3, 16, '2025-01-28 21:00:00', '2025-01-29 06:00:00', 'Qatar Airways', 700.00),
('WL109', 3, 14, '2025-01-29 15:00:00', '2025-01-30 01:00:00', 'LATAM Airlines', 720.00),

-- Flights from HND
('WL110', 4, 8, '2025-01-30 10:00:00', '2025-01-30 20:00:00', 'Japan Airlines', 850.00),
('WL111', 4, 9, '2025-01-31 07:00:00', '2025-01-31 15:00:00', 'Singapore Airlines', 770.00),
('WL112', 4, 18, '2025-02-01 05:30:00', '2025-02-01 14:30:00', 'All Nippon Airways', 880.00),

-- Flights from SYD
('WL113', 5, 19, '2025-02-02 14:00:00', '2025-02-02 23:00:00', 'Qantas', 600.00),
('WL114', 5, 2, '2025-02-03 08:00:00', '2025-02-03 16:00:00', 'British Airways', 540.00),

-- Additional Flights
('WL115', 6, 11, '2025-02-04 12:00:00', '2025-02-04 20:00:00', 'Lufthansa', 480.00),
('WL116', 7, 13, '2025-02-05 09:30:00', '2025-02-05 18:30:00', 'KLM', 510.00),
('WL117', 8, 14, '2025-02-06 18:00:00', '2025-02-07 01:00:00', 'LATAM Airlines', 580.00),
('WL118', 9, 20, '2025-02-07 20:00:00', '2025-02-08 06:00:00', 'Qantas', 490.00),
('WL119', 10, 17, '2025-02-08 07:30:00', '2025-02-08 15:30:00', 'Air Canada', 450.00),
('WL120', 11, 18, '2025-02-09 06:00:00', '2025-02-09 14:00:00', 'Qatar Airways', 750.00),
('WL121', 12, 3, '2025-02-10 13:00:00', '2025-02-10 22:00:00', 'Emirates', 800.00),
('WL122', 13, 5, '2025-02-11 17:00:00', '2025-02-11 23:00:00', 'LATAM Airlines', 600.00),
('WL123', 14, 7, '2025-02-12 09:00:00', '2025-02-12 18:00:00', 'Delta Air Lines', 480.00),
('WL124', 15, 2, '2025-02-13 08:30:00', '2025-02-13 17:30:00', 'Virgin Atlantic', 650.00),
('WL125', 16, 9, '2025-02-14 19:00:00', '2025-02-15 04:00:00', 'Singapore Airlines', 770.00),
('WL126', 17, 12, '2025-02-15 12:00:00', '2025-02-15 20:00:00', 'Air France', 670.00),
('WL127', 18, 6, '2025-02-16 11:30:00', '2025-02-16 20:30:00', 'Delta Air Lines', 620.00),
('WL128', 19, 1, '2025-02-17 13:00:00', '2025-02-17 21:00:00', 'Qantas', 700.00),
('WL129', 20, 8, '2025-02-18 07:30:00', '2025-02-18 15:30:00', 'Japan Airlines', 860.00);

