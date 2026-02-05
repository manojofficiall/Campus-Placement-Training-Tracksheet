// Email Service for sending notifications
// Note: Install nodemailer first: npm install nodemailer

const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // For Gmail - requires App Password (2-Step Verification must be enabled)
  // Go to: https://myaccount.google.com/apppasswords
  return nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send placement update notification
const sendPlacementNotification = async (studentData, action) => {
  try {
    const transporter = createTransporter();

    let subject = '';
    let htmlContent = '';

    if (action === 'placed') {
      subject = `🎉 Congratulations! Placement Confirmation - ${studentData.name}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .detail-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #4caf50; border-radius: 5px; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
            .congratulations { font-size: 24px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Campus Placement Tracksheet</h1>
              <p>Placement Notification</p>
            </div>
            <div class="content">
              <div class="congratulations">🎉 Congratulations!</div>
              <p>Dear <strong>${studentData.name}</strong>,</p>
              <p>We are delighted to inform you that your placement status has been updated to <strong style="color: #4caf50;">PLACED</strong>!</p>
              
              <div class="detail-box">
                <div class="detail-row">
                  <span class="label">Student ID:</span> ${studentData.studentId}
                </div>
                <div class="detail-row">
                  <span class="label">Company:</span> ${studentData.company || 'Not specified'}
                </div>
                <div class="detail-row">
                  <span class="label">Package:</span> ₹${studentData.package || 'Not specified'} LPA
                </div>
                <div class="detail-row">
                  <span class="label">Placement Date:</span> ${studentData.placementDate ? new Date(studentData.placementDate).toLocaleDateString() : 'Not specified'}
                </div>
              </div>

              <p>Your hard work and dedication have paid off. We wish you all the best for your future endeavors!</p>
              
              <p style="margin-top: 30px;">Best regards,<br>
              <strong>Placement Cell</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated email from Campus Placement Tracksheet</p>
              <p>© ${new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (action === 'updated') {
      subject = `📝 Placement Status Updated - ${studentData.name}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .detail-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #667eea; border-radius: 5px; }
            .detail-row { margin: 10px 0; }
            .label { font-weight: bold; color: #667eea; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 Campus Placement Tracksheet</h1>
              <p>Status Update Notification</p>
            </div>
            <div class="content">
              <p>Dear <strong>${studentData.name}</strong>,</p>
              <p>Your placement information has been updated in our system.</p>
              
              <div class="detail-box">
                <div class="detail-row">
                  <span class="label">Student ID:</span> ${studentData.studentId}
                </div>
                <div class="detail-row">
                  <span class="label">Status:</span> <strong>${studentData.placementStatus}</strong>
                </div>
                ${studentData.company ? `
                <div class="detail-row">
                  <span class="label">Company:</span> ${studentData.company}
                </div>` : ''}
                ${studentData.package ? `
                <div class="detail-row">
                  <span class="label">Package:</span> ₹${studentData.package} LPA
                </div>` : ''}
              </div>

              <p>If you have any questions, please contact the placement cell.</p>
              
              <p style="margin-top: 30px;">Best regards,<br>
              <strong>Placement Cell</strong></p>
            </div>
            <div class="footer">
              <p>This is an automated email from Campus Placement Tracksheet</p>
              <p>© ${new Date().getFullYear()} All rights reserved</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    const mailOptions = {
      from: `"Campus Placement Cell" <${process.env.EMAIL_USER || 'noreply@placement.edu'}>`,
      to: studentData.email,
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    return { success: false, error: error.message };
  }
};

// Send bulk notification to multiple students
const sendBulkNotification = async (students, message) => {
  try {
    const transporter = createTransporter();

    const subject = '📢 Important Announcement from Placement Cell';
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .message-box { background: white; padding: 20px; margin: 15px 0; border-left: 4px solid #ff9800; border-radius: 5px; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 Campus Placement Tracksheet</h1>
            <p>Announcement</p>
          </div>
          <div class="content">
            <p>Dear Students,</p>
            <div class="message-box">
              <p>${message}</p>
            </div>
            <p style="margin-top: 30px;">Best regards,<br>
            <strong>Placement Cell</strong></p>
          </div>
          <div class="footer">
            <p>This is an automated email from Campus Placement Tracksheet</p>
            <p>© ${new Date().getFullYear()} All rights reserved</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const emails = students.map(student => student.email).filter(email => email);
    
    const mailOptions = {
      from: `"Campus Placement Cell" <${process.env.EMAIL_USER || 'noreply@placement.edu'}>`,
      bcc: emails, // Use BCC to hide recipient emails
      subject: subject,
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Bulk email sent to ${emails.length} students`);
    return { success: true, count: emails.length };

  } catch (error) {
    console.error('❌ Error sending bulk email:', error.message);
    return { success: false, error: error.message };
  }
};

// Test email configuration
const testEmailConfig = async (testEmail) => {
  try {
    const transporter = createTransporter();
    
    await transporter.verify();
    console.log('✅ Email server is ready to send messages');

    // Send test email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: testEmail,
      subject: 'Test Email - Campus Placement Tracksheet',
      html: '<h1>Email Configuration Test</h1><p>If you receive this, your email setup is working correctly!</p>'
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent:', info.messageId);
    return { success: true };

  } catch (error) {
    console.error('❌ Email configuration error:', error.message);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendPlacementNotification,
  sendBulkNotification,
  testEmailConfig
};
