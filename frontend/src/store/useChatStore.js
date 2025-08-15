import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

let audio;
export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  unreadMap: {},

  setSelectedUser: (user) => {
  const current = get();

  if (!user) {
    set({ selectedUser: null }); 
    return;
  }

  const updatedUnreadMap = { ...current.unreadMap };
  delete updatedUnreadMap[user._id];
  set({ selectedUser: user, unreadMap: updatedUnreadMap });
},


  setUnreadForUser: (userId) => {
    const currentUnread = get().unreadMap;
    set({
      unreadMap: {
        ...currentUnread,
        [userId]: (currentUnread[userId] || 0) + 1
      }
    });
  },

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/user");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memuat pengguna");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal memuat pesan");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) {
      toast.error("No user selected");
      return;
    }

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessage: () => {
  const socket = useAuthStore.getState().socket;
  if (!socket) return;

  // Hindari multiple listeners
  socket.off("newMessage");

  if (!audio) {
    audio = new Audio("/sounds/Ringtone.mp3");
  }

  socket.on("newMessage", (newMessage) => {
    const { selectedUser, setUnreadForUser } = get();

    const isFromCurrentChat =
      selectedUser &&
      (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id);

    if (isFromCurrentChat) {
      // ✅ Pakai callback agar tidak stale
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    } else {
      setUnreadForUser(newMessage.senderId);

      // 🔊 Mainkan notifikasi suara
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      } catch (e) {
        console.error("Gagal memutar notifikasi:", e);
      }
    }
  });
},


  unSubscribeFromMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  }
}));
