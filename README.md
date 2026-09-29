# MediLink — Medicine Availability & Pharmacy Finder
> Find Pharmacies. Check Availability. Connect With Care.
MediLink is a full-stack healthcare technology platform designed to help users search for pharmacies that have reported medicine
Pharmacies can manage medicine inventory and respond to customer inquiries. Administrators can monitor pharmacies, inventory, ver
> IMPORTANT: MediLink provides pharmacy and inventory information only. Medicine availability can change quickly. Users should co
---
## Overview
MediLink focuses on medicine availability discovery by connecting customers with pharmacies that report their inventory.
The application provides three demonstration experiences:
- Customer
- Pharmacy
- Admin
The recruiter demonstration does not require login, registration, password, or authentication screens.
### Demo Mode
```text
Demo Mode
nnn Customer
nnn Pharmacy
nnn Admin
```
---
# Key Features
## Customer
- Search medicines
- Partial and case-insensitive search
- Search by brand or generic name
- Filter by strength and dosage form
- Filter by location and distance
- Filter by pharmacy and availability
- Compare pharmacy availability
- View medicine details
- View pharmacy details
- View last inventory update
- Find nearby pharmacies
- Send pharmacy inquiries
- View recent searches
- View saved pharmacies
- View recent inquiries
- View notifications
## Pharmacy
- Pharmacy dashboard
- Inventory management
- View total, available, low-stock and out-of-stock medicines
- Add medicines
- Update medicine inventory
- Update stock quantity
- Update availability status
- View last inventory update
- Respond to customer inquiries
- Monitor stale inventory information
## Admin
- Admin dashboard
- View customers
- View pharmacies
- View verified and pending pharmacies
- View medicine records
- View customer inquiries
- Review pharmacy verification
- Approve or reject verification
- Request additional information
- Monitor pharmacy inventory
- View platform statistics
---
# Medicine Availability
MediLink uses four inventory availability states:
```text
AVAILABLE
LOW_STOCK
OUT_OF_STOCK
UNKNOWN
```
AVAILABLE: Availability reported by the pharmacy.
LOW_STOCK: Pharmacy has reported limited stock.
OUT_OF_STOCK: Currently reported unavailable.
UNKNOWN: Availability information needs updating.
The application does not guarantee that a medicine will remain available.
---
# Stale Inventory Monitoring
Inventory information can become outdated. The application can display a warning when inventory has not been updated for a config
Example:
```text
Availability may be outdated
Last updated:
3 days ago
Please confirm availability directly with the pharmacy.
```
---
# Customer Search Flow
```text
Open Website
↓
Search "Paracetamol"
↓
View Search Results
↓
Compare Pharmacies
↓
View Pharmacy
↓
Check Availability
↓
Check Last Updated Time
↓
Contact Pharmacy
↓
Send Inquiry
```
Example:
```text
MediPlus Pharmacy
Paracetamol 500 mg
Availability: AVAILABLE
Distance: 2.3 km
Last Updated: 15 minutes ago
```
---
# Pharmacy Inventory Flow
```text
Demo Mode → Pharmacy
↓
Open Dashboard
↓
View Inventory
↓
Select Medicine
↓
Update Quantity
↓
Availability Status Changes
↓
Last Updated Timestamp Changes
```
Example:
```text
120 → 8
AVAILABLE → LOW_STOCK
8 → 0
LOW_STOCK → OUT_OF_STOCK
```
---
# Customer Inquiry Workflow
Example:
```text
Medicine:
Paracetamol 500 mg
Pharmacy:
MediPlus Pharmacy
Message:
Please confirm whether Paracetamol 500 mg is currently available.
Preferred Contact Method:
Phone
```
Inquiry status:
```text
NEW
↓
VIEWED
↓
RESPONDED
↓
CLOSED
```
---
# Nearby Pharmacy Discovery
Users can discover pharmacies using:
- City
- Area
- PIN code
- Distance
Pharmacy cards can display:
```text
MediPlus Pharmacy
2.3 km
Open until 10 PM
Verified
12 medicines reported available
```
Actions:
```text
View Pharmacy
Contact Pharmacy
Get Directions
```
---
# Pharmacy Information
A pharmacy profile can display:
- Pharmacy name
- Verification status
- Address
- Contact information
- Opening hours
- Available medicines
- Last inventory update
# Medicine Information
A medicine details page can display:
- Medicine name
- Generic information
- Brand information
- Strength
- Dosage form
- Availability
- Last updated time
- Pharmacies reporting availability
---
# Medical Safety
MediLink is an information and pharmacy discovery platform.
The application must NOT:
- Diagnose medical conditions
- Prescribe medicines
- Recommend medicines
- Recommend dosage
- Recommend switching medicines
- Provide treatment advice
- Guarantee medicine availability
- Provide symptom-based medicine recommendations
Safety message:
> MediLink provides pharmacy and inventory information only. Medicine availability can change quickly. Please confirm stock direc
---
# Technology Stack
## Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- React Router
- Fetch API
## Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Bean Validation
## Database
- MySQL
## Testing and Development
- JUnit
- Mockito
- Postman
- Git
- GitHub
---
# Architecture
```text
MediLink
n
t
nnnnnnnnnnnnnnnnnnn
n React.js UI n
n JavaScript n
nnnnnnnnnnnnnnnnnnn
n
n REST API
t
nnnnnnnnnnnnnnnnnnn
n Spring Boot API n
n Java n
nnnnnnnnnnnnnnnnnnn
n
n JPA / Hibernate
t
nnnnnnnnnnnnnnnnnnn
n MySQL n
nnnnnnnnnnnnnnnnnnn
```
---
# Application Modules
```text
MediLink
n
nnn Customer
n nnn Medicine Search
n nnn Pharmacy Search
n nnn Medicine Details
n nnn Pharmacy Details
n nnn Nearby Pharmacies
n nnn Inquiries
n nnn Saved Pharmacies
n nnn Notifications
n
nnn Pharmacy
n nnn Dashboard
n nnn Medicine Inventory
n nnn Add Medicine
n nnn Update Stock
n nnn Inventory Monitoring
n nnn Customer Inquiries
n
nnn Admin
nnn Dashboard
nnn Pharmacy Verification
nnn Inventory Monitoring
nnn Customer Management
nnn Inquiry Monitoring
nnn Platform Statistics
```
---
# Database Design
The planned database model contains:
```text
users
customer_profiles
pharmacy_profiles
pharmacy_verification
medicines
pharmacy_inventory
medicine_search_history
inquiries
inquiry_responses
notifications
saved_pharmacies
inventory_update_history
audit_logs
```
Database design uses:
- Primary keys
- Foreign keys
- Indexes
- Unique constraints
- Timestamps
- Entity relationships
---
# Core REST APIs
## Medicine APIs
```http
GET /api/medicines
GET /api/medicines/{id}
```
## Search APIs
```http
GET /api/search/medicines
GET /api/search/pharmacies
```
## Pharmacy APIs
```http
GET /api/pharmacies
GET /api/pharmacies/{id}
PUT /api/pharmacies/{id}
```
## Inventory APIs
```http
POST /api/inventory
GET /api/inventory
PUT /api/inventory/{id}
DELETE /api/inventory/{id}
```
## Inquiry APIs
```http
POST /api/inquiries
GET /api/inquiries
PUT /api/inquiries/{id}/respond
```
## Admin APIs
```http
GET /api/admin/pharmacies
PUT /api/admin/pharmacies/{id}/verify
```
Authentication APIs are not required for the recruiter demonstration interface.
---
# React Components
Reusable components include:
```text
Navbar
Footer
DemoRoleSelector
MedicineSearchBar
MedicineCard
PharmacyCard
AvailabilityBadge
FilterPanel
SearchResults
InventoryTable
InventoryForm
InquiryCard
NotificationDropdown
DashboardSidebar
StatusBadge
Modal
Toast
LoadingSkeleton
EmptyState
ErrorState
Pagination
```
---
# Error Handling
Examples:
```text
Medicine not found.
No pharmacies have reported availability.
This pharmacy has not updated inventory recently.
Inventory quantity cannot be negative.
This inquiry has already been closed.
Please provide a valid medicine name.
```
The backend can use global exception handling for consistent API error responses.
---
# Responsive Design
The application is designed to support:
- Desktop
- Laptop
- Tablet
- Mobile
The interface focuses on:
- Large search fields
- Touch-friendly buttons
- Responsive cards
- Mobile-friendly inventory views
- Responsive navigation
- Clear information hierarchy
---
# UI Design
Design direction:
- Clean
- Calm
- Professional
- Trustworthy
- Minimal
- Accessible
Visual design:
- White backgrounds
- Blue and teal accents
- Dark typography
- Rounded cards
- Soft shadows
- Spacious layouts
- Professional icons
Preferred typography:
- Inter
- Manrope
- Plus Jakarta Sans
The interface avoids:
- Hospital-management-system appearance
- Emergency-room imagery
- Excessive medical symbols
- Generic Bootstrap dashboard appearance
- Overly complex layouts
---
# Project Structure
```text
MediLink-FullStack/
n
nnn frontend/
n nnn public/
n n nnn images/
n n nnn medilink-hero.png
n n
n nnn src/
n n nnn main.jsx
n n nnn api.js
n n nnn styles.css
n n
n nnn package.json
n nnn vite.config.js
n nnn index.html
n
nnn backend/
n nnn src/
n n nnn main/
n n nnn java/
n n nnn resources/
n n
n nnn pom.xml
n nnn README.md
n
nnn database.sql
nnn .env.example
nnn .gitignore
nnn README.md
```
---
# Setup
## Prerequisites
```text
Java 21
Maven 3.9+
Node.js
npm
MySQL
Git
```
## Database Setup
```sql
CREATE DATABASE IF NOT EXISTS medilink;
USE medilink;
```
Spring Boot uses JPA/Hibernate to create and update required tables.
Example environment configuration:
```text
DB_URL=jdbc:mysql://localhost:3306/medilink
DB_USERNAME=root
DB_PASSWORD=your_password
```
Do not commit real database passwords or private credentials to GitHub.
---
# Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
The backend provides REST APIs for:
```text
Medicines
Search
Pharmacies
Inventory
Inquiries
Administration
```
---
# Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend communicates with the Spring Boot REST API.
---
# Testing
REST APIs can be tested using:
```text
Postman
```
Example testing areas:
```text
Medicine Search
Pharmacy Search
Inventory
Inventory Updates
Customer Inquiries
Pharmacy Responses
Admin Verification
```
Backend testing can use:
```text
JUnit
Mockito
```
---
# Inventory Logic
```text
Quantity > 10
↓
AVAILABLE
```
```text
Quantity 1–10
↓
LOW_STOCK
```
```text
Quantity = 0
↓
OUT_OF_STOCK
```
If inventory information cannot be confirmed:
```text
UNKNOWN
```
---
# Recruiter Demo Flow
## Customer Demo
```text
Open Website
↓
Demo Mode → Customer
↓
Search "Paracetamol"
↓
View Search Results
↓
Compare Pharmacies
↓
Open Pharmacy
↓
Check Availability
↓
Send Inquiry
```
## Pharmacy Demo
```text
Demo Mode → Pharmacy
↓
Open Dashboard
↓
View Inventory
↓
Update Stock
↓
See Availability Change
↓
Receive Customer Inquiry
↓
Respond
```
## Admin Demo
```text
Demo Mode → Admin
↓
View Pharmacies
↓
Review Verification
↓
Monitor Inventory
↓
View Inquiries
↓
View Statistics
```
---
# Example Demo Scenario
## Customer
Search:
```text
Paracetamol
```
View:
```text
MediPlus Pharmacy
Paracetamol 500 mg
AVAILABLE
Last Updated
Distance
```
Send:
```text
Please confirm whether Paracetamol 500 mg is currently available.
```
## Pharmacy
Open:
```text
Demo Mode → Pharmacy
```
Change:
```text
Quantity: 120 → 8
```
Status:
```text
AVAILABLE → LOW_STOCK
```
Change:
```text
Quantity: 8 → 0
```
Status:
```text
LOW_STOCK → OUT_OF_STOCK
```
## Admin
Open:
```text
Demo Mode → Admin
```
Review:
```text
Pharmacies
Verification
Inventory
Inquiries
Statistics
```
---
# Important Product Principles
### Availability Transparency
Always show the last reported inventory update.
### No Stock Guarantee
Reported availability can change and should be confirmed with the pharmacy.
### No Medical Recommendations
The application does not diagnose, prescribe, recommend medicines, recommend dosage, or provide treatment advice.
### Easy Demonstration
The recruiter can explore the main workflows without creating an account.
### Role-Based Demo Experience
The application provides Customer, Pharmacy, and Admin demonstration workflows.
---
# Recruiter Highlights
This project demonstrates:
```text
Java
Spring Boot
Spring Data JPA
Hibernate
REST API Development
React.js
JavaScript
MySQL
CRUD Operations
MVC Architecture
Frontend-Backend Integration
Database Integration
Inventory Management
Search and Filtering
Form Handling
API Integration
Error Handling
Git
GitHub
Postman
Responsive UI
```
---
# What This Project Demonstrates
```text
User Interface
↓
React.js
↓
REST API
↓
Spring Boot
↓
Service Layer
↓
Repository Layer
↓
Hibernate / JPA
↓
MySQL
```
The project demonstrates an end-to-end full-stack business workflow across frontend, backend, REST APIs, database integration, an
---
# Future Enhancements
- Pharmacy map integration
- Email notifications
- Advanced location-based pharmacy search
- Docker deployment
- More comprehensive automated testing
- Real-time notifications
- Inventory update history interface
- Advanced pharmacy verification workflows
- Expanded analytics and reporting
---
# Disclaimer
MediLink is a software demonstration project focused on pharmacy discovery and reported medicine availability.
It does not provide medical diagnosis, prescriptions, dosage recommendations, treatment recommendations, or guaranteed medicine a
Users should confirm medicine availability directly with the pharmacy and consult a qualified healthcare professional for medical
---
# License
This project is intended as a portfolio and demonstration project.
