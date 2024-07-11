import { useJobContext } from "../context/JobContext";
import JobCard from "./JobCard";

const AvailableJobs = () => {
  const { jobs } = useJobContext();

    const avalableJobs = jobs.slice(0, 15);
  return (
    <div >
      <h2 className="mt-10 text-center text-3xl font-bold text-gray-900">
        Most Demanded Jobs Categories
      </h2>
      <p className="text-center text-gray-500 mt-2 mb-6">
        Find the most demanded jobs categories
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avalableJobs.length > 0 ? (
          avalableJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="col-span-full text-center  text-gray-500">
            No jobs available.
          </p>
        )}
      </div>

    </div>
  );
};

export default AvailableJobs;
