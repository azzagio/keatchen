# **App Name**: Keatchen

## Core Features:

- Authentication: User authentication via email, Google, or Facebook. Account type selection (Client or Cook) during registration.
- Homepage with Cook Listing: Display of available cooks based on proximity using geolocation. Filtering options: Takeout/Delivery, Cook Type (Individual/Professional), Cuisine Type.
- Cook Profile: Detailed cook profile: photo, bio, cuisine type, specialties, address (with geolocation), contact information, availability calendar, delivery times, menu, client reviews + average rating.
- Ordering System: Allows customer to select a dish with options (quantity, customizations), review the order in a shopping cart with a summary, contacts of the cook, secure payment via mangopay (account linked to the cook), real-time order tracking (status: pending, processing, delivered).
- Client Profile: Client personal info, phone, mail, saved delivery addresses, order history, favorites (dishes/cooks), saved payment method.
- Cook Dashboard: CRUD management for dishes and cook profile. Tracks ongoing orders with customer details, and sales statistics.

## Style Guidelines:

- Primary color: Light peach (#FFE5B4) to create a welcoming and appetizing atmosphere reminiscent of home-cooked meals.
- Background color: Very light beige (#F5F5DC) for a soft, neumorphic aesthetic that provides a clean backdrop.
- Accent color: Soft orange (#FFB347) to highlight key interactive elements such as the order buttons and to provide an additional friendly touch.
- Body and headline font: 'PT Sans' (sans-serif) will be used for both headings and body text for a blend of modernity and readability.
- Use detailed, but minimalist, icons related to food, cooking, delivery, and user account management. The style will match the neumorphic design, with subtle shadows and highlights.
- The layout will follow a mobile-first, responsive approach. The neumorphic design elements will be implemented using TailwindCSS.
- Use subtle animations for transitions, loading states, and interactive elements to enhance user experience without overwhelming the user. For example, gentle scaling animations on buttons, or smooth transitions between pages.