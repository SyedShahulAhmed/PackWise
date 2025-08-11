import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    profilePicture: {
      type: String,
      default: '', // Could be a default avatar URL
    },

    trips: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
      },
    ],

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
