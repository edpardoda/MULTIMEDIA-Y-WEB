export function LoginService(user, pass) {
  if (user == "admin" && pass == "admin123") {
    return {
      name: "Administrator",
      lastName: "Main",
      role: "admin",
      image: "",
    };
  } else {
    return null;
  }
}
