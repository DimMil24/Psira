export function getRole(role) {
  switch (role) {
    case "ROLE_ADMIN":
      return "Admin";
    case "ROLE_MANAGER":
      return "Project Manager";
    case "ROLE_DEVELOPER":
      return "Developer";
    case "ROLE_SUBMITTER":
      return "Submitter";
  }
}
