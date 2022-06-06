import app from "./app";
import { AppDataSource } from "./data-source";

(async () => {
  await AppDataSource.initialize().catch((err) => {
    console.error("Error during Data Source Initialization", err);
  });

  app.listen(3000, () => console.log("Running at http://localhost:3000"));
})();

// AppDataSource.initialize()
//   .then(() => {
//     console.log("Data Source Initialized");
//   })
//   .catch((err) => {
//     console.error("Error during Data Source Initialization", err);
//   });
