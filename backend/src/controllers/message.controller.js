import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import { sendNotificationEmail } from "../lib/mailer.js";

export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // Ambil data user yang sedang login
        const currentUser = await User.findById(loggedInUserId);

        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Jika yang login adalah Admin, tampilkan semua User
        // Jika yang login adalah User, tampilkan semua Admin
        const targetUserType = currentUser.userType === "Admin" ? "User" : "Admin";

        const filteredUsers = await User.find({
            _id: { $ne: loggedInUserId },
            userType: targetUserType
        }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getUserForSidebar", error.message);
        res.status(500).json({ error: "internal server error" });
    }
};


export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {receiverId:myId,senderId:userToChatId}
                ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in message controller", error.message)
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).json({ error: "Sender or receiver not found." });
        }

        // Validasi arah komunikasi:
        // User hanya boleh kirim ke Admin
        // Admin hanya boleh kirim ke User
        if (
            (sender.userType === "User" && receiver.userType !== "Admin") ||
            (sender.userType === "Admin" && receiver.userType !== "User")
        ) {
            return res.status(403).json({ error: "Unauthorized communication." });
        }

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();
        const emailSubject = "Pesan Baru di Aplikasi Klinik Weiku";
const emailBody = `
    <p>Hai ${receiver.fullName},</p>
    <p>Anda menerima pesan baru dari ${sender.fullName}:</p>
    <blockquote>${text || "(Pesan berupa gambar)"}</blockquote>
    <p>Silakan buka aplikasi Weiku untuk membalas pesan ini.</p>
    <br/>
    <p>Salam,</p>
    <p><strong>Tim Klinik Weiku</strong></p>
`;

sendNotificationEmail(receiver.email, emailSubject, emailBody);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in message controller", error.message);
        res.status(500).json({ error: "internal message error" });
    }
};
