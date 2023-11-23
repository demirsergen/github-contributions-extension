'use client';

import { useState, useEffect } from 'react';
import moment from 'moment';
import { retrieveContributionData } from './modules/github';
import Box from './components/Box';

export default function Home() {
  const [totalContributions, setTotalContributions] = useState(0);
  const [dailyContributions, setDailyContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await retrieveContributionData(
          'demirsergen'
        );
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
        <div className="flex gap-1">
          {dailyContributions[0]?.contributionDays.map(
            (day, index) => (
              <Box
                day={day}
                key={index}
                contributionCount={day.contributionCount}
                title={moment(day.date).format('dddd, MMMM Do')}
              />
            )
          )}
        </div>
        <div className="bg-teal-800 mt-2 p-2 text-white rounded flex flex-col gap-2">
          <h1 className="font-bold mb-2">
            Detailed Look to your week:
          </h1>
          {dailyContributions[0]?.contributionDays.map(
            (day, index) => (
              <div key={index} className="bg-teal-700">
                <p>{moment(day.date).format('dddd, MMMM Do')}</p>
                <p>Contributions: {day.contributionCount}</p>
              </div>
            )
          )}
          <h1 className="font-bold mt-2">
            Total contributions this year: {totalContributions}
          </h1>
        </div>
      </div>
    </main>
  );
}
