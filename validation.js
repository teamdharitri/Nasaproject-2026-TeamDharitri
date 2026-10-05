const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 6;

export function validateLoginForm({ email = '', password = '' } = {}) {
  const errors = {};
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    errors.email = 'Enter your email address.';
  } else if (!EMAIL_PATTERN.test(normalizedEmail)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!password) {
    errors.password = 'Enter your password.';
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export { MIN_PASSWORD_LENGTH };
