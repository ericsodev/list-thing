
const CUSTOM_ERRORS = {
  NO_USER: ["This user this not exist", { extensions: { code: "NO_USER" } }],
  WR_PASS: ["Incorrect password", { extensions: { code: "WR_PASS" } }],
  FORBIDDEN: ["Unauthorized to access resource", { extensions: { code: "FORBIDDEN" } }],
  UNAUTHORIZED: ["Unauthenticated", { extensions: { code: "UNAUTHORIZED" } }],
  TOKEN_ERR: ["Error generating JWT", { extensions: { code: "TOKEN_ERR" } }],
  NO_TOKEN: ["Missing access token", { extensions: { code: "NO_TOKEN" } }],
  NO_REFRESH: ["Missing refresh token", { extensions: { code: "NO_REFRESH" } }],
  INVALID_TOKEN: ["Invalid access token", { extensions: { code: "INVALID_TOKEN" } }],
  USER_EXISTS: ["User with that name exists", { extensions: { code: "USER_EXISTS" } }],
} as const;

export default CUSTOM_ERRORS;
