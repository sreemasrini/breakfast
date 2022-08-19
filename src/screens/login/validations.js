export const validateSignUp = (
  email,
  password,
  mobileNo,
  newPassword,
  personName
) => {
  if (
    email !== "" &&
    password !== "" &&
    mobileNo !== "" &&
    newPassword !== "" &&
    password !== "" &&
    personName !== ""
  )
    return true;
  else false;
};

export const validateEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(email) === false) {
    return false;
  } else return true;
};
