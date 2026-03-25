# 🚀 Job Portal API – Full Backend Plan

## 🌐 Base URL

```
/api/v1
```

---

# 🔐 Auth Module

```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh-token
GET    /auth/me
```

---

# 👤 Users

```
GET    /users/me
PATCH  /users/me
GET    /users/:id
DELETE /users/me
```

---

# 🏢 Companies

```
POST   /companies
GET    /companies
GET    /companies/:id
GET    /companies/slug/:slug
PATCH  /companies/:id
DELETE /companies/:id
```

---

# 💼 Jobs

```
POST   /jobs
GET    /jobs
GET    /jobs/:id
GET    /jobs/slug/:slug
PATCH  /jobs/:id
DELETE /jobs/:id
```

---

# 🔍 Job Search (Core Feature)

```
GET /jobs?location=&jobType=&experienceLevel=&salaryMin=&salaryMax=&page=&limit=&sort=
```

### Example

```
GET /jobs?location=dhaka&jobType=full_time&experienceLevel=mid&page=1
```

---

# 📌 Saved Jobs (Bookmarks)

```
POST   /jobs/:jobId/save
DELETE /jobs/:jobId/save
GET    /users/me/saved-jobs
```

---

# 📄 Applications

```
POST   /jobs/:jobId/apply
GET    /applications/:id
GET    /users/me/applications
GET    /jobs/:jobId/applications
PATCH  /applications/:id/status
DELETE /applications/:id
```

---

# 📎 Resumes

```
POST   /resumes
GET    /resumes
GET    /resumes/:id
DELETE /resumes/:id
```

---

# 🧠 Skills

```
GET    /skills
POST   /skills
```

---

# 🔗 Job Skills

```
POST   /jobs/:jobId/skills
DELETE /jobs/:jobId/skills/:skillId
GET    /jobs/:jobId/skills
```

---

# 🏢 Company Jobs

```
GET /companies/:companyId/jobs
```

---

# 👨‍💼 Recruiter Dashboard

```
GET /recruiter/jobs
GET /recruiter/applications
```

---

# 👨‍💻 User Dashboard

```
GET /dashboard
GET /dashboard/applications
GET /dashboard/saved-jobs
```

---

# ⚙️ Query Features

## Pagination

```
?page=1&limit=10
```

## Sorting

```
?sort=createdAt_desc
```

## Filtering

```
?location=dhaka
&jobType=full_time
&experienceLevel=mid
&minSalary=30000
```

---

# 🔐 Role-Based Access

## Job Seeker

* Apply to jobs
* Save/bookmark jobs
* Manage profile

## Recruiter

* Create/manage jobs
* Manage company
* View applications

## Admin

* Full system access

---

# 🧱 Module Structure

```
auth
users
companies
jobs
applications
resumes
skills
saved-jobs
```

---

# 🎯 Notes

* `/jobs` → public listing
* `/users/me/*` → authenticated
* `/applications/*` → role-based access
* `/jobs/:jobId/applications` → recruiter only

---

# ✅ Status

✔ Database: Designed
✔ API Plan: Completed
🚀 Next: Implement Fastify routes + services
