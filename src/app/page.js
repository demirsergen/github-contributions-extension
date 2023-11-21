'use client';

import { useState, useEffect } from 'react';
import moment from 'moment';
import { retrieveContributionData } from './modules/github';

export default function Home() {
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(0);
  const [dailyContributions, setDailyContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await retrieveContributionData(
          'demirsergen'
        );
        setContributions(response);
        setTotalContributions(
          response.data.user.contributionsCollection
            .contributionCalendar.totalContributions
        );
        setDailyContributions(
          response.data.user.contributionsCollection.contributionCalendar.weeks.slice(
            -1
          )
        );

        console.log(
          response.data.user.contributionsCollection.contributionCalendar.weeks.slice(
            -1
          )
        );
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
          {dailyContributions[0]?.contributionDays.map(
            (day, index) => (
              <div key={index}>
                <p>{moment(day.date).format('dddd, MMMM Do')}</p>
                <p>Contributions: {day.contributionCount}</p>
              </div>
            )
          )}

          <h1>Total contributions: {totalContributions}</h1>
        </div>
      </div>
    </main>
  );
}
