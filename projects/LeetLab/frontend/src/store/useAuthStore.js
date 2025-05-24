import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/check");
      console.log("checkauth response", res.data);

      set({ authUser: res.data.user });

    } catch (error) {
      console.error("Error checking auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async () => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register");

      console.log("checking response", res.data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error signing up: ", error);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      console.log("checking response", res.data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error logging in: ", error);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logout successfull");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  }

}));