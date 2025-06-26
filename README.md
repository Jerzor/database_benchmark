
# Database Benchmark

A project for testing database performance written in NestJS. The goal of the application is to compare the write and read speed of small, medium, and large datasets across popular SQL and NoSQL databases.

---

## Supported Databases

- **SQL**: MySQL, PostgreSQL
- **NoSQL**: MongoDB, Redis

---

## Project Goal

To evaluate and compare the speed of both writing and reading data of different sizes (small, medium, large) on four different databases.

---

## Technologies

- NestJS (Node.js)
- Artillery library for running performance tests (future support planned for k6)
- Docker and Docker Compose for running database environments

---

## Installation and Configuration

1. Clone the repository:
   ```bash
   git clone https://github.com/Jerzor/database_benchmark.git
   cd database_benchmark
   ```

2. Install dependencies (`pnpm`):
   ```bash
   pnpm install
   ```
   or
   ```bash
   npm install
   ```

3. Copy and fill in the `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   In the `.env` file, fill in the connection parameters for the databases (MySQL, PostgreSQL, MongoDB, Redis).

4. Start the databases using Docker:
   ```bash
   docker-compose up -d
   ```

---

## Running Tests

Performance tests are conducted using the Artillery library.

**Important:** Before running any tests, make sure the application is running (e.g., via `npm run start` or `pnpm start`). The test scenarios send HTTP requests to the running API.

To run a specific test, use the command:
```bash
artillery run <path_to_test_file.yaml>
```

Example:
```bash
artillery run benchmarks/mysql/write.yaml
```
---

## Project Structure

- `src/` – NestJS application code
- `benchmarks/` – performance test definitions
- `docker-compose.yml` – container configuration for the databases
- `.env.example` – template for database connection configuration
- `test/` – folder with unit tests (not relevant for current benchmarks)

---

## Notes

- The `test` folder is not used for performance tests and does not need to be run.
- The project focuses on performance tests of data write and read speed, not unit tests.

---
