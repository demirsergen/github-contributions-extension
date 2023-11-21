'use client';

import { useState, useEffect } from 'react';
import moment from 'moment';
import { retrieveContributionData } from './modules/github';

export default function Home() {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await retrieveContributionData(
          'demirsergen'
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchContributions();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="App">
        <h1>GitHub Contributions for the Last Week</h1>
        <div>
          {contributions?.map((day, index) => (
            <div key={index}>
              <p>{moment(day.date).format('dddd, MMMM Do')}</p>
              <p>Contributions: {day.count}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
