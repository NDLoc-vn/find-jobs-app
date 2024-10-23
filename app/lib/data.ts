export async function fetchJobs() {
  // delay de demo
  await new Promise(resolve => setTimeout(resolve, 1000));

  return [
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
    {
      title: "Junior Graphic Designer",
      company: "Google Inc.",
      salary: "$20,000 - $25,000",
      location: "Da Nang, Viet Nam"
    },
  ];
}

export async function fetchCompanyAccount() {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      name: "Google Inc.",
      email: "google@google.com",
      industry: "IT",
      phone: "0123456789",
      location: {
        city: "Đà Nẵng",
        address: "123 Nguyễn Lương Bằng",
      },
      website: "https://google.com",
    },
    {
      name: "Facebook Inc.",
      email: "facebook@facebook.com",
      industry: "IT",
      phone: "0123456789",
      location: {
        city: "Hà Nội",
        address: "456 Nguyễn Lương Bằng",
      },
      website: "https://facebook.com",
    }
  ]
}