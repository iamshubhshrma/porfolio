# API Contracts - Shubham Sharma Portfolio

## Backend Implementation Plan

### 1. Contact Form API
**Endpoint**: `POST /api/contact`
**Purpose**: Handle contact form submissions from the portfolio

**Request Body**:
```json
{
  "name": "string (required, 2-50 chars)",
  "email": "string (required, valid email)",
  "message": "string (required, 10-1000 chars)"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Thank you for your message! I'll get back to you soon.",
  "id": "contact_id"
}
```

**Error Response**:
```json
{
  "success": false,
  "error": "Validation error message",
  "details": {}
}
```

### 2. Database Schema

**contacts** collection:
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string", 
  "message": "string",
  "created_at": "datetime",
  "status": "new|read|replied",
  "ip_address": "string",
  "user_agent": "string"
}
```

### 3. Frontend Integration

**Current Mock Data**: 
- Contact form in `Contact.js` currently shows toast notification
- Form validation is handled client-side

**Backend Integration Changes**:
- Replace mock form submission with actual API call
- Add loading states during submission
- Handle success/error responses
- Add proper error handling with user feedback

### 4. Additional Features to Implement
- Contact form submission with email validation
- Rate limiting to prevent spam
- Email notifications for new contacts (optional)
- Admin dashboard to view contacts (future enhancement)

### 5. Security Considerations
- Input validation and sanitization
- Rate limiting on contact endpoint
- CORS properly configured
- Basic spam protection

## Files to Modify

**Backend**:
- `/app/backend/server.py` - Add contact routes
- `/app/backend/models.py` - Contact model (if needed)

**Frontend**:
- `/app/frontend/src/components/Contact.js` - Integrate with backend API
- Error handling and loading states

## Testing Strategy
- Test contact form submission with valid/invalid data
- Test rate limiting
- Test error handling scenarios
- Verify data persistence in MongoDB