'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Octokit } from 'octokit';
import { retrieveContributionData } from './modules/github';

export default function Home() {
  const [contributions, setContributions] = useState([]);

  const github_token_id = process.env.GITHUB_TOKEN_ID;

  const octokit = new Octokit({
    auth: github_token_id,
  });

  const getContributions = async () => {
    const res = await retrieveContributionData('demirsergen');
    console.log(res);
  };

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        retrieveContributionData('demirsergen');
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
