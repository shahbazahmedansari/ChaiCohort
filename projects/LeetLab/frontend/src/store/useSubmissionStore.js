import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useSubmissionStore = create((set) => ({
  isLoading: null,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get("/submission/get-all-submissions");

      set({ submissions: res.data.submissions });

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error getting all submissions", error);
      toast.error("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get(`/submission/get-submission/${problemId}`);

      set({ submission: res.data.submission });

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error getting submissions for problem", error);
      toast.error("Error getting submissions for problem");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      set({ isLoading: true });

      const res = await axiosInstance.get(`/submission/get-submissions-count/${problemId}`);

      set({ submissionCount: res.data.count });

      toast.success(res.data.message);
    } catch (error) {
      console.error("Error getting submission count for problem", error);
      toast.error("Error getting submission count for problem");
    } finally {
      set({ isLoading: false });
    }
  },
}));