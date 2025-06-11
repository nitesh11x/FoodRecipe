import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ist: { type: String, required: true },
  ing1: { type: String },
  ing2: { type: String },
  ing3: { type: String },
  ing4: { type: String },
  qty1: { type: String },
  imgUrl: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const Recipe = mongoose.model('Recipe', recipeSchema);

// import mongoose from 'mongoose'

// const recipeSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   ing: { type: String },
//   ins: { type: String },
//   imgUrl: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// })

// export const Recipe = mongoose.model('Recipe', recipeSchema)
