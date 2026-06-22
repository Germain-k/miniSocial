import createServer from "@infrastructure/http/server";

const PORT = process.env.PORT || 3000;

const main = (): void => {
  const app = createServer();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

main();