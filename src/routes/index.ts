import { router as booksRoutes } from "./books";
import { router as authorsRoutes } from "./authors";
import { router as carRoutes } from "./cars";
import { Router } from "express";

const router: Router = Router();

router.use("/books", booksRoutes);
router.use("/authors", authorsRoutes);
router.use("/cars", carRoutes);

export { router };
