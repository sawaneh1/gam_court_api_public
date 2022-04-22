import Case from "../model/caseModel.js";

export const createCase = async (req, res, next) => {
  const {
    case_title,
    file,
    judge_name,
    case_between,
    creator,
    date,
    is_adjourn,
    code,
  } = req.body;

  try {
    console.log(req.body);

    const newCase = new Case({
      case_title,
      file,
      judge_name,
      case_between,
      creator,
      date,
      is_adjourn,
      code,
    });

    await newCase.save();
    res.json(newCase);
  } catch (error) {
    console.log("this is an erro", error);
    next(error);
  }
};

export const getCases = async (req, res, next) => {
  try {
    const cases = await Case.find({});

    res.json({
      data: cases,
    });
  } catch (error) {
    next(error);
  }
};
export const getCase = async (req, res, next) => {
  try {
    if (!single_case) return next(new Error("case dosnt exist"));

    const caseId = req.params._id;
    const single_case = await Case.findById(caseId);
    res.json({
      data: single_case,
    });
  } catch (error) {
    next(error);
  }
};
