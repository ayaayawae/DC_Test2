import db from "../../db/index.js";

const { main } = db

const index = async (req, res, next) => {
  try {
    const data = await main.tasks.findMany()

    return res.json({
      status: "success",
      message: "Tasks Fetched Successfully",
      data: data
    });
  } catch (e) {
    next(e);
  }
};

const create = async (req, res, next) => {
  try {
    const { Title, Description, Status } = req.body
    if (!Title, !Description, !Status) {
      return res.status(400).json({
        status: "error",
        message: "Missing required field",
      });
    }

    const data = await main.tasks.create({
      data: { Title, Description, Status }
    })

    return res.json({
      status: "success",
      message: "Tasks Created Successfully",
      data: data
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const { Id, Title, Description, Status } = req.body
    if (!Title, !Description, !Status) {
      return res.status(400).json({
        status: "error",
        message: "Missing required field",
      });
    }

    const data = await main.tasks.update({
      data: { Title, Description, Status },
      where: { Id }
    })

    return res.json({
      status: "success",
      message: "Tasks Updated Successfully",
      data: data
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const { Id } = req.params

    const data = await main.tasks.delete({
      where: { Id }
    })

    return res.json({
      status: "success",
      message: "Tasks Deleted Successfully",
      data: data
    });
  } catch (e) {
    next(e);
  }
};

export default {
  index,
  create,
  update,
  remove
}