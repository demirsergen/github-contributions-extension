'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Octokit } from 'octokit';

export default function Home() {
  const [contributions, setContributions] = useState([]);

  const octokit = new Octokit({
    auth: 'YOUR-TOKEN',
  });

  // useEffect(() => {
  //   const fetchContributions = async () => {
  //     try {
  //       // Replace 'YOUR_GITHUB_USERNAME' with the user's GitHub username
  //       const username = 'demirsergen';
  //       const response = await axios.get(
  //         `https://api.github.com/users/${username}/contributions`
  //       );
  //       setContributions(response.data);
  //     } catch (error) {
  //       console.error('Error fetching GitHub contributions:', error);
  //     }
  //   };

  //   fetchContributions();
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="App">
        <h1>GitHub Contributions for the Last Week</h1>
        <div>
          {contributions.map((day, index) => (
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
