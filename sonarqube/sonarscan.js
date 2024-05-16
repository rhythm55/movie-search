const scanner = require("sonarqube-scanner");

scanner(
  {
    serverUrl: "http://localhost:9000",
    token: "sqp_5cc5da9db310595a00dccb3e79a16440c520f910",
    options: {
      "sonar.projectName": "movie-search",
      "sonar.projectDescription": "movie search project",
      "sonar.projectKey": "movie-search",
      "sonar.projectVersion": "0.0.1",
      "sonar.exclusions": "node_modules/**/*,**/*.test.tsx, coverage/**",
      "sonar.sourceEncoding": "UTF-8",
    },
  },
  () => process.exit()
);
