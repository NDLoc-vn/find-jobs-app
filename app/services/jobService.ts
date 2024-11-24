import axios from "axios";
import { CardJob, JobDetail } from "../lib/definitions";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeader = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `${token}` } : {};
  }
  return {};
};

export const getListCardJobs = async (
  search?: string,
  sortBy?: string,
  sortOrder?: string,
  category?: string,
  city?: string,
  employmentType?: string
): Promise<CardJob[]> => {
  try {
    const params = {
      searchQuery: search,
      sortBy: sortBy,
      sortOrder: sortOrder,
      category: category,
      city: city,
      employmentType: employmentType,
    };

    const response = await apiClient.get("/all-jobs", { params });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const getDetailJobForGuest = async (
  postId: string
): Promise<JobDetail> => {
  try {
    const response = await apiClient.get(`/job/${postId}`);
    console.log("Guest");
    return response.data.data as JobDetail;
  } catch (error) {
    console.error("Error fetching post job details:", error);
    throw error;
  }
};

export const getDetailJob = async (postId: string): Promise<JobDetail> => {
  try {
    const response = await apiClient.get(`/job/${postId}`, {
      headers: getAuthHeader(),
    });
    return response.data.data as JobDetail;
  } catch (error) {
    console.error("Error fetching post job details:", error);
    throw error;
  }
};

export const getListAppliedJobs = async (): Promise<CardJob[]> => {
  try {
    const response = await apiClient.get("/jobs-applied", {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const getListBookmarkedJobs = async (): Promise<CardJob[]> => {
  try {
    const response = await apiClient.get("/jobs-bookmark", {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const addBookmarkedJob = async (postId: string): Promise<void> => {
  try {
    const response = await apiClient.post(`/jobs-bookmark/add/${postId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const deleteBookmarkedJob = async (postId: string): Promise<void> => {
  try {
    const response = await apiClient.delete(`/jobs-bookmark/delete/${postId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const getListOpenedJobs = async (): Promise<CardJob[]> => {
  try {
    const response = await apiClient.get("/jobs-opened", {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const getListClosedJobs = async (): Promise<CardJob[]> => {
  try {
    const response = await apiClient.get("/jobs-closed", {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const getListOpenedJobsWithId = async (
  recruiterId: string
): Promise<CardJob[]> => {
  try {
    const response = await apiClient.get(`/jobs-opened/${recruiterId}`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const getListClosedJobsWithId = async (
  recruiterId: string
): Promise<CardJob[]> => {
  try {
    const response = await apiClient.get(`/jobs-closed/${recruiterId}`, {
      headers: getAuthHeader(),
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const createPost = async (postData: {
  id: null;
  title: string;
  category: {
    id: string;
    name: string;
  };
  company: null;
  postedBy: null;
  description: string;
  education: string;
  requirements: string[];
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: {
    city: string;
    address: string;
  };
  employmentType: string;
  postDate: string;
  dueDate: string;
  status: string;
}): Promise<void> => {
  try {
    const response = await apiClient.post("/job/add", postData, {
      headers: getAuthHeader(),
    });
    console.log("Post created successfully:", response.data);
  } catch (error) {
    console.error("Error creating job post:", error);
    throw error;
  }
};

export const updatePost = async (
  postId: string,
  postData: {
    title?: string;
    category?: string;
    description?: string;
    requirements?: string[];
    salaryMin?: number;
    salaryMax?: number;
    city?: string;
    address?: string;
    employmentType?: string;
    dueDate?: string;
  }
): Promise<void> => {
  try {
    const response = await apiClient.put(`/update/${postId}`, postData, {
      headers: getAuthHeader(),
    });
    console.log("Post update successfully:", response.data);
  } catch (error) {
    console.error("Error creating job post:", error);
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    const response = await apiClient.delete(`/delete/${postId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching post job details:", error);
    throw error;
  }
};
