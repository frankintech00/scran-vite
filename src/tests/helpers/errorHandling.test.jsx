import getErrorMessage from "../../helpers/errorHandling";

describe("getErrorMessage function", () => {
  beforeEach(() => {
    vitest.spyOn(console, "log");
  });

  it("returns the correct error message for each error code", () => {
    const errorCodes = [
      "permission-denied",
      "unauthenticated",
      "not-found",
      "aborted",
      "already-exists",
      "internal",
      "unavailable",
      "data-loss",
      "auth/missing-email",
      "auth/missing-password",
      "auth/email-already-in-use",
      "auth/user-not-found",
      "auth/invalid-email",
      "auth/wrong-password",
      "auth/user-disabled",
      "auth/too-many-requests",
      "auth/network-request-failed",
      "auth/weak-password",
      "storage/object-not-found",
      "storage/bucket-not-found",
      "storage/project-not-found",
      "unknown-error",
    ];

    errorCodes.forEach((errorCode) => {
      const errorMessage = getErrorMessage(errorCode);
      expect(errorMessage).toEqual(expect.any(String));
    });

    expect(console.log).toHaveBeenCalledTimes(errorCodes.length);
  });
});
