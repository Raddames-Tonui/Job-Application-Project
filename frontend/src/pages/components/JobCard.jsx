import React from 'react'

function JobCard({job}) {
  return (
    <>
         <li className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
      <div className="flex-shrink-0">
        <img className="h-12 w-12" src={job.icon} alt="" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
        <p className="text-sm text-gray-500">{job.requirements} Open Positions</p>
      </div>
    </li>
    </>
  )
}

export default JobCard


