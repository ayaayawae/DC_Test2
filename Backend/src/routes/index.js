import express from "express";
import tasks from "../handler/tasks.js";

const router = express.Router();

router.get("/tasks", tasks.index);
router.post("/tasks", tasks.create);
router.patch("/tasks/:Id", tasks.update);
router.delete("/tasks/:Id", tasks.remove);

export default router;
