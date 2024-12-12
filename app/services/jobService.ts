import axios from "axios";
import { CardJob, JobDetail } from "../lib/definitions";
// import { useAuth } from "../contexts/auth-context";

// const { token, user } = useAuth();
// const { token } = useAuth();

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_POSTS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthHeader = () => {
  if (typeof window !== "undefined") {
    // const token = localStorage.getItem("authToken");
    const cookies = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="));
    const token = cookies ? cookies.split("=")[1] : null;
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
    const response = await apiClient.get(`/job/detail/${postId}`);
    console.log("Guest");
    return response.data.data as JobDetail;
  } catch (error) {
    console.error("Error fetching post job details:", error);
    throw error;
  }
};

export const getDetailJob = async (postId: string): Promise<JobDetail> => {
  try {
    const response = await apiClient.get(`/job/detail/${postId}`, {
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

export const appliedJob = async (formData: FormData): Promise<void> => {
  try {
    const response = await apiClient.post(`/jobs-applied/apply`, formData, {
      headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error adding job list:", error);
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
    const response = await apiClient.post(
      `/jobs-bookmark/add`,
      { idPost: postId },
      {
        headers: getAuthHeader(),
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error adding job list:", error);
    throw error;
  }
};

export const deleteBookmarkedJob = async (postId: string): Promise<void> => {
  try {
    const response = await apiClient.delete(
      `/jobs-bookmark/delete?idPost=${postId}`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching job list:", error);
    throw error;
  }
};

export const getListOpenedJobs = async (): Promise<CardJob[]> => {
  try {
    const response = await apiClient.get("/job/opened", {
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
    const response = await apiClient.get("/job/closed", {
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

export const updatePost = async (postData: {
  // title?: string;
  // category?: string;
  // description?: string;
  // requirements?: string[];
  // salaryMin?: number;
  // salaryMax?: number;
  // city?: string;
  // address?: string;
  // employmentType?: string;
  // dueDate?: string;
  id: string;
  title: string;
  category: {
    id: string;
    name: string;
  };
  company: string;
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
    const response = await apiClient.put(`/job/update`, postData, {
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
    const response = await apiClient.delete(`/job/delete?idPost=${postId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching post job details:", error);
    throw error;
  }
};
