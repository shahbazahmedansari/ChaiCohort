import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";

export const useProblemStore = create((set) => ({
  problems: [],
  problem: null,
  solvedProblems: [],
  isProblemsLoading: false,
  isProblemLoading: false,

  getAllProblems: async () => {
    try {
      set({ isProblemsLoading: true });

      const res = await axiosInstance.get("/problems/get-all-problems");

      set({ problems: res.data.problems });
    } catch (error) {
      console.error("Error getting all problems", error);
      toast.error("Error in getting all problems");
    } finally {
      set({ isProblemsLoading: false });
    }
  },

  getProblemById: async (id) => {
    try {
      set({ isProblemLoading: true });

      const res = await axiosInstance.get(`/problems/get-problem/${id}`);

      set({ problem: res.data.problem });

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error in getting the problem", error);
      toast.error("Error in getting the problem");
    } finally {
      set({ isProblemLoading: false });
    }
  },

  getSolvedProblemsByUser: async () => {
    try {
      const res = await axiosInstance.get("/problems/get-solve-problem");

      set({ solvedProblems: res.data.problems });
    } catch (error) {
      console.error("Error getting solved problems", error);
      toast.error("Error in getting solved problems");
    }
  },
}));