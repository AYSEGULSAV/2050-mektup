const Letter = require('./../Models/letter');
const User = require('./../Models/userModel');
const nodemailer = require('nodemailer');

exports.getAdminStats = async (req, res) => {
  try {
    const privateMessagesCount = await Letter.countDocuments({ visibility: 'private' });
    const publicMessagesCount = await Letter.countDocuments({ visibility: 'public_anonymous' });

    const pendingMessages = await Letter.find({ status: 'pending' }).sort({ createdAt: -1 });

   
    const users = await User.find();
    const userStats = await Promise.all(users.map(async (user) => {
      const sent = await Letter.countDocuments({ email: user.email, status: 'sent' });
      const pending = await Letter.countDocuments({ email: user.email, status: 'pending' });
      return { email: user.email, sent, pending };
    }));

    res.json({
      privateMessagesCount,
      publicMessagesCount,
      pendingMessages,
      userStats
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ success: false, message: 'Bir hata oluştu.' });
  }
};


exports.sendLetterToUser = async (req, res) => {
  const { letterId, email } = req.body;
  try {
    const letter = await Letter.findById(letterId);
    if (!letter) return res.status(404).json({ success: false });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'letterto50@gmail.com',
        pass: 'ieru yjoz hjje djqs'
      }
    });

    await transporter.sendMail({
      from: 'letterto50@gmail.com',
      to: email,
      subject: 'Gelecekten bir mektubun var!',
      text: letter.message
    });

    letter.status = 'sent';
    await letter.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
