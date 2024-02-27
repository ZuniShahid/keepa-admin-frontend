describe("ENV tests", () => {
  it("All ENV variables are present", () => {
    const envVariables = ["VITE_API_HOST"];

    for (const env of envVariables) {
      expect(process.env[env]).toBeDefined();
      expect(process.env[env]).not.toBe("");
    }
  });
});
