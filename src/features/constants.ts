export const PAGE = {
  HOME: '/',
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'profile',
  EVENTS: 'events',
};

export const labels = {
  navbar: {
    title: 'Tour',
    login: 'Login',
    register: 'Registration',
    logout: 'Sign Out',
    events: 'Events',
  },
  login: {
    signIn: 'Sign In',
    emailPlaceholder: 'Enter Email or Username',
    passwordPlaceholder: 'Enter Password',
  },
  register: {
    signUp: 'Sign Up',
  },
  event: {
    manage: 'Manage Event',
  },
  profile: {
    role: 'Service role',
    updateImage: 'Update image',
  },
};

export const EventStatus = {
  0: 'Not started yet',
  1: 'Registration started',
  2: 'Registration finished',
  4: 'Event in progress',
  8: 'Event finished',
  16: 'Event closed',
};

export const UserRole = {
  1: 'No access',
  100: 'Default',
  200: 'Editor',
  400: 'Admin',
  500: 'Super admin',
};
