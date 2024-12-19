import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Candidate = {
  _id: string;
  name: string;
  email: string;
  gender: string;
  location: string;
}

const fetchCandidateData = async (token: string): Promise<Candidate[]> => {
  const response = await axios.get("https://user-service-job-system.onrender.com/api/user/admin/profile/all", {
    headers: {
      Authorization: token,
    },
  })
  // const mockdata = [
  //   {
  //     "_id": "675af2d8d0cf491b01fc2986",
  //     "name": "candidate5",
  //     "email": "candidate5@gmail.com",
  //     "password": "$2b$10$lv1qo39upB0hXFUppnoAOO4R3L1TJeRWLJJQb4Ooox41IF1WoZSfC",
  //     "gender": "male",
  //     "phone": "0123456780",
  //     "dateOfBirth": "2000-11-06T00:00:00.000Z",
  //     "location": "Hà Nội",
  //     "skills": [
  //       {
  //         "_id": "66f5675831015936064290ef",
  //         "title": "C++"
  //       },
  //       {
  //         "_id": "60d0fe4f5311236168a108ca",
  //         "title": "AI"
  //       },
  //       {
  //         "_id": "60d0fe4f5311236168a108cb",
  //         "title": "ML"
  //       }
  //     ],
  //     "experience": [
  //       {
  //         "_id": "675b05df7402b05f98951b72",
  //         "company": "SpaceX",
  //         "position": "Tester",
  //         "duration": "2020-2021",
  //         "description": "Developed unit est"
  //       },
  //       {
  //         "company": "Tesla",
  //         "position": "Tester",
  //         "duration": "2020-2021",
  //         "description": "Developed unit est",
  //         "_id": "675afffd6190150869fa4855"
  //       }
  //     ],
  //     "education": [
  //       {
  //         "school": "DUF",
  //         "major": "Computer Science",
  //         "duration": "2021-2025",
  //         "description": "Concentrate on NN and ML",
  //         "_id": "675b00ca6190150869fa486b"
  //       }
  //     ],
  //     "savedJobs": [
  //       {
  //         "_id": "66f56ae57efc52e535ffbc4d",
  //         "company": {
  //           "_id": "5f4dcc3b5aa765d61d8327df",
  //           "name": "Tech Corp"
  //         },
  //         "title": "ML engineer",
  //         "due": "2024-05-14T00:00:00.000Z",
  //         "address": "Đà Nẵng",
  //         "status": "Under Review"
  //       }
  //     ],
  //     "appliedJobs": [],
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6751255bbd94aa95ae91a92e",
  //     "name": "candidate3",
  //     "email": "candidate3@gmail.com",
  //     "password": "$2b$10$yHYTisFvmHbP7ZqjXHaye.51yafcZ7NoGK54JeELtz.6R6drxD2H2",
  //     "gender": "male",
  //     "phone": "",
  //     "dateOfBirth": null,
  //     "location": "",
  //     "skills": [],
  //     "experience": [],
  //     "education": [],
  //     "savedJobs": [],
  //     "appliedJobs": [],
  //     "__v": 0
  //   },
  //   {
  //     "_id": "674d7f906c73bd46e9a2c9b2",
  //     "name": "candidate2",
  //     "email": "candidate2@gmail.com",
  //     "password": "$2b$10$AOYFpvgiqKeGGv9fH8c/cuLa4sAes90Yb8esdRHSxCpWmmwA2MOSK",
  //     "gender": "male",
  //     "phone": "0123456780123456788",
  //     "dateOfBirth": "2000-11-06T00:00:00.000Z",
  //     "location": "Hà Nội",
  //     "skills": [],
  //     "experience": [],
  //     "education": [
  //       {
  //         "_id": "675b05df7402b05f98951b75",
  //         "school": "DUF",
  //         "major": "Computer Science",
  //         "duration": "2021-2025",
  //         "description": "Concentrate on NN and ML"
  //       }
  //     ],
  //     "savedJobs": [],
  //     "appliedJobs": [],
  //     "__v": 0
  //   },
  //   {
  //     "_id": "674b005993e4f106f871ae4d",
  //     "name": "admin1",
  //     "email": "admin1@gmail.com",
  //     "password": "$2b$10$rnckXmoOCdgQtZF6RGL6w.Tww1xeWYd983l5Q60e6UR0DafeJ7pZu",
  //     "gender": "male",
  //     "phone": "0123456780123456788",
  //     "dateOfBirth": "2000-11-06T00:00:00.000Z",
  //     "skills": [],
  //     "experience": [],
  //     "education": [],
  //     "savedJobs": [],
  //     "appliedJobs": [],
  //     "__v": 0,
  //     "location": "Hà Nội"
  //   },
  //   {
  //     "_id": "674d7f7d6c73bd46e9a2c9af",
  //     "name": "abc",
  //     "email": "candidate1@gmail.com",
  //     "password": "$2b$10$yUH9CuCJeyqpIxr4yRaoguZVFgu52eeHqbEf/a7GhNc.ksnTFLKC6",
  //     "gender": "female",
  //     "phone": "0123456789",
  //     "dateOfBirth": "2024-11-06T00:00:00.000Z",
  //     "location": "ha noi",
  //     "skills": [
  //       {
  //         "title": "React",
  //         "_id": "674ecadc203502d75487a471"
  //       },
  //       {
  //         "title": "Vue",
  //         "_id": "674ecadc203502d75487a472"
  //       },
  //       {
  //         "title": "AWS",
  //         "_id": "6753b19b4234667f3fcd63aa"
  //       },
  //       {
  //         "title": "C++",
  //         "_id": "66f5675831015936064290ef"
  //       },
  //       {
  //         "title": "AI",
  //         "_id": "60d0fe4f5311236168a108ca"
  //       },
  //       {
  //         "title": "ML",
  //         "_id": "60d0fe4f5311236168a108ca"
  //       },
  //       {
  //         "title": "DS",
  //         "_id": "60d0fe4f5311236168a108ca"
  //       }
  //     ],
  //     "experience": [
  //       {
  //         "company": "test",
  //         "position": "test",
  //         "duration": "test",
  //         "description": "test",
  //         "_id": "674ecae27bb05e71567861e3"
  //       }
  //     ],
  //     "education": [
  //       {
  //         "school": "test",
  //         "major": "test",
  //         "duration": "test",
  //         "description": "test",
  //         "_id": "674ecad77bb05e71567861d2"
  //       },
  //       {
  //         "_id": "675b05df7402b05f98951b7f",
  //         "school": "DUT",
  //         "major": "Computer Science",
  //         "duration": "2021-2025",
  //         "description": "Concentrate on NN and ML"
  //       },
  //       {
  //         "_id": "675b05df7402b05f98951b80",
  //         "school": "DUE",
  //         "major": "Computer Science",
  //         "duration": "2021-2025",
  //         "description": "Concentrate on NN and ML"
  //       },
  //       {
  //         "_id": "675b05df7402b05f98951b81",
  //         "school": "DUF",
  //         "major": "Computer Science",
  //         "duration": "2021-2025",
  //         "description": "Concentrate on NN and ML"
  //       }
  //     ],
  //     "savedJobs": [],
  //     "appliedJobs": [
  //       {
  //         "company": {
  //           "name": "Tech Corp",
  //           "_id": "5f4dcc3b5aa765d61d8327df"
  //         },
  //         "title": "Senior test",
  //         "due": "2024-05-14T00:00:00.000Z",
  //         "status": "Submitted",
  //         "_id": "66f56ae57efc52e535ffbc4d"
  //       },
  //       {
  //         "company": {
  //           "name": "Tech Corp",
  //           "_id": "5f4dcc3b5aa765d61d8327df"
  //         },
  //         "title": "Fresher Java",
  //         "due": "2024-05-14T00:00:00.000Z",
  //         "status": "Submitted",
  //         "_id": "66f56ae57efc52e535ffbc4e"
  //       },
  //       {
  //         "_id": "66f56ae57efc52e535ffbc4e",
  //         "company": {
  //           "_id": "5f4dcc3b5aa765d61d8327df",
  //           "name": "Tech Corp"
  //         },
  //         "title": "Fresher Java",
  //         "due": "2024-05-14T00:00:00.000Z",
  //         "address": "Đà Nẵng",
  //         "status": "Submitted"
  //       }
  //     ],
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6758559a2d2002bf2b5db64b",
  //     "name": "Pham Quang Dang Khoa",
  //     "email": "gobin140600@gmail.com",
  //     "password": "$2b$10$aD.Ch.JGzDkNHDCNxKm3x.BuEws2iSOc00kyYxvrYOvYUQpE1w6g.",
  //     "gender": "male",
  //     "phone": "",
  //     "dateOfBirth": null,
  //     "location": "",
  //     "skills": [],
  //     "experience": [],
  //     "education": [],
  //     "savedJobs": [],
  //     "appliedJobs": [],
  //     "__v": 0
  //   },
  //   {
  //     "_id": "6758559a2d2002bf2b5db64c",
  //     "name": "Pham Quang Dang Khoa",
  //     "email": "goc00l512@gmail.com",
  //     "password": "$2b$10$VYpyd8zOqpoqsL0k632IMOdG30dWmaUmOIxirihOoyubkrglKHvl6",
  //     "gender": "male",
  //     "phone": "",
  //     "dateOfBirth": null,
  //     "location": "",
  //     "skills": [],
  //     "experience": [],
  //     "education": [],
  //     "savedJobs": [],
  //     "appliedJobs": [],
  //     "__v": 0
  //   },
  //   {
  //     "_id": "674fa15039bcf5e166c00b22",
  //     "name": "Nguyễn Đình Lộc",
  //     "email": "loccoc1807@gmail.com",
  //     "password": "$2b$10$SByDmtR9FXd33HToDRfWo.zM.aTtbtPlrUtl1B57HRJIf28QhKt6u",
  //     "gender": "male",
  //     "phone": "0364911136",
  //     "dateOfBirth": "2024-12-05T00:00:00.000Z",
  //     "location": "",
  //     "skills": [
  //       {
  //         "title": "Angular",
  //         "_id": "6753d8a2f523402aa601183b"
  //       },
  //       {
  //         "title": "React",
  //         "_id": "6753d8aaf523402aa601183d"
  //       },
  //       {
  //         "title": "Vue",
  //         "_id": "6753d8aaf523402aa601183e"
  //       }
  //     ],
  //     "experience": [],
  //     "education": [
  //       {
  //         "school": "abc",
  //         "major": "abc",
  //         "duration": "abc",
  //         "description": "abc",
  //         "_id": "6753d8ba3eb3dc14df6963fe"
  //       }
  //     ],
  //     "savedJobs": [],
  //     "appliedJobs": [],
  //     "__v": 0
  //   }
  // ]
  const candidateData = response.data.map((candidate: Candidate) => ({
    // const candidateData = mockdata.map((candidate: Candidate) => ({
    _id: candidate._id,
    name: candidate.name,
    email: candidate.email,
    gender: candidate.gender,
    location: candidate.location,
  }));
  return candidateData;
};

export const useAdminCandidateManager = (token: string) => {
  return useQuery({
    queryKey: ['candidateData'],
    queryFn: () => fetchCandidateData(token),
  });
};