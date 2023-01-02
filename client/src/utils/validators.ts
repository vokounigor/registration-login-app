export const validateEmail = (mail: string) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(mail);
};

export const validatePassword = (password: string) => {
  return password.length >= 6;
};

export const validateName = (name: string) => {
  return name.length >= 1;
}
