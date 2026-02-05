# 📧 Email Notifications Setup Guide

## ✅ What's Been Implemented

Email notifications are now ready to send when:
- ✉️ Student placement status changes to **"Placed"**
- ✉️ Student placement status is **updated**
- ✉️ Bulk announcements to multiple students

## 📋 Setup Instructions

### Step 1: Install nodemailer

Open terminal in the backend folder and run:
```bash
cd backend
npm install nodemailer
```

### Step 2: Configure Email Credentials

Add these environment variables to your `.env` file in the backend folder:

```env
# Email Configuration (Choose one option)

# Option 1: Gmail (Recommended for testing)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Option 2: Other SMTP Service
SMTP_HOST=smtp.example.com
SMTP_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
```

### Step 3: Enable Gmail App Password (If using Gmail)

1. Go to Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification**
4. Go to **App Passwords**
5. Generate a new app password for "Mail"
6. Copy the 16-character password
7. Use this password in `EMAIL_PASSWORD` in `.env` file

### Step 4: Activate Email in server.js

In `backend/server.js`, uncomment these lines:

**Line 6:**
```javascript
// Change from:
// const { sendPlacementNotification } = require('./emailService');

// To:
const { sendPlacementNotification } = require('./emailService');
```

**Lines in the update route (around line 165-180):**
```javascript
// Change from:
/*
try {
  await sendPlacementNotification(student.toObject(), 'placed');
  console.log(`📧 Email sent to ${student.email}`);
} catch (emailError) {
  console.error('Email sending failed:', emailError.message);
}
*/

// To:
try {
  await sendPlacementNotification(student.toObject(), 'placed');
  console.log(`📧 Email sent to ${student.email}`);
} catch (emailError) {
  console.error('Email sending failed:', emailError.message);
}
```

### Step 5: Test Email Configuration

Optional test endpoint - add this to server.js:

```javascript
// Test email endpoint
app.post('/api/test-email', async (req, res) => {
  const { testEmailConfig } = require('./emailService');
  const result = await testEmailConfig(req.body.email || 'test@example.com');
  res.json(result);
});
```

## 📧 Email Templates Included

### 1. Placement Confirmation Email
Sent when student status changes to "Placed":
- 🎉 Congratulations message
- Company name
- Package details
- Placement date
- Professional HTML template with gradient header

### 2. Status Update Email
Sent when placement status changes:
- Current status
- Company info (if available)
- Package info (if available)
- Clean, professional design

### 3. Bulk Announcement Email
For sending messages to multiple students:
- Custom message content
- BCC to hide recipient emails
- Professional template

## 🎯 Usage Examples

### Automatic Email on Placement
```javascript
// When you update a student to "Placed" status via the API or UI:
PUT /api/students/:id
{
  "placementStatus": "Placed",
  "company": "Google",
  "package": 45,
  "placementDate": "2026-01-30"
}

// Email is automatically sent to student.email
```

### Manual Bulk Email (Future Feature)
```javascript
const { sendBulkNotification } = require('./emailService');

const students = await Student.find({ placementStatus: 'Pending' });
await sendBulkNotification(students, 'Upcoming placement drive on Feb 1st!');
```

## 🔧 Customization

### Change Email Templates
Edit `backend/emailService.js`:
- Modify HTML content in `sendPlacementNotification` function
- Update subject lines
- Add more email types (interview reminders, etc.)

### Use Different Email Service

In `emailService.js`, modify the `createTransporter()` function:

```javascript
// For Outlook/Office365:
return nodemailer.createTransporter({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// For custom SMTP:
return nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
```

## 📊 Email Preview

### Placement Confirmation Email Preview:
```
╔══════════════════════════════════════╗
║  🎓 Campus Placement Tracksheet      ║
║     Placement Notification           ║
╚══════════════════════════════════════╝

🎉 Congratulations!

Dear Rahul Kumar,

We are delighted to inform you that your placement 
status has been updated to PLACED!

┌────────────────────────────────────┐
│ Student ID: ST001                  │
│ Company: Google                    │
│ Package: ₹45 LPA                   │
│ Placement Date: Jan 30, 2026       │
└────────────────────────────────────┘

Your hard work and dedication have paid off...

Best regards,
Placement Cell
```

## ⚠️ Important Notes

1. **Gmail Security**: Use App Password, not regular password
2. **Rate Limits**: Gmail has sending limits (500 emails/day for free accounts)
3. **Error Handling**: Emails are sent asynchronously and won't block student updates if they fail
4. **Testing**: Test with your own email first before going live
5. **Privacy**: Student emails must be valid and consented for notifications

## 🚀 Future Enhancements

- [ ] Interview reminder emails
- [ ] Weekly placement summary reports
- [ ] Email templates for different scenarios
- [ ] Email scheduling (send at specific times)
- [ ] Email tracking (delivery confirmation)
- [ ] Attachment support (offer letters, schedules)
- [ ] Custom email preferences per student

## 🔍 Troubleshooting

**Problem**: "Invalid login" error
- **Solution**: Use App Password for Gmail, enable 2-Step Verification

**Problem**: Emails not sending
- **Solution**: Check console logs, verify .env variables, test SMTP connection

**Problem**: Emails going to spam
- **Solution**: Use authenticated SMTP, add proper SPF/DKIM records

**Problem**: "Connection timeout"
- **Solution**: Check firewall, verify port 587 is open

## 📝 Example .env File

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/placement-tracksheet

# Server
PORT=5000

# Email Configuration
EMAIL_USER=placement.cell@yourinstitute.edu
EMAIL_PASSWORD=your-16-char-app-password

# Optional SMTP (if not using Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

---

✅ **Email notification system is ready to use!** Just install nodemailer and configure your email credentials.
