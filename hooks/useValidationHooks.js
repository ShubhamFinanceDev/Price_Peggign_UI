const useValidationHooks = () => {

  const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@shubham\.co$/;
    return regex.test(email);
  };

  return {
    isEmailValid,
  }

}

export default useValidationHooks