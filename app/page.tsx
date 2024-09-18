import { Lexend } from "next/font/google"
import Header from "./ui/Header";
import SearchBar from "./ui/SearchBar";
import Categories from "./ui/hompage/Categories";
import JobCard from "./ui/hompage/JobCart";
import Footer from "./ui/Footer";

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400'],
});

export default function Home() {
  return (
    <div className={`min-h-screen bg-white ${lexend.className}`}>
      <Header />
      <div className="text-center mt-4 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mt-10">
          Web tìm việc số 1 Việt Nam
        </h1>
      </div>

      <div className="container mx-auto px-4">
        <SearchBar />
        <Categories />

        <section className="mt-12">
          <h2 className="text-lg md:text-xl font-bold mb-4">
            Việc làm nổi bật
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <JobCard
              title="Junior Graphic Designer"
              company="Google Inc."
              salary="$20,000 - $25,000"
              location="Da Nang, Viet Nam"
            />
            <JobCard
              title="Junior Graphic Designer"
              company="Google Inc."
              salary="$20,000 - $25,000"
              location="Da Nang, Viet Nam"
            />
            <JobCard
              title="Junior Graphic Designer"
              company="Google Inc."
              salary="$20,000 - $25,000"
              location="Da Nang, Viet Nam"
            />
            <JobCard
              title="Junior Graphic Designer"
              company="Google Inc."
              salary="$20,000 - $25,000"
              location="Da Nang, Viet Nam"
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
