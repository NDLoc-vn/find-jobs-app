import SearchBar from "./ui/homepage/SearchBar";
import Categories from "./ui/homepage/Categories";
import JobList from "./ui/homepage/JobList";
import Header from "./ui/homepage/Header";

const Home: React.FC = () => {
  return (
    <div className={`min-h-screen bg-white`}>
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

          <JobList
            searchQuery=""
            sortOption="title"
            sortOrder="asc"
            // category=""
            // city=""
            // employmentType=""
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
