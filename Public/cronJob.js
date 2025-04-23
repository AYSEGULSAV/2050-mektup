
const cron = require('node-cron');
const Letter = require('./../Models/letter');
const nodemailer = require('nodemailer');
console.log("✅ cronJob.js dosyası yüklendi.");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'letterto50@gmail.com',
        pass: 'ieru yjoz hjje djqs' 
    }
});


cron.schedule('0 10 * * *', async () => {
    console.log('📬 Otomatik gönderim başlatıldı:', new Date().toLocaleString());

    try {
        const today = new Date();

    
        const lettersToSend = await Letter.find({
            isSent: false,
            status: 'pending',
            deliverAt: { $lte: today }
        });

        for (let letter of lettersToSend) {
            const mailOptions = {
                from: 'letterto50@gmail.com',
                to: letter.email,
                subject: 'Gelecekten bir mektubun var!',
                text: letter.message
            };

            try {
                const info = await transporter.sendMail(mailOptions);
                console.log(`✅ Gönderildi: ${letter.email} - ${letter._id}`);

                letter.isSent = true;
                letter.status = 'sent';
                await letter.save();

            } catch (error) {
                console.error(`❌ Gönderilemedi: ${letter.email}`, error);
            }
        }
    } catch (err) {
        console.error('⛔ Otomatik gönderim hatası:', err);
    }
});
