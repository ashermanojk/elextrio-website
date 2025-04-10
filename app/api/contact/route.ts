import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase/client';

// Interface for contact message data
interface MessageData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

// Path to store contact messages
const MESSAGES_FILE = path.join(process.cwd(), 'data', 'contact-messages.json');

// Create data directory if it doesn't exist
const ensureDirectoryExists = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(MESSAGES_FILE)) {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify([], null, 2));
  }
};

// Initialize Resend email API
const getResendClient = () => {
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.warn('No RESEND_API_KEY found. Email sending will be simulated.');
    return null;
  }
  
  return new Resend(resendApiKey);
};

// Save message to JSON file
const saveMessage = async (messageData: MessageData) => {
  ensureDirectoryExists();
  
  // Read existing messages
  let messages = [];
  try {
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    messages = JSON.parse(data);
  } catch (error) {
    console.error('Error reading messages file:', error);
  }
  
  // Add new message with timestamp and ID
  const newMessage = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...messageData,
  };
  
  messages.push(newMessage);
  
  // Write back to file
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2));
  
  return newMessage;
};

// Send email notification using Resend
const sendEmail = async (messageData: MessageData) => {
  try {
    const resend = getResendClient();
    
    // If no Resend client is available (no API key), simulate sending
    if (!resend) {
      console.log('Simulating email send (no Resend API key available)');
      console.log('Email would have been sent with the following data:');
      console.log(JSON.stringify(messageData, null, 2));
      return true;
    }
    
    // Setup email HTML content
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${messageData.name}</p>
      <p><strong>Email:</strong> ${messageData.email}</p>
      <p><strong>Phone:</strong> ${messageData.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${messageData.company || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${messageData.message.replace(/\n/g, '<br>')}</p>
    `;
    
    // Setup email text content as fallback
    const textContent = `
      New Contact Form Submission
      Name: ${messageData.name}
      Email: ${messageData.email}
      Phone: ${messageData.phone || 'Not provided'}
      Company: ${messageData.company || 'Not provided'}
      Message:
      ${messageData.message}
    `;
    
    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: `Elextrio Contact Form <no-reply@elextrio.com>`,
      to: [process.env.NOTIFICATION_EMAIL || 'admin@elextrio.com'],
      subject: `New Contact Form Submission from ${messageData.name}`,
      html: htmlContent,
      text: textContent,
      replyTo: messageData.email, // Set reply-to to the user's email
    });
    
    if (error) {
      console.error('Resend API error:', error);
      return false;
    }
    
    console.log('Email sent with Resend, ID:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// GET endpoint to retrieve all messages
export async function GET() {
  ensureDirectoryExists();
  
  try {
    const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
    const messages = JSON.parse(data);
    
    if (messages.length === 0) {
      return NextResponse.json(
        { message: 'No messages found.' },
        { status: 200 }
      );
    }
    
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving messages:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve messages' },
      { status: 500 }
    );
  }
}

// POST endpoint to submit a new contact message
export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, phone, company, message } = body;
    
    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // 1. Save to Supabase
    const { error: supabaseError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
        status: 'new'
      });
    
    if (supabaseError) {
      console.error('Error saving to Supabase:', supabaseError);
      // Fall back to local storage if Supabase fails
      console.log('Falling back to local storage...');
    }
    
    // 2. Save message to JSON file as backup
    const savedMessage = await saveMessage({ name, email, phone, company, message });
    
    // 3. Attempt to send email notification
    const emailSent = await sendEmail({ name, email, phone, company, message });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Form submitted successfully',
        emailSent,
        savedMessage,
        storedInSupabase: !supabaseError
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    return NextResponse.json(
      { error: 'There was a problem submitting your form. Please try again.' },
      { status: 500 }
    );
  }
}
