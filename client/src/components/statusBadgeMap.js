// Correct named export for statusBadgeMap
export const statusBadgeMap = {
  pending: { color: "warning", text: "Pending" },
  confirmed: { color: "success", text: "Confirmed by the chief staff" },
  declined: { color: "failure", text: "Declined by the chief staff" },
  out: { color: "failure", text: "This Food Item is out of ingredients" },
  prepare: { color: "info", text: "This Food Item is being cooked" },
  in_serve: { color: "info", text: "This Food Item is ready to served" },
};
