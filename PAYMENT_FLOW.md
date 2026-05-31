# Payment Flow Implementation

This document explains the payment flow implemented in the registration page.

ok

## Flow Logic

### When Total Amount = ₹0 (Free Enrollment)
1. User fills out the registration form
2. If they have a valid referral code that gives 100% discount (₹500 off)
3. Total amount becomes ₹0
4. On clicking "Enroll for FREE!" button:
   - Form data is saved to Firebase
   - Status is set to 'completed'
   - **Confirmation page is shown** with success message
   - User sees course details and next steps

### When Total Amount > ₹0 (Paid Enrollment)
1. User fills out the registration form
2. Total amount is greater than ₹0 (no discount or partial discount)
3. On clicking "Pay & Enroll Now!" button:
   - Form data is saved to Firebase
   - Status is set to 'pending_payment'
   - **Redirects to Razorpay payment page** (https://rzp.io/rzp/Gita-Unlocked)
   - Shows success message after redirect
   - Form is reset for new registration

## Referral Codes

Current referral codes that provide 100% discount (₹500 off):
- `IITP25_GU` - IIT Patna referral
- `IITBH25_GU` - IIT BHU referral  
- `RGIPT25_GU` - RGIPT referral

## Components

### RegistrationPage.vue
- Main registration form
- Handles payment logic
- Shows confirmation page for free enrollments
- Redirects to Razorpay for paid enrollments

### RegistrationConfirmation.vue
- Success page shown after free enrollment
- Displays course details
- Shows next steps and contact information
- Provides navigation back to home or course details

## Firebase Data Structure

Enrollment records are saved with:
```javascript
{
  name: "Student Name",
  phone: "Phone Number", 
  email: "Email Address",
  referral: "Referral Code",
  total: 0, // or actual amount
  discount: 500, // discount applied
  timestamp: "2025-01-28T...",
  status: "completed" // or "pending_payment"
}
```

## User Experience

### Free Enrollment (₹0)
- Clear indication that enrollment is FREE
- Immediate confirmation with course details
- No external redirects
- Complete enrollment process

### Paid Enrollment (>₹0)
- Clear indication of amount to pay
- Seamless redirect to secure payment
- Form reset after successful submission
- Payment completion handled by Razorpay

## Security & Data

- All form data is validated before submission
- Firebase handles secure data storage
- Razorpay handles secure payment processing
- No sensitive payment data stored locally
