import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CaseShema = Schema({
  case_title: {
    type: String,
    required: true,
  },

  file: [
    {
      image: {
        type: String,
      },
    },

    {
      doc: {
        type: String,
      },
    },
  ],

  judge_name: {
    type: String,
    required: true,
  },

  // clerk:{
  //     type:String

  // }
  case_between: {
    type: String,
    required: true,
  },

  creator: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
  },

  is_adjourn: {
    type: Boolean,
    unique: true,
  },

  code: {
    type: String,
    unique: true,
  },
});
const Case = mongoose.model("case", CaseShema);
export default Case;
