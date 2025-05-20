import app from "@/app";
import { config } from "../src/config/environment";
import { connectDatabase } from "../src/db/index";

const PORT = config.PORT;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
  });