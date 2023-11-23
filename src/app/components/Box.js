import React from 'react';

const Box = ({ day, title, contributionCount }) => {
  function getTailwindClass(contributionCount) {
    const thresholds = [1, 5, 10, 20];
    const colors = [
      'bg-gray-100',
      'bg-green-200',
      'bg-green-400',
      'bg-green-600',
      'bg-green-800',
    ];

    // Iterate through thresholds and find the corresponding class
    for (let i = 0; i < thresholds.length; i++) {
      if (contributionCount < thresholds[i]) {
        return colors[i];
      }
    }

    // If contribution count is higher than the last threshold, use the last class
    return colors[colors.length - 1];
  }

  const tailwindClass = getTailwindClass(contributionCount);
  return (
    <div
      title={title}
      //   className={`${
      //     day.contributionCount > 0 ? 'bg-green-100' : 'bg-gray-200'
      //   }  w-4 h-4`}
      className={`w-4 h-4 ${tailwindClass}`}
    ></div>
  );
};

export default Box;
