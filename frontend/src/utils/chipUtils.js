export function getColorPriority(priority) {
  switch (priority) {
    case "Low":
      return "success";
    case "Medium":
      return "primary";
    case "High":
      return "warning";
    case "Urgent":
      return "error";
  }
}

export function getColorType(type) {
  switch (type) {
    case "New Development":
      return "success";
    case "Work Task":
      return "default";
    case "Defect":
      return "error";
    case "Change Request":
      return "warning";
    case "Enhancement":
      return "secondary";
    case "General Task":
      return "info";
  }
}

export function getColorStatus(status) {
  switch (status) {
    case "New":
      return "primary";
    case "In Development":
      return "secondary";
    case "Testing":
      return "warning";
    case "Resolved":
      return "secondary";
  }
}
