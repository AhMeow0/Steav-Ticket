# Steav-Ticket Project Development Guide

## 📋 Project Overview

This is a full-stack bus ticketing system with:

- **Backend**: NestJS + MongoDB + JWT Authentication
- **Frontend**: Vue 3 + Vite + TypeScript + Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites

- Node.js: `^20.19.0 || >=22.12.0`
- MongoDB running locally or accessible at `mongodb://localhost:27017`
- npm or yarn

### Installation

```bash
# Install Backend dependencies
cd Backend
npm install

# Install Frontend dependencies
cd ../Steav-Ticket
npm install
```

---

## 🏃 Running the Project

### Backend (NestJS)

**Development Mode (with hot reload):**

```bash
cd Backend
npm run start:dev
```

- API runs on: `http://localhost:3000`
- Global prefix: `/api`
- Auto-rebuilds on file changes

**Production Mode:**

```bash
cd Backend
npm run build
npm run start:prod
```

**Debug Mode (with Node debugger):**

```bash
cd Backend
npm run start:debug
```

- Connect VS Code debugger to `127.0.0.1:9229`

### Frontend (Vue 3)

**Development Mode:**

```bash
cd Steav-Ticket
npm run dev
```

- Dev server runs on: `http://localhost:5173` (default)

**Build for Production:**

```bash
cd Steav-Ticket
npm run build
```

### Running Both Simultaneously

Open two terminals:

```bash
# Terminal 1 - Backend
cd Backend && npm run start:dev

# Terminal 2 - Frontend
cd Steav-Ticket && npm run dev
```

---

## 🧪 Testing Guide

### Backend Testing

#### Unit Tests (Individual components)

```bash
cd Backend
npm test
```

- Runs all `*.spec.ts` files in `src/`
- Uses Jest as test runner

**Watch mode (re-run on changes):**

```bash
npm run test:watch
```

**With coverage report:**

```bash
npm run test:cov
```

- Shows which lines/functions are tested
- Coverage report in `coverage/` folder

**Debug mode:**

```bash
npm run test:debug
```

- Allows inspection in Node debugger

#### E2E Tests (End-to-End / API Integration)

```bash
cd Backend
npm run test:e2e
```

- Runs `*.e2e-spec.ts` files in `test/`
- Tests full API endpoints with HTTP requests
- Uses `supertest` library for HTTP testing

### Frontend Testing

#### Unit Tests (Vitest)

```bash
cd Steav-Ticket
npm run test:unit
```

- Tests Vue components and utilities
- Coverage report in `coverage/` folder

#### E2E Tests (Playwright)

```bash
cd Steav-Ticket
npm run test:e2e
```

- Tests full user workflows in browser
- Reports in `playwright-report/`

### Complete Testing Workflow

```bash
# 1. Backend unit tests
cd Backend && npm run test:cov

# 2. Backend E2E tests
npm run test:e2e

# 3. Frontend unit tests
cd ../Steav-Ticket && npm run test:unit

# 4. Frontend E2E tests
npm run test:e2e
```

---

## 🧪 API Testing with Tools

### Using Postman / REST Client

**Base URL:** `http://localhost:3000/api`

#### Example: Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Example: Get Buses

```http
GET /api/buses
Authorization: Bearer {your_jwt_token}
```

### Using VS Code REST Client Extension

Create a file `requests.http`:

```http
### Login
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}

### Get All Buses
GET http://localhost:3000/api/buses
Authorization: Bearer {{token}}

### Create Bus
POST http://localhost:3000/api/buses
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "name": "Bus 001",
  "capacity": 50,
  "busNumber": "BUS-001"
}
```

### Using cURL

```bash
# Login and get token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"pass123"}'

# Use token in request
curl -X GET http://localhost:3000/api/buses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📝 Writing Tests

### Backend Unit Test Example

Create `src/buses/buses.service.spec.ts`:

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { BusesService } from "./buses.service";
import { getModelToken } from "@nestjs/mongoose";

describe("BusesService", () => {
  let service: BusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusesService,
        {
          provide: getModelToken("Bus"),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BusesService>(BusesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a bus", async () => {
    const createBusDto = {
      name: "Bus 001",
      capacity: 50,
      busNumber: "BUS-001",
    };

    jest.spyOn(service, "create").mockResolvedValue(createBusDto as any);

    const result = await service.create(createBusDto);
    expect(result).toEqual(createBusDto);
  });
});
```

### Backend E2E Test Example

Create `test/buses.e2e-spec.ts`:

```typescript
import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Buses API (e2e)", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login to get token
    const loginRes = await request(app.getHttpServer())
      .post("/api/auth/login")
      .send({ email: "admin@example.com", password: "admin123" });

    token = loginRes.body.access_token;
  });

  it("GET /api/buses - should get all buses", () => {
    return request(app.getHttpServer())
      .get("/api/buses")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });

  it("POST /api/buses - should create a bus", () => {
    return request(app.getHttpServer())
      .post("/api/buses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test Bus",
        capacity: 50,
        busNumber: "BUS-TEST-001",
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
```

---

## 🎯 Project Best Practices & Guidelines

### 1. **Code Structure**

✅ **DO:**

- Keep modules organized (one module per feature: buses, users, tickets, etc.)
- Use DTOs for request/response validation
- Create separate schema files for MongoDB models
- Keep controllers thin (delegate business logic to services)

❌ **DON'T:**

- Mix business logic in controllers
- Create deeply nested folder structures
- Put everything in one file

### 2. **Naming Conventions**

```
✅ buses.service.ts
✅ buses.controller.ts
✅ buses.module.ts
✅ create-bus.dto.ts
✅ bus.schema.ts
❌ BusesServ.ts
❌ bus_service.ts
```

### 3. **Error Handling**

```typescript
// ✅ Good
throw new BadRequestException("Invalid bus ID");
throw new NotFoundException("Bus not found");
throw new UnauthorizedException("Invalid credentials");

// ❌ Avoid
throw new Error("something went wrong");
```

### 4. **Type Safety**

```typescript
// ✅ Always use TypeScript types
async findBusById(id: string): Promise<Bus> {
  return this.busModel.findById(id).exec();
}

// ❌ Avoid any types
async findBusById(id: any): Promise<any> {
  return this.busModel.findById(id);
}
```

### 5. **Validation & DTOs**

```typescript
// ✅ Use class-validator
import { IsString, IsNumber, Min } from "class-validator";

export class CreateBusDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(1)
  capacity: number;
}

// ❌ Avoid no validation
export class CreateBusDto {
  name;
  capacity;
}
```

### 6. **Testing Coverage**

- **Aim for 80%+ coverage** on business logic
- Test happy paths and error cases
- Mock external dependencies (database, APIs)
- Write tests before implementation (TDD)

### 7. **Environment Variables**

Create `.env` in Backend:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bus-ticket
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=24h
NODE_ENV=development
```

Create `.env` in Steav-Ticket:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_TITLE=Steav Ticket
```

### 8. **Git Workflow**

```bash
# Create feature branch
git checkout -b feature/bus-management

# Make changes and test
npm run test
npm run lint

# Commit with clear messages
git commit -m "feat: add bus creation API endpoint"

# Push and create PR
git push origin feature/bus-management
```

### 9. **Linting & Formatting**

```bash
# Backend
cd Backend
npm run lint      # Fix ESLint issues
npm run format    # Format with Prettier

# Frontend
cd Steav-Ticket
npm run lint      # Fix ESLint issues
npm run format    # Format with Prettier
```

### 10. **API Documentation**

- Use clear endpoint descriptions in comments
- Document request/response schemas
- Keep API consistent (REST conventions)
- Version your API if making breaking changes

### 11. **Security Best Practices**

- ✅ Hash passwords (bcrypt is already configured)
- ✅ Use JWT tokens for authentication
- ✅ Validate all inputs with DTOs
- ✅ Use CORS (enabled in main.ts)
- ❌ Never commit `.env` files
- ❌ Don't expose sensitive data in logs
- ❌ Never send passwords in responses

### 12. **Database (MongoDB)**

```typescript
// ✅ Use Mongoose schemas properly
@Schema()
export class Bus {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

// Create indexes for frequently queried fields
@Schema({ timestamps: true })
export class Ticket {
  @Prop({ indexed: true })
  userId: string;

  @Prop({ indexed: true })
  busId: string;
}
```

### 13. **Performance Tips**

- Use database indexing on frequently searched fields
- Implement pagination for list endpoints
- Cache frequently accessed data
- Use DTOs to control response payload size
- Lazy-load related data

### 14. **CI/CD Integration**

Add to `.github/workflows/test.yml`:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 22
      - run: cd Backend && npm ci && npm run test:cov
      - run: cd Steav-Ticket && npm ci && npm run test:unit
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**

- Ensure MongoDB is running: `mongod`
- Or update MongoDB URI in `.env`

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
PORT=3001 npm run start:dev
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Test Failures with MongoDB

- Use in-memory MongoDB for testing (install `mongodb-memory-server`)
- Or mock the database in unit tests

---

## 📚 Useful Resources

- [NestJS Docs](https://docs.nestjs.com/)
- [Jest Testing](https://jestjs.io/)
- [Vue 3 Guide](https://vuejs.org/)
- [MongoDB/Mongoose](https://mongoosejs.com/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Playwright](https://playwright.dev/)

---

## ✅ Checklist Before Pushing Code

- [ ] Tests pass: `npm run test`
- [ ] Linting passes: `npm run lint`
- [ ] Code is formatted: `npm run format`
- [ ] No console errors
- [ ] No hardcoded values (use .env)
- [ ] Error handling implemented
- [ ] TypeScript types added
- [ ] Comments added for complex logic
- [ ] Commit message is clear

---

## 🎓 Next Steps

1. **Setup MongoDB**: Install and run MongoDB locally
2. **Create `.env` files**: Copy examples above
3. **Run Backend**: `npm run start:dev`
4. **Run Frontend**: `npm run dev`
5. **Write tests**: Follow examples in this guide
6. **Test API**: Use REST client or Postman
7. **Deploy**: Follow your deployment platform's guidelines

Good luck! 🚀
