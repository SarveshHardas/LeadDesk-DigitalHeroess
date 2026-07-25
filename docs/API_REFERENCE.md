# LeadDesk Mini - API Reference & Server Actions Documentation

This document provides technical specifications for all REST API endpoints and Next.js 16 Server Actions implemented in **LeadDesk Mini**.

---

## 1. REST API Endpoints

### A. Lead Intake Submission
- **Method**: `POST`
- **Route**: `/api/leads`
- **Authentication**: None (Public Endpoint)
- **Validation**: `LeadSubmissionSchema` (Zod) + Honeypot Check
- **Description**: Accepts new prospect lead inquiries from public forms or external webhooks.

#### Request Body
```json
{
  "name": "Jordan Lee",
  "email": "jordan@scalebox.io",
  "budget": "$10k-$25k",
  "message": "Evaluating CRM intake migration and automated lead triage pipelines.",
  "website": ""
}
```

#### Response: `201 Created`
```json
{
  "success": true,
  "message": "Lead inquiry submitted successfully.",
  "data": {
    "_id": "66a3d9e41b2c45f8e9101234",
    "name": "Jordan Lee",
    "email": "jordan@scalebox.io",
    "budget": "$10k-$25k",
    "message": "Evaluating CRM intake migration and automated lead triage pipelines.",
    "status": "New",
    "isDeleted": false,
    "createdAt": "2026-07-25T18:00:00.000Z",
    "updatedAt": "2026-07-25T18:00:00.000Z"
  }
}
```

#### Response: `400 Bad Request` (Validation Failure)
```json
{
  "success": false,
  "error": "Validation failed",
  "errors": {
    "email": ["Invalid email address format"]
  }
}
```

---

### B. Fetch Paginated Lead List
- **Method**: `GET`
- **Route**: `/api/leads?page=1&limit=10&status=New&search=Jordan`
- **Authentication**: Required (`leaddesk_session` JWT Cookie)
- **Query Parameters**:
  - `page` (number, default: `1`)
  - `limit` (number, default: `10`)
  - `status` (string: `New` | `Contacted` | `Closed` | `All`)
  - `search` (string: full-text search query)

#### Response: `200 OK`
```json
{
  "success": true,
  "data": {
    "leads": [
      {
        "_id": "66a3d9e41b2c45f8e9101234",
        "name": "Jordan Lee",
        "email": "jordan@scalebox.io",
        "budget": "$10k-$25k",
        "message": "Evaluating CRM intake migration...",
        "status": "New",
        "createdAt": "2026-07-25T18:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "totalItems": 1,
      "totalPages": 1
    },
    "metrics": {
      "totalLeads": 1,
      "newLeads": 1,
      "contactedLeads": 0,
      "closedLeads": 0,
      "conversionRate": 0
    }
  }
}
```

---

### C. Update Lead Status
- **Method**: `PATCH`
- **Route**: `/api/leads`
- **Authentication**: Required (`leaddesk_session` JWT Cookie)

#### Request Body
```json
{
  "leadId": "66a3d9e41b2c45f8e9101234",
  "status": "Contacted"
}
```

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Lead status updated to Contacted.",
  "data": {
    "_id": "66a3d9e41b2c45f8e9101234",
    "status": "Contacted",
    "updatedAt": "2026-07-25T18:05:00.000Z"
  }
}
```

---

### D. Soft-Delete Lead Record
- **Method**: `DELETE`
- **Route**: `/api/leads?id=66a3d9e41b2c45f8e9101234`
- **Authentication**: Required (`leaddesk_session` JWT Cookie)

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Lead record archived successfully."
}
```

---

### E. Database Sample Seeder
- **Method**: `POST`
- **Route**: `/api/seed`
- **Authentication**: Required (`leaddesk_session` JWT Cookie)

#### Response: `200 OK`
```json
{
  "success": true,
  "message": "Seeded 12 sample lead records successfully.",
  "count": 12
}
```

---

### F. System Health Check
- **Method**: `GET`
- **Route**: `/api/health`
- **Authentication**: None (Public)

#### Response: `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2026-07-25T18:00:00.000Z",
  "database": "connected",
  "environment": "production"
}
```

---

## 2. Next.js 16 Server Actions (`src/actions/*`)

### `submitLeadAction(data: LeadSubmissionInput)`
- **Location**: `src/actions/lead.actions.ts`
- **Parameters**: `name`, `email`, `budget`, `message`, `website` (honeypot)
- **Returns**: `Promise<ApiResponse<ILead>>`

### `loginAction(credentials: LoginInput)`
- **Location**: `src/actions/auth.actions.ts`
- **Parameters**: `email`, `password`
- **Returns**: `Promise<ApiResponse<UserSession>>`
- **Side Effect**: Sets `leaddesk_session` HTTP-Only cookie.

### `logoutAction()`
- **Location**: `src/actions/auth.actions.ts`
- **Returns**: `Promise<ApiResponse<void>>`
- **Side Effect**: Clears `leaddesk_session` cookie.

### `updateLeadStatusAction(leadId: string, status: LeadStatus)`
- **Location**: `src/actions/lead.actions.ts`
- **Returns**: `Promise<ApiResponse<ILead>>`

### `deleteLeadAction(leadId: string)`
- **Location**: `src/actions/lead.actions.ts`
- **Returns**: `Promise<ApiResponse<void>>`
