const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: [{
      recipe: {
        type: String,
        required: [true, 'No Name Found'],
      },
      instructions: {
        type: Array,
        required: [true, 'No Instructions Found'],
      },
      sections: {
        type: Array,
        required: [true, 'No Ingredients Found'],
      },
      image: {
        type: String,
        required: [true, 'No Image URL Found'],
      },
    }],   
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', goalSchema)
