import { useJobContext } from '../context/JobContext';
import JobCard from '../components/JobCard';

const AvailableJobs = () => {
  const { jobs } = useJobContext();

  return (
    <div className="mt-10">
      <h2 className="text-center text-3xl font-bold text-gray-900">Most Demanded Jobs Categories</h2>
      <p className="text-center text-gray-500 mt-2 mb-6">Find the most demanded jobs categories</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.length > 0 ? (
          jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No jobs available.</p>
        )}
      </div>
      
     <hr />
    </div>
  );
};

export default AvailableJobs;
