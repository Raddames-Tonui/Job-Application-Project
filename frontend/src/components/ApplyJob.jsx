import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ApplyJob = () => {
const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
  const { id } = useParams(); // Accessing the 'id' parameter from the URL
  const [job, setJob] = useState('');
  const [fetchjobs, setFetchJobs] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    coverLetter: ''
  });


  useEffect(() => {
    fetch('http://127.0.0.1:5555/jobs')
        .then(response => response.json())
        .then(data => {
            // Randomly select 4 items from the fetched jobs data
            const randomJobs = data.jobs.sort(() => 0.5 - Math.random()).slice(0, 4);
            setFetchJobs(randomJobs);
        });
}, []);

  useEffect(() => {
    const fetchJob = () => {
      fetch(`http://127.0.0.1:5555/jobs/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch job');
          }
          return response.json();
        })
        .then(data => {
          setJob(data);
        })
        .catch(error => {
          console.error('Error fetching job:', error);
        });
    };

    fetchJob();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


//   navigate

const handleApply = (jobId) => {
    navigate(`/jobs/apply/${jobId}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    // Here you can handle form submission, e.g., send data to a backend API
    console.log('Form data:', formData);
    // You can add your API call logic here to submit the application data
    // Example:
    // fetch('http://api.example.com/apply', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Application submitted:', data);
    // })
    // .catch(error => {
    //   console.error('Error submitting application:', error);
    // });
  };

  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
      <p className="text-gray-600 mb-4">{job.company?.name}</p>
      <p className="text-gray-700 mb-4">{job.description}</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
       
        <div className="mt-4">
          {!success  ?(<button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Submit Application
          </button>)  :(
            <div>
                 <h2 className="text-lg text-green-500 font-bold mb-4">Thank you for your application!</h2>
                <p className="text-gray-500 ">Your application has been submitted successfully. We will get back to you as soon as possible.</p>
                
            </div>
                   )}
        </div>
      </form>

          {success && (
                <div className='mt-12'>
                    <div className=' flex justify-between items-center'>
                       <h2 className="text-lg font-bold mb-4">Related Jobs</h2>
                       <button onClick={()=> navigate('/dashboard')} className='bg-blue-500 text-white rounded-md px-4 capitalize py-2'> view more</button>
                       </div>
                {fetchjobs.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <h1 className="text-xl font-bold text-gray-800">{item.title}</h1>
                    <p className="text-gray-600">{item.company.name}</p>
                    <p className="text-gray-700">{item.description}</p>
                    <div className='flex justify-end'>
                        <button
                        className='bg-blue-500 text-white rounded-md px-4 py-2'
                        onClick={() => handleApply(item.id)}
                        >
                        Apply
                        </button>
                    </div>
                    </div>
                ))}
                </div> 
          )}
    
    </div>
  );
};

export default ApplyJob;
