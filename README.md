# MediLink — Full Stack Project

A recruiter-friendly medicine availability and pharmacy finder built with:

- **Frontend:** React + Vite + JavaScript + CSS + Lucide React
- **Backend:** Java 21 + Spring Boot + REST API
- **Database:** MySQL + Spring Data JPA/Hibernate
- **No Login/Register:** the demo starts directly with Customer / Pharmacy / Admin Demo Mode

The frontend uses the `screen.png` supplied with the original ZIP as the homepage hero image.

## Project structure

```text
MediLink/
├── frontend files (root)
│   ├── src/main.jsx
│   ├── src/api.js
│   ├── src/styles.css
│   ├── public/images/medilink-hero.png
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── pom.xml
│   └── src/main/java/com/medilink/backend/
│       ├── config/
│       ├── controller/
│       ├── dto/
│       ├── entity/
│       ├── repository/
│       └── service/
│
└── database.sql
```

## Requirements

Install:

1. Node.js LTS
2. JDK 21
3. Maven 3.9+
4. MySQL 8+
5. VS Code

Check:

```bash
node -v
npm -v
java -version
mvn -version
mysql --version
```

## 1. Create the database

Open MySQL Workbench or MySQL command line and run:

```sql
CREATE DATABASE IF NOT EXISTS medilink;
```

You do **not** need to manually create the tables. Spring Boot/JPA creates them with `spring.jpa.hibernate.ddl-auto=update`.

## 2. Configure MySQL password

Open:

```text
backend/src/main/resources/application.properties
```

Change:

```properties
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:root}
```

For example, if your MySQL root password is `MyPassword123`:

```properties
spring.datasource.username=root
spring.datasource.password=MyPassword123
```

## 3. Start the backend

Open a VS Code terminal:

```bash
cd backend
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/health
```

Expected:

```json
{"status":"UP","service":"medilink-backend"}
```

On first startup, sample pharmacies, medicines and inventory are automatically inserted by `DataInitializer.java`.

## 4. Start the frontend

Open a second VS Code terminal at the project root:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Vite proxies `/api` calls to:

```text
http://localhost:8080
```

## 5. Main API endpoints

### Medicine search

```http
GET /api/medicines
GET /api/search/medicines?q=paracetamol
GET /api/search/pharmacies?q=paracetamol
```

### Pharmacies

```http
GET /api/pharmacies
GET /api/pharmacies/{id}
GET /api/pharmacies/{id}/inventory
```

### Inventory

```http
GET /api/inventory
PUT /api/inventory/{id}
```

Example body:

```json
{
  "quantity": 8
}
```

The backend calculates status automatically:

```text
quantity > 10  -> AVAILABLE
1-10            -> LOW_STOCK
0               -> OUT_OF_STOCK
```

### Customer inquiry

```http
POST /api/inquiries
```

Example:

```json
{
  "pharmacyId": 1,
  "medicineId": 1,
  "message": "Please confirm whether Paracetamol 500 mg is available.",
  "contactMethod": "Phone"
}
```

### Admin

```http
GET /api/admin/stats
```

## Demo flow

### Customer

```text
Home
 → Search Medicine
 → Search Results
 → View Pharmacy
 → Contact Pharmacy
 → Inquiry saved in MySQL
```

### Pharmacy

```text
Demo Mode → Pharmacy
 → Dashboard
 → Change stock quantity
 → React sends PUT request
 → Spring Boot validates quantity
 → JPA updates MySQL
 → status changes automatically
```

### Admin

```text
Demo Mode → Admin
 → Dashboard
 → Backend statistics
 → API/database connection status
```

## Important note

The original uploaded ZIP contained the screenshot/design asset rather than the original source code. This project is therefore a new full-stack implementation based on that supplied design and the MediLink project specification, not a recovery of the original hidden source code.
