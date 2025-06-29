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

Performance tests are conducted using the Artillery or k6 libraries.

**Important:** Before running any tests, make sure the application is running (e.g., via `npm run start` or `pnpm start`). The test scenarios send HTTP requests to the running API.

Use the provided script `benchmark.sh` for both Artillery and k6:

```bash
./benchmarks/benchmark.sh <tool> <mode> <db> <duration> <rate>
```

Example (artillery):
```bash
./benchmarks/benchmark.sh artillery write postgres 30 40
```

or (k6):
```bash
./benchmarks/benchmark.sh k6 read redis 60 35
```

---

## Script: `benchmark.sh`

Helper script for launching tests using either Artillery or k6. Prompts for parameters if not provided via CLI.

### Parameters:

- `tool` – `artillery` or `k6`
- `mode` – `read` or `write`
- `db` – `postgres`, `mysql`, `mongodb`, `redis`
- `duration` – test duration in seconds
- `rate` – request rate (`arrivalRate` for Artillery, `VUs` for k6)

### Example:

```bash
./benchmarks/benchmark.sh artillery write mysql 60 200
```

---

## Monitoring System Usage

You can monitor CPU and memory usage during the test using the helper script `log-system-usage.js`.

### Usage:

```bash
node benchmarks/log-system-usage.js <db> <mode> <duration>
```

### Example:

```bash
node benchmarks/log-system-usage.js postgres write 30
```

### Output:

- Logs CPU load and memory usage every second
- Saves results to `benchmarks/system-<db>-<mode>-<timestamp>.json`

---

## Project Structure

- `src/` – NestJS application code
- `benchmarks/`
   - `artillery/` – Artillery test templates and definitions
   - `k6/` – k6 test script
   - `log-system-usage.js` – resource usage logger
- `docker-compose.yml` – container configuration for the databases
- `.env.example` – template for database connection configuration
- `test/` – unit tests (not used in performance benchmarking)

---

## Notes

- The `test` folder is not used for performance tests and can be ignored.
- The goal of this project is to measure **read/write speed and system load** under pressure for various database technologies.
- Future enhancements may include result aggregation, visualization, and more advanced test scenarios.

---