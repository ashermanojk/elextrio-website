// Test script for email configuration
import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';

async function testEmail() {
  // Create a test account on Ethereal for testing
  const testAccount = await createTestAccount();
  
  console.log('Test account credentials:');
  console.log('- Email:', testAccount.user);
  console.log('- Password:', testAccount.pass);
  
  // Create a transporter using the test account
  const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  
  // Send a test message
  const info = await transporter.sendMail({
    from: '"Test Sender" <test@example.com>',
    to: 'ashermanoj.k@gmail.com',
    subject: 'Test Email from Nodemailer',
    text: 'This is a test email to verify Nodemailer is working correctly.',
    html: '<p>This is a <b>test email</b> to verify Nodemailer is working correctly.</p>',
  });
  
  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', getTestMessageUrl(info));
}

testEmail().catch(console.error);
